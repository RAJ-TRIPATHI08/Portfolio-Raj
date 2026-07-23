"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Code2, Download, Send } from "lucide-react";
import { motion } from "framer-motion";

const ROLES = ["Computer Science Student", "Competitive Programmer", "Full-Stack Developer", "Problem Solver"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentRole = ROLES[roleIndex];
    
    // Typing speed configurations
    const typeSpeed = isDeleting ? 30 : 80;
    const holdTime = 1500;

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          timer = setTimeout(() => setIsDeleting(true), holdTime);
          return;
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          return;
        }
      }

      timer = setTimeout(handleTyping, typeSpeed);
    };

    timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Dynamic glow grids in background */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute right-1/4 bottom-1/4 -z-10 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full bg-accent-purple/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="mx-auto max-w-5xl text-center">
        {/* Animated tag */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-accent-blue mb-6 backdrop-blur-md"
        >
          <Code2 size={14} className="animate-spin-slow" />
          <span>Welcome to my digital space</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl font-sans"
        >
          Hi, I&apos;m <span className="text-gradient">Raj Tripathi</span>
        </motion.h1>

        {/* Typing roles */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 min-h-[40px] text-lg sm:text-2xl md:text-3xl font-medium text-foreground/80 font-mono"
        >
          I am a <span className="text-accent-cyan font-semibold caret-blink">{displayText}</span>
        </motion.div>

        {/* Short elevator description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-foreground/60 leading-relaxed"
        >
          I am a passionate Computer Science & Engineering student specializing in full-stack web development and algorithm optimization. I love solving puzzles on competitive programming platforms and turning ideas into robust, scalable applications.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => handleScrollTo("projects")}
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-8 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.03] cursor-pointer active:scale-[0.98] shadow-lg shadow-accent-blue/25"
          >
            <span>View Projects</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => handleScrollTo("contact")}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-accent-blue/45 hover:bg-white/5 cursor-pointer active:scale-[0.98] backdrop-blur-md"
          >
            <span>Contact Me</span>
            <Send size={15} />
          </button>
          
          <a
            href="https://github.com/RAJ-TRIPATHI08"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-accent-purple/45 hover:bg-white/5 cursor-pointer active:scale-[0.98] backdrop-blur-md"
          >
            <span>Download Resume</span>
            <Download size={15} />
          </a>
        </motion.div>
      </div>

      {/* Floating vector SVGs for developer vibe */}
      <div className="absolute bottom-10 left-10 hidden xl:block animate-float text-accent-blue/20">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>
      <div className="absolute top-20 right-20 hidden xl:block animate-float-delayed text-accent-purple/20">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </div>
    </section>
  );
}
