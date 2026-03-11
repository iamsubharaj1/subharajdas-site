import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import SixPSWizard from "@/pages/6ps-wizard";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Task {
  id: number;
  title: string;
  description?: string;
  estimatedMinutes?: number;
  priority: number;
  status: string;
  taskDate: string;
}

interface Week {
  id: number;
  weekNumber: number;
  startDate: string;
  endDate: string;
  theme?: string;
  phase?: string;
  totalHoursPlanned?: number;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
}

interface DailyStatus {
  checkedInToday: boolean;
  todayTasks: Task[];
  yesterdayTasks: Task[];
  streak: StreakData | null;
  today: string;
  yesterday: string;
  todayLog: { aiAnalysis?: string; energyScore?: number; checkInAnswers?: string } | null;
}

// ─── Check-in Modal ───────────────────────────────────────────────────────────

const FEELING_OPTIONS = [
  { value: "great", label: "Firing on all cylinders", emoji: "⚡" },
  { value: "good",  label: "Good to go",              emoji: "✅" },
  { value: "off",   label: "Slightly off today",      emoji: "😐" },
  { value: "sick",  label: "Sick — rest day",         emoji: "🤒" },
];

const STATUS_OPTIONS = [
  { value: "done",    label: "Done"    },
  { value: "partial", label: "Partial" },
  { value: "missed",  label: "Skipped" },
];

