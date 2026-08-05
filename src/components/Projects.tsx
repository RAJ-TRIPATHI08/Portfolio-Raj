"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Database, Network, Terminal } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  icon: React.ReactNode;
  bgGlow: string;
}

const PROJECTS: Project[] = [
  {
    title: "DevConnect Hub",
    description: "A professional network platform for developers featuring live chat, profile customization, project sharing, and peer review sections.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com/RAJ-TRIPATHI08",
    demo: "#",
    icon: <Network className="text-blue-400" size={32} />,
    bgGlow: "rgba(59, 130, 246, 0.1)"
  },
  {
    title: "Sorting & Pathfinding Visualizer",
    description: "Interactive web tool to visualize algorithms like QuickSort, MergeSort, Dijkstra's, and A* search. Great for learning algorithm flows.",
    tech: ["HTML5", "Vanilla CSS", "JavaScript"],
    github: "https://github.com/RAJ-TRIPATHI08",
    demo: "#",
    icon: <Terminal className="text-cyan-400" size={32} />,
    bgGlow: "rgba(6, 182, 212, 0.1)"
  },
  {
    title: "Cryptoverse Dashboard",
    description: "Real-time cryptocurrency statistics tracker offering detailed coin analysis, interactive charts, and live financial news integrations.",
    tech: ["React", "Chart.js", "Tailwind CSS", "RapidAPI"],
    github: "https://github.com/RAJ-TRIPATHI08",
    demo: "#",
    icon: <Database className="text-purple-400" size={32} />,
    bgGlow: "rgba(168, 85, 247, 0.1)"
  }
];

// 3D Tilt card component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt({ x: rotateX, y: rotateY });
    setShinePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });

    // Also set spotlight
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card card-spotlight ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Shine sweep overlay */}
      <div
        className="tilt-shine"
        style={{
          background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight sm:text-5xl"
        >
          Featured <span className="text-gradient">Projects</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto"
        >
          A showcase of engineering work, covering full-stack network platforms, algorithm visualizers, and data dashboards.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 h-1.5 w-16 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full origin-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
          >
            <TiltCard
              className="glass-panel group rounded-2xl border border-card-border p-6 relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-accent-blue/30 h-full"
            >
              {/* Ambient Background Glow */}
              <div 
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[40px] opacity-40 transition-opacity duration-300 group-hover:opacity-75"
                style={{ backgroundColor: project.bgGlow }}
              />

              <div className="relative z-10">
                {/* Project Top Section: Visual Schematic & Title */}
                <div className="h-44 w-full rounded-xl bg-foreground/[0.02] border border-card-border flex items-center justify-center relative overflow-hidden group-hover:bg-foreground/[0.04] transition-colors mb-6">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

                  {/* Subtle matrix/code rain effect */}
                  <div className="absolute inset-0 overflow-hidden opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute font-mono text-[10px] text-accent-blue/80 leading-tight select-none whitespace-nowrap"
                        style={{ left: `${15 + i * 14}%`, top: '-20%' }}
                        animate={{ y: ['0%', '120%'] }}
                        transition={{
                          duration: 4 + i * 0.5,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: i * 0.7,
                        }}
                      >
                        {'01'.repeat(20).split('').join('\n')}
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-5 rounded-full bg-background/80 border border-card-border shadow-lg transition-transform duration-300 group-hover:scale-110 relative z-10">
                    {project.icon}
                  </div>

                  {/* SVG Code-like Grid pattern inside preview */}
                  <div className="absolute bottom-2 left-3 font-mono text-[9px] text-foreground/20 leading-none select-none">
                    {"const port = process.env.PORT || 8080;"}
                    <br />
                    {"server.listen(port, () => console.log('Up'));"}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground/90 group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-foreground/60 leading-relaxed min-h-[70px]">
                  {project.description}
                </p>

                {/* Tech Stack — floating tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tech.map((t, idx) => (
                    <motion.span
                      key={idx}
                      className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-foreground/[0.03] border border-card-border text-foreground/75"
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.3,
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-8 relative z-10">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl border border-card-border bg-card-bg hover:bg-white/5 hover:border-accent-blue/30 transition-all text-xs font-semibold text-foreground/90 cursor-pointer"
                >
                  <Github size={14} />
                  <span>Repository</span>
                </a>
                <a
                  href={project.demo}
                  className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple hover:opacity-90 transition-all text-xs font-semibold text-white cursor-pointer shadow-md shadow-accent-blue/20 hover:shadow-lg hover:shadow-accent-blue/30"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
