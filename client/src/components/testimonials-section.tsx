import { Card, CardContent } from "@/components/ui/card";
import { Quote, User, Settings, Users, TrendingUp } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">What Leaders Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Recommendations from industry leaders and partners
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Primary Testimonial */}
          <Card className="bg-gradient-to-r from-primary to-blue-600 text-white lg:col-span-2">
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
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-accent w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    "Subharaj has been a really hardworking and a smartworking person in my team while I was working in Flintoclass. He always finds a unique way of acquiring a customer to achieve his targets. Having him in my team has been a true blessing as he always used to focus on bringing the whole team on top."
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-slate-800">Satyajit Roy</div>
                    <div className="text-sm text-slate-600">Growth Strategist | Co-Founder @ Branofy</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-accent w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    "I've worked with Subharaj at MyGate. He is a detail oriented professional, extremely far sighted, hardworking and proactive. He takes a strategic approach to solving for business problems and is adept at multitasking and team management."
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-slate-800">Pradeep Kumar</div>
                    <div className="text-sm text-slate-600">UX Architect at MyGate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-accent w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    "One of the most dedicated and dependable persons I've worked with, he aims for excellence and has an output-oriented performance that consistently got him some of the most critical projects. He is extremely competent and has a strong desire to excel."
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-slate-800">Pritha Goswami</div>
                    <div className="text-sm text-slate-600">Consultant</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-accent w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    "Subharaj was a great professional to work with. His work ethics is immaculate and so easy to work together with. He goes out of his way when you ask for some help and guidance. I highly recommend him for his strategic approach, problem solving techniques and team management."
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-slate-800">Anand Mishra</div>
                    <div className="text-sm text-slate-600">Project Management for marketing activation</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-accent w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    "I would like to thank you for helping me set clear, actionable goal for myself in corporate world, encouragement and support. I learnt a lot in how the whole supply chain works in practical world. Clear direction is critical to my success and you always provide it."
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-slate-800">Shruti Dubey</div>
                    <div className="text-sm text-slate-600">Consultant - Enterprise Client Success</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-2 mb-4">
                <Quote className="text-accent w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    "Subharaj has leadership skills and is always a helping hand. He has the strong ability to manage projects and looks forward to take responsibility and fullfill them."
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-slate-800">Beenu Gulia</div>
                    <div className="text-sm text-slate-600">DHL | CSCS | Ex-Fitso by cult.fit | Ex-Safexpress</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Future Courses Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Future Courses</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Career management and operations excellence courses coming soon
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg border-2 border-dashed border-slate-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Operations Excellence Mastery</h3>
                <p className="text-slate-600 mb-6">Learn proven frameworks for scaling operations and driving efficiency</p>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">Coming Soon</span>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-2 border-dashed border-slate-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-accent w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Customer Success Strategy</h3>
                <p className="text-slate-600 mb-6">Build customer success programs that drive retention and growth</p>
                <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">Coming Soon</span>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-2 border-dashed border-slate-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-blue-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Career Management for Executives</h3>
                <p className="text-slate-600 mb-6">Strategic career planning and personal branding for senior professionals</p>
                <span className="bg-blue-500/10 text-blue-500 px-4 py-2 rounded-full text-sm font-semibold">Coming Soon</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
