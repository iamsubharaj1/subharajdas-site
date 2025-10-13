import { Card, CardContent } from "@/components/ui/card";
import { Quote, User } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">What Leaders Say</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Recommendations from industry leaders and partners
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Primary Testimonial */}
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white lg:col-span-2 shadow-[0_25px_60px_rgba(249,115,22,0.4)] hover:shadow-[0_30px_80px_rgba(249,115,22,0.6)] transition-all duration-300 hover:-translate-y-2 border-orange-400/30">
            <CardContent className="p-8 relative">
              <div className="absolute top-4 left-4 text-6xl text-white/20">
                <Quote className="w-12 h-12" />
              </div>
              <div className="relative z-10">
                <blockquote className="text-xl lg:text-2xl leading-relaxed mb-8 font-light italic">
                  "Subharaj contributed to operations of a successful startup that grew 10X within 18 months. He is a keen learner and hard worker."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Wg Cdr Anthony Anish (Retd)</div>
                    <div className="text-blue-200">Partner Factoryal, Ex COO T-Hub, Founding team member MyGate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LinkedIn Recommendations */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-orange-400 w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-200 leading-relaxed mb-4">
                    "Subharaj has been a really hardworking and a smartworking person in my team while I was working in Flintoclass. He always finds a unique way of acquiring a customer to achieve his targets. Having him in my team has been a true blessing as he always used to focus on bringing the whole team on top."
                  </p>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="font-semibold text-white">Satyajit Roy</div>
                    <div className="text-sm text-slate-400">Growth Strategist | Co-Founder @ Branofy</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-orange-400 w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-200 leading-relaxed mb-4">
                    "I've worked with Subharaj at MyGate. He is a detail oriented professional, extremely far sighted, hardworking and proactive. He takes a strategic approach to solving for business problems and is adept at multitasking and team management."
                  </p>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="font-semibold text-white">Pradeep Kumar</div>
                    <div className="text-sm text-slate-400">UX Architect at MyGate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-orange-400 w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-200 leading-relaxed mb-4">
                    "One of the most dedicated and dependable persons I've worked with, he aims for excellence and has an output-oriented performance that consistently got him some of the most critical projects. He is extremely competent and has a strong desire to excel."
                  </p>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="font-semibold text-white">Pritha Goswami</div>
                    <div className="text-sm text-slate-400">Consultant</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-orange-400 w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-200 leading-relaxed mb-4">
                    "Subharaj was a great professional to work with. His work ethics is immaculate and so easy to work together with. He goes out of his way when you ask for some help and guidance. I highly recommend him for his strategic approach, problem solving techniques and team management."
                  </p>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="font-semibold text-white">Anand Mishra</div>
                    <div className="text-sm text-slate-400">Project Management for marketing activation</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-orange-400 w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-200 leading-relaxed mb-4">
                    "I would like to thank you for helping me set clear, actionable goal for myself in corporate world, encouragement and support. I learnt a lot in how the whole supply chain works in practical world. Clear direction is critical to my success and you always provide it."
                  </p>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="font-semibold text-white">Shruti Dubey</div>
                    <div className="text-sm text-slate-400">Consultant - Enterprise Client Success</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-[0_20px_50px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-orange-400 w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-200 leading-relaxed mb-4">
                    "Subharaj has leadership skills and is always a helping hand. He has the strong ability to manage projects and looks forward to take responsibility and fullfill them."
                  </p>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="font-semibold text-white">Beenu Gulia</div>
                    <div className="text-sm text-slate-400">DHL | CSCS | Ex-Fitso by cult.fit | Ex-Safexpress</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
