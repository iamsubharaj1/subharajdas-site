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
      content: `Delhi office chosen over Bangalore. Bold move. GPT will now learn to debate louder than Delhi aunties at a wedding.

#India is stepping into the front row of the #globalAI stage. Not as a spectator. But as a co-creator.

By the end of this year, OpenAI will open its first office in New Delhi. Jake Wilczynski announced it. Sam Altman has said repeatedly that India will play a defining role in the #AI decade. Now those words are taking shape in action.

This is not just an office launch. It is a foundation stone.

A foundation that strengthens India in three powerful ways:
Talent: Our engineers, researchers, and scientists will now work at the very frontier of AI. Not just consuming models, but shaping them.
Ecosystem: Universities, startups, and enterprises will gain access to OpenAI's orbit, unlocking collaboration that accelerates innovation at scale.
Policy: With OpenAI on the ground, dialogue with policymakers will mature, aligning global safety standards with India's vision for #IndiaAI.

For years, #India has been the testing ground for global technology. Cheap data, massive adoption, unstoppable scale. Now, it has the chance to be the building ground too.

When the world's most influential AI company sets roots in Delhi, the message is clear: India is not on the sidelines anymore. It is stepping into the driver's seat.

This is more than a milestone for #OpenAI. It is a milestone for India.

And perhaps, the real beginning of India's AI decade.

#FutureOfWork #StartupLife`,
      timestamp: "1mo",
      engagement: { likes: 24, comments: 4, shares: 1, impressions: 9428 },
      type: "insight"
    },
    {
      content: `The Online #Gaming Bill is the only game in India where everyone loses. Employees. Startups. Investors. Even GDP.

Freedom to play. But now, rules to stay.

₹3.6 billion projected #Gaming industry crushed.
2,000+ professionals now searching for new jobs.
Mobile Premier League (MPL): 60% staff, around 300 jobs wiped.
Games24x7 & Baazi Games: around 50% workforce slashed.
@PokerBaazi cuts 50% too.

When Parliament passed and the President signed the #OnlineGamingAct on August 22, it did not regulate. It devastated livelihoods.

Dream11, led by Harsh Jain, lost 95% of its revenue overnight.
MPL, under Sai Srinivas Kiran G, told staff: "India accounted for 50% of our revenues, now 0%." Around 300 roles gone.
Games24x7, co-founded by Bhavin Pandya, began letting go of hundreds.
PokerBaazi, under Navkiran Singh, followed with a 50% cut.

This is human cost, not just line items.
A product lead in #Bengaluru unsure if salary comes this month.
A UX designer in #Pune seeing freeze emails.
HR teams scrambling for outplacement, reskilling, mental support.

Yes, the law targets addiction and fraud.
Yes, it legitimizes e-sports and social games.
But without a humane transition, #DigitalTransformation becomes punishment.

This is not politics.
It is about 3,000 plus dreams. Developers, designers, managers, all wiped clean by policy shock.
It is about whether governance protects people or punishes them.

Regulation without foresight is corporate bloodshed.
And today, India's #Gaming workforce is the casualty.
Along with it, $3 to $4 billion in GDP contribution for 2025 is gone too.

Lawmakers: "We saved society."
Society: "Bro, you just erased ₹3.6B industry and 3,000+ jobs."`,
      timestamp: "1mo",
      engagement: { likes: 60, comments: 14, shares: 2, impressions: 8707 },
      type: "insight"
    },
    {
      content: `Survived 7 years without burning VC cash, still richer than half the unicorns. ET Startup Awards 2025 gave Minfy the Bootstrap Champ

A #startup without funding is called fragile.
A startup without funding that scales global is called unshakable.

₹600 crore in annual revenue.
1,200+ enterprise clients across 20 countries.
40% YoY growth in cloud and AI.
7 straight years of zero external capital.

Minfy didn't just build a company. Minfy built a movement for Indian #StartupLife.

At the #ETStartupAwards2025, Minfy Technologies was named Bootstrap Champ. This is more than a trophy. This is proof that #India can create global champions powered by customer revenue, not venture cheques.

Why does this matter for the Indian economy?
Because bootstrapped companies force efficiency.
Every rupee spent must generate impact.
That mindset creates profitable jobs, sustainable industries, and export-driven growth.

When Minfy scales cloud transformation globally, it isn't just adding topline it is strengthening India's #IndiaInnovation and #IndiaAI's #IndiaAI digital.

Leaders like Vikram Manchanda at Minfy, who is driving the company's global expansion, show that resilience scales better than capital.
When Vivek Gupta reflects on this journey, it solidifies a validation of customer-first growth, it signals a shift in how India views sustainable entrepreneurship.
And when Shankar TR at Minfy frames bootstrapping as a competitive advantage, it cements India's rise as a nation of disciplined builders.

For a $5 trillion economy in the making, India doesn't just need unicorns. It needs camels companies like Minfy that survive deserts, thrive without excess, and carry the nation's credibility on their back.

This is not just Minfy's win.
This is India's signal to the world that #BootstrapChamp innovation is our real export.

Unicorns are cool. But camels like Minfy survive deserts, carry weight, and don't collapse at the first dry season.

That's #BootstrapChamp energy. #hyderabad`,
      timestamp: "You",
      engagement: { likes: 60, comments: 5, shares: 5, impressions: 5458 },
      type: "insight"
    },
    {
      content: `Bengaluru traffic gave us patience. IIT Madras might give us pedagogy that scales. Between the jam and the exam, pick the one that upgrades a nation.

Hype is easy. Nation building is messy.

₹4.5 crore to Indian Institute of Technology, Madras for long-horizon #AI-in-education research.

500,000 free #ChatGPT licenses for six months to teachers and students.

$500,000 open research pact, results to be shared publicly.

Rollout across government schools and #AICTF institutes, built for scale.

Signal. #India is turning AI into learning infrastructure, not a demo.

Why #IITMadras matters in this union.
It brings Robert Bosch Centre for Data Science and Artificial Intelligence (RBCDSAI), Indian Institute of Technology, School of Data Science and AI, IIT Madras bench strength in applied ML, policy-shaping research, and evaluation rigor.

Expect multilingual pilots, low-bandwidth workflows, teacher PD that sticks, and open measurement frameworks others can copy.

This is #IndiaAI meeting timetables and lesson plans, where teachers automate grunt work and focus on thinking work, where labs turn student projects into prototypes, where states can scale without blowing budgets.

Credit the operators who will carry it.
at OpenAI, Sam Altman sets ambition, Brad Lightcap wires partnerships, and Pragya Misra and Rahul Gupta will execute the detail.
Indian Institute of Technology, Madras, Kamakoti Veezhinthan anchors governance and Balaraman Ravindran brings Robert Bosch Centre for Data Science and Artificial Intelligence (RBCDSAI) rigor that compounds into outcomes.

Call it #DigitalEducation with Indian constraints in mind, executed with millennial urgency.

Long game, open research becomes policy, policy becomes product, product becomes habit.

PTM update, "Your kid used AI to draft, then rewrote it better." Teacher claps. Plagiarism society dissolves. So called photocopy opens upskilling bootcamp.

Balaraman Ravindran Jake Wilczynski Manu Santhanam Sriram Rajamani Dr. Mukunthan Sivakumar`,
      timestamp: "1mo",
      engagement: { likes: 9, comments: 5, shares: 0, impressions: 1544 },
      type: "insight"
    },
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