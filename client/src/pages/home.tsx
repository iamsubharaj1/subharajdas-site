import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import SkillsSection from "@/components/skills-section";
import TestimonialsSection from "@/components/testimonials-section";
import LinkedInShowcase from "@/components/linkedin-showcase";
import FloatingCraftPost from "@/components/floating-craftpost";
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
      <Footer />
      <FloatingCraftPost />
    </div>
  );
}
