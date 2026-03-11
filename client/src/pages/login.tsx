import { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import SiteNav from "@/components/site-nav";
import Footer from "@/components/footer";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <SiteNav />
      <main className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>

        <div className="relative z-10 w-full max-w-md px-6">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src="/logo.jpg" alt="Subharaj Das" className="w-14 h-14 rounded-full object-cover shadow-[0_0_20px_rgba(249,115,22,0.3)]" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
              Login
            </h1>
            <p className="text-slate-400 text-sm">Access restricted. Will be launched soon.</p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8">
            <div className="space-y-5">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-slate-900/60 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-slate-900/60 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-lg pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-400 hover:to-orange-500 transition-all duration-200 shadow-[0_4px_20px_rgba(249,115,22,0.3)] mt-2"
              >
                Login
              </button>
            </div>

            <p className="text-center text-slate-500 text-xs mt-6">
              Need access?{" "}
              <a href="mailto:subharaj@subharajdas.com" className="text-orange-400 hover:text-orange-300 transition-colors">
                subharaj@subharajdas.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
