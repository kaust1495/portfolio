"use client";

import { useEffect, useRef, useState } from "react";

const IDLE = [
  "hey.",
  "click me to park.",
  "the games are real.",
  "ask me anything ↘",
  "still here.",
];

const SIZE = 58;
const TRAIL = 46; // how far behind the cursor it hangs

/**
 * A small character that roams the whole site, trailing your cursor.
 * Click it to park it in the corner. Says something when you hover
 * anything with a `data-doodle` attribute.
 */
export function Buddy() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [parked, setParked] = useState(false);
  const [blink, setBlink] = useState(false);
  const [say, setSay] = useState<string | null>(null);
  const [idle, setIdle] = useState(0);
  const [flip, setFlip] = useState(1);
  const [eye, setEye] = useState({ x: 0, y: 0 });

  // pointer target + rendered position live in refs — no re-render per frame
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const moving = useRef(false);
  const stillFor = useRef(0);

  // only on devices with a real cursor
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine);
    if (reduce) setParked(true);
    const startX = window.innerWidth - 120;
    const startY = window.innerHeight - 150;
    target.current = { x: startX, y: startY };
    pos.current = { x: startX, y: startY };
  }, []);

  // follow loop
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let last = performance.now();

    const onMove = (e: PointerEvent) => {
      if (parked) return;
      target.current = { x: e.clientX + TRAIL, y: e.clientY + TRAIL };
      moving.current = true;
      stillFor.current = 0;
    };

    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;

      if (parked) {
        target.current = { x: window.innerWidth - 96, y: window.innerHeight - 128 };
      }

      const p = pos.current;
      const t = target.current;
      const dx = t.x - p.x;
      const dy = t.y - p.y;

      // lazy spring — it ambles, it doesn't snap
      const k = parked ? 0.06 : 0.075;
      p.x += dx * k;
      p.y += dy * k;

      const speed = Math.hypot(dx, dy);
      if (speed < 1.5) stillFor.current += dt;
      else stillFor.current = 0;

      if (Math.abs(dx) > 8) setFlip(dx > 0 ? 1 : -1);

      // eyes point at the cursor even while the body catches up
      const ex = Math.max(-2.4, Math.min(2.4, dx * 0.05));
      const ey = Math.max(-2, Math.min(2, dy * 0.05));
      setEye((prev) => (Math.abs(prev.x - ex) > 0.15 || Math.abs(prev.y - ey) > 0.15 ? { x: ex, y: ey } : prev));

      const bob = stillFor.current > 220 ? Math.sin(now / 520) * 4 : 0;

      const el = wrapRef.current;
      if (el) {
        el.style.transform = `translate3d(${p.x - SIZE / 2}px, ${p.y - SIZE / 2 + bob}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled, parked]);

  // blink
  useEffect(() => {
    if (!enabled) return;
    let t: number;
    const loop = () => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 105);
      t = window.setTimeout(loop, 2800 + Math.random() * 3600);
    };
    t = window.setTimeout(loop, 1500);
    return () => window.clearTimeout(t);
  }, [enabled]);

  // idle chatter
  useEffect(() => {
    const t = setInterval(() => setIdle((i) => (i + 1) % IDLE.length), 6000);
    return () => clearInterval(t);
  }, []);

  // hover-to-talk
  useEffect(() => {
    if (!enabled) return;
    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-doodle]") as HTMLElement | null;
      setSay(el?.dataset.doodle ?? null);
    };
    document.addEventListener("pointerover", onOver, { passive: true });
    return () => document.removeEventListener("pointerover", onOver);
  }, [enabled]);

  if (!enabled) return null;

  const message = say ?? (parked ? "parked. click me." : IDLE[idle]);
  const happy = !!say;

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed left-0 top-0 z-[65]"
      style={{ width: SIZE, height: SIZE, willChange: "transform" }}
      aria-hidden="true"
    >
      {/* bubble */}
      <div
        className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 w-max max-w-[190px] -translate-x-1/2 px-2.5 py-1 text-center"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line-2)",
          borderRadius: 14,
          boxShadow: "var(--shadow-sm)",
          fontFamily: "var(--font-caveat), cursive",
          fontSize: "1rem",
          lineHeight: 1.15,
          color: "var(--ink-2)",
          opacity: say || parked ? 1 : 0.9,
          transition: "opacity .2s var(--ease)",
        }}
      >
        {message}
      </div>

      <button
        onClick={() => setParked((p) => !p)}
        className="pointer-events-auto block"
        style={{ width: SIZE, height: SIZE, transform: `scaleX(${flip})`, transition: "transform .3s var(--ease)" }}
        aria-label={parked ? "Let the little guy roam again" : "Park the little guy"}
      >
        <svg viewBox="0 0 60 60" width={SIZE} height={SIZE} style={{ overflow: "visible" }}>
          {/* soft shadow puddle */}
          <ellipse cx="30" cy="56" rx="14" ry="3.5" fill="var(--ink)" opacity="0.08" />

          {/* body — a soft blob */}
          <path
            d="M30 12c10 0 17 7 17 17v6c0 8-7 14-17 14s-17-6-17-14v-6c0-10 7-17 17-17Z"
            fill="url(#buddyGrad)"
            stroke="var(--ink)"
            strokeWidth="1.6"
          />
          <defs>
            <linearGradient id="buddyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#efecff" />
              <stop offset="100%" stopColor="#fff0e9" />
            </linearGradient>
          </defs>

          {/* hair tuft */}
          <path
            d="M16 26c0-11 6-17 14-17s14 6 14 17c-2-5-5-8-8-9 0 3-2 5-4 6 0-4-2-7-5-8-4 1-7 5-8 11-1 0-2 1-3 0Z"
            fill="var(--ink)"
          />

          {/* eyes */}
          {blink ? (
            <>
              <path d="M21 31h6" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
              <path d="M33 31h6" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <g style={{ transform: `translate(${eye.x}px, ${eye.y}px)`, transition: "transform .12s linear" }}>
              <circle cx="24" cy="31" r="2.6" fill="var(--ink)" />
              <circle cx="36" cy="31" r="2.6" fill="var(--ink)" />
              <circle cx="24.9" cy="30.1" r="0.8" fill="#fff" />
              <circle cx="36.9" cy="30.1" r="0.8" fill="#fff" />
            </g>
          )}

          {/* blush */}
          <ellipse cx="19.5" cy="36" rx="3" ry="1.9" fill="var(--peach)" opacity="0.45" />
          <ellipse cx="40.5" cy="36" rx="3" ry="1.9" fill="var(--peach)" opacity="0.45" />

          {/* mouth */}
          <path
            d={happy ? "M25 38c3 4 7 4 10 0" : "M26 38.5c2.6 2.4 5.4 2.4 8 0"}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.9"
            strokeLinecap="round"
          />

          {/* little arms */}
          <path d="M13 34c-3 1-5 3-5 6" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M47 34c3 1 5 3 5 6" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
