import { useState, useEffect, useRef } from "react";

interface Week {
  id: number;
  weekNumber: number;
  startDate: string;
  endDate: string;
  theme: string;
  focusDescription: string;
  phase: string;
  totalHoursPlanned: number;
  momentumScore?: number;
}

interface Task {
  id: number;
  weekId: number;
  goalId: number;
  taskDate: string;
  dayOfWeek: string;
  title: string;
  description: string;
  bookSource: string;
  priority: number;
  estimatedMinutes: number;
  status: "pending" | "done" | "partial" | "missed" | "blocked";
}

const PHASE_COLORS: Record<string, string> = {
  Foundation: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  Build: "bg-orange-500/10 border-orange-500/30 text-orange-400",
  Accelerate: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  Consolidate: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-slate-700 text-slate-400",
  done: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  partial: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  missed: "bg-red-500/20 text-red-400 border border-red-500/30",
  blocked: "bg-slate-600/50 text-slate-500",
};

const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function groupTasksByDay(tasks: Task[]): Record<string, Task[]> {
  const grouped: Record<string, Task[]> = {};
  for (const day of DAYS_ORDER) grouped[day] = [];
  for (const task of tasks) {
    if (grouped[task.dayOfWeek]) grouped[task.dayOfWeek].push(task);
    else grouped[task.dayOfWeek] = [task];
  }
  return grouped;
}

function weekProgress(tasks: Task[]): number {
  if (!tasks.length) return 0;
  const done = tasks.filter(t => t.status === "done").length;
  return Math.round((done / tasks.length) * 100);
}

// ─── Generation polling component ────────────────────────────────────────────

