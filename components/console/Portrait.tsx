"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative mx-auto w-full max-w-[200px] sm:max-w-[280px] lg:max-w-[340px]"
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX: reduce ? 0 : srx, rotateY: reduce ? 0 : sry, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-[18px] border"
      >
        <div className="absolute inset-0 rounded-[18px] border" style={{ borderColor: "var(--line)", zIndex: 2, pointerEvents: "none" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kaustubh-portrait.webp"
          alt="Kaustubh Jain"
          width={340}
          height={425}
          className="block w-full"
          style={{ aspectRatio: "4 / 5", objectFit: "cover", filter: "saturate(0.92) contrast(1.02)" }}
          fetchPriority="high"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/5"
          style={{ background: "linear-gradient(to top, var(--bg) 4%, transparent)" }}
        />
        <div
          className="absolute left-3 bottom-3 label"
          style={{ color: "var(--ink)", textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
        >
          Kaustubh Jain
        </div>
      </motion.div>
    </div>
  );
}
