"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "wave" | "curve" | "slant";
  flip?: boolean;
}

export default function SectionDivider({ variant = "wave", flip = false }: SectionDividerProps) {
  const paths = {
    wave: [
      "M0,40 C150,80 350,0 500,40 C650,80 850,0 1000,40 L1000,100 L0,100 Z",
      "M0,45 C150,75 350,5 500,45 C650,75 850,5 1000,45 L1000,100 L0,100 Z",
    ],
    curve: [
      "M0,60 Q250,0 500,50 Q750,100 1000,40 L1000,100 L0,100 Z",
      "M0,55 Q250,10 500,55 Q750,90 1000,35 L1000,100 L0,100 Z",
    ],
    slant: [
      "M0,70 L400,30 L600,50 L1000,20 L1000,100 L0,100 Z",
      "M0,65 L400,35 L600,45 L1000,25 L1000,100 L0,100 Z",
    ],
  };

  const [path1, path2] = paths[variant];

  return (
    <div
      className="section-divider pointer-events-none select-none"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`dividerGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--accent-cyan)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Animated morphing path */}
        <motion.path
          fill={`url(#dividerGrad-${variant})`}
          initial={{ d: path1 }}
          animate={{ d: [path1, path2, path1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary subtle path for depth */}
        <motion.path
          fill={`url(#dividerGrad-${variant})`}
          opacity="0.3"
          initial={{ d: path2 }}
          animate={{ d: [path2, path1, path2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}
