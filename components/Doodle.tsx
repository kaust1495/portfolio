"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Small hand-drawn self-portrait. An accent, not a centrepiece.
 * Eyes track the cursor a little; waves on load and on hover.
 */
export function Doodle({ size = 92 }: { size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const [blink, setBlink] = useState(false);
  const [wave, setWave] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 120, damping: 16 });
  const spy = useSpring(py, { stiffness: 120, damping: 16 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      px.set(Math.max(-1, Math.min(1, dx * 4)) * 1.5);
      py.set(Math.max(-1, Math.min(1, dy * 4)) * 1.2);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  useEffect(() => {
    if (reduce) return;
    let t: number;
    const loop = () => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 120);
      t = window.setTimeout(loop, 3200 + Math.random() * 3600);
    };
    t = window.setTimeout(loop, 2400);
    return () => window.clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setWave(true);
      window.setTimeout(() => setWave(false), 1400);
    }, 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="overflow-visible"
      role="img"
      aria-label="Small illustration of Kaustubh"
      onMouseEnter={() => {
        setWave(true);
        window.setTimeout(() => setWave(false), 1400);
      }}
    >
      <defs>
        <clipPath id="dghead">
          <circle cx="50" cy="46" r="30" />
        </clipPath>
      </defs>

      {/* collar / shoulders */}
      <path d="M20 96c0-16 13-26 30-26s30 10 30 26" fill="var(--surface-hi)" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M42 74c4 6 12 6 16 0" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />

      {/* head */}
      <g clipPath="url(#dghead)">
        <circle cx="50" cy="46" r="30" fill="var(--surface-hi)" />
      </g>
      <circle cx="50" cy="46" r="30" fill="none" stroke="var(--ink)" strokeWidth="2.6" />

      {/* hair — short, swept */}
      <path
        d="M22 44c-1-20 12-32 28-32s29 12 28 32c-3-7-6-11-11-13-1 5-3 8-6 10 0-6-3-10-8-12 0 5-2 8-5 10-1-7-5-11-11-12-7 2-11 7-12 15-2-1-4 2-3 6-1-3-1-7-2-10Z"
        fill="var(--ink)"
      />

      {/* eyes */}
      <motion.g style={{ x: reduce ? 0 : spx, y: reduce ? 0 : spy }}>
        <circle cx="41" cy="46" r={blink ? 0.6 : 2.4} fill="var(--ink)" />
        <circle cx="59" cy="46" r={blink ? 0.6 : 2.4} fill="var(--ink)" />
      </motion.g>

      {/* smile */}
      <path d="M42 56c4 5 12 5 16 0" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />

      {/* waving hand */}
      <motion.g
        style={{ transformOrigin: "78px 78px" }}
        animate={reduce ? { rotate: 0 } : wave ? { rotate: [0, -26, -6, -26, -10] } : { rotate: 0, opacity: 0 }}
        transition={wave ? { duration: 1.2, ease: "easeInOut" } : { duration: 0.3 }}
      >
        <path d="M74 84c4-4 8-10 8-18" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="84" cy="64" r="4.5" fill="var(--surface-hi)" stroke="var(--ink)" strokeWidth="2.2" />
      </motion.g>
    </svg>
  );
}
