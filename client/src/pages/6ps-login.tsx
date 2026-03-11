import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

type Mode = "login" | "signup";

export default function SixPSLogin() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (mode === "login") {
      const result = await login(email, password);
      if (!result.success) setError(result.message || "Login failed.");
    } else {
      const result = await signup(name, email, password);
      if (result.success) setSignupSuccess(true);
      else setError(result.message || "Sign up failed.");
    }
    setLoading(false);
  }

  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <SiteNav />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">Account created</h2>
            <p className="text-slate-400 text-sm mb-6">
              You're on the list. 6 Point Someone is launching soon — we'll let you know when it's ready.
            </p>
            <button
              onClick={() => { setSignupSuccess(false); setMode("login"); }}
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <SiteNav />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
                <span className="text-black font-black text-sm">6P</span>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">6 Point Someone</span>
            </div>
            <p className="text-slate-500 text-sm">
              {mode === "login" ? "Welcome back." : "Create your account."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>
            )}
            <div>
              <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={mode === "signup" ? 6 : undefined}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-lg py-3 text-sm transition-colors mt-2"
            >
              {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            {mode === "login" ? (
              <>Don't have an account?{" "}
                <button onClick={() => { setMode("signup"); setError(""); }} className="text-orange-400 hover:text-orange-300 transition-colors">Sign up</button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button onClick={() => { setMode("login"); setError(""); }} className="text-orange-400 hover:text-orange-300 transition-colors">Sign in</button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function SiteNav() {
  return (
    <nav className="w-full z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/favicon.ico" alt="" className="w-7 h-7 rounded-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <a href="/" className="font-bold text-lg text-white hover:text-orange-400 transition-colors">Subharaj Das</a>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-slate-300 hover:text-white text-sm transition-colors">Home</a>
          <a href="/#experience" className="text-slate-300 hover:text-white text-sm transition-colors">Know Subharaj</a>
          <a href="/#craftpost" className="text-slate-300 hover:text-white text-sm transition-colors">CraftPost</a>
          <a href="/6pointsomeone" className="text-orange-400 text-sm font-medium">6 Point Someone</a>
          <a href="/#tools" className="text-slate-300 hover:text-white text-sm transition-colors">Tools</a>
          <a href="/#contact" className="bg-orange-500 hover:bg-orange-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition-colors">Work With Me</a>
        </div>
      </div>
    </nav>
  );
}
