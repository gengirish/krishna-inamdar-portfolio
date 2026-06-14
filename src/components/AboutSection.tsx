"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Globe } from "lucide-react";
import { personalInfo, domains, experience, certifications } from "@/data/resume-data";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const currentRole = experience[0];

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-neural-cyan/50 to-transparent" />
            <span className="text-neural-cyan font-mono text-sm">01</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-theme-fg">About</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-neural-cyan/50 to-transparent" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 mt-12">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-theme-fg-soft text-lg leading-relaxed mb-8">
              {personalInfo.summary}
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="glass-card p-4">
                <Briefcase size={20} className="text-neural-cyan mb-2" />
                <h4 className="text-sm font-semibold text-theme-fg-soft">Current Role</h4>
                <p className="text-xs text-theme-fg-muted mt-1">
                  {currentRole.title} at {currentRole.company}
                </p>
              </div>
              <div className="glass-card p-4">
                <GraduationCap size={20} className="text-neural-purple mb-2" />
                <h4 className="text-sm font-semibold text-theme-fg-soft">Education</h4>
                <p className="text-xs text-theme-fg-muted mt-1 leading-relaxed">
                  {certifications.map((c) => `${c.title} (${c.date})`).join(" · ")}
                </p>
              </div>
              <div className="glass-card p-4">
                <Globe size={20} className="text-neural-green mb-2" />
                <h4 className="text-sm font-semibold text-theme-fg-soft">Languages</h4>
                <p className="text-xs text-theme-fg-muted mt-1">{personalInfo.languages}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-theme-fg-soft uppercase tracking-wider mb-4">
              Industry Domains
            </h3>
            <div className="space-y-3">
              {domains.map((domain, i) => (
                <motion.div
                  key={domain.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-card p-4 flex items-center gap-3 hover:border-neural-cyan/30 transition-colors"
                >
                  <span className="text-2xl">{domain.icon}</span>
                  <span className="text-theme-fg-soft">{domain.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
