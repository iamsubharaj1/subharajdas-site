import type { Express, Request, Response } from "express";
import { db } from "./db";
import {
  goals, userScheduleConfig, specialDays, weeks, taskAssignments
} from "@shared/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import { requireAuth } from "./routes";
import * as fs from "fs";
import * as path from "path";

// ─── Load book items ──────────────────────────────────────────────────────────

let bookItems: Record<string, string[]> = {};
try {
  const bookPath = path.join(process.cwd(), "server", "book_items.json");
  bookItems = JSON.parse(fs.readFileSync(bookPath, "utf-8"));
} catch {
  console.warn("[schedule] book_items.json not found — AI will work without book grounding");
}

function getBookSample(book: string, n = 8): string {
  const items = bookItems[book] || [];
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n).map((item, i) => `${i + 1}. ${item}`).join("\n");
}

// ─── AI helper ────────────────────────────────────────────────────────────────

async function callAI(prompt: string, maxTokens = 800): Promise<string> {
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
          max_tokens: maxTokens,
          temperature: 0.7,
        }),
      });
      const data = await r.json() as any;
      if (data.choices?.[0]?.message?.content) return data.choices[0].message.content.trim();
    } catch { console.warn("[ai] OpenAI failed, trying Groq"); }
  }
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
          max_tokens: maxTokens,
          temperature: 0.7,
        }),
      });
      const data = await r.json() as any;
      if (data.choices?.[0]?.message?.content) return data.choices[0].message.content.trim();
    } catch { console.warn("[ai] Groq also failed"); }
  }
  return "";
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function toDateStr(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getDayType(dateStr: string, specialDayMap: Record<string, string>): "work" | "holiday" | "travel" | "sick" | "saturday" | "sunday" {
  const d = new Date(dateStr);
  const dow = d.getDay(); // 0=Sun, 6=Sat
  if (specialDayMap[dateStr]) return specialDayMap[dateStr] as any;
  if (dow === 0) return "sunday";
  if (dow === 6) return "saturday";
  return "work";
}

function getHoursForDay(dayType: string, commitmentHours: number, isSaturday: boolean): number {
  if (dayType === "sunday" || dayType === "travel" || dayType === "sick") return 0;
  if (dayType === "holiday") return 3;
  if (isSaturday || dayType === "saturday") return 3;
  return commitmentHours;
}

// ─── Generate week-by-week schedule ──────────────────────────────────────────

async function generateSchedule(
  userId: number,
  primaryGoals: any[],
  scheduleConfig: any,
  specialDayMap: Record<string, string>
): Promise<void> {

  const totalWeeks = Math.max(...primaryGoals.map((g: any) => g.estimatedWeeks || 8));
  const startDate = new Date();
  // Start from next Monday
  const dow = startDate.getDay();
  const daysToMonday = dow === 0 ? 1 : (8 - dow) % 7 || 7;
  const weekStart = addDays(startDate, daysToMonday);

  // Delete existing schedule for this user
  await db.delete(taskAssignments).where(eq(taskAssignments.userId, userId));
  await db.delete(weeks).where(eq(weeks.userId, userId));

  const goalsList = primaryGoals.map((g: any) => `- ${g.title} (${g.estimatedWeeks || 8} weeks, toughness ${g.toughnessScore || 7}/10)`).join("\n");

  for (let weekNum = 1; weekNum <= totalWeeks; weekNum++) {
    const wStart = addDays(weekStart, (weekNum - 1) * 7);
    const wEnd = addDays(wStart, 5); // Mon–Sat

    // Determine week phase
    const progress = weekNum / totalWeeks;
    const phase = progress <= 0.25 ? "Foundation" : progress <= 0.6 ? "Build" : progress <= 0.85 ? "Accelerate" : "Consolidate";

    // AI: generate week theme + focus
    const weekPrompt = `You are a disciplined life and career execution coach. You build systems, not just goals.

Goals being worked on:
${goalsList}

Week ${weekNum} of ${totalWeeks} — Phase: ${phase}
Commitment: ${scheduleConfig.dailyHoursWeekday} hours/day weekdays, ${scheduleConfig.dailyHoursSaturday} hrs Saturday

Book principles to draw from (use these DIRECTLY, do not invent):
ATOMIC HABITS:
${getBookSample("Atomic Habits", 5)}

EAT THAT FROG:
${getBookSample("Eat That Frog", 4)}

NAVAL ALMANACK:
${getBookSample("Naval Almanack", 3)}

Generate a week theme and 3-sentence focus description for Week ${weekNum}.
Respond ONLY with JSON: {"theme": "<5-8 word theme>", "focus": "<3 sentences describing this week's direction>"}`;

    const weekAIRaw = await callAI(weekPrompt, 300);
    let weekTheme = `Week ${weekNum} — ${phase}`;
    let weekFocus = `Focus on ${phase.toLowerCase()} activities for your goals.`;
    try {
      const cleaned = weekAIRaw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      weekTheme = parsed.theme || weekTheme;
      weekFocus = parsed.focus || weekFocus;
    } catch { /* use defaults */ }

    // Insert week record
    const [weekRecord] = await db.insert(weeks).values({
      userId,
      weekNumber: weekNum,
      startDate: toDateStr(wStart),
      endDate: toDateStr(wEnd),
      theme: weekTheme,
      focusDescription: weekFocus,
      phase,
      totalHoursPlanned: (scheduleConfig.dailyHoursWeekday * 5) + scheduleConfig.dailyHoursSaturday,
    }).returning();

    // Generate daily tasks for Mon–Sat
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let d = 0; d < 6; d++) {
      const dayDate = addDays(wStart, d);
      const dateStr = toDateStr(dayDate);
      const isSat = d === 5;
      const dayType = getDayType(dateStr, specialDayMap);
      const hours = getHoursForDay(dayType, scheduleConfig.dailyHoursWeekday, isSat);

      if (hours === 0) continue; // skip travel/sick/sunday

      const dayLabel = days[d];
      const isLight = dayType === "holiday" || isSat;

      // AI: generate 3-5 tasks for this day
      const dayPrompt = `You are a disciplined execution coach. Today is ${dayLabel}, Week ${weekNum}/${totalWeeks} (${phase} phase).

Goals:
${goalsList}

Available hours today: ${hours}
Day type: ${isLight ? "light day" : "full work day"}

Book action items to base tasks on (use THESE SPECIFICALLY):
ATOMIC HABITS: ${getBookSample("Atomic Habits", 3)}
DOPAMINE DETOX: ${getBookSample("Dopamine Detox", 2)}
EAT THAT FROG: ${getBookSample("Eat That Frog", 3)}
${isLight ? "" : `NAVAL ALMANACK: ${getBookSample("Naval Almanack", 2)}
POWER OF SUBCONSCIOUS MIND: ${getBookSample("Power of Subconscious Mind", 2)}`}

Generate ${isLight ? "2-3" : "4-5"} specific, actionable tasks for today. Each task should:
- Be directly tied to one of the goals
- Reference a specific book principle
- Have a realistic time estimate

Respond ONLY with JSON array:
[{"title": "<task title>", "description": "<1-2 sentences>", "goalIndex": <0-based goal index>, "estimatedMinutes": <30-120>, "bookSource": "<book name>", "priority": <1-5>}]`;

      const tasksRaw = await callAI(dayPrompt, 600);
      let tasks: any[] = [];
      try {
        const cleaned = tasksRaw.replace(/```json|```/g, "").trim();
        tasks = JSON.parse(cleaned);
        if (!Array.isArray(tasks)) tasks = [];
      } catch { tasks = []; }

      // Fallback task if AI fails
      if (tasks.length === 0) {
        tasks = [{
          title: `${phase} focus block`,
          description: `Deep work session for your primary goal. Use the Eat That Frog principle — tackle the hardest task first.`,
          goalIndex: 0,
          estimatedMinutes: 90,
          bookSource: "Eat That Frog",
          priority: 1,
        }];
      }

      // Insert tasks
      for (let t = 0; t < tasks.length; t++) {
        const task = tasks[t];
        const goalForTask = primaryGoals[task.goalIndex] || primaryGoals[0];
        await db.insert(taskAssignments).values({
          userId,
          weekId: weekRecord.id,
          goalId: goalForTask?.id || null,
          taskDate: dateStr,
          dayOfWeek: dayLabel,
          title: task.title || "Focus block",
          description: task.description || "",
          estimatedMinutes: task.estimatedMinutes || 60,
          bookSource: task.bookSource || "",
          priority: task.priority || t + 1,
          status: "pending",
        });
      }
    }

    console.log(`[schedule] Week ${weekNum}/${totalWeeks} generated`);
  }
}

