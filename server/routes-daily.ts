import type { Express, Request, Response } from "express";
import { db } from "./db";
import {
  dailyLogs, taskAssignments, weeks, specialDays, streak, goals, users
} from "@shared/schema";
import { eq, and, gte, lte, desc } from "drizzle-orm";
import { requireAuth } from "./routes";

// ─── AI helper (same pattern as schedule) ────────────────────────────────────

async function callAI(prompt: string, maxTokens = 600): Promise<string> {
  if (process.env.OPENAI_API_KEY) {
    try {
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({ model: "gpt-4o", messages: [{ role: "user", content: prompt }], max_tokens: maxTokens, temperature: 0.6 }),
      });
      const data = await r.json() as any;
      if (data.choices?.[0]?.message?.content) return data.choices[0].message.content.trim();
    } catch { console.warn("[daily] OpenAI failed, trying Groq"); }
  }
  if (process.env.GROQ_API_KEY) {
    try {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.GROQ_API_KEY}` },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "user", content: prompt }], max_tokens: maxTokens, temperature: 0.6 }),
      });
      const data = await r.json() as any;
      if (data.choices?.[0]?.message?.content) return data.choices[0].message.content.trim();
    } catch { console.warn("[daily] Groq also failed"); }
  }
  return "";
}

function toDateStr(date: Date): string {
  return date.toISOString().split("T")[0];
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return toDateStr(d);
}

// ─── Generate daily briefing ──────────────────────────────────────────────────

async function generateDailyBriefing(
  userId: number,
  today: string,
  feeling: string,
  yesterdayStats: { done: number; partial: number; skipped: number; taskTitles: string[] },
  todayTasks: { title: string; estimatedMinutes: number; priority: number }[],
  isSickDay: boolean
): Promise<string> {

  if (isSickDay) {
    return "Rest today. No tasks assigned. Your schedule will auto-adjust — nothing is lost. Come back when you're ready.";
  }

  const goalRows = await db.select({ title: goals.title }).from(goals)
    .where(and(eq(goals.userId, userId), eq(goals.isPrimary, true), eq(goals.isActive, true)));
  const goalList = goalRows.map(g => g.title).join(", ");

  const prompt = `You are a sharp, direct daily operations coach. No fluff.

User's primary goal: ${goalList}
Today's date: ${today}
Energy/feeling: ${feeling}

Yesterday: ${yesterdayStats.done} done, ${yesterdayStats.partial} partial, ${yesterdayStats.skipped} skipped
Yesterday's tasks: ${yesterdayStats.taskTitles.slice(0, 5).join(" | ") || "none recorded"}

Today's planned tasks (${todayTasks.length} total):
${todayTasks.slice(0, 5).map((t, i) => `${i + 1}. ${t.title} (~${t.estimatedMinutes}min)`).join("\n")}

Write a daily briefing in exactly 3 short paragraphs:
1. One sentence on yesterday (honest, no sugar-coating)
2. Today's single most important task and why (based on goal + energy)
3. One tactical tip for today given their energy level

Keep it under 120 words total. Direct operator tone. No bullet points. No headers.`;

  const result = await callAI(prompt, 250);
  return result || `${todayTasks.length} tasks planned for today. Start with the highest priority and work through the list.`;
}

// ─── Route registration ───────────────────────────────────────────────────────

export function registerDailyRoutes(app: Express) {

  // ── GET: check-in status for today ───────────────────────────────────────
  app.get("/api/6ps/daily/status", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;
      const today = toDateStr(new Date());

      const [todayLog] = await db
        .select()
        .from(dailyLogs)
        .where(and(eq(dailyLogs.userId, userId), eq(dailyLogs.logDate, today)))
        .limit(1);

      // Get today's tasks
      const todayTasks = await db
        .select()
        .from(taskAssignments)
        .where(and(eq(taskAssignments.userId, userId), eq(taskAssignments.taskDate, today)));

      // Get yesterday's tasks for check-in
      const yday = yesterday();
      const yesterdayTasks = await db
        .select()
        .from(taskAssignments)
        .where(and(eq(taskAssignments.userId, userId), eq(taskAssignments.taskDate, yday)));

      // Get streak
      const [streakRow] = await db
        .select()
        .from(streak)
        .where(eq(streak.userId, userId))
        .limit(1);

      return res.json({
        success: true,
        checkedInToday: todayLog?.checkInCompleted ?? false,
        todayLog: todayLog ?? null,
        todayTasks,
        yesterdayTasks,
        streak: streakRow ?? null,
        today,
        yesterday: yday,
      });
    } catch (e) {
      console.error("[daily] status error:", e);
      return res.status(500).json({ success: false, message: "Failed to get daily status." });
    }
  });

  // ── POST: submit check-in ─────────────────────────────────────────────────
  app.post("/api/6ps/daily/checkin", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;
      const today = toDateStr(new Date());
      const { feeling, taskUpdates, isSickDay } = req.body;
      // feeling: "great" | "good" | "off" | "sick"
      // taskUpdates: [{ taskId, status }]
      // isSickDay: boolean

      // 1. Apply yesterday's task status updates
      if (Array.isArray(taskUpdates) && taskUpdates.length > 0) {
        for (const update of taskUpdates) {
          await db.update(taskAssignments)
            .set({ status: update.status, updatedAt: new Date() })
            .where(and(eq(taskAssignments.id, update.taskId), eq(taskAssignments.userId, userId)));
        }
      }

      // 2. If sick day — mark in special_days, skip today's tasks
      if (isSickDay) {
        const existing = await db.select().from(specialDays)
          .where(and(eq(specialDays.userId, userId), eq(specialDays.dayDate, today))).limit(1);
        if (!existing.length) {
          await db.insert(specialDays).values({
            userId,
            dayDate: today,
            dayType: "sick",
            note: "Marked sick via daily check-in",
          });
        }
      }

      // 3. Calculate yesterday stats for briefing
      const yday = yesterday();
      const yTasks = await db.select().from(taskAssignments)
        .where(and(eq(taskAssignments.userId, userId), eq(taskAssignments.taskDate, yday)));
      const yesterdayStats = {
        done: yTasks.filter(t => t.status === "done").length,
        partial: yTasks.filter(t => t.status === "partial").length,
        skipped: yTasks.filter(t => t.status === "missed" || t.status === "pending").length,
        taskTitles: yTasks.map(t => t.title),
      };

      // 4. Get today's tasks for briefing
      const todayTasks = isSickDay ? [] : await db.select().from(taskAssignments)
        .where(and(eq(taskAssignments.userId, userId), eq(taskAssignments.taskDate, today)))
        .orderBy(taskAssignments.priority);

      // 5. Generate AI briefing
      const briefing = await generateDailyBriefing(
        userId, today, feeling,
        yesterdayStats,
        todayTasks.map(t => ({ title: t.title, estimatedMinutes: t.estimatedMinutes || 30, priority: t.priority })),
        isSickDay
      );

      // 6. Calculate energy score (1-10 from feeling)
      const energyMap: Record<string, number> = { great: 9, good: 7, off: 4, sick: 1 };
      const energyScore = energyMap[feeling] ?? 5;

      // 7. Upsert daily log
      const existingLog = await db.select().from(dailyLogs)
        .where(and(eq(dailyLogs.userId, userId), eq(dailyLogs.logDate, today))).limit(1);

      const logData = {
        checkInCompleted: true,
        checkInAnswers: JSON.stringify({ feeling, isSickDay, taskUpdates }),
        aiAnalysis: briefing,
        energyScore,
        tasksPlanned: todayTasks.length,
        tasksDone: 0,
        streakDay: !isSickDay,
      };

      if (existingLog.length) {
        await db.update(dailyLogs).set(logData).where(eq(dailyLogs.id, existingLog[0].id));
      } else {
        await db.insert(dailyLogs).values({ userId, logDate: today, ...logData });
      }

      // 8. Update streak
      const [streakRow] = await db.select().from(streak).where(eq(streak.userId, userId)).limit(1);
      if (streakRow && !isSickDay) {
        const lastActive = streakRow.lastActiveDate;
        const isConsecutive = lastActive === yday;
        const newCurrent = isConsecutive ? streakRow.currentStreak + 1 : 1;
        await db.update(streak).set({
          currentStreak: newCurrent,
          longestStreak: Math.max(newCurrent, streakRow.longestStreak),
          lastActiveDate: today,
          totalActiveDays: streakRow.totalActiveDays + 1,
          updatedAt: new Date(),
        }).where(eq(streak.userId, userId));
      }

      return res.json({ success: true, briefing, energyScore, isSickDay });
    } catch (e) {
      console.error("[daily] checkin error:", e);
      return res.status(500).json({ success: false, message: "Failed to submit check-in." });
    }
  });

  // ── GET: today's briefing (if already checked in) ────────────────────────
  app.get("/api/6ps/daily/briefing", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;
      const today = toDateStr(new Date());

      const [log] = await db.select().from(dailyLogs)
        .where(and(eq(dailyLogs.userId, userId), eq(dailyLogs.logDate, today))).limit(1);

      if (!log) return res.json({ success: true, briefing: null, checkedIn: false });

      const todayTasks = await db.select().from(taskAssignments)
        .where(and(eq(taskAssignments.userId, userId), eq(taskAssignments.taskDate, today)))
        .orderBy(taskAssignments.priority);

      const [streakRow] = await db.select().from(streak).where(eq(streak.userId, userId)).limit(1);

      return res.json({
        success: true,
        checkedIn: true,
        briefing: log.aiAnalysis,
        energyScore: log.energyScore,
        isSickDay: log.checkInAnswers ? JSON.parse(log.checkInAnswers).isSickDay : false,
        todayTasks,
        streak: streakRow ?? null,
      });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Failed to get briefing." });
    }
  });

  // ── GET: recent check-in history (last 7 days) ────────────────────────────
  app.get("/api/6ps/daily/history", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;
      const sevenDaysAgo = toDateStr(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

      const logs = await db.select().from(dailyLogs)
        .where(and(eq(dailyLogs.userId, userId), gte(dailyLogs.logDate, sevenDaysAgo)))
        .orderBy(desc(dailyLogs.logDate));

      return res.json({ success: true, logs });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Failed to get history." });
    }
  });

  // ── PATCH: update task status from dashboard ──────────────────────────────
  app.patch("/api/6ps/daily/task/:taskId", requireAuth, async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.taskId);
      const { status } = req.body;
      const valid = ["pending", "done", "partial", "missed"];
      if (!valid.includes(status)) return res.status(400).json({ success: false, message: "Invalid status." });

      await db.update(taskAssignments).set({ status, updatedAt: new Date() })
        .where(and(eq(taskAssignments.id, taskId), eq(taskAssignments.userId, req.session.userId!)));

      // Update today's done count in log
      const today = toDateStr(new Date());
      const [log] = await db.select().from(dailyLogs)
        .where(and(eq(dailyLogs.userId, req.session.userId!), eq(dailyLogs.logDate, today))).limit(1);

      if (log) {
        const todayTasks = await db.select().from(taskAssignments)
          .where(and(eq(taskAssignments.userId, req.session.userId!), eq(taskAssignments.taskDate, today)));
        const doneCount = todayTasks.filter(t => t.status === "done" || t.status === "partial").length;
        await db.update(dailyLogs).set({ tasksDone: doneCount }).where(eq(dailyLogs.id, log.id));
      }

      return res.json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Failed to update task." });
    }
  });
}
