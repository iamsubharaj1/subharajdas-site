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
      if (!result.success) {
        setError(result.message || "Login failed.");
      }
      // On success, App.tsx redirect handles navigation
    } else {
      const result = await signup(name, email, password);
      if (result.success) {
        setSignupSuccess(true);
      } else {
        setError(result.message || "Sign up failed.");
      }
    }
    setLoading(false);
  }

  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">Account created</h2>
          <p className="text-[#888] text-sm mb-6">
            You're on the list. 6PointSomething is launching soon — we'll let you know when it's ready.
          </p>
          <button
            onClick={() => { setSignupSuccess(false); setMode("login"); }}
            className="text-sm text-[#666] hover:text-white transition-colors"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo / wordmark */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center">
              <span className="text-black font-black text-sm">6P</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">6PointSomething</span>
          </div>
          <p className="text-[#666] text-sm">
            {mode === "login" ? "Welcome back." : "Create your account."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs text-[#666] mb-1.5 uppercase tracking-wider">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
                className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-xs text-[#666] mb-1.5 uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-[#666] mb-1.5 uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={mode === "signup" ? 6 : undefined}
              className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-orange-500/50 transition-colors"
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
            {loading
              ? "Please wait…"
              : mode === "login"
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-[#555] mt-6">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => { setMode("signup"); setError(""); }}
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => { setMode("login"); setError(""); }}
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                Sign in
              </button>
            </>
          )}
        </p>

        {/* Back to site */}
        <p className="text-center mt-8">
          <a href="/" className="text-xs text-[#444] hover:text-[#666] transition-colors">
            ← Back to subharajdas.com
          </a>
        </p>

      </div>
    </div>
  );
}
