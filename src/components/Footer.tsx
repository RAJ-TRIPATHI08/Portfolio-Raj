"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, MessageSquare, Award } from "lucide-react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-card-border bg-background/50 backdrop-blur-md mt-auto relative">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and info */}
        <div className="text-center md:text-left">
          <p className="text-sm font-bold text-gradient tracking-wide font-sans">
            RAJ TRIPATHI
          </p>
          <p className="text-xs text-foreground/45 mt-1 font-mono">
            Computer Science Engineer &bull; Competitive Programmer
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/raj-tripathi-ab341a372"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-card-border bg-card-bg hover:border-accent-blue/40 hover:bg-white/5 transition-colors cursor-pointer text-foreground/60 hover:text-foreground"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://github.com/RAJ-TRIPATHI08/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-card-border bg-card-bg hover:border-accent-blue/40 hover:bg-white/5 transition-colors cursor-pointer text-foreground/60 hover:text-foreground"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>
          <a
            href="https://leetcode.com/u/rajtripathi08/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-card-border bg-card-bg hover:border-accent-blue/40 hover:bg-white/5 transition-colors cursor-pointer text-foreground/60 hover:text-foreground"
            aria-label="LeetCode Profile"
          >
            <Award size={16} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-xs text-foreground/45">
          <p>&copy; {new Date().getFullYear()} Raj Tripathi. All Rights Reserved.</p>
          <p className="mt-0.5 font-mono">Made with Next.js, TS & Tailwind CSS</p>
        </div>
      </div>

      {/* Floating back-to-top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 z-30 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-lg shadow-accent-blue/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </footer>
  );
}
