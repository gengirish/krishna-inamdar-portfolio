"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "@/data/resume-data";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

function contactHref(): string {
  if (personalInfo.email) return `mailto:${personalInfo.email}`;
  if (personalInfo.phone) return `tel:${personalInfo.phone.replace(/\D/g, "")}`;
  return personalInfo.linkedin || "#contact";
}

function contactOpensNewTab(): boolean {
  return !personalInfo.email && !personalInfo.phone && Boolean(personalInfo.linkedin);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-neural-border/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-lg font-bold text-gradient-cyan">
            {personalInfo.name.split(" ")[0]}
            <span className="text-theme-fg-muted font-normal">.profile</span>
          </a>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-theme-fg-muted hover:text-neural-cyan transition-colors rounded-lg hover:bg-neural-surface/50"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href={contactHref()}
              target={contactOpensNewTab() ? "_blank" : undefined}
              rel={contactOpensNewTab() ? "noopener noreferrer" : undefined}
              className="px-4 py-2 text-sm bg-neural-cyan/10 text-neural-cyan border border-neural-cyan/20 rounded-lg hover:bg-neural-cyan/20 transition-all"
            >
              Get in Touch
            </a>
          </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-theme-fg-muted hover:text-theme-fg"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-neural-border/30"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-theme-fg-muted hover:text-neural-cyan transition-colors rounded-lg"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
