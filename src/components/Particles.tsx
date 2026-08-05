"use client";

import { useEffect, useRef } from "react";

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 160 };

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;
      colorIndex: number;
      pulseOffset: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.baseSize = Math.random() * 2.5 + 0.5;
        this.size = this.baseSize;
        this.colorIndex = Math.random() > 0.5 ? 0 : 1; // 0=blue/cyan, 1=purple
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(w: number, h: number, time: number) {
        // Ambient floating
        this.baseX += this.vx;
        this.baseY += this.vy;

        if (this.baseX < 0 || this.baseX > w) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > h) this.vy *= -1;

        // Mouse repulsion — push away smoothly
        const dx = mouse.x - this.baseX;
        const dy = mouse.y - this.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          const pushX = (dx / dist) * force * 3;
          const pushY = (dy / dist) * force * 3;
          this.x = this.baseX - pushX * 15;
          this.y = this.baseY - pushY * 15;
        } else {
          // Spring back to base position
          this.x += (this.baseX - this.x) * 0.08;
          this.y += (this.baseY - this.y) * 0.08;
        }

        // Size pulsing
        this.size = this.baseSize + Math.sin(time * 0.002 + this.pulseOffset) * 0.5;
      }

      draw(c: CanvasRenderingContext2D, colors: string[]) {
        c.beginPath();
        c.arc(this.x, this.y, Math.max(this.size, 0.3), 0, Math.PI * 2);
        c.fillStyle = colors[this.colorIndex];
        c.fill();
      }
    }

    const init = () => {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);
      particles = [];
      const density = Math.floor((w * h) / 12000);
      const particleCount = Math.min(density, 140);

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    init();

    const animate = (time: number) => {
      const isLight = document.documentElement.classList.contains("light");

      const dotColors = isLight
        ? ["rgba(79, 70, 229, 0.2)", "rgba(168, 85, 247, 0.15)"]
        : ["rgba(6, 182, 212, 0.35)", "rgba(139, 92, 246, 0.3)"];

      const lineColor = isLight
        ? "rgba(99, 102, 241, 0.06)"
        : "rgba(139, 92, 246, 0.07)";

      const mouseLineColor = isLight
        ? "rgba(79, 70, 229, 0.12)"
        : "rgba(6, 182, 212, 0.15)";

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update(canvas.width, canvas.height, time);
        p.draw(ctx, dotColors);
      });

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.6 * (1 - dist / 110);
            ctx.stroke();
          }
        }

        // Draw constellation lines to cursor
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius * 1.2) {
          const opacity = 1 - dist / (mouse.radius * 1.2);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = mouseLineColor;
          ctx.lineWidth = opacity * 1.2;
          ctx.globalAlpha = opacity * 0.7;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-container" />;
}
