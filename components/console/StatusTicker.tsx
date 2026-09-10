"use client";

import { useEffect, useState } from "react";
import { status } from "@/content/profile";

export function StatusTicker() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (status.items.length < 2) return;
    const t = window.setInterval(() => {
      setI((v) => (v + 1) % status.items.length);
    }, 3600);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ background: "var(--ok)", animation: "kj-ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--ok)" }} />
      </span>
      <span className="label shrink-0">This week</span>
      <span className="relative h-5 flex-1">
        {status.items.map((item, idx) => (
          <span
            key={item}
            aria-hidden={idx !== i}
            className="absolute inset-0 truncate transition-[opacity,transform] duration-500"
            style={{
              color: "var(--muted)",
              opacity: idx === i ? 1 : 0,
              transform: idx === i ? "none" : idx < i ? "translateY(-10px)" : "translateY(10px)",
            }}
          >
            {item}
          </span>
        ))}
      </span>
      <style>{`@keyframes kj-ping { 75%, 100% { transform: scale(2.4); opacity: 0; } }`}</style>
    </div>
  );
}
