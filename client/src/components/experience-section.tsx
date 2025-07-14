import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Smartphone, Settings, Calendar, Building2 } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Professional Experience in Operations Excellence</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proven track record of driving operational excellence, customer success management, client retention, customer onboarding, and revenue operations optimization across B2B SaaS, EdTech, and FinTech industries
          </p>
        </div>

        <div className="space-y-12">
          {/* Current Role */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-primary">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Head of Operations</h3>
                  <p className="text-xl text-primary font-semibold">All Sports Fit</p>
                  <p className="text-muted-foreground">Bengaluru • Sep 2022 – Present</p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <Badge className="bg-accent text-white">Current Role</Badge>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <p className="text-slate-700">Spearheaded <strong>121% revenue growth</strong> across 141 locations</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <p className="text-slate-700">Delivered <strong>40% productivity gains</strong> through comprehensive L&D programs</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <p className="text-slate-700">Boosted <strong>25% client satisfaction</strong> through operational training</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <p className="text-slate-700"><strong>20% reduction</strong> in operational costs annually</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Previous Roles */}
          <div className="grid lg:grid-cols-2 gap-8 auto-rows-fr">
            <Card className="bg-slate-50 border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800">AVP – Operations & Onboarding</h3>
                  <p className="text-lg text-primary font-semibold">Edustoke</p>
                  <p className="text-muted-foreground text-sm">Mar 2022 – Sep 2022</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-700"><strong>35% operational efficiency</strong> improvement</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-700">Onboarded <strong>100+ centers</strong> securing ₹18L revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Business Development Manager</h3>
                  <p className="text-lg text-primary font-semibold">Flinto Class @ Home</p>
                  <p className="text-muted-foreground text-sm">Bengaluru • Mar 2021 – Aug 2021</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-700"><strong>250% operational efficiency</strong> improvement via redesigned outreach</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-700"><strong>30% cost savings</strong> through process optimization workshops</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Regional Sales & Operations Manager</h3>
                  <p className="text-lg text-primary font-semibold">SocietyNow</p>
                  <p className="text-muted-foreground text-sm">Nov 2019 – Nov 2020</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-700"><strong>55% revenue growth</strong> and 83% client acquisition</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-700">Led launch of <strong>3 mobile apps</strong></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Sales & Operations Manager</h3>
                  <p className="text-lg text-primary font-semibold">MyGate</p>
                  <p className="text-muted-foreground text-sm">Oct 2017 – Feb 2019</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Settings className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-700"><strong>90% operational efficiency</strong> achieved</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-700"><strong>95% client satisfaction</strong> rating secured</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Operations Specialist</h3>
                  <p className="text-lg text-primary font-semibold">Zenpower Technologies</p>
                  <p className="text-muted-foreground text-sm">Feb 2012 – Sep 2017</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-700"><strong>5+ years</strong> foundational operations experience</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="text-accent w-4 h-4" />
                    <p className="text-sm text-slate-700">Built operational expertise in technology sector</p>
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
