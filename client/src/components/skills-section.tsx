import { Card, CardContent } from "@/components/ui/card";
import { Settings, Users, Code2, Sparkles } from "lucide-react";

export default function SkillsSection() {
  const technicalStack = [
    "Salesforce",
    "Metabase",
    "Zoho",
    "Zendesk",
    "LeadSquared",
    "FreshDesk",
    "HubSpot",
    "Intercom"
  ];

  const operationsSkills = [
    "Operations Management",
    "B2B SaaS Operations", 
    "Process Optimization", 
    "Resource Management",
    "P&L Ownership",
    "Operational Analytics"
  ];

  const genAISkills = [
    "Custom GPT Development",
    "AI Chatbots & Agents",
    "Workflow Automation",
    "Make.com Integration",
    "AI-Powered CRM",
    "Process Automation"
  ];

  const customerSuccessSkills = [
    "Customer Success Management",
    "Customer Onboarding",
    "Client Retention", 
    "B2B Client Success",
    "SLA Management",
    "Escalation Handling"
  ];

  const achievements = [
    { number: "350+", label: "Product Demos Delivered" },
    { number: "30,000+", label: "Users Impacted" },
    { number: "95%", label: "Max CSAT Rating" },
    { number: "23%", label: "Support Ticket Reduction" }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">Core Expertise in Operations & Customer Success</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive skill set spanning B2B SaaS operations management, customer success strategy, client retention, customer onboarding, process optimization, and revenue operations
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Operations Excellence */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-[0_25px_60px_rgba(148,163,184,0.35)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Operations Excellence</h3>
              </div>
              <div className="space-y-3">
                {operationsSkills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-slate-200">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Success */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-[0_25px_60px_rgba(249,115,22,0.35)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-accent w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Customer Success</h3>
              </div>
              <div className="space-y-3">
                {customerSuccessSkills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-slate-200">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Stack */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-[0_25px_60px_rgba(59,130,246,0.35)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code2 className="text-blue-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Technical Proficiency</h3>
              </div>
              <div className="space-y-3">
                {technicalStack.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-200">{tech}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gen AI & Automation */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-[0_25px_60px_rgba(168,85,247,0.35)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-purple-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Gen AI & Automation</h3>
              </div>
              <div className="space-y-3">
                {genAISkills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-200">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Achievements */}
        <Card className="mt-16 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Key Achievements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">{achievement.number}</div>
                  <p className="text-slate-300">{achievement.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
