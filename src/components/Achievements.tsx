"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Award, Target, Flame, Crown, Zap } from "lucide-react";
import { useCallback, useRef } from "react";

const ACHIEVEMENTS = [
  {
    icon: <Trophy className="text-[#ffa116]" size={28} />,
    title: "LeetCode Knight",
    description: "Achieved 1800+ contest rating, placing in Top 7.8% globally among competitive programmers.",
    metric: "1800+",
    metricLabel: "Rating",
    gradient: "from-[#ffa116]/20 to-[#f97316]/5",
    borderColor: "border-[#ffa116]/25",
  },
  {
    icon: <Flame className="text-red-400" size={28} />,
    title: "500+ Problems Solved",
    description: "Solved over 500 algorithmic problems across multiple platforms including LeetCode, GFG, and Coding Ninjas.",
    metric: "500+",
    metricLabel: "Solved",
    gradient: "from-red-500/15 to-orange-500/5",
    borderColor: "border-red-500/20",
  },
  {
    icon: <Target className="text-accent-blue" size={28} />,
    title: "Multi-Platform Presence",
    description: "Active competitive programming profiles on 4 major platforms — LeetCode, Codeforces, Coding Ninjas, and GeeksforGeeks.",
    metric: "4",
    metricLabel: "Platforms",
    gradient: "from-accent-blue/15 to-cyan-500/5",
    borderColor: "border-accent-blue/20",
  },
  {
    icon: <Crown className="text-yellow-400" size={28} />,
    title: "Coding Ninjas Gold",
    description: "Earned the prestigious Ninja Gold badge at Level 8, demonstrating mastery across data structures topics.",
    metric: "Level 8",
    metricLabel: "Rank",
    gradient: "from-yellow-400/15 to-amber-500/5",
    borderColor: "border-yellow-400/20",
  },
  {
    icon: <Star className="text-accent-purple" size={28} />,
    title: "Full-Stack Builder",
    description: "Built and deployed 3+ full-stack projects using React, Node.js, MongoDB, and modern web technologies.",
    metric: "3+",
    metricLabel: "Projects",
    gradient: "from-accent-purple/15 to-pink-500/5",
    borderColor: "border-accent-purple/20",
  },
  {
    icon: <Zap className="text-accent-cyan" size={28} />,
    title: "GFG Institute Top 10",
    description: "Ranked in the Top 10 at institute level on GeeksforGeeks with a contest rating of 1545.",
    metric: "Top 10",
    metricLabel: "Institute",
    gradient: "from-accent-cyan/15 to-teal-500/5",
    borderColor: "border-accent-cyan/20",
  },
];

function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} className={`card-spotlight ${className}`}>
      {children}
    </div>
  );
}

export default function Achievements() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight sm:text-5xl"
        >
          Key <span className="text-gradient">Achievements</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto"
        >
          Milestones and accomplishments that define my competitive programming and development journey.
        </motion.p>
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
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {ACHIEVEMENTS.map((achievement, index) => (
          <motion.div key={index} variants={cardVariants}>
            <SpotlightCard
              className={`glass-panel shimmer-border p-6 rounded-2xl border ${achievement.borderColor} bg-gradient-to-br ${achievement.gradient} h-full flex flex-col justify-between relative overflow-hidden group`}
            >
              {/* Background accent circle */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-foreground/[0.02] group-hover:bg-foreground/[0.04] transition-colors duration-300" />

              <div className="relative z-10">
                {/* Icon + Metric */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-foreground/[0.03] border border-card-border">
                    {achievement.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-foreground/90 font-mono block">
                      {achievement.metric}
                    </span>
                    <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-medium">
                      {achievement.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-foreground/90 mt-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-foreground/55 mt-2 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
