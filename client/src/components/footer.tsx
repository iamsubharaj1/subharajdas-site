import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  const handleEmailClick = () => {
    trackEvent('email_click', 'contact', 'footer_email');
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'contact', 'footer_phone');
  };

  const handleLinkedInClick = () => {
    trackEvent('linkedin_click', 'social', 'footer_linkedin');
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <a 
                  href="mailto:iamsubharaj1@gmail.com"
                  onClick={handleEmailClick}
                  className="hover:text-white transition-colors"
                >
                  iamsubharaj1@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <a 
                  href="tel:+919742189357"
                  onClick={handlePhoneClick}
                  className="hover:text-white transition-colors"
                >
                  +91-9742189357
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>Bengaluru, Karnataka</span>
              </div>
            </div>
          </div>

          {/* Professional Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Professional Links</h3>
            <div className="space-y-3">
              <div>
                <a 
                  href="https://linkedin.com/in/subharajdas"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkedInClick}
                  className="flex items-center space-x-3 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
              <div>
                <a 
                  href="https://craftpost.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors block"
                >
                  CraftPost - LinkedIn Content Tool
                </a>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-white font-semibold mb-4">Expertise</h3>
            <p className="text-sm leading-relaxed">
              B2B SaaS Operations Excellence Leader with 12+ years specializing in customer success, 
              client retention, and operations management for high-growth companies.
            </p>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 Subharaj Das. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a 
                href="https://linkedin.com/in/subharajdas" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleLinkedInClick}
                className="hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:88.srdas@gmail.com"
                onClick={handleEmailClick}
                className="hover:text-white transition-colors"
                aria-label="Email Contact"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="tel:+919739941949"
                onClick={handlePhoneClick}
                className="hover:text-white transition-colors"
                aria-label="Phone Contact"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
