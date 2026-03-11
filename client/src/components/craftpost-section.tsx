import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Linkedin, Zap, PenTool, Target } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function CraftPostSection() {
  const handleCraftPostClick = () => {
    console.log('TESTING: CraftPost button clicked - forcing redirect to www.craftpost.in');
    
    // Track the external link click
    trackEvent('external_link_click', 'navigation', 'craftpost_website');
    
    // Force redirect - no popup blocking issues
    window.location.href = 'https://www.craftpost.in';
  };

  const features = [
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "AI-Powered Content",
      description: "Generate professional LinkedIn posts with advanced AI"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Industry-Focused",
      description: "Tailored content for operations and customer success professionals"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Generation",
      description: "Create engaging posts in seconds, not hours"
    }
  ];

  return (
    <section id="craftpost" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">
            Boost Your LinkedIn Presence
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Generate professional LinkedIn posts automatically with CraftPost - the AI-powered tool for operations and customer success leaders
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Why Use CraftPost?
              </h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-slate-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action Card */}
          <div className="lg:pl-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                    <Linkedin className="h-8 w-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Ready to Create Amazing Posts?
                    </h3>
                    <p className="text-slate-300 mb-6">
                      Join thousands of professionals using CraftPost to enhance their LinkedIn presence and build their personal brand in operations and customer success.
                    </p>
                  </div>

                  <Button 
                    onClick={handleCraftPostClick}
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-lg shadow-[0_10px_30px_rgba(249,115,22,0.35)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.45)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Visit www.CraftPost.in
                  </Button>
                  
                  <p className="text-sm text-slate-400">
                    Free to try • No credit card required
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}