"use client";

import { Mail, Phone, Linkedin, MapPin, Heart } from "lucide-react";
import { personalInfo } from "@/data/resume-data";

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-neural-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold text-gradient-cyan mb-4">
              {personalInfo.name}
            </h3>
            <p className="text-theme-fg-muted text-sm leading-relaxed">
              {personalInfo.summary.slice(0, 150)}...
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-theme-fg-soft uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="space-y-3">
              {personalInfo.email ? (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-theme-fg-muted hover:text-neural-cyan transition-colors text-sm"
                >
                  <Mail size={16} />
                  {personalInfo.email}
                </a>
              ) : null}
              {personalInfo.phone ? (
                <a
                  href={`tel:${personalInfo.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-theme-fg-muted hover:text-neural-cyan transition-colors text-sm"
                >
                  <Phone size={16} />
                  {personalInfo.phone}
                </a>
              ) : null}
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-theme-fg-muted hover:text-neural-cyan transition-colors text-sm"
                >
                  <Linkedin size={16} />
                  LinkedIn Profile
                </a>
              )}
              <span className="flex items-center gap-3 text-theme-fg-muted text-sm">
                <MapPin size={16} />
                {personalInfo.location}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-theme-fg-soft uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              {["About", "Skills", "Experience", "Projects"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-theme-fg-muted hover:text-neural-cyan transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neural-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-theme-fg-subtle text-xs">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <a
            href="https://www.intelliforge.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-fg-subtle text-xs flex items-center gap-1.5 hover:text-neural-cyan transition-colors"
          >
            Powered by <span className="text-gradient-cyan font-semibold">IntelliForge AI</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
