import { Mail } from "lucide-react";
import SiteNav from "@/components/site-nav";
import Footer from "@/components/footer";

interface LoginRequiredProps {
  pageName: string;
}

export default function LoginRequired({ pageName }: LoginRequiredProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <SiteNav />
      <main className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-6 max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <img src="/logo.jpg" alt="Subharaj Das" className="w-16 h-16 rounded-full object-cover shadow-[0_0_20px_rgba(249,115,22,0.3)]" />
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-3">
            {pageName}
          </h1>

          <p className="text-slate-300 text-lg mb-2">Login Required</p>

          <p className="text-slate-500 text-sm mb-8">
            Will be launched soon.
          </p>

          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-3">To request access, reach out at</p>
            <a
              href="mailto:subharaj@subharajdas.com"
              className="flex items-center justify-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              <span>subharaj@subharajdas.com</span>
            </a>
          </div>

          <a
            href="/login"
            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-400 hover:to-orange-500 transition-all duration-200 shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
          >
            Go to Login
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
