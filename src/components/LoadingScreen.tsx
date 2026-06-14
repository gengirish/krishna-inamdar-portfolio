"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "NEURAL_PORTFOLIO v2.4.0",
  "Initializing wholesale account graph...",
  "Loading 8+ years of analytics + retail signals...",
  "Walmart account node [PRIMARY] online",
  "Marketplace + distribution subgraphs [LINKED]",
  "System ready. Welcome.",
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        setProgress(((i + 1) / bootLines.length) * 100);
      }, i * 300);
    });

    setTimeout(() => setVisible(false), bootLines.length * 300 + 600);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-neural-bg flex items-center justify-center"
        >
          <div className="max-w-lg w-full px-6">
            <div className="font-mono text-sm text-neural-cyan mb-4">BOOT_SEQUENCE</div>
            <div className="space-y-2 font-mono text-xs text-gray-400 min-h-[180px]">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-neural-green/90"
                >
                  <span className="text-neural-cyan/60 mr-2">{">"}</span>
                  {line}
                </motion.div>
              ))}
            </div>
            <div className="mt-6 h-1 bg-neural-border/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neural-cyan to-neural-green"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
