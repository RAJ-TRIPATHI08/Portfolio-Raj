"use client";

import { motion } from "framer-motion";
import { Code, Layout, Server, Database, Wrench } from "lucide-react";

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

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Core <span className="text-gradient">Skills</span>
        </h2>
        <div className="mt-2 h-1.5 w-16 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full" />
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
            className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-card-border">
                <div className="p-2 rounded-xl bg-foreground/[0.03] border border-card-border">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground/90">{category.title}</h3>
              </div>

              {/* Skills list */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-foreground/80">{skill.name}</span>
                      <span className="text-accent-blue">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="h-2 w-full bg-foreground/[0.04] rounded-full overflow-hidden border border-card-border/50">
                      {/* Animated Progress Fill */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
