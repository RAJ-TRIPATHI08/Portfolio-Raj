"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "DSA Stats", id: "dsa" },
  { name: "Projects", id: "projects" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

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
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-card-border transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer text-xl font-bold tracking-wider text-gradient font-sans"
            >
              RAJ.TRIPATHI
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors hover:text-accent-blue duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "text-accent-blue font-semibold underline underline-offset-4 decoration-2 decoration-accent-purple"
                    : "text-foreground/80"
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-card-border hover:bg-card-bg transition-colors duration-200 cursor-pointer text-foreground/80 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile hamburger & theme */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-card-border hover:bg-card-bg transition-colors duration-200 cursor-pointer text-foreground/80 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-card-border hover:bg-card-bg transition-colors duration-200 cursor-pointer text-foreground/80 hover:text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-card-border px-4 pt-2 pb-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
                activeSection === item.id
                  ? "bg-accent-blue/10 text-accent-blue font-semibold"
                  : "text-foreground/80 hover:bg-card-bg"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
