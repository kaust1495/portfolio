"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { status } from "@/content/profile";

export function StatusTicker() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % status.items.length), 3400);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ background: "var(--ok)", animation: reduce ? "none" : "ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--ok)" }} />
      </span>
      <span className="label shrink-0">This week</span>
      <span className="relative h-5 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={reduce ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -12, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 0.61, 0.28, 1] }}
            className="absolute inset-0 truncate"
            style={{ color: "var(--muted)" }}
          >
            {status.items[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <style jsx>{`
        @keyframes ping {
          75%,
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
