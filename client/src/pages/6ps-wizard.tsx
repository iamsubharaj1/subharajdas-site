import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Goal {
  id?: number;
  title: string;
  isPrimary: boolean;
  priorityRank?: number;
  estimatedWeeks?: number;
  toughnessScore?: number;
}

interface Insight {
  id: number;
  book: string;
  tentacleNumber: number;
  insight: string;
}

interface GoalInsights {
  goalId: number;
  goalTitle: string;
  insights: Insight[];
  loading: boolean;
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            i + 1 < current ? "bg-emerald-500 text-black" :
            i + 1 === current ? "bg-orange-500 text-black" :
            "bg-slate-800 text-slate-500 border border-slate-700"
          }`}>
            {i + 1 < current ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-px w-6 ${i + 1 < current ? "bg-emerald-500" : "bg-slate-700"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Book badge ───────────────────────────────────────────────────────────────

const BOOK_COLORS: Record<number, string> = {
  1: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  2: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  3: "bg-orange-500/10 border-orange-500/30 text-orange-400",
  4: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  5: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  6: "bg-teal-500/10 border-teal-500/30 text-teal-400",
};

const BOOK_SHORT: Record<number, string> = {
  1: "Atomic Habits",
  2: "Dopamine Detox",
  3: "Eat That Frog",
  4: "Ikigai",
  5: "Naval Almanack",
  6: "Subconscious Mind",
};

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export default function SixPSWizard({ onComplete }: { onComplete: () => void }) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1 — goal input
  const [goalInputs, setGoalInputs] = useState<string[]>(["", "", ""]);

  // Step 2 — pick top 3
  const [allGoals, setAllGoals] = useState<Goal[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  // Step 3 — AI tentacles
  const [savedGoals, setSavedGoals] = useState<Goal[]>([]);
  const [goalInsights, setGoalInsights] = useState<GoalInsights[]>([]);
  const [currentInsightGoal, setCurrentInsightGoal] = useState(0);

  // Step 4 — time estimation review
  // (auto after step 3)

  // Step 5 — commitment type
  const [commitmentType, setCommitmentType] = useState<"fulltime" | "specific_hours">("fulltime");
  const [specificHours, setSpecificHours] = useState(6);

  // Step 6 — special days
  const [specialDayInputs, setSpecialDayInputs] = useState<{ fromDate: string; toDate: string; type: string; note: string }[]>([]);
  const [newFromDate, setNewFromDate] = useState("");
  const [newToDate, setNewToDate] = useState("");
  const [newType, setNewType] = useState("holiday");
  const [newNote, setNewNote] = useState("");
  const [skipSpecialDays, setSkipSpecialDays] = useState(false);

  // ── STEP 1 → 2: save goal list ───────────────────────────────────────────

  async function handleStep1Next() {
    const filled = goalInputs.filter(g => g.trim().length > 0);
    if (filled.length < 1) {
      setError("Enter at least one goal.");
      return;
    }
    const goals: Goal[] = filled.map(title => ({ title: title.trim(), isPrimary: false }));
    setAllGoals(goals);
    setSelectedIndices(filled.length <= 3 ? filled.map((_, i) => i) : []);
    setError("");
    setStep(2);
  }

  function addGoalInput() {
    setGoalInputs([...goalInputs, ""]);
  }

  function updateGoalInput(i: number, val: string) {
    const updated = [...goalInputs];
    updated[i] = val;
    setGoalInputs(updated);
  }

  function removeGoalInput(i: number) {
    setGoalInputs(goalInputs.filter((_, idx) => idx !== i));
  }

  // ── STEP 2 → 3: save goals to DB, start AI ───────────────────────────────

  async function handleStep2Next() {
    if (selectedIndices.length === 0) {
      setError("Select at least 1 goal as your primary focus.");
      return;
    }
    if (selectedIndices.length > 3) {
      setError("Select maximum 3 primary goals.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const goalTitles = allGoals.map(g => g.title);
      const r = await fetch("/api/6ps/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ goalTitles, primaryIds: selectedIndices }),
      });
      const data = await r.json();
      if (!data.success) throw new Error(data.message);

      const primaryGoals = data.goals.filter((g: any) => g.isPrimary);
      setSavedGoals(primaryGoals);

      // Init insight state for each primary goal
      setGoalInsights(primaryGoals.map((g: any) => ({
        goalId: g.id,
        goalTitle: g.title,
        insights: [],
        loading: false,
      })));

      setStep(3);
      // Auto-start first goal's insights
      setTimeout(() => runInsightsForGoal(0, primaryGoals), 100);
    } catch (e: any) {
      setError(e.message || "Failed to save goals.");
    } finally {
      setLoading(false);
    }
  }

  function toggleGoalSelection(i: number) {
    if (selectedIndices.includes(i)) {
      setSelectedIndices(selectedIndices.filter(s => s !== i));
    } else {
      if (selectedIndices.length >= 3) {
        setError("You can select maximum 3 primary goals.");
        return;
      }
      setSelectedIndices([...selectedIndices, i]);
    }
    setError("");
  }

  // ── STEP 3: run AI tentacles ─────────────────────────────────────────────

  async function runInsightsForGoal(idx: number, goals: Goal[]) {
    if (idx >= goals.length) return;
    const goal = goals[idx];
    setCurrentInsightGoal(idx);

    setGoalInsights(prev => prev.map((gi, i) =>
      i === idx ? { ...gi, loading: true } : gi
    ));

    try {
      const r = await fetch(`/api/6ps/goals/${goal.id}/insights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await r.json();

      setGoalInsights(prev => prev.map((gi, i) =>
        i === idx ? { ...gi, insights: data.insights || [], loading: false } : gi
      ));

      // Auto-start next goal
      if (idx + 1 < goals.length) {
        setTimeout(() => runInsightsForGoal(idx + 1, goals), 500);
      }
    } catch {
      setGoalInsights(prev => prev.map((gi, i) =>
        i === idx ? { ...gi, loading: false } : gi
      ));
    }
  }

  function allInsightsDone() {
    return goalInsights.length > 0 && goalInsights.every(gi => !gi.loading && gi.insights.length > 0);
  }

  // ── STEP 5: save schedule ────────────────────────────────────────────────

  async function handleStep5Next() {
    setLoading(true);
    try {
      await fetch("/api/6ps/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          commitmentType,
          dailyHoursWeekday: commitmentType === "fulltime" ? 9.5 : specificHours,
          dailyHoursSaturday: commitmentType === "fulltime" ? 3.0 : Math.min(specificHours, 3),
        }),
      });
      setStep(6);
    } catch {
      setError("Failed to save schedule.");
    } finally {
      setLoading(false);
    }
  }

  // ── STEP 6: save special days ────────────────────────────────────────────

  function addSpecialDay() {
    if (!newFromDate) { setError("Select a start date."); return; }
    const to = newToDate || newFromDate;
    setSpecialDayInputs([...specialDayInputs, { fromDate: newFromDate, toDate: to, type: newType, note: newNote }]);
    setNewFromDate("");
    setNewToDate("");
    setNewNote("");
    setError("");
  }

  function removeSpecialDay(i: number) {
    setSpecialDayInputs(specialDayInputs.filter((_, idx) => idx !== i));
  }

  async function handleStep6Next() {
    if (skipSpecialDays) { setStep(7); return; }
    setLoading(true);
    try {
      if (specialDayInputs.length > 0) {
        // Expand date ranges into individual days
        const expandedDays: { date: string; type: string; note?: string }[] = [];
        for (const entry of specialDayInputs) {
          const start = new Date(entry.fromDate);
          const end = new Date(entry.toDate);
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            expandedDays.push({
              date: d.toISOString().split("T")[0],
              type: entry.type,
              note: entry.note || undefined,
            });
          }
        }
        await fetch("/api/6ps/special-days", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ days: expandedDays }),
        });
      }
      setStep(7);
    } catch {
      setError("Failed to save special days.");
    } finally {
      setLoading(false);
    }
  }

  // ── STEP 7: complete onboarding ──────────────────────────────────────────

  async function handleComplete() {
    setLoading(true);
    try {
      await fetch("/api/6ps/onboarding/complete", {
        method: "POST",
        credentials: "include",
      });
      onComplete();
    } catch {
      setError("Failed to complete setup.");
    } finally {
      setLoading(false);
    }
  }

  // ── RENDER ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
            <span className="text-black font-black text-xs">6P</span>
          </div>
          <span className="font-semibold text-sm tracking-tight">6 Point Someone</span>
          <span className="text-slate-600 text-xs ml-1">/ Goal Setup</span>
        </div>
        <span className="text-xs text-slate-600">{user?.name}</span>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <StepIndicator current={step} total={7} />

        {/* ── STEP 1: Enter all goals ── */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold mb-2">What are your goals?</h1>
            <p className="text-slate-400 text-sm mb-8">Write every goal you're working toward. You'll pick your top 3 in the next step.</p>

            <div className="space-y-3 mb-6">
              {goalInputs.map((val, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => updateGoalInput(i, e.target.value)}
                    placeholder={`Goal ${i + 1}…`}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                  {goalInputs.length > 1 && (
                    <button
                      onClick={() => removeGoalInput(i)}
                      className="w-10 h-10 mt-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-500 hover:text-red-400 hover:border-red-500/30 transition-colors flex items-center justify-center text-lg"
                    >×</button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addGoalInput}
              className="text-sm text-orange-400 hover:text-orange-300 transition-colors mb-8 flex items-center gap-1"
            >
              <span className="text-lg leading-none">+</span> Add another goal
            </button>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <button
              onClick={handleStep1Next}
              className="w-full bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-lg py-3 text-sm transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── STEP 2: Pick top 3 ── */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold mb-2">Pick your top {allGoals.length > 3 ? "3" : ""} focus goals</h1>
            <p className="text-slate-400 text-sm mb-8">
              {allGoals.length <= 3
                ? "Confirm which goals you want to focus on. The AI will analyse each one."
                : "Select up to 3 goals to focus on right now. The AI will run deep analysis on each one."}
            </p>

            <div className="space-y-3 mb-8">
              {allGoals.map((goal, i) => {
                const selected = selectedIndices.includes(i);
                const rank = selectedIndices.indexOf(i) + 1;
                return (
                  <button
                    key={i}
                    onClick={() => toggleGoalSelection(i)}
                    className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${
                      selected
                        ? "bg-orange-500/10 border-orange-500/40 text-white"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        selected ? "bg-orange-500 text-black" : "bg-slate-800 text-slate-500 border border-slate-600"
                      }`}>
                        {selected ? rank : i + 1}
                      </div>
                      <span className="text-sm">{goal.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-slate-500 mb-6">{selectedIndices.length} / {Math.min(allGoals.length, 3)} selected</p>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 rounded-lg border border-slate-700 text-slate-400 text-sm hover:border-slate-600 hover:text-white transition-colors">
                Back
              </button>
              <button
                onClick={handleStep2Next}
                disabled={loading || selectedIndices.length === 0}
                className="flex-1 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-semibold rounded-lg py-3 text-sm transition-colors"
              >
                {loading ? "Saving…" : "Run 6-Tentacle Analysis →"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: AI tentacles running ── */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-bold mb-2">Running 6-Tentacle Analysis</h1>
            <p className="text-slate-400 text-sm mb-8">
              For each goal, AI is applying 6 book frameworks simultaneously. This takes 30–60 seconds.
            </p>

            <div className="space-y-6 mb-8">
              {goalInsights.map((gi, gIdx) => (
                <div key={gi.goalId} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      gi.loading ? "bg-orange-500 animate-pulse" :
                      gi.insights.length > 0 ? "bg-emerald-500" : "bg-slate-700"
                    }`} />
                    <h3 className="text-sm font-semibold text-white">{gi.goalTitle}</h3>
                    {gi.loading && <span className="text-xs text-slate-500 ml-auto">Analysing…</span>}
                    {!gi.loading && gi.insights.length > 0 && (
                      <span className="text-xs text-emerald-500/60 ml-auto">✓ Done</span>
                    )}
                    {!gi.loading && gi.insights.length === 0 && gIdx > currentInsightGoal && (
                      <span className="text-xs text-slate-600 ml-auto">Queued</span>
                    )}
                  </div>

                  {gi.insights.length > 0 && (
                    <div className="space-y-3">
                      {gi.insights.map((ins) => (
                        <div key={ins.id} className="flex gap-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 mt-0.5 ${BOOK_COLORS[ins.tentacleNumber]}`}>
                            T{ins.tentacleNumber}
                          </span>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">{BOOK_SHORT[ins.tentacleNumber]}</p>
                            <p className="text-xs text-slate-400 leading-relaxed">{ins.insight}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {gi.loading && (
                    <div className="space-y-2 mt-2">
                      {[1,2,3,4,5,6].map(n => (
                        <div key={n} className="flex gap-3 items-center">
                          <div className="w-8 h-4 rounded-full bg-slate-800 animate-pulse" />
                          <div className="flex-1 h-3 rounded bg-slate-800 animate-pulse" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <button
              disabled={!allInsightsDone()}
              onClick={async () => {
                // Re-fetch goals to get AI-populated estimatedWeeks + toughnessScore
                const r = await fetch("/api/6ps/goals", { credentials: "include" });
                const d = await r.json();
                if (d.success) setSavedGoals(d.goals.filter((g: any) => g.isPrimary));
                setStep(4);
              }}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-semibold rounded-lg py-3 text-sm transition-colors"
            >
              {allInsightsDone() ? "Review Time Estimates →" : "Analysing goals…"}
            </button>
          </div>
        )}

        {/* ── STEP 4: Time estimation review ── */}
        {step === 4 && (
          <div>
            <h1 className="text-2xl font-bold mb-2">AI Time Estimates</h1>
            <p className="text-slate-400 text-sm mb-8">
              Based on goal complexity, the AI has estimated how many weeks of focused work each goal requires. You can adjust in Settings later.
            </p>

            <div className="space-y-4 mb-8">
              {goalInsights.map((gi) => {
                const goal = savedGoals.find(g => g.id === gi.goalId);
                return (
                  <div key={gi.goalId} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-3">{gi.goalTitle}</h3>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Estimated weeks</p>
                        <p className="text-2xl font-bold text-orange-400">{goal?.estimatedWeeks ?? "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Toughness</p>
                        <p className="text-2xl font-bold text-white">{goal?.toughnessScore ?? "—"}<span className="text-sm text-slate-500">/10</span></p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="px-6 py-3 rounded-lg border border-slate-700 text-slate-400 text-sm hover:border-slate-600 hover:text-white transition-colors">
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-lg py-3 text-sm transition-colors"
              >
                Set Your Schedule →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 5: Commitment type ── */}
        {step === 5 && (
          <div>
            <h1 className="text-2xl font-bold mb-2">How are you working on this?</h1>
            <p className="text-slate-400 text-sm mb-8">This determines how tasks are distributed across your week.</p>

            <div className="space-y-3 mb-8">
              <button
                onClick={() => setCommitmentType("fulltime")}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                  commitmentType === "fulltime"
                    ? "bg-orange-500/10 border-orange-500/40"
                    : "bg-slate-800 border-slate-700 hover:border-slate-600"
                }`}
              >
                <p className="text-sm font-semibold text-white mb-1">Full-time focus</p>
                <p className="text-xs text-slate-400">Mon–Fri 10am–7:30pm (9.5 hrs) · Sat 3 hrs · Sun off</p>
              </button>

              <button
                onClick={() => setCommitmentType("specific_hours")}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                  commitmentType === "specific_hours"
                    ? "bg-orange-500/10 border-orange-500/40"
                    : "bg-slate-800 border-slate-700 hover:border-slate-600"
                }`}
              >
                <p className="text-sm font-semibold text-white mb-1">Specific hours per day</p>
                <p className="text-xs text-slate-400">You choose how many hours. Distributed Mon–Sat.</p>
              </button>
            </div>

            {commitmentType === "specific_hours" && (
              <div className="mb-8">
                <label className="block text-xs text-slate-400 mb-2 uppercase tracking-wider">Hours per day</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1} max={12} step={0.5}
                    value={specificHours}
                    onChange={(e) => setSpecificHours(parseFloat(e.target.value))}
                    className="flex-1 accent-orange-500"
                  />
                  <span className="text-white font-bold w-12 text-center">{specificHours}h</span>
                </div>
              </div>
            )}

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <div className="flex gap-3">
              <button onClick={() => setStep(4)} className="px-6 py-3 rounded-lg border border-slate-700 text-slate-400 text-sm hover:border-slate-600 hover:text-white transition-colors">
                Back
              </button>
              <button
                onClick={handleStep5Next}
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-semibold rounded-lg py-3 text-sm transition-colors"
              >
                {loading ? "Saving…" : "Continue →"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 6: Special days ── */}
        {step === 6 && (
          <div>
            <h1 className="text-2xl font-bold mb-2">Mark known special days</h1>
            <p className="text-slate-400 text-sm mb-8">
              Add holidays, travel, or other days upfront. Tasks won't be assigned on travel/sick days. Holiday = 3 light hours. You can always add more later.
            </p>

            {/* Add day form */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 mb-5">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    value={newFromDate}
                    onChange={(e) => setNewFromDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500/50"
                  >
                    <option value="holiday">Holiday (3 hrs light)</option>
                    <option value="travel">Travel (0 tasks)</option>
                    <option value="sick">Sick (0 tasks, no penalty)</option>
                    <option value="catchup">Catch-up day</option>
                  </select>
                </div>
              </div>
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Note (optional)"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-orange-500/50 mb-3"
              />
              <button
                onClick={addSpecialDay}
                className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
              >
                <span className="text-lg leading-none">+</span> Add this day
              </button>
            </div>

            {/* Added days list */}
            {specialDayInputs.length > 0 && (
              <div className="space-y-2 mb-6">
                {specialDayInputs.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2.5">
                    <span className="text-xs text-slate-400 flex-shrink-0">{d.fromDate}{d.toDate !== d.fromDate ? ` → ${d.toDate}` : ""}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      d.type === "holiday" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" :
                      d.type === "travel" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                      "bg-purple-500/10 border-purple-500/30 text-purple-400"
                    }`}>{d.type}</span>
                    {d.note && <span className="text-xs text-slate-500 flex-1">{d.note}</span>}
                    <button onClick={() => removeSpecialDay(i)} className="text-slate-600 hover:text-red-400 transition-colors ml-auto text-lg leading-none">×</button>
                  </div>
                ))}
              </div>
            )}

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <div className="flex gap-3">
              <button onClick={() => setStep(5)} className="px-6 py-3 rounded-lg border border-slate-700 text-slate-400 text-sm hover:border-slate-600 hover:text-white transition-colors">
                Back
              </button>
              <button
                onClick={handleStep6Next}
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-semibold rounded-lg py-3 text-sm transition-colors"
              >
                {loading ? "Saving…" : "Continue →"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 7: Confirm ── */}
        {step === 7 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mx-auto mb-6">
                <span className="text-black font-black text-2xl">✓</span>
              </div>
              <h1 className="text-2xl font-bold mb-3">You're set up.</h1>
              <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                Your goals are analysed across 6 frameworks. Your schedule is configured. Phase 3 will generate your week-by-week roadmap.
              </p>
            </div>

            {/* Summary */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 mb-8">
              <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-4">Your primary goals</h3>
              <div className="space-y-2">
                {savedGoals.map((g, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-sm text-white">{g.title}</span>
                    {g.estimatedWeeks && (
                      <span className="ml-auto text-xs text-slate-500">{g.estimatedWeeks}w</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <button
              onClick={handleComplete}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-black font-semibold rounded-lg py-3 text-sm transition-colors"
            >
              {loading ? "Completing setup…" : "Enter 6 Point Someone →"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
