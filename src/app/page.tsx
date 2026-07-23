import Navbar from "@/components/Navbar";
import Particles from "@/components/Particles";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import DSAProfiles from "@/components/DSAProfiles";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Background Interactive Canvas Particles */}
      <Particles />

      {/* Ambient mouse glow cursor follower */}
      <CustomCursor />

      {/* Sticky Top Header Navigation */}
      <Navbar />

      <main className="flex-1 w-full relative z-10">
        {/* Hero Landing Banner */}
        <Hero />

        {/* Professional About Me Bio */}
        <About />

        {/* Dynamic Skill Badges */}
        <Skills />

        {/* Coding platform profiles stats */}
        <DSAProfiles />

        {/* Completed project display cards */}
        <Projects />

        {/* Education Details */}
        <Education />

        {/* Dynamic Form contact section */}
        <Contact />
      </main>

      {/* Social links, copyrights footer */}
      <Footer />
    </>
  );
}
