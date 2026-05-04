import HeroSection from "../sections/HeroSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";
import ContactSection from "../sections/ContactSection";
import AboutSection from "../sections/AboutSection";
import FAQSection from "@/sections/FAQSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <FAQSection />
      </main>
    </div>
  );
};

export default Home;
