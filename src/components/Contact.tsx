"use client";

import { useState } from "react";
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, Code, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
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
      color: "hover:text-[#ffa116]"
    },
    {
      name: "Codeforces",
      value: "rajpandit08",
      url: "https://codeforces.com/profile/rajpandit08",
      color: "hover:text-[#e53e3e]"
    },
    {
      name: "Coding Ninjas",
      value: "RajTripathiJi",
      url: "https://www.naukri.com/code360/profile/RajTripathiJi",
      color: "hover:text-[#f27011]"
    },
    {
      name: "GeeksforGeeks",
      value: "rajtripz5vn",
      url: "https://www.geeksforgeeks.org/profile/rajtripz5vn?tab=activity",
      color: "hover:text-[#2f8d46]"
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Get in <span className="text-gradient">Touch</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto">
          Have an opportunity, a question, or want to work together? Let&apos;s build something great.
        </p>
        <div className="mt-2 h-1.5 w-16 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full" />
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
          <div className="glass-panel p-8 rounded-3xl border border-card-border space-y-6">
            <h3 className="text-xl font-bold text-foreground/90">Contact Details</h3>
            <p className="text-sm text-foreground/65 leading-relaxed">
              Feel free to connect with me directly through these channels. I typically respond within 24 hours.
            </p>

            <div className="space-y-4">
              {contactDetails.map((detail, idx) => (
                <a
                  key={idx}
                  href={detail.href}
                  target={detail.label !== "Email" && detail.label !== "Phone" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-foreground/[0.02] border border-card-border hover:border-accent-blue/30 transition-all hover:bg-foreground/[0.04]"
                >
                  <div className="p-2.5 rounded-xl bg-foreground/[0.03] border border-card-border">
                    {detail.icon}
                  </div>
                  <div>
                    <span className="text-xs text-foreground/45 block">{detail.label}</span>
                    <span className="text-sm font-semibold text-foreground/80 font-mono mt-0.5 inline-block">{detail.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Coding handles quick links */}
          <div className="glass-panel p-8 rounded-3xl border border-card-border space-y-6">
            <h3 className="text-xl font-bold text-foreground/90">Competitive Profiles</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {codingHandles.map((handle, idx) => (
                <a
                  key={idx}
                  href={handle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col p-4 rounded-2xl bg-foreground/[0.02] border border-card-border transition-all hover:bg-foreground/[0.04] hover:border-accent-purple/30 group ${handle.color}`}
                >
                  <span className="text-xs text-foreground/45">{handle.name}</span>
                  <span className="text-sm font-bold font-mono mt-1 group-hover:underline truncate">{handle.value}</span>
                </a>
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
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-card-border">
            <h3 className="text-xl font-bold text-foreground/90 mb-6">Send Message</h3>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10 space-y-4"
              >
                <div className="p-4 rounded-full bg-accent-blue/10 text-accent-cyan border border-accent-blue/20">
                  <CheckCircle size={44} />
                </div>
                <h4 className="text-xl font-bold text-foreground/90">Message Sent!</h4>
                <p className="text-sm text-foreground/60 max-w-sm">
                  Thank you for reaching out, Raj has received your message and will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-foreground/60">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] text-foreground placeholder:text-foreground/35 outline-none focus:border-accent-blue/50 transition-all font-sans"
                    />
                  </div>
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-foreground/60">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] text-foreground placeholder:text-foreground/35 outline-none focus:border-accent-blue/50 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold text-foreground/60">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Collaboration opportunities"
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] text-foreground placeholder:text-foreground/35 outline-none focus:border-accent-blue/50 transition-all font-sans"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-foreground/60">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hello Raj, I would like to invite you..."
                    className="w-full px-4 py-3 rounded-xl border border-card-border bg-foreground/[0.02] text-foreground placeholder:text-foreground/35 outline-none focus:border-accent-blue/50 transition-all font-sans resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-accent-blue/25 disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
