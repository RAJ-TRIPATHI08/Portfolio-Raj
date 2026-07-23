"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, BookOpen, Cpu, Trophy } from "lucide-react";

export default function Education() {
  const highlights = [
    {
      icon: <Cpu className="text-accent-blue" size={20} />,
      title: "Core Curriculum",
      description: "Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems (OS), Object-Oriented Programming (OOPs), and Theory of Computation."
    },
    {
      icon: <Trophy className="text-accent-purple" size={20} />,
      title: "Problem Solving",
      description: "Solved 1,600+ algorithmic problems across LeetCode, Codeforces, Coding Ninjas, and GeeksforGeeks."
    },
    {
      icon: <BookOpen className="text-accent-cyan" size={20} />,
      title: "Academic Excellence",
      description: "Focusing on building advanced analysis capabilities, engineering standards, and robust design architectures."
    }
  ];

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          My <span className="text-gradient">Education</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto">
          Academic foundation and milestones during my Computer Science & Engineering journey.
        </p>
        <div className="mt-2 h-1.5 w-16 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Education Timeline Block */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="glass-panel p-8 rounded-3xl border border-card-border relative overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 -z-10 translate-x-10 -translate-y-10 w-28 h-28 rounded-full bg-accent-blue/10 blur-2xl" />

            <div className="flex items-center gap-3.5 mb-6">
              <div className="p-3.5 rounded-2xl bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                <GraduationCap size={28} />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-accent-blue uppercase tracking-wider">Undergraduate Program</span>
                <h3 className="text-xl font-bold text-foreground/90 mt-0.5">B.E. Computer Science</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-lg font-bold text-foreground/80">Chandigarh University</p>
                <p className="text-sm text-foreground/50">Gharuan, Punjab, India</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-card-border/50 text-xs font-mono text-foreground/60">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-accent-blue" />
                  <span>2023 - 2027 (Expected)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-accent-purple" />
                  <span>Punjab, India</span>
                </div>
              </div>

              <p className="text-sm text-foreground/65 leading-relaxed pt-2">
                Currently pursuing a Bachelor of Engineering in Computer Science & Engineering. Deeply engaged in core computer science paradigms, data structure visualizations, and full-stack web applications.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Highlights/Specialization Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-6"
        >
          <h3 className="text-2xl font-bold text-foreground/90 px-2">Academic & Practical Focus</h3>
          
          <div className="space-y-4">
            {highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-card-border flex gap-4 items-start"
              >
                <div className="p-3 rounded-xl bg-foreground/[0.02] border border-card-border/80 flex-shrink-0">
                  {highlight.icon}
                </div>
                <div>
                  <h4 className="font-bold text-foreground/90 text-base">{highlight.title}</h4>
                  <p className="text-sm text-foreground/60 mt-1.5 leading-relaxed">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
