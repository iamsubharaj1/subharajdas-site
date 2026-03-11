import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Smartphone, Settings, Calendar, Building2 } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">Professional Experience in Operations Excellence</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Proven track record of driving operational excellence, customer success management, client retention, customer onboarding, and revenue operations optimization across B2B SaaS, EdTech, and FinTech industries
          </p>
        </div>

        <div className="space-y-12">
          {/* Current Role */}
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-l-4 border-orange-300 shadow-[0_20px_50px_rgba(249,115,22,0.4)] hover:shadow-[0_30px_70px_rgba(249,115,22,0.6)] transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Head of Operations</h3>
                  <p className="text-xl text-orange-100 font-semibold">All Sports Fit</p>
                  <p className="text-orange-200">Bengaluru • Sep 2022 – Present</p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <Badge className="bg-accent text-white">Current Role</Badge>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <p className="text-white">Drove <strong>121% revenue growth</strong> at ₹2Cr MRR across 150+ locations</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <p className="text-white"><strong>40% productivity uplift</strong> and <strong>25% CSAT improvement</strong> via role-based enablement</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <p className="text-white"><strong>20% reduction</strong> in annual operating costs through process redesign</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <p className="text-white">Automated recurring workflows saving <strong>200+ man-hours monthly</strong> with n8n</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <p className="text-white">Deployed <strong>35+ AI agents in production</strong> — GPT copilots, WhatsApp & Telegram bots</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <p className="text-white">Cut response times by <strong>60%</strong> and improved operational performance by <strong>30%</strong></p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <p className="text-white">Leveraged <strong>Salesforce + Metabase</strong> for forecasting, retention, and program design</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <p className="text-white">Built <strong>OKR-driven operating cadences</strong> to sustain growth and improve retention</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Previous Roles */}
          <div className="grid lg:grid-cols-2 gap-8 auto-rows-fr">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-md hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">AVP – Operations & Onboarding</h3>
                  <p className="text-lg text-orange-400 font-semibold">Edustoke</p>
                  <p className="text-slate-400 text-sm">Bengaluru • Mar 2022 – Sep 2022</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200"><strong>35% operational efficiency</strong> via nationwide process enhancements</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200">Onboarded <strong>100+ centers in 2 weeks</strong>, securing ₹18L revenue</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200"><strong>23% reduction</strong> in support requests through scalable onboarding</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-md hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">Business Development Manager</h3>
                  <p className="text-lg text-orange-400 font-semibold">Flinto Class @ Home</p>
                  <p className="text-slate-400 text-sm">Bengaluru • Mar 2021 – Aug 2021</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200"><strong>250% operational efficiency</strong> improvement via redesigned outreach</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200"><strong>30% cost savings</strong> through process optimization workshops</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-md hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">Regional Sales & Operations Manager</h3>
                  <p className="text-lg text-orange-400 font-semibold">SocietyNow</p>
                  <p className="text-slate-400 text-sm">Pune • Nov 2019 – Nov 2020</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200"><strong>55% revenue growth</strong> and 83% client acquisition</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200">Led launch of <strong>3 mobile apps</strong></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-md hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">Assistant Manager</h3>
                  <p className="text-lg text-orange-400 font-semibold">Safeducate</p>
                  <p className="text-slate-400 text-sm">Delhi • Mar 2019 – Oct 2019</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200">Trained <strong>1000+ Business Development Managers</strong> online</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200"><strong>30% team efficiency</strong> via digital training & Salesforce</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-md hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">Sales & Operations Manager</h3>
                  <p className="text-lg text-orange-400 font-semibold">MyGate</p>
                  <p className="text-slate-400 text-sm">Bengaluru & Pune • Oct 2017 – Feb 2019</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Settings className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200"><strong>90% operational efficiency</strong> and <strong>25% cost savings</strong> across new markets</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200"><strong>95% client satisfaction</strong> — team productivity up <strong>75%</strong></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-md hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">Operations Specialist</h3>
                  <p className="text-lg text-orange-400 font-semibold">Zenpower Technologies</p>
                  <p className="text-slate-400 text-sm">Feb 2012 – Sep 2017</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200"><strong>5+ years</strong> foundational operations experience</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-200">Built operational expertise in technology sector</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
