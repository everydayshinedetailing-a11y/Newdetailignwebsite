import { Link } from "@tanstack/react-router";
import { MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";

// Floating Book Now + live chat bubble
export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Link
        to="/booking"
        className="fixed z-40 bottom-5 right-5 sm:bottom-7 sm:right-7 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-neon text-background font-bold text-sm tracking-widest uppercase animate-glow-pulse hover:scale-105 transition"
      >
        <Sparkles className="w-4 h-4" /> Book
      </Link>

      <button
        onClick={() => setChatOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed z-40 bottom-5 left-5 sm:bottom-7 sm:left-7 grid place-items-center w-12 h-12 rounded-full glass hover:bg-neon hover:text-background transition"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {chatOpen && (
        <div className="fixed z-40 bottom-24 left-5 sm:left-7 w-[300px] glass-strong rounded-2xl p-4 shadow-lux animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs tracking-widest font-display">CONCIERGE ONLINE</p>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Hi! I'm your detailing concierge. Ask about packages, pricing, or scheduling.
          </p>
          <input
            type="text"
            placeholder="Type a message…"
            className="w-full bg-input/60 border border-border rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-neon"
          />
        </div>
      )}
    </>
  );
}
