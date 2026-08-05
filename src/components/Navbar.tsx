"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "DSA Stats", id: "dsa" },
  { name: "Achievements", id: "achievements" },
  { name: "Projects", id: "projects" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  // Load theme and track section scroll
  useEffect(() => {
    // Theme load
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initialTheme = savedTheme === "light" || (!savedTheme && systemPrefersLight) ? "light" : "dark";
    
    setTheme(initialTheme);
    if (initialTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }

    // Scroll tracker
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      
      // Scroll progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setHasScrolled(window.scrollY > 20);

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update pill position when active section changes
  useEffect(() => {
    const activeIndex = NAV_ITEMS.findIndex(item => item.id === activeSection);
    const el = navItemsRef.current[activeIndex];
    if (el) {
      const rect = el.getBoundingClientRect();
      const parent = el.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        setPillStyle({
          left: rect.left - parentRect.left,
          width: rect.width,
        });
      }
    }
  }, [activeSection]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className={`sticky top-0 z-40 w-full glass-panel border-b border-card-border transition-all duration-500 ${hasScrolled ? 'backdrop-blur-xl bg-background/80' : 'backdrop-blur-md bg-background/40'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <motion.span
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="cursor-pointer text-xl font-bold tracking-wider text-gradient font-sans"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                RAJ.TRIPATHI
              </motion.span>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-1 relative">
              {/* Animated pill background */}
              <motion.div
                className="absolute h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/20"
                animate={{
                  left: pillStyle.left - 4,
                  width: pillStyle.width + 8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
                style={{
                  boxShadow: '0 0 12px rgba(99, 102, 241, 0.15)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />

              {NAV_ITEMS.map((item, index) => (
                <button
                  key={item.id}
                  ref={(el) => { navItemsRef.current[index] = el; }}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 text-sm font-medium transition-colors duration-200 cursor-pointer px-3 py-1.5 rounded-lg ${
                    activeSection === item.id
                      ? "text-accent-blue font-semibold"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 ml-3 rounded-lg border border-card-border hover:bg-card-bg transition-colors duration-200 cursor-pointer text-foreground/80 hover:text-foreground"
                aria-label="Toggle theme"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile hamburger & theme */}
            <div className="flex md:hidden items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-card-border hover:bg-card-bg transition-colors duration-200 cursor-pointer text-foreground/80 hover:text-foreground"
                aria-label="Toggle theme"
                whileTap={{ scale: 0.9 }}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
              
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg border border-card-border hover:bg-card-bg transition-colors duration-200 cursor-pointer text-foreground/80 hover:text-foreground"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu — animated */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden glass-panel border-t border-card-border"
            >
              <div className="px-4 pt-2 pb-4 space-y-1">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium transition-colors duration-200 cursor-pointer ${
                      activeSection === item.id
                        ? "bg-accent-blue/10 text-accent-blue font-semibold border border-accent-blue/20"
                        : "text-foreground/80 hover:bg-card-bg"
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
