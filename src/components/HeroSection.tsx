"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Linkedin, ArrowDown } from "lucide-react";
import NeuralNetworkCanvas from "./NeuralNetworkCanvas";
import { personalInfo, stats } from "@/data/resume-data";
import { useTheme } from "@/contexts/ThemeContext";

const roles = [
  "Walmart Account Manager",
  "Data & E-commerce Professional",
  "Marketplace & KPI Operator",
  "SQL & Excel Analyst",
  "AI-Assisted Technical Learner",
];

export default function HeroSection() {
  const { theme } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          if (displayText.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 30 : 80
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NeuralNetworkCanvas theme={theme} />

      <div className="absolute inset-0 bg-gradient-to-b from-neural-bg via-transparent to-neural-bg" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-theme-fg-muted mb-8">
            <span className="w-2 h-2 rounded-full bg-neural-green animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-theme-fg">{personalInfo.name}</span>
          </h1>

          <div className="h-12 sm:h-14 flex items-center justify-center mb-6">
            <span className="text-xl sm:text-2xl lg:text-3xl text-neural-cyan font-mono">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <p className="text-theme-fg-muted text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {personalInfo.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 text-sm text-theme-fg-muted">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-neural-cyan" />
              {personalInfo.location}
            </span>
            {personalInfo.email ? (
              <span className="flex items-center gap-1.5">
                <Mail size={14} className="text-neural-cyan" />
                {personalInfo.email}
              </span>
            ) : null}
            {personalInfo.phone ? (
              <a
                href={`tel:${personalInfo.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-1.5 hover:text-neural-cyan transition-colors"
              >
                <Phone size={14} className="text-neural-cyan" />
                {personalInfo.phone}
              </a>
            ) : null}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-neural-cyan transition-colors"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass-card p-4"
              >
                <div className="text-2xl sm:text-3xl font-bold text-neural-cyan">
                  {stat.value}
                </div>
                <div className="text-xs text-theme-fg-subtle mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="inline-flex items-center gap-2 text-theme-fg-subtle hover:text-neural-cyan transition-colors"
          >
            <ArrowDown size={16} className="animate-bounce" />
            Scroll to explore
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
