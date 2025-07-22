import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Linkedin, Zap, PenTool, Target } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function CraftPostSection() {
  const handleCraftPostClick = () => {
    // Track the external link click
    trackEvent('external_link_click', 'navigation', 'craftpost_website');
    
    // Open in new tab
    window.open('https://craftpost.in', '_blank', 'noopener,noreferrer');
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
    <section id="craftpost" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Boost Your LinkedIn Presence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Generate professional LinkedIn posts automatically with CraftPost - the AI-powered tool for operations and customer success leaders
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                Why Use CraftPost?
              </h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground">
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
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
                    <Linkedin className="h-8 w-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      Ready to Create Amazing Posts?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Join thousands of professionals using CraftPost to enhance their LinkedIn presence and build their personal brand in operations and customer success.
                    </p>
                  </div>

                  <Button 
                    onClick={handleCraftPostClick}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Visit CraftPost.in
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
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