import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Know Subharaj", href: "/knowsubharaj" },
  { label: "CraftPost", href: "/craftpost" },
  { label: "6 Point Someone", href: "/6pointsomeone" },
  { label: "Tools", href: "/tools" },
];

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWorkWithMe = (e: React.MouseEvent) => {
    // If already on homepage, smooth scroll to contact
    if (window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    // Otherwise let the href="/#contact" navigate normally
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled
        ? "bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50"
        : "bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/30"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo + Name */}
        <a href="/" className="flex items-center space-x-3 group">
          <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/30 group-hover:ring-orange-500/60 transition-all" />
          <span className="font-bold text-white text-base tracking-tight group-hover:text-orange-400 transition-colors">Subharaj Das</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={handleWorkWithMe}
            className="ml-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg hover:from-orange-400 hover:to-orange-500 transition-all shadow-[0_2px_12px_rgba(249,115,22,0.35)]"
          >
            Work With Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/98 border-t border-slate-700/50 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={(e) => { handleWorkWithMe(e); setIsOpen(false); }}
            className="block mt-2 px-3 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg text-center"
          >
            Work With Me
          </a>
        </div>
      )}
    </nav>
  );
}
