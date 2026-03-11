import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import SixPSWizard from "@/pages/6ps-wizard";

export default function SixPSDashboard() {
  const { user, logout } = useAuth();
  const [onboardingDone, setOnboardingDone] = useState(user?.onboardingComplete ?? false);

  // Route to wizard if onboarding not complete
  if (!onboardingDone) {
    return <SixPSWizard onComplete={() => setOnboardingDone(true)} />;
  }

  const phases = [
    { number: 1, name: "Schema + Auth", status: "done" },
    { number: 2, name: "Goal Setup Wizard", status: "done" },
    { number: 3, name: "Weekly Schedule Engine", status: "pending" },
    { number: 4, name: "Daily Intelligence Loop", status: "pending" },
    { number: 5, name: "Special Day Management", status: "pending" },
    { number: 6, name: "Tracker + Downloads", status: "pending" },
    { number: 7, name: "CompoundSelf + Admin", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
            <span className="text-black font-black text-xs">6P</span>
          </div>
          <span className="font-semibold text-sm tracking-tight">6 Point Someone</span>
          <span className="text-slate-600 text-xs ml-1">/ Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">{user?.email}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
            {user?.role}
          </span>
          <button onClick={logout} className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-2">Phase 2 complete. ✓</h1>
          <p className="text-slate-400 text-sm">Goal Setup Wizard is live. Goals analysed. Schedule configured.</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-8">
          <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-5">Build Progress</h2>
          <div className="space-y-3">
            {phases.map((phase) => (
              <div key={phase.number} className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  phase.status === "done"
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                    : "bg-slate-800 border border-slate-700 text-slate-600"
                }`}>
                  {phase.status === "done" ? "✓" : phase.number}
                </div>
                <span className={`text-sm ${phase.status === "done" ? "text-white" : "text-slate-600"}`}>
                  {phase.name}
                </span>
                {phase.status === "done" && (
                  <span className="ml-auto text-xs text-emerald-500/60">Live</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setOnboardingDone(false)}
            className="text-xs text-slate-600 hover:text-orange-400 transition-colors"
          >
            ↺ Redo goal setup
          </button>
          <p className="text-xs text-slate-600 mt-4">
            Say <span className="text-orange-400 font-mono">"start phase 3"</span> to build the Weekly Schedule Engine.
          </p>
        </div>
      </main>
    </div>
  );
}
