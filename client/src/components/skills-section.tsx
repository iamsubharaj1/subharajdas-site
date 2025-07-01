import { Card, CardContent } from "@/components/ui/card";
import { Settings, Users, Code2 } from "lucide-react";

export default function SkillsSection() {
  const technicalStack = [
    "Salesforce", "Metabase", "Zoho", "Zendesk", "LeadSquared", "FreshDesk"
  ];

  const operationsSkills = [
    "Operations Management",
    "Process Optimization", 
    "Resource Management",
    "P&L Ownership",
    "Operational Analytics"
  ];

  const customerSuccessSkills = [
    "Customer Success Management",
    "Customer Onboarding",
    "Retention Management", 
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
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Core Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive skill set spanning operations management, customer success, and digital transformation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Operations Excellence */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Operations Excellence</h3>
              </div>
              <div className="space-y-3">
                {operationsSkills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-slate-700">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Success */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-accent w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Customer Success</h3>
              </div>
              <div className="space-y-3">
                {customerSuccessSkills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-slate-700">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Stack */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code2 className="text-blue-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Technical Proficiency</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {technicalStack.map((tech, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg px-3 py-2 text-center">
                    <span className="text-sm font-semibold text-slate-700">{tech}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Achievements */}
        <Card className="mt-16 bg-white shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Key Achievements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">{achievement.number}</div>
                  <p className="text-slate-600">{achievement.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
