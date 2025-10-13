import { Download, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import profileImage from "@assets/profile-new.png";
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
    <section id="home" className="pt-20 min-h-screen bg-gradient-to-br from-primary to-blue-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Operations Excellence & Customer Success
                <span className="text-blue-200"> Leader</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 font-light">
                12+ Yrs | ₹2Cr MRR | Customer & Process Excellence | Operations | Driving Revenue Growth, Scalable CX, Retention & Revenue | 121% Revenue Uplift | 35–90% Efficiency Gains | GEN AI and Chatbots with Agents | OKR Playbooks
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

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-100">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-200" />
                    <a 
                      href="mailto:iamsubharaj1@gmail.com"
                      onClick={handleEmailClick}
                      className="text-white hover:text-blue-200 transition-colors font-medium"
                    >
                      iamsubharaj1@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-200" />
                    <a 
                      href="tel:+919742189357"
                      onClick={handlePhoneClick}
                      className="text-white hover:text-blue-200 transition-colors font-medium"
                    >
                      +91-9742189357
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-200" />
                    <span className="text-white">Bengaluru, Karnataka</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-5 h-5 text-blue-200" />
                    <a 
                      href="https://linkedin.com/in/subharajdas"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkedInClick}
                      className="text-white hover:text-blue-200 transition-colors font-medium"
                    >
                      linkedin.com/in/subharajdas
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center sm:justify-start">
                <Button 
                  onClick={handleDownloadResume}
                  className="bg-white text-primary px-8 py-3 font-semibold hover:bg-blue-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl border-4 border-white/20">
              <img 
                src={profileImage} 
                alt="Subharaj Das - Operations & Customer Excellence Leader" 
                className="w-full h-full object-cover object-center scale-110"
                style={{ objectPosition: '50% 40%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
