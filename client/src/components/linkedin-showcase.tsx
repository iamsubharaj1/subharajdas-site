import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Eye, TrendingUp, Users, BookOpen, ExternalLink } from "lucide-react";

export default function LinkedInShowcase() {
  // Sample featured content - replace with your actual LinkedIn featured items
  const featuredContent = [
    {
      type: "article",
      title: "Building Scalable Operations: Lessons from 12+ Years in SaaS",
      description: "Key insights on operational excellence and customer success strategies that drove 121% revenue growth across multiple organizations.",
      image: "/api/placeholder/400/250",
      link: "https://www.linkedin.com/in/subharajdas/",
      engagement: { views: 2500, likes: 89, comments: 23 }
    },
    {
      type: "post",
      title: "The Future of Customer Success in Operations",
      description: "Sharing my thoughts on how customer onboarding and retention strategies are evolving in the post-COVID business landscape.",
      image: "/api/placeholder/400/250", 
      link: "https://www.linkedin.com/in/subharajdas/",
      engagement: { views: 1800, likes: 65, comments: 18 }
    },
    {
      type: "media",
      title: "Operations Excellence Framework",
      description: "A comprehensive guide I developed for scaling operational efficiency across 141 locations at All Sports Fit.",
      image: "/api/placeholder/400/250",
      link: "https://www.linkedin.com/in/subharajdas/",
      engagement: { views: 3200, likes: 120, comments: 35 }
    }
  ];

  // Sample recent posts
  const recentPosts = [
    {
      content: `Startups in Bengaluru: "We're burning $5M a month, but vibes are immaculate."
Startups in Mangaluru: "Here's ₹264cr revenue, 25% EBITDA. Exit at ₹950cr."

₹950 crore is not the headline. #Mangaluru is.

R Systems just picked up Novigo Solutions. ₹400 crore upfront. Performance-linked stock could take it close to ₹950 crore.

What does that signal? Low-code and intelligent #automation are not buzzwords. They are P&L positive machines.

Novigo hit ₹264 crore in #FY25. Delivered 25% #EBITDA. Scaled to nearly 1,000 people. That is operating discipline, not luck.

Credit where it is due. At R Systems, Nitesh Bansal is sharpening a product engineering playbook that travels well across markets. Founder Satinder Singh Rekhi built the ambition and appetite for outcomes, not optics. At Novigo, Praveen Kumar Kalbhavi and Mohammed Hanif proved coastal talent can build category leaders, quietly and consistently.

This is bigger than one deal. It is a coastal thesis for India. When #LowCodeNoCode meets #IntelligentAutomation, enterprises do not ask for slideware, they ask for integrations. And this is exactly the kind of #SaaSMergers execution that turns "tier 2" into "top tier."

Your take, especially if you have built or acquired outside the big metros.

Hot take: The next SaaS unicorn won't be from Bengaluru or Chennai. It'll be from whichever city has fewer investors giving "gyan" and more founders giving EBITDA.`,
      timestamp: "1mo",
      engagement: { likes: 245, comments: 11, shares: 3, impressions: 53190 },
      type: "insight"
    },
    {
      content: "Excited to share that our operations team achieved a 25% increase in client satisfaction this quarter! The key was implementing scalable training platforms that emphasized customer excellence. When you invest in your team's growth, the results speak for themselves. #OperationsExcellence #CustomerSuccess",
      timestamp: "3 days ago",
      engagement: { likes: 156, comments: 42, shares: 18 },
      type: "achievement"
    },
    {
      content: "Leadership insight: One of the most valuable lessons from managing operations across 141 locations is that clear direction is critical to success. When teams know exactly what's expected and have the tools to deliver, productivity gains of 40% become achievable. #Leadership #Operations",
      timestamp: "1 week ago", 
      engagement: { likes: 203, comments: 67, shares: 31 },
      type: "insight"
    }
  ];

  // Sample thoughtful comments on industry posts
  const featuredComments = [
    {
      originalPost: "How do you balance automation with human touch in customer service?",
      author: "Sarah Johnson, VP Customer Success",
      myComment: "Great question, Sarah! In my experience across SaaS companies, the key is strategic layering. Automation handles routine inquiries and initial touchpoints, freeing up teams for high-value relationship building. At All Sports Fit, this approach helped us achieve 95% client satisfaction while reducing operational costs by 20%. The human touch becomes more impactful when it's focused on complex problem-solving and strategic guidance.",
      engagement: { likes: 78, replies: 12 },
      timestamp: "4 days ago"
    },
    {
      originalPost: "What's the biggest operational challenge facing startups today?",
      author: "David Chen, Startup Founder",
      myComment: "From working with multiple startups, I'd say it's scaling operations without losing quality. Many founders excel at product development but struggle with operational frameworks. The solution isn't just hiring more people - it's building systems that grow with you. Process documentation, clear SOPs, and training pipelines are investments that pay dividends when you're ready to scale rapidly.",
      engagement: { likes: 134, replies: 23 },
      timestamp: "1 week ago"
    }
  ];

  return (
    <section id="linkedin-showcase" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">LinkedIn Professional Showcase</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Featured content, insights, and professional engagement from my LinkedIn presence
          </p>
          <Button 
            asChild
            className="mt-6 bg-[#0077B5] hover:bg-[#005885] text-white"
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

        {/* Featured Content Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">Featured Content</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredContent.map((item, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        {item.type === "article" && <BookOpen className="w-8 h-8 text-primary" />}
                        {item.type === "post" && <MessageCircle className="w-8 h-8 text-primary" />}
                        {item.type === "media" && <TrendingUp className="w-8 h-8 text-primary" />}
                      </div>
                      <Badge variant="secondary" className="capitalize">{item.type}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg text-slate-800 mb-3 line-clamp-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {item.engagement.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {item.engagement.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {item.engagement.comments}
                        </span>
                      </div>
                    </div>
                    <Button 
                      asChild
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        View on LinkedIn
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">Recent Posts</h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            {recentPosts.map((post, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-semibold text-slate-800">Subharaj Das</div>
                          <div className="text-sm text-slate-500">{post.timestamp}</div>
                        </div>
                        <Badge variant="outline" className="capitalize">{post.type}</Badge>
                      </div>
                      <p className="text-slate-700 leading-relaxed mb-4 whitespace-pre-line">{post.content}</p>
                      <div className="flex items-center space-x-6 text-sm text-slate-500">
                        {post.engagement.impressions && (
                          <span className="flex items-center space-x-1 text-slate-600 font-semibold">
                            <Eye className="w-4 h-4" />
                            <span>{post.engagement.impressions.toLocaleString()} impressions</span>
                          </span>
                        )}
                        <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>{post.engagement.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.engagement.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>{post.engagement.shares}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Comments Section */}
        <div>
          <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">Thoughtful Engagement</h3>
          <div className="space-y-6 max-w-5xl mx-auto">
            {featuredComments.map((comment, index) => (
              <Card key={index} className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 p-4 bg-slate-50 rounded-lg border-l-4 border-primary">
                    <p className="text-slate-700 italic">"{comment.originalPost}"</p>
                    <p className="text-sm text-slate-500 mt-2">— {comment.author}</p>
                  </div>
                  <div className="pl-6 border-l-2 border-slate-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">Subharaj Das</div>
                        <div className="text-xs text-slate-500">{comment.timestamp}</div>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed mb-3">{comment.myComment}</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {comment.engagement.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {comment.engagement.replies} replies
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}