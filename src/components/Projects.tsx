"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Database, Network, Terminal } from "lucide-react";

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

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto">
          A showcase of engineering work, covering full-stack network platforms, algorithm visualizers, and data dashboards.
        </p>
        <div className="mt-2 h-1.5 w-16 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-panel group rounded-2xl border border-card-border p-6 relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-accent-blue/30"
          >
            {/* Ambient Background Glow */}
            <div 
              className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[40px] opacity-40 transition-opacity duration-300 group-hover:opacity-75"
              style={{ backgroundColor: project.bgGlow }}
            />

            <div>
              {/* Project Top Section: Visual Schematic & Title */}
              <div className="h-44 w-full rounded-xl bg-foreground/[0.02] border border-card-border flex items-center justify-center relative overflow-hidden group-hover:bg-foreground/[0.04] transition-colors mb-6">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                <div className="p-5 rounded-full bg-background/80 border border-card-border shadow-lg transition-transform duration-300 group-hover:scale-110">
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

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-5">
                {project.tech.map((t, idx) => (
                  <span 
                    key={idx} 
                    className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-foreground/[0.03] border border-card-border text-foreground/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-8">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl border border-card-border bg-card-bg hover:bg-white/5 transition-all text-xs font-semibold text-foreground/90 cursor-pointer"
              >
                <Github size={14} />
                <span>Repository</span>
              </a>
              <a
                href={project.demo}
                className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple hover:opacity-90 transition-all text-xs font-semibold text-white cursor-pointer"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
