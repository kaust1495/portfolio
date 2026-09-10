"use client";

import { useEffect, useRef, useState } from "react";

const IDLE = [
  "hover things. I'll react.",
  "the games are real games.",
  "ask me something ↘",
  "yes, I'm watching the cursor.",
];

/**
 * A small character that tracks the pointer across the whole page — head
 * rotates, pupils follow, it blinks — and says something when you hover
 * anything carrying a `data-doodle` attribute.
 */
export function Doodle({ size = 120 }: { size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0, tilt: 0 });
  const [blink, setBlink] = useState(false);
  const [say, setSay] = useState<string | null>(null);
  const [idle, setIdle] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // pointer tracking — across the entire viewport
  useEffect(() => {
    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      raf = 0;
      const el = ref.current;
      if (!el || !pending) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.42;
      const dx = pending.x - cx;
      const dy = pending.y - cy;
      const dist = Math.max(1, Math.hypot(dx, dy));
      const nx = dx / dist;
      const ny = dy / dist;
      const reach = Math.min(1, dist / 420);
      setLook({
        x: nx * 5.2 * reach,
        y: ny * 4 * reach,
        tilt: Math.max(-15, Math.min(15, (dx / window.innerWidth) * 42)),
      });
    };

    const onMove = (e: PointerEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // blink
  useEffect(() => {
    let t: number;
    const loop = () => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 110);
      t = window.setTimeout(loop, 2600 + Math.random() * 3400);
    };
    t = window.setTimeout(loop, 1600);
    return () => window.clearTimeout(t);
  }, []);

  // idle chatter
  useEffect(() => {
    const t = setInterval(() => setIdle((i) => (i + 1) % IDLE.length), 5200);
    return () => clearInterval(t);
  }, []);

  // anything with data-doodle="..." makes it talk
  useEffect(() => {
    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-doodle]") as HTMLElement | null;
      setSay(el?.dataset.doodle ?? null);
    };
    document.addEventListener("pointerover", onOver, { passive: true });
    return () => document.removeEventListener("pointerover", onOver);
  }, []);

  const message = say ?? IDLE[idle];
  const excited = !!say;

  return (
    <div className="relative inline-block" style={{ width: size }}>
      {/* speech bubble */}
      <div
        className="absolute bottom-full left-1/2 mb-2 w-max max-w-[210px] -translate-x-1/2 border px-2.5 py-1.5 text-center"
        style={{
          borderColor: "var(--ink)",
          background: "var(--surface)",
          fontFamily: "var(--font-caveat), cursive",
          fontSize: "1.02rem",
          lineHeight: 1.2,
          transition: "opacity .18s var(--ease)",
        }}
        aria-live="polite"
      >
        {message}
        <span
          className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r"
          style={{ borderColor: "var(--ink)", background: "var(--surface)" }}
          aria-hidden="true"
        />
      </div>

      <svg
        ref={ref}
        viewBox="0 0 120 120"
        width={size}
        height={size}
        role="img"
        aria-label="Small illustration of Kaustubh that follows your cursor"
        style={{ display: "block", overflow: "visible" }}
      >
        {/* shoulders */}
        <path
          d="M18 120c0-19 18-31 42-31s42 12 42 31"
          fill="var(--surface)"
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <g
          style={{
            transform: `rotate(${reduce ? 0 : look.tilt * 0.35}deg) translate(${look.x * 0.5}px, ${look.y * 0.4}px)`,
            transformOrigin: "60px 92px",
            transition: "transform .18s var(--ease)",
          }}
        >
          {/* neck */}
          <rect x="53" y="76" width="14" height="16" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
          {/* head */}
          <circle cx="60" cy="52" r="30" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
          {/* hair */}
          <path
            d="M31 50c-1-21 12-33 29-33s30 12 29 33c-3-8-6-12-11-14-1 5-3 9-7 11 0-6-3-11-8-13 0 6-2 9-5 11-2-7-6-12-12-13-7 2-12 8-12 16-2-1-4 2-3 6-1-3-1-6 0-4Z"
            fill="var(--ink)"
          />
          {/* eyes */}
          <g>
            <circle cx="49" cy="52" r="6.5" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.4" />
            <circle cx="71" cy="52" r="6.5" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.4" />
            {blink ? (
              <>
                <path d="M43 52h12" stroke="var(--ink)" strokeWidth="2.6" strokeLinecap="round" />
                <path d="M65 52h12" stroke="var(--ink)" strokeWidth="2.6" strokeLinecap="round" />
              </>
            ) : (
              <g
                style={{
                  transform: `translate(${look.x}px, ${look.y}px)`,
                  transition: "transform .1s linear",
                }}
              >
                <circle cx="49" cy="52" r="2.8" fill="var(--ink)" />
                <circle cx="71" cy="52" r="2.8" fill="var(--ink)" />
              </g>
            )}
          </g>
          {/* brows — lift when excited */}
          <path
            d={excited ? "M42 40c4-3 9-3 13 0" : "M42 42c4-2.5 9-2.5 13 0"}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2.6"
            strokeLinecap="round"
            style={{ transition: "d .2s var(--ease)" }}
          />
          <path
            d={excited ? "M65 40c4-3 9-3 13 0" : "M65 42c4-2.5 9-2.5 13 0"}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* mouth */}
          <path
            d={excited ? "M50 64c5 8 15 8 20 0" : "M51 65c5 5 13 5 18 0"}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
