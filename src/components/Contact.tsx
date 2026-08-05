"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Linkedin, Github, Send, CheckCircle, Code, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Confetti particle component
function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;

  const colors = ['#6366f1', '#06b6d4', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            left: '50%',
            top: '40%',
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 200 - 50,
            scale: 0,
            opacity: 0,
            rotate: Math.random() * 720,
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.5,
            ease: "easeOut",
            delay: i * 0.02,
          }}
        />
      ))}
    </div>
  );
}

// Floating label input
function FloatingInput({ label, id, type = "text", required, value, onChange }: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 pt-6 pb-2 rounded-xl border border-card-border bg-foreground/[0.02] text-foreground outline-none input-glow font-sans peer"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isActive
            ? 'top-2 text-[10px] font-semibold text-accent-blue'
            : 'top-1/2 -translate-y-1/2 text-sm text-foreground/40'
        }`}
      >
        {label}{required && ' *'}
      </label>
    </div>
  );
}

// Floating label textarea
function FloatingTextarea({ label, id, required, value, onChange, rows = 5 }: {
  label: string;
  id: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 pt-6 pb-2 rounded-xl border border-card-border bg-foreground/[0.02] text-foreground outline-none input-glow font-sans resize-none peer"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isActive
            ? 'top-2 text-[10px] font-semibold text-accent-blue'
            : 'top-4 text-sm text-foreground/40'
        }`}
      >
        {label}{required && ' *'}
      </label>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setShowConfetti(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setShowConfetti(false), 2000);
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  const contactDetails = [
    {
      icon: <Mail className="text-accent-blue" size={20} />,
      label: "Email",
      value: "rajtripathi080@gmail.com",
      href: "mailto:rajtripathi080@gmail.com"
    },
    {
      icon: <Linkedin className="text-indigo-400" size={20} />,
      label: "LinkedIn",
      value: "linkedin.com/in/raj-tripathi-ab341a372",
      href: "https://linkedin.com/in/raj-tripathi-ab341a372"
    },
    {
      icon: <Github className="text-foreground/80" size={20} />,
      label: "GitHub",
      value: "github.com/RAJ-TRIPATHI08",
      href: "https://github.com/RAJ-TRIPATHI08/"
    }
  ];

  const codingHandles = [
    {
      name: "LeetCode",
      value: "rajtripathi08",
      url: "https://leetcode.com/u/rajtripathi08/",
      color: "hover:text-[#ffa116] hover:border-[#ffa116]/30"
    },
    {
      name: "Codeforces",
      value: "rajpandit08",
      url: "https://codeforces.com/profile/rajpandit08",
      color: "hover:text-[#e53e3e] hover:border-[#e53e3e]/30"
    },
    {
      name: "Coding Ninjas",
      value: "RajTripathiJi",
      url: "https://www.naukri.com/code360/profile/RajTripathiJi",
      color: "hover:text-[#f27011] hover:border-[#f27011]/30"
    },
    {
      name: "GeeksforGeeks",
      value: "rajtripz5vn",
      url: "https://www.geeksforgeeks.org/profile/rajtripz5vn?tab=activity",
      color: "hover:text-[#2f8d46] hover:border-[#2f8d46]/30"
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight sm:text-5xl"
        >
          Get in <span className="text-gradient">Touch</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto"
        >
          Have an opportunity, a question, or want to work together? Let&apos;s build something great.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 h-1.5 w-16 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full origin-center"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="glass-panel shimmer-border p-8 rounded-3xl border border-card-border space-y-6">
            <h3 className="text-xl font-bold text-foreground/90 relative z-10">Contact Details</h3>
            <p className="text-sm text-foreground/65 leading-relaxed relative z-10">
              Feel free to connect with me directly through these channels. I typically respond within 24 hours.
            </p>

            <div className="space-y-4 relative z-10">
              {contactDetails.map((detail, idx) => (
                <motion.a
                  key={idx}
                  href={detail.href}
                  target={detail.label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-foreground/[0.02] border border-card-border hover:border-accent-blue/30 transition-all hover:bg-foreground/[0.04]"
                >
                  <div className="p-2.5 rounded-xl bg-foreground/[0.03] border border-card-border">
                    {detail.icon}
                  </div>
                  <div>
                    <span className="text-xs text-foreground/45 block">{detail.label}</span>
                    <span className="text-sm font-semibold text-foreground/80 font-mono mt-0.5 inline-block">{detail.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Coding handles quick links */}
          <div className="glass-panel shimmer-border p-8 rounded-3xl border border-card-border space-y-6">
            <h3 className="text-xl font-bold text-foreground/90 relative z-10">Competitive Profiles</h3>
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {codingHandles.map((handle, idx) => (
                <motion.a
                  key={idx}
                  href={handle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  whileHover={{ y: -3 }}
                  className={`flex flex-col p-4 rounded-2xl bg-foreground/[0.02] border border-card-border transition-all hover:bg-foreground/[0.04] group ${handle.color}`}
                >
                  <span className="text-xs text-foreground/45">{handle.name}</span>
                  <span className="text-sm font-bold font-mono mt-1 group-hover:underline truncate">{handle.value}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Message Form Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="glass-panel shimmer-border p-8 sm:p-10 rounded-3xl border border-card-border relative overflow-hidden">
            <h3 className="text-xl font-bold text-foreground/90 mb-6 relative z-10">Send Message</h3>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-10 space-y-4 relative"
                >
                  <ConfettiBurst active={showConfetti} />
                  <motion.div
                    className="p-4 rounded-full bg-accent-blue/10 text-accent-cyan border border-accent-blue/20"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <CheckCircle size={44} />
                  </motion.div>
                  <h4 className="text-xl font-bold text-foreground/90">Message Sent!</h4>
                  <p className="text-sm text-foreground/60 max-w-sm">
                    Thank you for reaching out, Raj has received your message and will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FloatingInput
                      label="Your Name"
                      id="name"
                      required
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <FloatingInput
                      label="Your Email"
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />
                  </div>

                  <FloatingInput
                    label="Subject"
                    id="subject"
                    value={form.subject}
                    onChange={(v) => setForm({ ...form, subject: v })}
                  />

                  <FloatingTextarea
                    label="Message"
                    id="message"
                    required
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                  />

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-accent-blue/25 hover:shadow-xl hover:shadow-accent-blue/35 disabled:opacity-50"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "sending" ? (
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Sending message...
                      </motion.span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={15} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