// ─── Route registration ───────────────────────────────────────────────────────

export function registerScheduleRoutes(app: Express) {

  // ── POST: generate full schedule ──────────────────────────────────────────
  app.post("/api/6ps/schedule/generate", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;

      // Load primary goals
      const primaryGoals = await db
        .select()
        .from(goals)
        .where(and(eq(goals.userId, userId), eq(goals.isPrimary, true), eq(goals.isActive, true)));

      if (!primaryGoals.length) {
        return res.status(400).json({ success: false, message: "No primary goals found. Complete the Goal Setup first." });
      }

      // Load schedule config
      const [config] = await db
        .select()
        .from(userScheduleConfig)
        .where(eq(userScheduleConfig.userId, userId))
        .limit(1);

      if (!config) {
        return res.status(400).json({ success: false, message: "Schedule config not found. Complete the wizard first." });
      }

      // Load special days
      const specialDayRows = await db
        .select()
        .from(specialDays)
        .where(eq(specialDays.userId, userId));

      const specialDayMap: Record<string, string> = {};
      for (const sd of specialDayRows) {
        specialDayMap[sd.dayDate] = sd.dayType;
      }

      // Respond immediately — generation runs async
      res.json({ success: true, message: "Schedule generation started. Check /api/6ps/schedule/status." });

      // Generate in background
      generateSchedule(userId, primaryGoals, config, specialDayMap)
        .catch(e => console.error("[schedule] generation error:", e));

    } catch (e) {
      console.error("[schedule] generate error:", e);
      return res.status(500).json({ success: false, message: "Failed to start schedule generation." });
    }
  });

  // ── GET: schedule status ──────────────────────────────────────────────────
  app.get("/api/6ps/schedule/status", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;
      const weekCount = await db
        .select({ id: weeks.id, weekNumber: weeks.weekNumber })
        .from(weeks)
        .where(eq(weeks.userId, userId));

      const taskCount = await db
        .select({ id: taskAssignments.id })
        .from(taskAssignments)
        .where(eq(taskAssignments.userId, userId));

      // Get expected total weeks from goals
      const primaryGoals = await db
        .select({ estimatedWeeks: goals.estimatedWeeks })
        .from(goals)
        .where(and(eq(goals.userId, userId), eq(goals.isPrimary, true), eq(goals.isActive, true)));

      const totalExpected = primaryGoals.length
        ? Math.max(...primaryGoals.map(g => g.estimatedWeeks || 8))
        : 0;

      const done = weekCount.length >= totalExpected && totalExpected > 0;

      return res.json({
        success: true,
        weeksGenerated: weekCount.length,
        totalWeeks: totalExpected,
        tasksGenerated: taskCount.length,
        complete: done,
      });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Failed to get status." });
    }
  });

  // ── GET: all weeks ────────────────────────────────────────────────────────
  app.get("/api/6ps/schedule", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;
      const allWeeks = await db
        .select()
        .from(weeks)
        .where(eq(weeks.userId, userId))
        .orderBy(weeks.weekNumber);

      return res.json({ success: true, weeks: allWeeks });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Failed to fetch schedule." });
    }
  });

  // ── GET: current week + tasks ─────────────────────────────────────────────
  app.get("/api/6ps/schedule/current-week", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;
      const today = toDateStr(new Date());

      const allWeeks = await db
        .select()
        .from(weeks)
        .where(eq(weeks.userId, userId))
        .orderBy(weeks.weekNumber);

      if (!allWeeks.length) {
        return res.json({ success: true, currentWeek: null, tasks: [], today });
      }

      // Find current week
      let currentWeek = allWeeks.find(w => w.startDate <= today && w.endDate >= today);
      if (!currentWeek) currentWeek = allWeeks[0]; // fallback to first week

      const tasks = await db
        .select()
        .from(taskAssignments)
        .where(and(
          eq(taskAssignments.userId, userId),
          eq(taskAssignments.weekId, currentWeek.id)
        ))
        .orderBy(taskAssignments.taskDate, taskAssignments.priority);

      return res.json({ success: true, currentWeek, tasks, today, totalWeeks: allWeeks.length });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Failed to fetch current week." });
    }
  });

  // ── GET: tasks for a specific week ────────────────────────────────────────
  app.get("/api/6ps/schedule/week/:weekNumber", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId!;
      const weekNumber = parseInt(req.params.weekNumber);

      const [week] = await db
        .select()
        .from(weeks)
        .where(and(eq(weeks.userId, userId), eq(weeks.weekNumber, weekNumber)))
        .limit(1);

      if (!week) return res.status(404).json({ success: false, message: "Week not found." });

      const tasks = await db
        .select()
        .from(taskAssignments)
        .where(and(eq(taskAssignments.userId, userId), eq(taskAssignments.weekId, week.id)))
        .orderBy(taskAssignments.taskDate, taskAssignments.priority);

      return res.json({ success: true, week, tasks });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Failed to fetch week." });
    }
  });

  // ── PATCH: update task status ─────────────────────────────────────────────
  app.patch("/api/6ps/tasks/:taskId/status", requireAuth, async (req: Request, res: Response) => {
    try {
      const taskId = parseInt(req.params.taskId);
      const { status } = req.body;
      const validStatuses = ["pending", "done", "partial", "missed", "blocked"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status." });
      }

      await db
        .update(taskAssignments)
        .set({ status, updatedAt: new Date() })
        .where(and(eq(taskAssignments.id, taskId), eq(taskAssignments.userId, req.session.userId!)));

      return res.json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, message: "Failed to update task." });
    }
  });
}
