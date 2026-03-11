import { useState, useEffect } from "react";
import { Bot, Zap, Users, BarChart3, FileSearch, Megaphone, Mail, Clock, DollarSign, CheckCircle, Send, ArrowRight, ChevronRight, TrendingUp, ShieldCheck } from "lucide-react";
import SiteNav from "@/components/site-nav";

// Accurate n8n workflow mockup — nodes based on real workflow patterns
function N8nMockup({ nodes, label }: { nodes: { label: string; color: string; type?: string }[]; label: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-[#1e1e2e]">
      {/* Title bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#161622] border-b border-slate-700/40">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
        </div>
        <span className="text-slate-500 text-[10px] font-mono truncate max-w-[160px]">{label}</span>
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-green-500 text-[9px] font-mono">active</span>
        </div>
      </div>
      {/* Canvas */}
      <div className="px-3 py-3 bg-[#1e1e2e]">
        <div className="flex items-center space-x-1 overflow-x-auto pb-0.5">
          {nodes.map((node, i) => (
            <div key={i} className="flex items-center flex-shrink-0">
              <div
                className="relative flex flex-col items-center"
                style={{ minWidth: "68px" }}
              >
                {/* Node box */}
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center shadow-lg border border-white/10 mb-1"
                  style={{ backgroundColor: node.color }}
                >
                  <span className="text-white text-[8px] font-bold text-center leading-tight px-0.5">{node.type || "⚙"}</span>
                </div>
                <span className="text-slate-400 text-[8px] text-center leading-tight truncate w-full px-0.5">{node.label}</span>
              </div>
              {i < nodes.length - 1 && (
                <div className="flex items-center mx-1 flex-shrink-0 mb-4">
                  <div className="w-4 h-px bg-slate-600"></div>
                  <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-t-transparent border-b-transparent border-l-slate-600"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 pb-2 flex items-center justify-between">
        <span className="text-slate-600 text-[9px] font-mono">{nodes.length} nodes</span>
        <span className="text-slate-600 text-[9px] font-mono">n8n workflow</span>
      </div>
    </div>
  );
}

const categories = [
  {
    icon: Bot,
    title: "AI Chatbots & Voice Agents",
    description: "WhatsApp, Telegram & web bots with memory, escalation flows, and human-in-the-loop approvals.",
    workflows: ["WhatsApp AI Customer Support", "Telegram Voice Bot (ElevenLabs)", "AI Voice Booking Agent", "HR Policy Chatbot"],
    nodes: [
      { label: "Webhook", color: "#e05b32", type: "🔗" },
      { label: "OpenAI", color: "#10a37f", type: "AI" },
      { label: "Memory", color: "#7c3aed", type: "🧠" },
      { label: "Router", color: "#475569", type: "⇄" },
      { label: "WhatsApp", color: "#25d366", type: "📱" },
      { label: "Respond", color: "#e05b32", type: "↩" },
    ],
    workflowLabel: "WhatsApp AI Support Agent.json",
  },
  {
    icon: Zap,
    title: "Lead Generation & Sales",
    description: "Automated pipelines from Apollo, Google Maps, and LinkedIn — straight to CRM with AI qualification.",
    workflows: ["Lead Gen via Apollo.io", "Google Maps Scraper", "AI Web Researcher for Sales", "LinkedIn Outreach Automation"],
    nodes: [
      { label: "Schedule", color: "#e05b32", type: "⏱" },
      { label: "Apollo", color: "#6366f1", type: "🎯" },
      { label: "AI Filter", color: "#10a37f", type: "AI" },
      { label: "Enrich", color: "#0ea5e9", type: "📊" },
      { label: "HubSpot", color: "#f97316", type: "CRM" },
      { label: "Slack", color: "#4a154b", type: "📢" },
    ],
    workflowLabel: "Lead Generation using Apollo.json",
  },
  {
    icon: Megaphone,
    title: "Content & Social Media",
    description: "From trend research to published post — LinkedIn, YouTube, Instagram, and WordPress on autopilot.",
    workflows: ["LinkedIn Post Generator (POSTMASTER)", "YouTube Trend Finder", "Social Media Autoposting", "WordPress AI Blog Creator"],
    nodes: [
      { label: "Trigger", color: "#e05b32", type: "⏱" },
      { label: "Perplexity", color: "#10a37f", type: "🔍" },
      { label: "GPT-4o", color: "#10a37f", type: "AI" },
      { label: "Telegram", color: "#0088cc", type: "✅" },
      { label: "LinkedIn", color: "#0077b5", type: "in" },
    ],
    workflowLabel: "The Best Linkedin Posting System.json",
  },
  {
    icon: Users,
    title: "HR & Recruitment",
    description: "AI CV screening, shortlisting, and onboarding flows that cut hiring ops time by 50–60%.",
    workflows: ["AI CV Analysis & Scoring", "Candidate Shortlisting", "Resume Analyzer", "Employee Onboarding System"],
    nodes: [
      { label: "Email", color: "#e05b32", type: "📧" },
      { label: "PDF Parse", color: "#7c3aed", type: "📄" },
      { label: "AI Score", color: "#10a37f", type: "AI" },
      { label: "Airtable", color: "#f59e0b", type: "🗂" },
      { label: "Notify", color: "#25d366", type: "📢" },
    ],
    workflowLabel: "AI Automated HR Workflow for CV Analysis.json",
  },
  {
    icon: BarChart3,
    title: "Operations & Meeting Intel",
    description: "Meeting summaries, next-steps extraction, invoice processing, and approval chains — all automated.",
    workflows: ["Meeting Next Steps (Fireflies)", "Monthly Invoice Summarizer", "Project Management + Airtable", "Expense Tracker Agent"],
    nodes: [
      { label: "Fireflies", color: "#e05b32", type: "🎙" },
      { label: "Transcript", color: "#475569", type: "📝" },
      { label: "GPT-4o", color: "#10a37f", type: "AI" },
      { label: "Notion", color: "#444", type: "📓" },
      { label: "Slack", color: "#4a154b", type: "📢" },
      { label: "Calendar", color: "#4285f4", type: "📅" },
    ],
    workflowLabel: "Actioning Your Meeting Next Steps using Transcripts and AI.json",
  },
  {
    icon: FileSearch,
    title: "Data Extraction & Research",
    description: "Vision-based scrapers, RAG agents, and stock analysis bots that turn raw data into structured insight.",
    workflows: ["Vision AI Scraper (Gemini)", "AI Web Research Agent", "Stock Earnings Analyzer", "Supabase RAG Agent"],
    nodes: [
      { label: "Webhook", color: "#e05b32", type: "🔗" },
      { label: "Jina AI", color: "#7c3aed", type: "🌐" },
      { label: "Gemini", color: "#4285f4", type: "AI" },
      { label: "Extract", color: "#10a37f", type: "⚙" },
      { label: "Sheets", color: "#34a853", type: "📊" },
    ],
    workflowLabel: "Vision-Based AI Agent Scraper - with Google Sheets, ScrapingBee, and Gemini.json",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Smart inbox management — AI triage, auto-responses, approval loops, and sentiment tagging.",
    workflows: ["AI Email Autoresponder + Approval", "Gmail Auto-Labelling (OpenAI)", "Outlook AI Categorisation", "Team of Email AI Agents"],
    nodes: [
      { label: "Gmail", color: "#ea4335", type: "📧" },
      { label: "AI Triage", color: "#10a37f", type: "AI" },
      { label: "Classify", color: "#7c3aed", type: "🏷" },
      { label: "Draft", color: "#475569", type: "✍" },
      { label: "Approve", color: "#f59e0b", type: "✅" },
      { label: "Send", color: "#ea4335", type: "📤" },
    ],
    workflowLabel: "AI-Powered Email Automation for Business.json",
  },
  {
    icon: ShieldCheck,
    title: "Customer Support",
    description: "AI-first support systems — ticket classification, RAG-powered answers, and escalation routing.",
    workflows: ["WooCommerce AI Support Agent", "AI Text Classifier for Issues", "Feedback Sentiment Analysis", "SIEM Alert Enrichment"],
    nodes: [
      { label: "Webhook", color: "#e05b32", type: "🔗" },
      { label: "Classify", color: "#7c3aed", type: "🏷" },
      { label: "RAG", color: "#10a37f", type: "🧠" },
      { label: "Zendesk", color: "#03363d", type: "🎫" },
      { label: "Respond", color: "#e05b32", type: "↩" },
    ],
    workflowLabel: "Automate Customer Support Issue Resolution using AI Text Classifier.json",
  },
  {
    icon: TrendingUp,
    title: "Finance & Stock Analysis",
    description: "Automated stock research, earnings report analysis, expense tracking, and invoice workflows.",
    workflows: ["Stock Earnings RAG Workflow", "Fundamental Stock Analysis Q&A", "Technical Analysis AI System", "Monthly Invoice Summarizer"],
    nodes: [
      { label: "Schedule", color: "#e05b32", type: "⏱" },
      { label: "Market API", color: "#0ea5e9", type: "📈" },
      { label: "AI Analyst", color: "#10a37f", type: "AI" },
      { label: "Pinecone", color: "#6366f1", type: "🗄" },
      { label: "Report", color: "#475569", type: "📄" },
      { label: "Slack", color: "#4a154b", type: "📢" },
    ],
    workflowLabel: "AI-Powered RAG Workflow For Stock Earnings Report Analysis.json",
  },
];

const impactStats = [
  { icon: Users, value: "18+", label: "Clients Served" },
  { icon: Clock, value: "200+", label: "Hours Saved / Month" },
  { icon: DollarSign, value: "$85K+", label: "Cost Reduction Delivered" },
  { icon: CheckCircle, value: "35+", label: "Workflows Deployed" },
];

const clientImpact = [
  {
    domain: "SportsTech",
    impact: "Deployed AI booking agent + WhatsApp support bot across 150+ gym locations. Saved 80+ hrs/month in manual coordination. Reduced no-show rate by 22%.",
  },
  {
    domain: "HealthTech",
    impact: "Built AI-powered patient intake + appointment reminder workflows. Cut admin workload by 40%. Improved response time from 4 hrs to under 15 mins.",
  },
  {
    domain: "B2B SaaS",
    impact: "Automated lead qualification, CRM enrichment, and onboarding email sequences. Increased sales team efficiency by 35%. Reduced CAC by ~$1,200/client.",
  },
  {
    domain: "EdTech",
    impact: "End-to-end onboarding automation for 100+ partner centres. Reduced support tickets by 23%. Freed 3 FTEs from repetitive ops tasks.",
  },
];

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", requirements: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#contact") {
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.requirements) return;
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {}
    setSubmitted(true);
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <SiteNav />

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(249,115,22,0.08),transparent_55%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(99,102,241,0.06),transparent_55%)]"></div>
      </div>

      {/* HERO */}
      <section className="pt-28 pb-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
            <span className="text-orange-400 text-sm font-medium">Available for new projects</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
            I build AI automation<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              that saves time & cuts costs
            </span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mb-10 leading-relaxed">
            Operations leader turned automation builder. 18+ clients across SportsTech, HealthTech, SaaS, and EdTech. Production-grade n8n workflows — not prototypes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-400 hover:to-orange-500 transition-all shadow-[0_4px_20px_rgba(249,115,22,0.4)] flex items-center space-x-2">
              <span>Work With Me</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#work" className="px-6 py-3 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-slate-400 hover:text-white transition-all flex items-center space-x-2">
              <span>See My Work</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10 px-6 border-y border-slate-700/50 bg-slate-800/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {impactStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section id="work" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">What I Build</h2>
            <p className="text-slate-400 max-w-xl">9 automation categories. Every workflow shown is based on a real deployed system.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-orange-500/40 transition-all duration-300 hover:bg-slate-800/80 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)]">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-orange-400" />
                    </div>
                    <h3 className="font-semibold text-white text-sm leading-tight">{cat.title}</h3>
                  </div>
                  <p className="text-slate-400 text-xs mb-4 leading-relaxed">{cat.description}</p>
                  <N8nMockup nodes={cat.nodes} label={cat.workflowLabel} />
                  <div className="mt-3 space-y-1">
                    {cat.workflows.map((w, j) => (
                      <div key={j} className="flex items-center space-x-2 text-xs text-slate-500">
                        <div className="w-1 h-1 rounded-full bg-orange-500/60 flex-shrink-0"></div>
                        <span>{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLIENT IMPACT */}
      <section className="py-20 px-6 bg-slate-800/30 border-y border-slate-700/50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Client Impact</h2>
            <p className="text-slate-400 max-w-xl">18+ engagements. Real outcomes, not slide decks.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {clientImpact.map((item, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 hover:border-orange-500/30 transition-all">
                <div className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-semibold rounded-full mb-4 border border-orange-500/20">
                  {item.domain}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{item.impact}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs mt-6">* Numbers represent directional ranges across client engagements. Details shared under NDA.</p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-20 px-6 bg-slate-800/30 border-t border-slate-700/50">
        <div className="max-w-xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Work With Me</h2>
            <p className="text-slate-400">Tell me what you need. I'll respond within 24 hours.</p>
          </div>
          {submitted ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Message Received</h3>
              <p className="text-slate-400 text-sm">I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 space-y-5">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-slate-900/60 border border-slate-700 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full bg-slate-900/60 border border-slate-700 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Requirements</label>
                <textarea
                  value={form.requirements}
                  onChange={e => setForm({ ...form, requirements: e.target.value })}
                  placeholder="Briefly describe what you want to automate..."
                  rows={4}
                  className="w-full bg-slate-900/60 border border-slate-700 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 transition-colors resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={sending || !form.name || !form.email || !form.requirements}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-400 hover:to-orange-500 transition-all shadow-[0_4px_20px_rgba(249,115,22,0.3)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{sending ? "Sending..." : "Send Message"}</span>
              </button>
            </div>
          )}
          <div className="mt-8 text-center text-slate-500 text-sm">
            Or email directly:{" "}
            <a href="mailto:subharaj@subharajdas.com" className="text-orange-400 hover:text-orange-300 transition-colors">
              subharaj@subharajdas.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-slate-700/50 text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <img src="/logo.jpg" alt="Logo" className="w-6 h-6 rounded-full object-cover opacity-60" />
          <span className="text-slate-500 text-sm">Subharaj Das · AI Automation & Operations</span>
        </div>
        <p className="text-slate-600 text-xs">© 2025 subharajdas.com</p>
      </footer>
    </div>
  );
}
