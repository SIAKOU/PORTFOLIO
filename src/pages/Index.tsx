import { Helmet } from "react-helmet-async";
import AboutSection from "@/components/AboutSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SIAKOU Komi Stanislas - Développeur Full-Stack & Expert en Cybersécurité</title>
        <meta
          name="description"
          content="Portfolio de SIAKOU Komi Stanislas, un développeur Full-Stack passionné par la cybersécurité, le développement web et l'administration réseau. Découvrez mes projets, compétences et expériences."
        />
      </Helmet>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
    </>
  );
};
export default Index;
