import { useAuth } from "@/hooks/use-auth";

export default function SixPSLaunchingSoon() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mx-auto mb-8">
          <span className="text-black font-black text-xl">6P</span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">
          6PointSomething is coming.
        </h1>

        <p className="text-[#666] text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          You're in. We're putting the finishing touches on the system — goal intelligence, daily loops, the full operating rhythm. You'll get access as soon as it's ready.
        </p>

        {/* Status dots */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex items-center gap-1.5 text-xs text-[#555]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            Goal engine
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#555]">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></div>
            Daily loop
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#555]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#333]"></div>
            CompoundSelf
          </div>
        </div>

        {/* User info + logout */}
        <div className="border-t border-[#1a1a1a] pt-6">
          <p className="text-xs text-[#444] mb-3">
            Signed in as <span className="text-[#666]">{user?.email}</span>
          </p>
          <button
            onClick={logout}
            className="text-xs text-[#555] hover:text-[#888] transition-colors"
          >
            Sign out
          </button>
        </div>

      </div>
    </div>
  );
}
