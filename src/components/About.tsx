"use client";

import Image from "next/image";
import { Cpu, Terminal, Zap, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useRef } from "react";

// Spotlight card that tracks mouse position
function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
}

export default function About() {
  const highlightCards = [
    {
      icon: <Terminal className="text-accent-blue" size={24} />,
      title: "Problem Solver",
      description: "Passionate about Data Structures & Algorithms, actively participating in competitive programming contests."
    },
    {
      icon: <Cpu className="text-accent-purple" size={24} />,
      title: "Full-Stack Developer",
      description: "Building responsive web applications and full-stack solutions using React, Node.js, and modern databases."
    },
    {
      icon: <Zap className="text-accent-cyan" size={24} />,
      title: "Fast Learner",
      description: "Quickly adaptable to new technologies, engineering standards, and robust design architectures."
    },
    {
      icon: <BookOpen className="text-indigo-400" size={24} />,
      title: "CS Undergrad",
      description: "Pursuing Bachelor of Engineering in Computer Science Engineering at Chandigarh University."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight sm:text-5xl"
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 h-1.5 w-16 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full origin-center"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Profile Image Column — Rotating Border */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-72 aspect-[1228/1801] sm:w-80">
            {/* Rotating conic gradient border */}
            <div className="absolute -inset-1 rotating-border rounded-3xl" />
            
            {/* Glowing blur behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue to-accent-purple rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Actual Image container */}
            <div className="relative w-full h-full bg-background rounded-3xl overflow-hidden border-2 border-transparent z-10">
              <Image
                src="/images/profile.jpg"
                alt="Raj Tripathi Profile Picture"
                fill
                priority
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 288px, 320px"
              />
            </div>
          </div>
        </motion.div>

        {/* Text Details Column */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <h3 className="text-2xl font-bold text-foreground/95">
            Hello, I am a Computer Science & Engineering Student and Competitive Programmer
          </h3>
          
          <p className="text-foreground/75 leading-relaxed">
            I am currently pursuing my Bachelor of Engineering in Computer Science Engineering at <span className="text-accent-blue font-semibold">Chandigarh University</span>. My core focus lies in web development, database systems, software engineering, and advanced algorithm paradigms. I love building responsive, user-friendly frontend interfaces and integrating them with robust backend services.
          </p>

          <p className="text-foreground/75 leading-relaxed">
            As an avid competitive programmer, I spend my spare time sharpening my problem-solving skills on various coding platforms. Facing challenging code conditions has taught me to design efficient solutions under strict time and space complexities.
          </p>

          {/* Spotlight Highlight Cards with staggered entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
          >
            {highlightCards.map((card, i) => (
              <motion.div key={i} variants={cardVariants}>
                <SpotlightCard
                  className="glass-panel glass-panel-hover shimmer-border p-5 rounded-2xl flex gap-4 items-start"
                >
                  <div className="p-2.5 rounded-xl bg-foreground/[0.03] border border-card-border relative z-10">
                    {card.icon}
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-semibold text-foreground/90">{card.title}</h4>
                    <p className="text-xs text-foreground/60 mt-1 leading-normal">{card.description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
