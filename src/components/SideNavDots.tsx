"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "dsa", label: "DSA Stats" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function SideNavDots() {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      setIsVisible(window.scrollY > 400);

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcuts: 1-6 to jump to sections
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) return;

      const num = parseInt(e.key);
      if (num >= 1 && num <= SECTIONS.length) {
        const section = SECTIONS[num - 1];
        const el = document.getElementById(section.id);
        if (el) {
          window.scrollTo({
            top: el.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3"
    >
      {SECTIONS.map((section, index) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className="group relative flex items-center justify-center p-1"
          aria-label={`Go to ${section.label}`}
        >
          {/* Tooltip label */}
          <span className="absolute right-8 px-2.5 py-1 rounded-lg bg-background/90 border border-card-border text-xs font-medium text-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap backdrop-blur-md shadow-lg">
            {section.label}
            <span className="ml-1.5 text-foreground/30 font-mono text-[10px]">{index + 1}</span>
          </span>

          {/* Dot */}
          <div className="relative">
            {activeSection === section.id ? (
              <motion.div
                layoutId="active-dot"
                className="w-3 h-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple shadow-md shadow-accent-blue/30"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            ) : (
              <div className="w-2 h-2 rounded-full bg-foreground/20 group-hover:bg-foreground/40 transition-all duration-200 group-hover:scale-125" />
            )}

            {/* Active glow ring */}
            {activeSection === section.id && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -inset-1.5 rounded-full border border-accent-blue/30"
              />
            )}
          </div>
        </button>
      ))}

      {/* Connecting line */}
      <div className="absolute top-2 bottom-2 w-px bg-foreground/[0.06] -z-10" />
    </motion.div>
  );
}
