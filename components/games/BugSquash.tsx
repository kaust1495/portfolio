"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameShell, useBest, type GameStatus } from "./GameShell";

const BEST_KEY = "kj-bugsquash-best";
const ROUND = 30; // seconds

type Bug = { id: number; x: number; y: number; golden: boolean; rot: number };
type Splat = { id: number; x: number; y: number; value: number };

let seq = 0;

export function BugSquash() {
  const best = useBest(BEST_KEY);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(ROUND);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [splats, setSplats] = useState<Splat[]>([]);
  const [combo, setCombo] = useState(0);

  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const lastHitRef = useRef(0);

  useEffect(() => setBestScore(best.read()), []); // eslint-disable-line react-hooks/exhaustive-deps

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  }, []);

  const end = useCallback(() => {
    clearTimers();
    setBugs([]);
    if (scoreRef.current > best.read()) {
      best.write(scoreRef.current);
      setBestScore(scoreRef.current);
    }
    setStatus("over");
  }, [best, clearTimers]);

  const start = useCallback(() => {
    clearTimers();
    seq = 0;
    scoreRef.current = 0;
    comboRef.current = 0;
    lastHitRef.current = 0;
    setScore(0);
    setCombo(0);
    setTime(ROUND);
    setBugs([]);
    setSplats([]);
    setStatus("playing");
  }, [clearTimers]);

  // countdown
  useEffect(() => {
    if (status !== "playing") return;
    const t = window.setInterval(() => {
      setTime((s) => {
        if (s <= 1) {
          window.clearInterval(t);
          end();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [status, end]);

  // spawner — gets faster as the round goes on
  useEffect(() => {
    if (status !== "playing") return;
    let stop = false;

    const spawn = () => {
      if (stop) return;
      const elapsed = ROUND - time;
      const golden = Math.random() < 0.09;
      const bug: Bug = {
        id: ++seq,
        x: 8 + Math.random() * 78,
        y: 10 + Math.random() * 74,
        golden,
        rot: Math.random() * 360,
      };
      setBugs((b) => [...b, bug]);

      // it escapes if you don't get it
      const ttl = golden ? 1100 : Math.max(900, 1900 - elapsed * 28);
      const esc = window.setTimeout(() => {
        setBugs((b) => b.filter((x) => x.id !== bug.id));
      }, ttl);
      timersRef.current.push(esc);
    };

    const gap = () => Math.max(260, 720 - (ROUND - time) * 14);
    const loop = window.setInterval(spawn, gap());
    spawn();
    return () => {
      stop = true;
      window.clearInterval(loop);
    };
    // re-running as `time` changes is what ramps the spawn rate
  }, [status, time]);

  const squash = useCallback((bug: Bug) => {
    setBugs((b) => b.filter((x) => x.id !== bug.id));

    const now = Date.now();
    const fast = now - lastHitRef.current < 900;
    lastHitRef.current = now;
    comboRef.current = fast ? comboRef.current + 1 : 1;
    setCombo(comboRef.current);

    const base = bug.golden ? 50 : 10;
    const value = base + Math.min(comboRef.current - 1, 10) * 2;
    scoreRef.current += value;
    setScore(scoreRef.current);

    const s: Splat = { id: bug.id, x: bug.x, y: bug.y, value };
    setSplats((p) => [...p, s]);
    const t = window.setTimeout(() => setSplats((p) => p.filter((x) => x.id !== s.id)), 650);
    timersRef.current.push(t);
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const endMsg =
    score >= 500
      ? "Frighteningly quick. You'd be good on-call."
      : score >= 250
        ? "Solid reflexes. The golden ones are worth 50."
        : "The bugs won. They usually do.";

  return (
    <GameShell
      title="Bug Squash"
      intro="Thirty seconds. Bugs crawl out, you click them. Gold ones are worth five times as much and don't hang around. Fast consecutive hits build a combo."
      status={status}
      score={score}
      best={bestScore}
      endTitle="Time"
      endMessage={endMsg}
      onStart={start}
    >
      {status === "playing" && (
        <div className="relative h-full select-none" style={{ background: "var(--paper-2)" }}>
          {/* HUD */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3">
            <span className="label" aria-live="off">
              {time}s
            </span>
            {combo > 2 && (
              <span className="font-mono text-xs" style={{ color: "var(--coral-ink)" }}>
                {combo}× combo
              </span>
            )}
          </div>
          <div className="absolute inset-x-0 top-9 z-10 mx-4 h-1" style={{ background: "var(--rule-soft)" }}>
            <div
              className="h-full"
              style={{ width: `${(time / ROUND) * 100}%`, background: time <= 5 ? "var(--void)" : "var(--coral-ink)", transition: "width 1s linear" }}
            />
          </div>

          {/* bugs */}
          {bugs.map((b) => (
            <button
              key={b.id}
              onPointerDown={() => squash(b)}
              aria-label="Squash the bug"
              className="absolute"
              style={{ left: `${b.x}%`, top: `${b.y}%`, width: 44, height: 44, transform: `rotate(${b.rot}deg)` }}
            >
              <BugArt golden={b.golden} />
            </button>
          ))}

          {/* splats */}
          {splats.map((s) => (
            <span
              key={s.id}
              className="pointer-events-none absolute font-mono text-sm"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                color: "var(--coral-ink)",
                animation: "kj-splat .65s var(--ease) forwards",
              }}
            >
              +{s.value}
            </span>
          ))}

          <style>{`
            @keyframes kj-splat { from { transform: translateY(0); opacity: 1 } to { transform: translateY(-26px); opacity: 0 } }
            @keyframes kj-wiggle { 0%,100% { transform: translate(0,0) } 25% { transform: translate(2px,-2px) } 50% { transform: translate(-2px,1px) } 75% { transform: translate(1px,2px) } }
          `}</style>
        </div>
      )}
    </GameShell>
  );
}

function BugArt({ golden }: { golden: boolean }) {
  const body = golden ? "#d9a300" : "var(--ink)";
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%" style={{ animation: "kj-wiggle .5s ease-in-out infinite" }} aria-hidden="true">
      {/* legs */}
      <g stroke={body} strokeWidth="2" strokeLinecap="round">
        <path d="M13 14 5 9M13 20H4M13 26l-8 5M27 14l8-5M27 20h9M27 26l8 5" />
      </g>
      {/* body */}
      <ellipse cx="20" cy="21" rx="9" ry="11" fill={body} />
      <circle cx="20" cy="10" r="6" fill={body} />
      {/* antennae */}
      <path d="M17 6l-3-4M23 6l3-4" stroke={body} strokeWidth="2" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="17.6" cy="9.5" r="1.5" fill="var(--sheet)" />
      <circle cx="22.4" cy="9.5" r="1.5" fill="var(--sheet)" />
      {/* shell line */}
      <path d="M20 12v20" stroke="var(--sheet)" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}
