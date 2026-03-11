import SiteNav from "@/components/site-nav";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import SkillsSection from "@/components/skills-section";
import TestimonialsSection from "@/components/testimonials-section";
import LinkedInShowcase from "@/components/linkedin-showcase";
import Footer from "@/components/footer";

export default function KnowSubharaj() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <TestimonialsSection />
      <LinkedInShowcase />
      <Footer />
    </div>
  );
}
