"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { personalInfo } from "@/data/resume-data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm ${personalInfo.name.split(" ")[0]}'s AI assistant. Ask about experience, Walmart account leadership, analytics, or career moves. How can I help?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            `I'm having trouble connecting right now. Please try again or message ${personalInfo.name.split(" ")[0]} on LinkedIn.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-neural-cyan/20 border border-neural-cyan/30 flex items-center justify-center text-neural-cyan hover:bg-neural-cyan/30 transition-all glow-cyan-sm ${
          open ? "hidden" : ""
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] glass-card flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-neural-border/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-neural-cyan" />
                <div>
                  <h3 className="text-sm font-semibold text-theme-fg">
                    Talk to My Resume
                  </h3>
                  <p className="text-xs text-theme-fg-subtle">AI-powered assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-theme-fg-subtle hover:text-theme-fg transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user"
                        ? "bg-neural-purple/20 text-neural-purple"
                        : "bg-neural-cyan/20 text-neural-cyan"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={14} />
                    ) : (
                      <Bot size={14} />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-neural-purple/20 text-theme-fg"
                        : "bg-neural-surface text-theme-fg-soft"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-neural-cyan/20 text-neural-cyan flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-neural-surface">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-theme-fg-subtle rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-theme-fg-subtle rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-theme-fg-subtle rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-neural-border/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about Krishna's experience..."
                  className="flex-1 bg-neural-surface border border-neural-border/30 rounded-lg px-3 py-2 text-sm text-theme-fg placeholder:text-theme-fg-subtle focus:outline-none focus:border-neural-cyan/50"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="p-2 bg-neural-cyan/20 text-neural-cyan rounded-lg hover:bg-neural-cyan/30 transition-colors disabled:opacity-30"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
