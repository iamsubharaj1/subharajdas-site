import type { Express, Request, Response } from "express";
import { z } from "zod";
import { db } from "./db";
import {
  goals, goalBookInsights, userScheduleConfig, specialDays, users, streak
} from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "./routes";

// ─── AI helper ────────────────────────────────────────────────────────────────

const BOOKS = [
  { number: 1, name: "Atomic Habits",               question: "What specific system or habit needs to be built to achieve this goal?" },
  { number: 2, name: "Dopamine Detox",               question: "What distractions or dopamine traps must be eliminated to focus on this goal?" },
  { number: 3, name: "Eat That Frog",                question: "What is the single hardest, most avoided task that would move this goal forward fastest?" },
  { number: 4, name: "Ikigai",                       question: "How does this goal align with purpose and long-term energy sustainability?" },
  { number: 5, name: "The Almanack of Naval Ravikant", question: "What is the highest-leverage play and compounding opportunity in pursuing this goal?" },
  { number: 6, name: "The Power of Your Subconscious Mind", question: "What identity shift or belief reprogramming is required to make achieving this goal inevitable?" },
];

async function callAI(prompt: string): Promise<string> {
  // Try OpenAI first
  if (process.env.OPENAI_API_KEY) {
    try {
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });
      const data = await r.json() as any;
      if (data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content.trim();
      }
    } catch (e) {
      console.warn("[ai] OpenAI failed, trying Groq fallback");
    }
  }

  // Fallback: Groq
  if (process.env.GROQ_API_KEY) {
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });
      const data = await r.json() as any;
      if (data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content.trim();
      }
    } catch (e) {
      console.warn("[ai] Groq also failed");
    }
  }

  return "AI analysis unavailable. Add your API key to Render environment variables.";
}

// ─── Route registration ───────────────────────────────────────────────────────

