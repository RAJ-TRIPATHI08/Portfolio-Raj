"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowRight, Code2, Download, Send, Trophy, Briefcase, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";

const ROLES = ["Computer Science Student", "Competitive Programmer", "Full-Stack Developer", "Problem Solver"];

// Magnetic button component
function MagneticButton({ children, className, onClick, href, target, rel }: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    setPosition({ x: deltaX, y: deltaY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
      className={className}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </Tag>
  );
}

// Counter component
function AnimatedCounter({ target, suffix = "", label, icon }: {
  target: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 p-4">
      <div className="p-2 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue mb-1">
        {icon}
      </div>
      <span className="text-2xl sm:text-3xl font-extrabold text-foreground/95 font-mono">
        {count}{suffix}
      </span>
      <span className="text-xs text-foreground/50 font-medium">{label}</span>
    </div>
  );
}

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

  // Staggered word animation
  const headlineWords = ["Hi,", "I'm"];
  const wordVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Dynamic glow grids in background */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute right-1/4 bottom-1/4 -z-10 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full bg-accent-purple/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="mx-auto max-w-5xl text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-accent-blue mb-4 backdrop-blur-md"
        >
          <Code2 size={14} className="animate-spin-slow" />
          <span>Welcome to my digital space</span>
        </motion.div>

        {/* Open to Work badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 px-4 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span>Open to Internships & Collaborations</span>
          </div>
        </motion.div>

        {/* Staggered Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl font-sans">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block mr-3"
              style={{ perspective: '600px' }}
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="text-gradient inline-block"
          >
            Raj Tripathi
          </motion.span>
        </h1>

        {/* Typing roles */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 min-h-[40px] text-lg sm:text-2xl md:text-3xl font-medium text-foreground/80 font-mono"
        >
          I am a <span className="text-accent-cyan font-semibold caret-blink">{displayText}</span>
        </motion.div>

        {/* Short elevator description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-foreground/60 leading-relaxed"
        >
          I am a passionate Computer Science & Engineering student specializing in full-stack web development and algorithm optimization. I love solving puzzles on competitive programming platforms and turning ideas into robust, scalable applications.
        </motion.p>

        {/* CTAs - Magnetic Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={() => handleScrollTo("projects")}
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-8 py-3.5 text-sm font-semibold text-white cursor-pointer active:scale-[0.98] shadow-lg shadow-accent-blue/25 hover:shadow-xl hover:shadow-accent-blue/30"
          >
            <span>View Projects</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          
          <MagneticButton
            onClick={() => handleScrollTo("contact")}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-8 py-3.5 text-sm font-semibold text-foreground hover:border-accent-blue/45 hover:bg-white/5 cursor-pointer active:scale-[0.98] backdrop-blur-md"
          >
            <span>Contact Me</span>
            <Send size={15} />
          </MagneticButton>
          
          <MagneticButton
            href="https://github.com/RAJ-TRIPATHI08"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-8 py-3.5 text-sm font-semibold text-foreground hover:border-accent-purple/45 hover:bg-white/5 cursor-pointer active:scale-[0.98] backdrop-blur-md"
          >
            <span>Download Resume</span>
            <Download size={15} />
          </MagneticButton>
        </motion.div>

        {/* Animated Stat Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 grid grid-cols-3 gap-2 sm:gap-6 max-w-lg mx-auto glass-panel rounded-2xl border border-card-border p-2 sm:p-4"
        >
          <AnimatedCounter
            target={500}
            suffix="+"
            label="Problems Solved"
            icon={<Trophy size={18} />}
          />
          <AnimatedCounter
            target={3}
            suffix="+"
            label="Projects Built"
            icon={<Briefcase size={18} />}
          />
          <AnimatedCounter
            target={1800}
            suffix="+"
            label="LC Rating"
            icon={<Star size={18} />}
          />
        </motion.div>
      </div>

      {/* Floating vector SVGs with parallax */}
      <motion.div
        className="absolute bottom-10 left-10 hidden xl:block text-accent-blue/20"
        animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-20 right-20 hidden xl:block text-accent-purple/20"
        animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      </motion.div>

      {/* Extra floating element */}
      <motion.div
        className="absolute top-1/3 left-[8%] hidden xl:block text-accent-cyan/15"
        animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </motion.div>
    </section>
  );
}