function GeneratingView({ onDone }: { onDone: () => void }) {
  const [status, setStatus] = useState({ weeksGenerated: 0, totalWeeks: 0, tasksGenerated: 0, complete: false });
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    pollRef.current = setInterval(async () => {
      try {
        const r = await fetch("/api/6ps/schedule/status", { credentials: "include" });
        const d = await r.json();
        if (d.success) {
          setStatus(d);
          if (d.complete) {
            clearInterval(pollRef.current!);
            setTimeout(onDone, 1000);
          }
        }
      } catch { /* ignore */ }
    }, 3000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  const pct = status.totalWeeks ? Math.round((status.weeksGenerated / status.totalWeeks) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mb-6 animate-pulse">
        <span className="text-black font-black text-xl">6P</span>
      </div>
      <h2 className="text-xl font-bold text-white mb-2">Building your schedule…</h2>
      <p className="text-slate-400 text-sm mb-8 max-w-sm">
        AI is reading all 6 books and designing your week-by-week roadmap. This takes 1–3 minutes.
      </p>

      <div className="w-64 bg-slate-800 rounded-full h-2 mb-3">
        <div
          className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-slate-500">
        {status.weeksGenerated} / {status.totalWeeks} weeks · {status.tasksGenerated} tasks generated
      </p>
      {status.complete && (
        <p className="text-emerald-400 text-sm mt-4 font-medium">✓ Done. Loading your schedule…</p>
      )}
    </div>
  );
}

// ─── Main Schedule Page ───────────────────────────────────────────────────────

export default function SixPSSchedule() {
  const [view, setView] = useState<"loading" | "generating" | "schedule">("loading");
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [currentWeek, setCurrentWeek] = useState<Week | null>(null);
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
  const [selectedWeekTasks, setSelectedWeekTasks] = useState<Task[]>([]);
  const [today, setToday] = useState("");
  const [totalWeeks, setTotalWeeks] = useState(0);
  const [error, setError] = useState("");
  const [updatingTask, setUpdatingTask] = useState<number | null>(null);

  useEffect(() => { loadSchedule(); }, []);

  async function loadSchedule() {
    setView("loading");
    try {
      const r = await fetch("/api/6ps/schedule/status", { credentials: "include" });
      const status = await r.json();

      if (!status.weeksGenerated) {
        // Trigger generation
        await fetch("/api/6ps/schedule/generate", {
          method: "POST",
          credentials: "include",
        });
        setView("generating");
        return;
      }

      if (!status.complete) {
        setView("generating");
        return;
      }

      await loadCurrentWeek();
      const allR = await fetch("/api/6ps/schedule", { credentials: "include" });
      const allData = await allR.json();
      if (allData.success) setWeeks(allData.weeks);
      setView("schedule");
    } catch (e) {
      setError("Failed to load schedule.");
      setView("schedule");
    }
  }

  async function loadCurrentWeek() {
    const r = await fetch("/api/6ps/schedule/current-week", { credentials: "include" });
    const d = await r.json();
    if (d.success) {
      setCurrentWeek(d.currentWeek);
      setCurrentTasks(d.tasks);
      setToday(d.today);
      setTotalWeeks(d.totalWeeks);
    }
  }

  async function loadWeek(weekNumber: number) {
    const r = await fetch(`/api/6ps/schedule/week/${weekNumber}`, { credentials: "include" });
    const d = await r.json();
    if (d.success) {
      setSelectedWeek(d.week);
      setSelectedWeekTasks(d.tasks);
    }
  }

  async function updateTaskStatus(taskId: number, status: string) {
    setUpdatingTask(taskId);
    try {
      await fetch(`/api/6ps/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      // Refresh tasks
      if (selectedWeek) await loadWeek(selectedWeek.weekNumber);
      await loadCurrentWeek();
    } finally {
      setUpdatingTask(null);
    }
  }

  if (view === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-slate-500 text-sm animate-pulse">Loading schedule…</div>
      </div>
    );
  }

  if (view === "generating") {
    return (
      <div className="min-h-screen bg-slate-900 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <GeneratingView onDone={loadSchedule} />
        </div>
      </div>
    );
  }

  const displayWeek = selectedWeek || currentWeek;
  const displayTasks = selectedWeek ? selectedWeekTasks : currentTasks;
  const groupedTasks = displayWeek ? groupTasksByDay(displayTasks) : {};
  const progress = weekProgress(displayTasks);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Nav */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/favicon.ico" alt="" className="w-6 h-6 rounded-full" onError={(e) => { (e.target as HTMLImageElement).style.display="none"; }} />
            <span className="font-bold text-white text-sm hidden sm:block">Subharaj Das</span>
          </a>
          <span className="text-slate-700 text-xs">/</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
              <span className="text-black font-black text-xs">6P</span>
            </div>
            <span className="font-semibold text-sm">6 Point Someone</span>
            <span className="text-slate-600 text-xs">/ Schedule</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/6pointsomeone" className="text-xs text-slate-500 hover:text-white transition-colors">Dashboard</a>
          <a href="/" className="text-xs text-slate-500 hover:text-white transition-colors hidden sm:block">← Home</a>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-6 py-8">

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-6 text-red-400 text-sm">{error}</div>
        )}

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Your Schedule</h1>
            <p className="text-slate-500 text-sm mt-1">{totalWeeks} weeks · AI-built from 6 books</p>
          </div>
          <button
            onClick={() => { setSelectedWeek(null); setSelectedWeekTasks([]); }}
            className={`text-sm px-4 py-2 rounded-lg border transition-colors ${
              !selectedWeek
                ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                : "border-slate-700 text-slate-500 hover:border-slate-600 hover:text-white"
            }`}
          >
            Current Week
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left: Week list ── */}
          <div className="lg:col-span-1">
            <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-3">All Weeks</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {weeks.map((w) => {
                const isActive = w.id === currentWeek?.id;
                const isSelected = w.id === selectedWeek?.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => loadWeek(w.weekNumber)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-orange-500/10 border-orange-500/30"
                        : isActive
                        ? "bg-slate-800 border-slate-600"
                        : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-500">W{w.weekNumber}</span>
                      {isActive && <span className="text-xs text-orange-400">← Now</span>}
                      <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full border ${PHASE_COLORS[w.phase] || "bg-slate-700 text-slate-400"}`}>
                        {w.phase}
                      </span>
                    </div>
                    <p className="text-xs text-white font-medium truncate">{w.theme}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{w.startDate} — {w.endDate}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: Week detail ── */}
          <div className="lg:col-span-2">
            {displayWeek ? (
              <>
                {/* Week header */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-500">WEEK {displayWeek.weekNumber}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${PHASE_COLORS[displayWeek.phase] || ""}`}>
                          {displayWeek.phase}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-white">{displayWeek.theme}</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-400">{progress}%</p>
                      <p className="text-xs text-slate-500">complete</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{displayWeek.focusDescription}</p>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 mt-4">
                    <div
                      className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Daily tasks */}
                <div className="space-y-3">
                  {DAYS_ORDER.map((day) => {
                    const dayTasks = groupedTasks[day] || [];
                    if (!dayTasks.length) return null;

                    const dayDate = dayTasks[0]?.taskDate;
                    const isToday = dayDate === today;
                    const doneTasks = dayTasks.filter(t => t.status === "done").length;

                    return (
                      <div key={day} className={`rounded-xl border overflow-hidden ${
                        isToday ? "border-orange-500/30 bg-orange-500/5" : "border-slate-700/50 bg-slate-800/30"
                      }`}>
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/50">
                          <span className={`text-sm font-semibold ${isToday ? "text-orange-400" : "text-white"}`}>
                            {day} {isToday && <span className="text-xs ml-1">← Today</span>}
                          </span>
                          {dayDate && <span className="text-xs text-slate-600">{dayDate}</span>}
                          <span className="ml-auto text-xs text-slate-500">{doneTasks}/{dayTasks.length} done</span>
                        </div>

                        <div className="divide-y divide-slate-700/30">
                          {dayTasks
                            .sort((a, b) => a.priority - b.priority)
                            .map((task) => (
                              <div key={task.id} className="px-4 py-3 flex items-start gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                      task.status === "done" ? "bg-emerald-500" :
                                      task.status === "partial" ? "bg-amber-500" :
                                      task.status === "missed" ? "bg-red-500" :
                                      task.status === "blocked" ? "bg-slate-600" :
                                      "bg-slate-600"
                                    }`} />
                                    <p className={`text-sm font-medium ${task.status === "done" ? "line-through text-slate-500" : "text-white"}`}>
                                      {task.title}
                                    </p>
                                  </div>
                                  {task.description && (
                                    <p className="text-xs text-slate-500 mb-1.5 ml-4">{task.description}</p>
                                  )}
                                  <div className="flex items-center gap-3 ml-4">
                                    {task.bookSource && (
                                      <span className="text-xs text-slate-600">{task.bookSource}</span>
                                    )}
                                    {task.estimatedMinutes && (
                                      <span className="text-xs text-slate-600">{task.estimatedMinutes}m</span>
                                    )}
                                  </div>
                                </div>

                                {/* Status selector */}
                                <select
                                  value={task.status}
                                  disabled={updatingTask === task.id}
                                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                  className="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-400 focus:outline-none focus:border-orange-500/50 disabled:opacity-50 flex-shrink-0"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="done">Done ✓</option>
                                  <option value="partial">Partial</option>
                                  <option value="missed">Missed</option>
                                  <option value="blocked">Blocked</option>
                                </select>
                              </div>
                            ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 text-slate-600 text-sm">
                Select a week from the left to view tasks
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