export function register6PSRoutes(app: Express) {

  // ── GET all goals for current user ────────────────────────────────────────

  app.get("/api/6ps/goals", requireAuth, async (req: Request, res: Response) => {
    try {
      const userGoals = await db
        .select()
        .from(goals)
        .where(and(eq(goals.userId, req.session.userId!), eq(goals.isActive, true)))
        .orderBy(goals.priorityRank, goals.createdAt);
      return res.json({ success: true, goals: userGoals });
    } catch (e) {
      console.error("[6ps] get goals error:", e);
      return res.status(500).json({ success: false, message: "Failed to fetch goals." });
    }
  });

  // ── SAVE all goals (step 1 + 2 — list + pick top 3) ─────────────────────

  app.post("/api/6ps/goals", requireAuth, async (req: Request, res: Response) => {
    try {
      const { goalTitles, primaryIds } = req.body as {
        goalTitles: string[];
        primaryIds: number[]; // indices of top 3 in goalTitles array
      };

      if (!goalTitles?.length) {
        return res.status(400).json({ success: false, message: "No goals provided." });
      }

      // Deactivate existing goals
      await db
        .update(goals)
        .set({ isActive: false })
        .where(eq(goals.userId, req.session.userId!));

      // Insert new goals
      const inserted = [];
      for (let i = 0; i < goalTitles.length; i++) {
        const isPrimary = primaryIds?.includes(i) ?? false;
        const priorityRank = primaryIds?.indexOf(i) + 1 || null;
        const [g] = await db.insert(goals).values({
          userId: req.session.userId!,
          title: goalTitles[i].trim(),
          isPrimary,
          priorityRank: isPrimary ? priorityRank : null,
          isActive: true,
        }).returning();
        inserted.push(g);
      }

      return res.json({ success: true, goals: inserted });
    } catch (e) {
      console.error("[6ps] save goals error:", e);
      return res.status(500).json({ success: false, message: "Failed to save goals." });
    }
  });

  // ── RUN 6 tentacles for a single goal (step 3) ───────────────────────────

  app.post("/api/6ps/goals/:goalId/insights", requireAuth, async (req: Request, res: Response) => {
    try {
      const goalId = parseInt(req.params.goalId);

      // Verify goal belongs to user
      const [goal] = await db
        .select()
        .from(goals)
        .where(and(eq(goals.id, goalId), eq(goals.userId, req.session.userId!)))
        .limit(1);

      if (!goal) {
        return res.status(404).json({ success: false, message: "Goal not found." });
      }

      // Delete existing insights for this goal
      await db
        .delete(goalBookInsights)
        .where(and(eq(goalBookInsights.goalId, goalId), eq(goalBookInsights.userId, req.session.userId!)));

      // Run all 6 tentacles in parallel
      const insightPromises = BOOKS.map(async (book) => {
        const prompt = `You are a world-class life and career coach. 

Goal: "${goal.title}"
Book: "${book.name}"
Question: ${book.question}

Give a sharp, specific, actionable insight for this exact goal through the lens of ${book.name}. 
- Be direct and concrete, not generic
- 3-4 sentences maximum
- End with 1 specific action item the person can start today`;

        const insight = await callAI(prompt);

        const [saved] = await db.insert(goalBookInsights).values({
          goalId,
          userId: req.session.userId!,
          book: book.name,
          tentacleNumber: book.number,
          insight,
        }).returning();

        return saved;
      });

      const insights = await Promise.all(insightPromises);

      // Also estimate weeks needed for this goal
      const estimatePrompt = `Goal: "${goal.title}"
Based on the complexity and scope of this goal, estimate how many weeks of focused work (9-10 hours/day, 6 days/week) it would realistically take to achieve meaningful, measurable progress.
Respond with ONLY a JSON object: {"weeks": <number between 4 and 52>, "toughness": <number 1-10>, "reasoning": "<one sentence>"}`;

      const estimateRaw = await callAI(estimatePrompt);
      try {
        const cleaned = estimateRaw.replace(/```json|```/g, "").trim();
        const estimate = JSON.parse(cleaned);
        await db.update(goals).set({
          estimatedWeeks: estimate.weeks,
          toughnessScore: estimate.toughness,
        }).where(eq(goals.id, goalId));
      } catch {
        // estimation parse failed — not critical
      }

      return res.json({ success: true, insights });
    } catch (e) {
      console.error("[6ps] insights error:", e);
      return res.status(500).json({ success: false, message: "Failed to generate insights." });
    }
  });

  // ── GET insights for a goal ───────────────────────────────────────────────

  app.get("/api/6ps/goals/:goalId/insights", requireAuth, async (req: Request, res: Response) => {
    try {
      const goalId = parseInt(req.params.goalId);
      const insights = await db
        .select()
        .from(goalBookInsights)
        .where(and(eq(goalBookInsights.goalId, goalId), eq(goalBookInsights.userId, req.session.userId!)))
        .orderBy(goalBookInsights.tentacleNumber);
      return res.json({ success: true, insights });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Failed to fetch insights." });
    }
  });

  // ── SAVE schedule config (step 5) ─────────────────────────────────────────

  app.post("/api/6ps/schedule", requireAuth, async (req: Request, res: Response) => {
    try {
      const { commitmentType, dailyHoursWeekday, dailyHoursSaturday } = req.body;

      // Upsert schedule config
      const existing = await db
        .select({ id: userScheduleConfig.id })
        .from(userScheduleConfig)
        .where(eq(userScheduleConfig.userId, req.session.userId!))
        .limit(1);

      if (existing.length > 0) {
        await db.update(userScheduleConfig).set({
          commitmentType: commitmentType || "fulltime",
          dailyHoursWeekday: dailyHoursWeekday || 9.5,
          dailyHoursSaturday: dailyHoursSaturday || 3.0,
          updatedAt: new Date(),
        }).where(eq(userScheduleConfig.userId, req.session.userId!));
      } else {
        await db.insert(userScheduleConfig).values({
          userId: req.session.userId!,
          commitmentType: commitmentType || "fulltime",
          dailyHoursWeekday: dailyHoursWeekday || 9.5,
          dailyHoursSaturday: dailyHoursSaturday || 3.0,
        });
      }

      return res.json({ success: true });
    } catch (e) {
      console.error("[6ps] schedule error:", e);
      return res.status(500).json({ success: false, message: "Failed to save schedule." });
    }
  });

  // ── SAVE special days (step 6) ────────────────────────────────────────────

  app.post("/api/6ps/special-days", requireAuth, async (req: Request, res: Response) => {
    try {
      const { days } = req.body as { days: { date: string; type: string; note?: string }[] };

      for (const day of (days || [])) {
        await db.insert(specialDays).values({
          userId: req.session.userId!,
          dayDate: day.date,
          dayType: day.type as any,
          note: day.note || null,
        });
      }

      return res.json({ success: true });
    } catch (e) {
      console.error("[6ps] special days error:", e);
      return res.status(500).json({ success: false, message: "Failed to save special days." });
    }
  });

  // ── COMPLETE onboarding (step 7) ──────────────────────────────────────────

  app.post("/api/6ps/onboarding/complete", requireAuth, async (req: Request, res: Response) => {
    try {
      await db
        .update(users)
        .set({ onboardingComplete: true })
        .where(eq(users.id, req.session.userId!));

      // Create streak record if not exists
      try {
        await db.insert(streak).values({ userId: req.session.userId! });
      } catch {
        // already exists — fine
      }

      return res.json({ success: true });
    } catch (e) {
      console.error("[6ps] complete onboarding error:", e);
      return res.status(500).json({ success: false, message: "Failed to complete onboarding." });
    }
  });
}
