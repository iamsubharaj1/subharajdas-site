import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import SixPSLogin from "@/pages/6ps-login";
import SixPSDashboard from "@/pages/6ps-dashboard";
import SixPSLaunchingSoon from "@/pages/6ps-launching-soon";
import { useEffect } from "react";
import { initGA } from "@/lib/analytics";
import { useAnalytics } from "@/hooks/use-analytics";

// ─── 6PS route guard ──────────────────────────────────────────────────────────

function SixPSRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[#333] border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <SixPSLogin />;
  if (user.role === "superadmin") return <SixPSDashboard />;
  return <SixPSLaunchingSoon />;
}

// ─── Router ───────────────────────────────────────────────────────────────────

function Router() {
  useAnalytics();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/6pointsomething" component={SixPSRoute} />
      <Route path="/6ps" component={() => <Redirect to="/6pointsomething" />} />
      <Route component={NotFound} />
    </Switch>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn("Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID");
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
