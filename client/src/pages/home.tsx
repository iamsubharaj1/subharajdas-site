import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import SkillsSection from "@/components/skills-section";
import TestimonialsSection from "@/components/testimonials-section";
import LinkedInShowcase from "@/components/linkedin-showcase";
import CraftPostSection from "@/components/craftpost-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <TestimonialsSection />
      <LinkedInShowcase />
      <CraftPostSection />
      <Footer />
    </div>
  );
}
