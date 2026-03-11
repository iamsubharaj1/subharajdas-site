import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Eye, ExternalLink } from "lucide-react";

export default function LinkedInShowcase() {
  const featuredPosts = [
    {
      title: "Mangaluru vs Bengaluru — The SaaS Thesis Nobody's Talking About",
      description: "₹950 crore is not the headline. Mangaluru is. When Low-Code meets Intelligent Automation, enterprises don't ask for slideware — they ask for integrations. A coastal thesis for India.",
      link: "https://www.linkedin.com/posts/subharajdas_mangaluru-automation-fy25-activity-7365614903467892737-8KzD",
      engagement: { impressions: 53420, likes: 246, comments: 11, reposts: 3 },
      tag: "SaaS & Strategy"
    },
    {
      title: "AI Labs in Bengaluru Is Not Good News — It's a Career Filter",
      description: "Prompt skills are table stakes. Production ownership is the job. The winners won't be the loudest AI people — they'll be operators who can make AI survive real org constraints.",
      link: "https://www.linkedin.com/posts/subharajdas_ai-bengaluru-bengaluru-activity-7429377864090693632-ABfR",
      engagement: { impressions: 79564, likes: 90, comments: 4, reposts: 2 },
      tag: "AI & Future of Work"
    },
    {
      title: "Kolkata Just Slipped Into Forbes' Select 200 Without Raising Its Voice",
      description: "Everyone is watching Bengaluru. Meanwhile, a Kolkata operator quietly proved that boring excellence, repeatable sprints, and stable teams build global companies.",
      link: "https://www.linkedin.com/posts/subharajdas_kolkatatech-digitaltransformation-indiagrowth-activity-7403703763037048833-a8O8",
      engagement: { impressions: 11343, likes: 46, comments: 12, reposts: 0 },
      tag: "India Growth"
    }
  ];

  return (
    <section id="linkedin-showcase" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">
            LinkedIn Insights
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Featured posts on operations, AI, and India's growth ecosystem
          </p>
          <Button
            asChild
            className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-[0_10px_30px_rgba(249,115,22,0.35)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.45)] transition-all duration-300 hover:-translate-y-1"
          >
            <a
              href="https://www.linkedin.com/in/subharajdas/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full LinkedIn Profile
            </a>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-[0_25px_60px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4">
                  <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs">
                    {post.tag}
                  </Badge>
                </div>
                <h4 className="font-bold text-lg text-white mb-3 leading-snug">
                  {post.title}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                  {post.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center space-x-1 text-orange-400 font-bold text-lg">
                      <Eye className="w-4 h-4" />
                      <span>{post.engagement.impressions.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Impressions</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center space-x-1 text-orange-400 font-bold text-lg">
                      <Heart className="w-4 h-4" />
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Reactions</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center space-x-1 text-slate-300 font-semibold">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Comments</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center space-x-1 text-slate-300 font-semibold">
                      <Share2 className="w-4 h-4" />
                      <span>{post.engagement.reposts}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Reposts</div>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full border-slate-600 bg-slate-800/50 text-white hover:bg-orange-500 hover:text-white hover:border-orange-500 font-semibold transition-all duration-200"
                >
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    Read on LinkedIn
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
