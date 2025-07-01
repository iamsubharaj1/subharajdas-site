import { Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Subharaj Das. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://linkedin.com/in/srdas88" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:88.srdas@gmail.com"
              className="hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="tel:+917406235550"
              className="hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
