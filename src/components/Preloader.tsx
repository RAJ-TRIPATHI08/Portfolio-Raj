"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerating progress
        const increment = prev < 70 ? 3 : prev < 90 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    // Hide preloader after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          {/* Background ambient glows */}
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-accent-blue/10 blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-accent-purple/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-gradient font-sans">
              RAJ TRIPATHI
            </h1>
            <p className="text-xs font-mono text-foreground/40 mt-2 tracking-widest uppercase">
              Portfolio Loading
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-48 sm:w-64"
          >
            <div className="h-1 w-full bg-foreground/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-mono text-foreground/30">Loading assets</span>
              <span className="text-[10px] font-mono text-accent-blue">{progress}%</span>
            </div>
          </motion.div>

          {/* Decorative spinning ring */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 0.3 }}
            className="absolute w-80 h-80 border border-accent-blue/20 rounded-full animate-spin-slow"
            style={{ animationDuration: '12s' }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.4 }}
            className="absolute w-[28rem] h-[28rem] border border-accent-purple/15 rounded-full animate-spin-slow"
            style={{ animationDuration: '18s', animationDirection: 'reverse' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
