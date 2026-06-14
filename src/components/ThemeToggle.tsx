"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className="p-2 rounded-lg text-theme-fg-muted hover:text-neural-cyan hover:bg-neural-surface/80 transition-colors border border-transparent hover:border-neural-border/40"
    >
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
