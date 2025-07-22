import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Linkedin, X, PenTool } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function FloatingCraftPost() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating button after scrolling past the hero section
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCraftPostClick = () => {
    trackEvent('external_link_click', 'navigation', 'floating_craftpost_button');
    window.open('https://craftpost.in', '_blank', 'noopener,noreferrer');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      trackEvent('ui_interaction', 'floating_craftpost', 'expand_card');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isExpanded ? (
        // Compact floating button
        <Button
          onClick={toggleExpanded}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-full p-4 h-14 w-14"
          size="lg"
        >
          <PenTool className="h-6 w-6" />
        </Button>
      ) : (
        // Expanded card
        <Card className="w-80 shadow-xl border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Linkedin className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800">CraftPost</h3>
              </div>
              <Button
                onClick={toggleExpanded}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-slate-800 mb-2">
                  Boost Your LinkedIn Presence
                </h4>
                <p className="text-sm text-slate-600">
                  Generate professional LinkedIn posts automatically with AI-powered content creation.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>AI-Powered Content</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Industry-Focused</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Instant Generation</span>
                </div>
              </div>

              <Button 
                onClick={handleCraftPostClick}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit CraftPost.in
              </Button>
              
              <p className="text-xs text-slate-500 text-center">
                Free to try • No credit card required
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}