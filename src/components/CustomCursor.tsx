"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const updatePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Dot follows instantly
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    // Smooth ring follow with spring-like delay
    let rafId: number;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      const size = isHovering ? 56 : 36;
      const offset = size / 2;
      ring.style.transform = `translate(${ringX - offset}px, ${ringY - offset}px)`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;

      rafId = requestAnimationFrame(animateRing);
    };

    // Detect hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.glass-panel-hover') ||
        target.closest('.tilt-card')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.glass-panel-hover') ||
        target.closest('.tilt-card')
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, isHovering]);

  return (
    <>
      {/* Ambient background glow - kept from original */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: isVisible
            ? `radial-gradient(600px at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(139, 92, 246, 0.04), rgba(59, 130, 246, 0.04), transparent 80%)`
            : 'none',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[60] hidden md:block"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isHovering
            ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))'
            : 'var(--accent-cyan)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease, background 0.2s ease',
          mixBlendMode: 'difference' as const,
        }}
      />

      {/* Ring cursor */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[59] hidden md:block"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: isClicking
            ? '2px solid var(--accent-purple)'
            : isHovering
              ? '2px solid var(--accent-blue)'
              : '1.5px solid rgba(139, 92, 246, 0.3)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, border 0.2s ease',
          background: isHovering ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
          transform: isClicking ? 'scale(0.85)' : 'scale(1)',
        }}
      />
    </>
  );
}
