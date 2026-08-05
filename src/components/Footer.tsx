"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      {/* Gradient separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />

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
        <div className="flex items-center gap-3">
          {[
            { href: "https://linkedin.com/in/raj-tripathi-ab341a372", icon: <Linkedin size={16} />, label: "LinkedIn" },
            { href: "https://github.com/RAJ-TRIPATHI08/", icon: <Github size={16} />, label: "GitHub" },
            { href: "https://leetcode.com/u/rajtripathi08/", icon: <Award size={16} />, label: "LeetCode" },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-card-border bg-card-bg hover:border-accent-blue/40 hover:bg-white/5 transition-colors cursor-pointer text-foreground/60 hover:text-foreground"
              aria-label={`${social.label} Profile`}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-xs text-foreground/45">
          <p>&copy; {new Date().getFullYear()} Raj Tripathi. All Rights Reserved.</p>
          <p className="mt-0.5 font-mono">Made with Next.js, TS & Tailwind CSS</p>
        </div>
      </div>

      {/* Floating back-to-top button with AnimatePresence */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 z-30 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-lg shadow-accent-blue/20 hover:shadow-xl hover:shadow-accent-blue/30 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
