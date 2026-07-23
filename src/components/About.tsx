"use client";

import Image from "next/image";
import { Cpu, Terminal, Zap, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

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

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          About <span className="text-gradient">Me</span>
        </h2>
        <div className="mt-2 h-1.5 w-16 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Profile Image Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-72 aspect-[1228/1801] sm:w-80">
            {/* Glowing backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue to-accent-purple rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
            
            {/* Border frame */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-accent-blue via-accent-cyan to-accent-purple rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow" />
            
            {/* Actual Image container */}
            <div className="relative w-full h-full bg-background rounded-3xl overflow-hidden border-2 border-transparent">
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

          {/* Quick Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {highlightCards.map((card, i) => (
              <div 
                key={i} 
                className="glass-panel glass-panel-hover p-5 rounded-2xl flex gap-4 items-start"
              >
                <div className="p-2.5 rounded-xl bg-foreground/[0.03] border border-card-border">
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground/90">{card.title}</h4>
                  <p className="text-xs text-foreground/60 mt-1 leading-normal">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
