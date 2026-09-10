"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type Mood = "idle" | "wave" | "happy" | "surprised";

export function MiniMe({ mood = "idle" }: { mood?: Mood }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [blink, setBlink] = useState(false);
  const [waved, setWaved] = useState(false);

  // cursor tracking
  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);
  const headR = useMotionValue(0);
  const spx = useSpring(pupilX, { stiffness: 120, damping: 14 });
  const spy = useSpring(pupilY, { stiffness: 120, damping: 14 });
  const shr = useSpring(headR, { stiffness: 80, damping: 12 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width * 0.5;
      const cy = r.top + r.height * 0.32;
      const dx = (e.clientX - cx) / Math.max(window.innerWidth, 800);
      const dy = (e.clientY - cy) / Math.max(window.innerHeight, 600);
      pupilX.set(Math.max(-1, Math.min(1, dx * 3.4)) * 2.6);
      pupilY.set(Math.max(-1, Math.min(1, dy * 3.4)) * 2.2);
      headR.set(Math.max(-1, Math.min(1, dx * 3)) * 5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, pupilX, pupilY, headR]);

  // blink
  useEffect(() => {
    if (reduce) return;
    let t: number;
    const loop = () => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 130);
      t = window.setTimeout(loop, 2600 + Math.random() * 3800);
    };
    t = window.setTimeout(loop, 1800);
    return () => window.clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    const t = window.setTimeout(() => setWaved(true), 2400);
    return () => window.clearTimeout(t);
  }, []);

  const doWave = mood === "wave" || (!waved && !reduce);
  const armRotate = doWave ? [0, -52, -20, -52, -8] : mood === "happy" ? -30 : 6;

  return (
    <div ref={wrapRef} className="relative w-full max-w-[300px] select-none" aria-hidden="true">
      <motion.svg
        viewBox="0 0 220 240"
        className="w-full overflow-visible"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.28, 1] }}
      >
        <defs>
          <filter id="rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
          </filter>
        </defs>

        <g filter="url(#rough)">
          {/* chair back */}
          <rect x="58" y="70" width="104" height="120" rx="26" fill="#3a2c1e" />

          {/* torso — breathing */}
          <motion.g
            style={{ transformOrigin: "110px 200px" }}
            animate={reduce ? {} : { scaleY: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M66 236c0-40 14-70 44-70s44 30 44 70Z" fill="#8a5a3c" />
            <path d="M66 236c0-40 14-70 44-70s44 30 44 70" fill="none" stroke="#6f4429" strokeWidth="3" />
            {/* collar */}
            <path d="M92 172c8 12 28 12 36 0" fill="none" stroke="#f1e9da" strokeWidth="5" strokeLinecap="round" />
          </motion.g>

          {/* left arm resting on desk */}
          <path d="M70 190c-16 4-26 18-26 36" fill="none" stroke="#8a5a3c" strokeWidth="15" strokeLinecap="round" />

          {/* right arm — waves */}
          <motion.g
            style={{ transformOrigin: "150px 190px" }}
            animate={reduce ? { rotate: 6 } : { rotate: armRotate }}
            transition={
              Array.isArray(armRotate)
                ? { duration: 1.1, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }
                : { type: "spring", stiffness: 120, damping: 12 }
            }
          >
            <path d="M150 190c18 2 30 12 34 30" fill="none" stroke="#8a5a3c" strokeWidth="15" strokeLinecap="round" />
            <circle cx="187" cy="222" r="9" fill="#c98a5f" />
          </motion.g>

          {/* head group — tilts toward cursor */}
          <motion.g style={{ rotate: reduce ? 0 : shr, transformOrigin: "110px 118px" }}>
            {/* neck + ears */}
            <rect x="103" y="110" width="14" height="18" rx="6" fill="#b97c52" />
            <ellipse cx="78" cy="88" rx="5" ry="8" fill="#c98a5f" />
            <ellipse cx="142" cy="88" rx="5" ry="8" fill="#c98a5f" />
            {/* face */}
            <path d="M80 76c0-22 13-36 30-36s30 14 30 36c0 24-14 40-30 40s-30-16-30-40Z" fill="#cf9468" />
            {/* hair — short, side-swept */}
            <path d="M78 82c-3-28 15-44 32-44s34 14 32 44c-3-9-6-14-11-17-1 6-3 9-6 11 0-7-3-12-8-14 0 6-2 10-6 12-1-8-5-13-11-14-8 2-12 8-13 17-2-1-5 2-3 6-1-3-1-6-3-9Z" fill="#1f150d" />
            <path d="M82 62c4-14 15-22 28-22 10 0 19 5 24 14-6-4-13-6-21-6-13 0-25 6-31 20Z" fill="#2a1d12" />
            {/* eyes */}
            <ellipse cx="100" cy="84" rx="5.5" ry={blink ? 0.8 : 5.5} fill="#fbf6ec" />
            <ellipse cx="120" cy="84" rx="5.5" ry={blink ? 0.8 : 5.5} fill="#fbf6ec" />
            {!blink && (
              <motion.g style={{ x: reduce ? 0 : spx, y: reduce ? 0 : spy }}>
                <circle cx="100" cy="84" r="2.7" fill="#1c120a" />
                <circle cx="120" cy="84" r="2.7" fill="#1c120a" />
              </motion.g>
            )}
            {/* brows */}
            <path d="M93 75c4-2.5 9-2.5 13 0" fill="none" stroke="#1f150d" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M114 75c4-2.5 9-2.5 13 0" fill="none" stroke="#1f150d" strokeWidth="2.2" strokeLinecap="round" />
            {/* nose */}
            <path d="M110 88v7l-3 2" fill="none" stroke="#b07c53" strokeWidth="2" strokeLinecap="round" />
            {/* mouth */}
            {mood === "surprised" ? (
              <ellipse cx="110" cy="103" rx="4.5" ry="5.5" fill="#5c2f22" />
            ) : (
              <path
                d={mood === "happy" || doWave ? "M101 101c6 9 12 9 18 0" : "M102 102c5 5 11 5 16 0"}
                fill="none"
                stroke="#5c2f22"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            )}
          </motion.g>
        </g>
      </motion.svg>
    </div>
  );
}
