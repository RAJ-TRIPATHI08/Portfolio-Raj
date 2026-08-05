"use client";

import { motion, useInView } from "framer-motion";
import { Code, Server, Wrench } from "lucide-react";
import { useRef, useCallback } from "react";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: <Code className="text-accent-blue" size={20} />,
    skills: [
      { name: "C++", level: 85 },
      { name: "JavaScript (ES6+)", level: 80 },
      { name: "Python", level: 75 },
      { name: "HTML5 & CSS3", level: 90 },
    ],
  },
  {
    title: "Development & Frameworks",
    icon: <Server className="text-accent-purple" size={20} />,
    skills: [
      { name: "React.js", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 80 },
      { name: "MongoDB / SQL", level: 75 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="text-accent-cyan" size={20} />,
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code / Linux", level: 85 },
      { name: "RESTful APIs", level: 80 },
    ],
  },
];

// Radial progress ring component
function RadialRing({ level, name, delay }: { level: number; name: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-4 group cursor-default"
    >
      {/* SVG Ring */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <svg className="radial-progress-ring w-full h-full" viewBox="0 0 80 80">
          {/* Background track */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-foreground/[0.05]"
            strokeWidth="5"
          />
          {/* Progress arc */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isInView ? offset : circumference}
            className="drop-shadow-[0_0_6px_rgba(99,102,241,0.3)] group-hover:drop-shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-[filter] duration-300"
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-blue)" />
              <stop offset="100%" stopColor="var(--accent-purple)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold font-mono text-accent-blue group-hover:scale-110 transition-transform duration-300">
            {level}%
          </span>
        </div>
      </div>

      {/* Skill name */}
      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
        {name}
      </span>
    </motion.div>
  );
}

// Spotlight card with mouse tracking
function SkillCard({ children, className }: { children: React.ReactNode; className?: string }) {
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

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight sm:text-5xl"
        >
          Core <span className="text-gradient">Skills</span>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 h-1.5 w-16 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full origin-center"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {SKILL_CATEGORIES.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            variants={itemVariants}
          >
            <SkillCard
              className="glass-panel glass-panel-hover shimmer-border p-6 rounded-2xl flex flex-col justify-between h-full"
            >
              <div className="relative z-10">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-card-border">
                  <div className="p-2 rounded-xl bg-foreground/[0.03] border border-card-border">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground/90">{category.title}</h3>
                </div>

                {/* Radial progress rings */}
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <RadialRing
                      key={skillIndex}
                      level={skill.level}
                      name={skill.name}
                      delay={skillIndex * 0.1}
                    />
                  ))}
                </div>
              </div>
            </SkillCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
