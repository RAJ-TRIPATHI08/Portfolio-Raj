import Navbar from "@/components/Navbar";
import Particles from "@/components/Particles";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import SideNavDots from "@/components/SideNavDots";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import DSAProfiles from "@/components/DSAProfiles";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      {/* Animated loading screen */}
      <Preloader />

      {/* Background Interactive Canvas Particles */}
      <Particles />

      {/* Custom dot + ring cursor (desktop only) */}
      <CustomCursor />

      {/* Side navigation dots (desktop only) */}
      <SideNavDots />

      {/* Sticky Top Header Navigation */}
      <Navbar />

      <main className="flex-1 w-full relative z-10">
        {/* Hero Landing Banner */}
        <Hero />

        <SectionDivider variant="wave" />

        {/* Professional About Me Bio */}
        <About />

        <SectionDivider variant="curve" />

        {/* Dynamic Skill Badges */}
        <Skills />

        <SectionDivider variant="slant" />

        {/* Coding platform profiles stats */}
        <DSAProfiles />

        <SectionDivider variant="wave" />

        {/* Key Achievements & Milestones */}
        <Achievements />

        <SectionDivider variant="curve" />

        {/* Completed project display cards */}
        <Projects />

        <SectionDivider variant="slant" />

        {/* Education Details */}
        <Education />

        <SectionDivider variant="wave" />

        {/* Dynamic Form contact section */}
        <Contact />
      </main>

      {/* Social links, copyrights footer */}
      <Footer />
    </>
  );
}