function CheckInModal({ dailyStatus, onComplete }: {
  dailyStatus: DailyStatus;
  onComplete: (briefing: string, isSick: boolean, energyScore: number) => void;
}) {
  const hasPendingYesterday = dailyStatus.yesterdayTasks.length > 0;
  const [step, setStep] = useState<"tasks" | "feeling" | "submitting">(hasPendingYesterday ? "tasks" : "feeling");
  const [feeling, setFeeling] = useState("");
  const [taskStatuses, setTaskStatuses] = useState<Record<number, string>>(
    Object.fromEntries(dailyStatus.yesterdayTasks.map(t => [t.id, t.status === "pending" ? "done" : t.status]))
  );
  const [error, setError] = useState("");

  async function submit() {
    if (!feeling) { setError("Tell us how you're feeling today."); return; }
    setStep("submitting");
    const isSick = feeling === "sick";
    const taskUpdates = Object.entries(taskStatuses).map(([id, status]) => ({ taskId: parseInt(id), status }));
    try {
      const r = await fetch("/api/6ps/daily/checkin", {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({ feeling, taskUpdates, isSickDay: isSick }),
      });
      const data = await r.json();
      if (data.success) onComplete(data.briefing, data.isSickDay, data.energyScore);
      else { setError("Check-in failed. Try again."); setStep("feeling"); }
    } catch { setError("Network error. Try again."); setStep("feeling"); }
  }

  const totalSteps = hasPendingYesterday ? 2 : 1;
  const currentStep = step === "tasks" ? 1 : totalSteps;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="border-b border-slate-800 px-6 py-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-bold text-white">Daily Check-In</h2>
            <span className="text-xs text-slate-600">{currentStep} / {totalSteps}</span>
          </div>
          <p className="text-xs text-slate-500">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
        <div className="px-6 py-5">

          {step === "tasks" && (
            <div>
              <p className="text-sm font-semibold text-white mb-1">How did yesterday go?</p>
              <p className="text-xs text-slate-500 mb-4">Mark each task honestly.</p>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1 mb-5">
                {dailyStatus.yesterdayTasks.map(task => (
                  <div key={task.id} className="bg-slate-800/60 rounded-lg px-4 py-3">
                    <p className="text-xs text-white font-medium mb-2 leading-snug">{task.title}</p>
                    <div className="flex gap-2">
                      {STATUS_OPTIONS.map(opt => (
                        <button key={opt.value}
                          onClick={() => setTaskStatuses(prev => ({ ...prev, [task.id]: opt.value }))}
                          className={`flex-1 py-1.5 rounded text-xs font-medium border transition-all ${
                            taskStatuses[task.id] === opt.value
                              ? opt.value === "done"    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                              : opt.value === "partial" ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                              :                          "bg-red-500/20 border-red-500/50 text-red-400"
                              : "bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600"
                          }`}>{opt.label}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep("feeling")}
                className="w-full bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-lg py-3 text-sm transition-colors">
                Next →
              </button>
            </div>
          )}

          {step === "feeling" && (
            <div>
              <p className="text-sm font-semibold text-white mb-1">How are you feeling today?</p>
              <p className="text-xs text-slate-500 mb-4">This adjusts your day's plan.</p>
              <div className="space-y-2 mb-5">
                {FEELING_OPTIONS.map(opt => (
                  <button key={opt.value} onClick={() => setFeeling(opt.value)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${
                      feeling === opt.value
                        ? opt.value === "great" ? "bg-emerald-500/10 border-emerald-500/40 text-white"
                        : opt.value === "good"  ? "bg-blue-500/10 border-blue-500/40 text-white"
                        : opt.value === "off"   ? "bg-amber-500/10 border-amber-500/40 text-white"
                        :                         "bg-red-500/10 border-red-500/40 text-white"
                        : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600"
                    }`}>
                    <span className="text-lg">{opt.emoji}</span>
                    <span className="text-sm font-medium">{opt.label}</span>
                    {feeling === opt.value && <span className="ml-auto text-xs opacity-60">✓</span>}
                  </button>
                ))}
              </div>
              {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
              <div className="flex gap-3">
                {hasPendingYesterday && (
                  <button onClick={() => setStep("tasks")} className="px-4 py-3 rounded-lg border border-slate-700 text-slate-400 text-sm hover:border-slate-600 transition-colors">Back</button>
                )}
                <button onClick={submit} disabled={!feeling}
                  className="flex-1 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold rounded-lg py-3 text-sm transition-colors">
                  Get My Day's Plan →
                </button>
              </div>
            </div>
          )}

          {step === "submitting" && (
            <div className="py-8 text-center">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-400">Building your daily briefing…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Briefing Card ────────────────────────────────────────────────────────────

function BriefingCard({ briefing, energyScore, isSickDay, streak }: {
  briefing: string; energyScore: number; isSickDay: boolean; streak: StreakData | null;
}) {
  const energyLabel = energyScore >= 8 ? "High energy" : energyScore >= 6 ? "Good energy" : energyScore >= 4 ? "Low energy" : "Rest day";
  const energyColor = energyScore >= 8 ? "text-emerald-400" : energyScore >= 6 ? "text-blue-400" : energyScore >= 4 ? "text-amber-400" : "text-red-400";
  return (
    <div className={`rounded-xl border p-5 mb-6 ${isSickDay ? "bg-red-500/5 border-red-500/20" : "bg-orange-500/5 border-orange-500/20"}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Today's Briefing</p>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium ${energyColor}`}>{energyLabel}</span>
          {streak && streak.currentStreak > 0 && <span className="text-xs text-amber-400">🔥 {streak.currentStreak} day streak</span>}
        </div>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">{briefing}</p>
    </div>
  );
}

// ─── Today Task List ──────────────────────────────────────────────────────────

function TodayTaskList({ tasks, onStatusChange }: { tasks: Task[]; onStatusChange: (id: number, s: string) => void }) {
  if (tasks.length === 0) return <div className="text-center py-8 text-slate-600 text-sm">No tasks scheduled for today.</div>;
  const done = tasks.filter(t => t.status === "done" || t.status === "partial").length;
  const pct = Math.round((done / tasks.length) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Tasks</p>
        <span className="text-xs text-slate-500">{done}/{tasks.length} · {pct}%</span>
      </div>
      <div className="h-1 bg-slate-800 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id} className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
            task.status === "done" ? "bg-emerald-500/5 border-emerald-500/20 opacity-60" :
            task.status === "partial" ? "bg-amber-500/5 border-amber-500/20" :
            "bg-slate-800/50 border-slate-700/50"
          }`}>
            <div className="flex gap-1 flex-shrink-0 mt-0.5">
              {(["done","partial","missed"] as const).map(s => (
                <button key={s} onClick={() => onStatusChange(task.id, task.status === s ? "pending" : s)} title={s}
                  className={`w-5 h-5 rounded border text-xs transition-all flex items-center justify-center ${
                    task.status === s
                      ? s === "done" ? "bg-emerald-500 border-emerald-500 text-black"
                      : s === "partial" ? "bg-amber-500 border-amber-500 text-black"
                      : "bg-red-500 border-red-500 text-black"
                      : "border-slate-700 text-slate-700 hover:border-slate-500"
                  }`}>
                  {s === "done" ? "✓" : s === "partial" ? "~" : "×"}
                </button>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium leading-snug ${task.status === "done" ? "line-through text-slate-600" : "text-white"}`}>{task.title}</p>
              {task.estimatedMinutes && <p className="text-xs text-slate-600 mt-0.5">{task.estimatedMinutes}min</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function SixPSDashboard() {
  const { user, logout } = useAuth();
  const [onboardingDone, setOnboardingDone] = useState(user?.onboardingComplete ?? false);
  const [dailyStatus, setDailyStatus] = useState<DailyStatus | null>(null);
  const [currentWeek, setCurrentWeek] = useState<Week | null>(null);
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [briefing, setBriefing] = useState<string | null>(null);
  const [energyScore, setEnergyScore] = useState(7);
  const [isSickDay, setIsSickDay] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);
  const [scheduleReady, setScheduleReady] = useState(false);
  const [scheduleGenerating, setScheduleGenerating] = useState(false);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"today"|"week"|"schedule">("today");

  const loadDashboard = useCallback(async () => {
    try {
      const sr = await fetch("/api/6ps/schedule/status", { credentials: "include" });
      const sd = await sr.json();
      const hasSchedule = sd.success && sd.weeksGenerated > 0;
      setScheduleReady(hasSchedule);

      if (hasSchedule) {
        const wr = await fetch("/api/6ps/schedule/current-week", { credentials: "include" });
        const wd = await wr.json();
        if (wd.success && wd.currentWeek) {
          setCurrentWeek(wd.currentWeek);
          setTodayTasks(wd.tasks.filter((t: Task) => t.taskDate === wd.today));
        }
        const dr = await fetch("/api/6ps/daily/status", { credentials: "include" });
        const dd = await dr.json();
        if (dd.success) {
          setDailyStatus(dd);
          setStreak(dd.streak);
          if (!dd.checkedInToday) {
            setShowCheckin(true);
          } else if (dd.todayLog?.aiAnalysis) {
            setBriefing(dd.todayLog.aiAnalysis);
            const ans = dd.todayLog.checkInAnswers ? JSON.parse(dd.todayLog.checkInAnswers) : {};
            setIsSickDay(ans.isSickDay ?? false);
            setEnergyScore(dd.todayLog.energyScore ?? 7);
            const br = await fetch("/api/6ps/daily/briefing", { credentials: "include" });
            const bd = await br.json();
            if (bd.success && bd.todayTasks) setTodayTasks(bd.todayTasks);
          }
        }
      } else {
        await fetch("/api/6ps/schedule/generate", { method: "POST", credentials: "include" });
        setScheduleGenerating(true);
        const interval = setInterval(async () => {
          const r = await fetch("/api/6ps/schedule/status", { credentials: "include" });
          const d = await r.json();
          if (d.success && d.complete) {
            clearInterval(interval);
            setScheduleGenerating(false);
            setScheduleReady(true);
            loadDashboard();
          }
        }, 4000);
        setTimeout(() => clearInterval(interval), 5 * 60 * 1000);
      }
    } catch (e) { console.error("[dashboard]", e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (onboardingDone) loadDashboard(); }, [onboardingDone, loadDashboard]);

  function handleCheckinComplete(newBriefing: string, sick: boolean, energy: number) {
    setBriefing(newBriefing); setIsSickDay(sick); setEnergyScore(energy);
    setShowCheckin(false); loadDashboard();
  }

  async function handleTaskStatus(taskId: number, status: string) {
    setTodayTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
    await fetch(`/api/6ps/daily/task/${taskId}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include",
      body: JSON.stringify({ status }),
    });
  }

  if (!onboardingDone) return <SixPSWizard onComplete={() => setOnboardingDone(true)} />;

  const todayLabel = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Nav */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <a href="/" className="font-bold text-white text-sm hover:text-orange-400 transition-colors">Subharaj Das</a>
          <span className="text-slate-700">/</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
              <span className="text-black font-black text-xs">6P</span>
            </div>
            <span className="text-sm font-semibold">6 Point Someone</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-xs text-slate-500 hover:text-white transition-colors hidden sm:block">Home</a>
          <a href="/#experience" className="text-xs text-slate-500 hover:text-white transition-colors hidden sm:block">Know Subharaj</a>
          <a href="/#contact" className="text-xs bg-orange-500 hover:bg-orange-400 text-black font-semibold px-3 py-1.5 rounded-lg transition-colors hidden sm:block">Work With Me</a>
          <button onClick={logout} className="text-xs text-slate-500 hover:text-red-400 transition-colors">Sign out</button>
        </div>
      </header>

      {showCheckin && dailyStatus && (
        <CheckInModal dailyStatus={dailyStatus} onComplete={handleCheckinComplete} />
      )}

      {loading && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500">Loading your command centre…</p>
          </div>
        </div>
      )}

      {!loading && scheduleGenerating && (
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-lg font-bold mb-2">Building Your Schedule</h2>
          <p className="text-sm text-slate-400 mb-2">AI is generating your week-by-week roadmap. Takes 2–3 minutes.</p>
          <p className="text-xs text-slate-600">Page will update automatically.</p>
        </div>
      )}

      {!loading && !scheduleGenerating && (
        <main className="max-w-3xl mx-auto px-6 py-8">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">{greeting}, {user?.name?.split(" ")[0]}</h1>
              <p className="text-xs text-slate-500 mt-0.5">{todayLabel}</p>
            </div>
            <div className="flex items-center gap-4">
              {streak && streak.currentStreak > 0 && (
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-amber-400 font-semibold">🔥 {streak.currentStreak} days</p>
                  <p className="text-xs text-slate-600">active streak</p>
                </div>
              )}
              {currentWeek && (
                <div className="text-right">
                  <p className="text-xs text-orange-400 font-semibold">Week {currentWeek.weekNumber}</p>
                  <p className="text-xs text-slate-600">{currentWeek.phase ?? "Foundation"}</p>
                </div>
              )}
            </div>
          </div>

          {briefing && <BriefingCard briefing={briefing} energyScore={energyScore} isSickDay={isSickDay} streak={streak} />}

          {!briefing && scheduleReady && !showCheckin && (
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-5 mb-6">
              <p className="text-sm font-semibold text-white mb-1">Start your day</p>
              <p className="text-xs text-slate-400 mb-4">Complete your daily check-in to get your briefing and tasks.</p>
              <button onClick={() => setShowCheckin(true)}
                className="bg-orange-500 hover:bg-orange-400 text-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
                Start Check-In →
              </button>
            </div>
          )}

          {!scheduleReady && !scheduleGenerating && (
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-6 text-center">
              <p className="text-sm font-semibold text-white mb-2">No schedule yet</p>
              <p className="text-xs text-slate-500 mb-4">Complete the goal setup wizard to generate your schedule.</p>
              <button onClick={() => setOnboardingDone(false)}
                className="bg-orange-500 hover:bg-orange-400 text-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
                Set Up Goals →
              </button>
            </div>
          )}

          {scheduleReady && (
            <>
              <div className="flex border-b border-slate-800 mb-5">
                {(["today","week","schedule"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                      activeTab === tab ? "border-orange-500 text-orange-400" : "border-transparent text-slate-600 hover:text-slate-400"
                    }`}>
                    {tab === "today" ? "Today" : tab === "week" ? "This Week" : "Schedule"}
                  </button>
                ))}
              </div>

              {activeTab === "today" && <TodayTaskList tasks={todayTasks} onStatusChange={handleTaskStatus} />}

              {activeTab === "week" && currentWeek && (
                <div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Week {currentWeek.weekNumber}</p>
                        <h3 className="text-base font-bold">{currentWeek.theme ?? "Focus Week"}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{currentWeek.startDate} → {currentWeek.endDate}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full border ${
                        currentWeek.phase === "Foundation" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                        currentWeek.phase === "Build"      ? "bg-amber-500/10 border-amber-500/30 text-amber-400" :
                        currentWeek.phase === "Accelerate" ? "bg-orange-500/10 border-orange-500/30 text-orange-400" :
                                                              "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      }`}>{currentWeek.phase ?? "Foundation"}</span>
                    </div>
                    {currentWeek.totalHoursPlanned && (
                      <p className="text-xs text-slate-600">{currentWeek.totalHoursPlanned}h planned this week</p>
                    )}
                  </div>
                  <TodayTaskList tasks={todayTasks} onStatusChange={handleTaskStatus} />
                </div>
              )}

              {activeTab === "schedule" && (
                <a href="/6pointsomeone/schedule"
                  className="flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl p-5 transition-colors group">
                  <div>
                    <p className="text-sm font-semibold text-white">Full Weekly Roadmap →</p>
                    <p className="text-xs text-slate-500 mt-0.5">All weeks, all tasks, full schedule view</p>
                  </div>
                  <span className="text-slate-500 group-hover:text-orange-400 transition-colors text-xl">›</span>
                </a>
              )}
            </>
          )}

          <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
            <button onClick={() => setOnboardingDone(false)} className="text-xs text-slate-700 hover:text-orange-400 transition-colors">
              ↺ Redo goal setup
            </button>
            {briefing && (
              <button onClick={() => setShowCheckin(true)} className="text-xs text-slate-700 hover:text-slate-400 transition-colors">
                Redo check-in
              </button>
            )}
          </div>
        </main>
      )}
    </div>
  );
}
