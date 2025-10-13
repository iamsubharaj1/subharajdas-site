import { Download, Mail, Phone, MapPin, Linkedin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import profileImage from "@assets/profile-new.png";
import bannerImage from "@assets/hero-banner.png";
import { trackEvent } from "@/lib/analytics";

export default function HeroSection() {
  const handleDownloadResume = async () => {
    try {
      // Track resume download event
      trackEvent('file_download', 'resume', 'resume_pdf');
      
      const response = await fetch('/api/resume/download');
      if (response.ok) {
        // In a real implementation, this would trigger the download
        window.open('/api/resume/download', '_blank');
      }
    } catch (error) {
      console.error('Failed to download resume:', error);
    }
  };

  const handleEmailClick = () => {
    trackEvent('email_click', 'contact', 'hero_email');
    window.open('mailto:iamsubharaj1@gmail.com', '_blank');
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'contact', 'hero_phone');
    window.open('tel:+919742189357', '_blank');
  };

  const handleLinkedInClick = () => {
    trackEvent('linkedin_click', 'social', 'hero_linkedin');
    window.open('https://linkedin.com/in/subharajdas', '_blank');
  };

  return (
    <section id="home" className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Banner Section */}
      <div className="relative w-full">
        <img 
          src={bannerImage} 
          alt="Achieved Peak Performance Banner" 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Operations Excellence & Customer Success Leader
              </h1>
              <p className="text-lg lg:text-xl text-slate-300 font-light">
                12+ Yrs | ₹2Cr MRR | Customer & Process Excellence | Operations | Driving Revenue Growth, Scalable CX, Retention & Revenue | 121% Revenue Uplift | 35–90% Efficiency Gains | GEN AI and Chatbots with Agents | OKR Playbooks
              </p>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm border-orange-500/30 text-center p-4 shadow-[0_10px_40px_rgba(249,115,22,0.25)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.35)] transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-orange-400">121%</div>
                <div className="text-sm text-slate-300">Revenue Growth</div>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm border-orange-500/30 text-center p-4 shadow-[0_10px_40px_rgba(249,115,22,0.25)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.35)] transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-orange-400">35%</div>
                <div className="text-sm text-slate-300">Efficiency Gains</div>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm border-orange-500/30 text-center p-4 col-span-2 lg:col-span-1 shadow-[0_10px_40px_rgba(249,115,22,0.25)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.35)] transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl font-bold text-orange-400">₹2Cr+</div>
                <div className="text-sm text-slate-300">Revenue Impact</div>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <h3 className="text-xl font-semibold mb-4 text-orange-400">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-orange-400" />
                    <a 
                      href="mailto:iamsubharaj1@gmail.com"
                      onClick={handleEmailClick}
                      className="text-slate-200 hover:text-orange-400 transition-colors font-medium"
                    >
                      iamsubharaj1@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-orange-400" />
                    <a 
                      href="tel:+919742189357"
                      onClick={handlePhoneClick}
                      className="text-slate-200 hover:text-orange-400 transition-colors font-medium"
                    >
                      +91-9742189357
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-orange-400" />
                    <span className="text-slate-200">Bengaluru, Karnataka</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-5 h-5 text-orange-400" />
                    <a 
                      href="https://linkedin.com/in/subharajdas"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkedInClick}
                      className="text-slate-200 hover:text-orange-400 transition-colors font-medium"
                    >
                      linkedin.com/in/subharajdas
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center sm:justify-start">
                <Button 
                  onClick={handleDownloadResume}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 font-semibold hover:from-orange-600 hover:to-orange-700 shadow-[0_10px_30px_rgba(249,115,22,0.35)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.45)] transition-all duration-300 hover:-translate-y-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_25px_60px_rgba(249,115,22,0.45)] border-4 border-orange-500/30 hover:shadow-[0_30px_80px_rgba(249,115,22,0.6)] transition-all duration-300 hover:scale-105">
              <img 
                src={profileImage} 
                alt="Subharaj Das - Operations & Customer Excellence Leader" 
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 20%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
