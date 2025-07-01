import { Download, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import profileImage from "@assets/01_1751370479401.png";

export default function HeroSection() {
  const handleDownloadResume = async () => {
    try {
      const response = await fetch('/api/resume/download');
      if (response.ok) {
        // In a real implementation, this would trigger the download
        window.open('/api/resume/download', '_blank');
      }
    } catch (error) {
      console.error('Failed to download resume:', error);
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-20 min-h-screen bg-gradient-to-br from-primary to-blue-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Operations & Customer Excellence
                <span className="text-blue-200"> Leader</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 font-light">
                12+ years of expertise building scalable operations and customer success frameworks for SaaS companies
              </p>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
                <div className="text-3xl font-bold text-accent">121%</div>
                <div className="text-sm text-blue-200">Revenue Growth</div>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4">
                <div className="text-3xl font-bold text-accent">35%</div>
                <div className="text-sm text-blue-200">Efficiency Gains</div>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-4 col-span-2 lg:col-span-1">
                <div className="text-3xl font-bold text-accent">₹2Cr+</div>
                <div className="text-sm text-blue-200">Revenue Impact</div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleDownloadResume}
                className="bg-white text-primary px-8 py-3 font-semibold hover:bg-blue-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
              <Button 
                onClick={scrollToContact}
                variant="outline"
                className="border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-primary bg-transparent"
              >
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl border-4 border-white/20">
              <img 
                src={profileImage} 
                alt="Subharaj Das - Operations & Customer Excellence Leader" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
