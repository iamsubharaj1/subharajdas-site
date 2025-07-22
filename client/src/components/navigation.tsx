import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/95 backdrop-blur-sm'} border-b border-slate-200`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl text-primary">Subharaj Das</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-secondary hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-secondary hover:text-primary transition-colors"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-secondary hover:text-primary transition-colors"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-secondary hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('linkedin-showcase')}
              className="text-secondary hover:text-primary transition-colors"
            >
              LinkedIn
            </button>
            <button 
              onClick={() => scrollToSection('craftpost')}
              className="text-secondary hover:text-primary transition-colors"
            >
              CraftPost
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left py-2 text-secondary hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="block w-full text-left py-2 text-secondary hover:text-primary transition-colors"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="block w-full text-left py-2 text-secondary hover:text-primary transition-colors"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left py-2 text-secondary hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('linkedin-showcase')}
              className="block w-full text-left py-2 text-secondary hover:text-primary transition-colors"
            >
              LinkedIn
            </button>
            <button 
              onClick={() => scrollToSection('craftpost')}
              className="block w-full text-left py-2 text-secondary hover:text-primary transition-colors"
            >
              CraftPost
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
