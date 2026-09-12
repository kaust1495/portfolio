"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { features, shipItCopy, type Call } from "@/content/games";
import { GameShell, useBest, type GameStatus } from "./GameShell";

const BEST_KEY = "kj-shipit-best";
const START_TIME = 4.2;
const MIN_TIME = 1.9;
const RAMP = 0.14;

function shuffle<T>(a: T[]) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

const calls: { id: Call; label: string; key: string; color: string }[] = [
  { id: "ship", label: "Ship", key: "S", color: "var(--live)" },
  { id: "defer", label: "Defer", key: "D", color: "var(--review)" },
  { id: "cut", label: "Cut", key: "C", color: "var(--void)" },
];

export function ShipIt() {
  const best = useBest(BEST_KEY);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [deck, setDeck] = useState<typeof features>([]);
  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(START_TIME);
  const [feedback, setFeedback] = useState<null | { ok: boolean; why: string; correct: Call }>(null);

  const rafRef = useRef<number | undefined>(undefined);
  const lastRef = useRef<number>(0);
  const answeredRef = useRef(false);
  const livesRef = useRef(3);
  const scoreRef = useRef(0);

  useEffect(() => setBestScore(best.read()), []); // eslint-disable-line react-hooks/exhaustive-deps

  const cardTime = useCallback(
    (i: number) => Math.max(MIN_TIME, START_TIME - i * RAMP),
    [],
  );

  const start = useCallback(() => {
    setDeck(shuffle(features));
    setIdx(0);
    setScore(0);
    setLives(3);
    setCombo(0);
    setFeedback(null);
    setTimeLeft(START_TIME);
    answeredRef.current = false;
    livesRef.current = 3;
    scoreRef.current = 0;
    lastRef.current = performance.now();
    setStatus("playing");
  }, []);

  const nextCard = useCallback(() => {
    setFeedback(null);
    answeredRef.current = false;
    setIdx((i) => {
      const ni = i + 1;
      if (ni >= deck.length) {
        setDeck((d) => shuffle(d));
        setTimeLeft(cardTime(0));
        return 0;
      }
      setTimeLeft(cardTime(ni));
      return ni;
    });
    lastRef.current = performance.now();
  }, [deck.length, cardTime]);

  const resolve = useCallback(
    (choice: Call | null) => {
      if (answeredRef.current || status !== "playing") return;
      answeredRef.current = true;
      const card = deck[idx];
      if (!card) return;
      const ok = choice === card.call;

      if (ok) {
        const gain = 10 + combo * 2;
        scoreRef.current += gain;
        setScore(scoreRef.current);
        setCombo((c) => c + 1);
        setFeedback({ ok: true, why: card.why, correct: card.call });
      } else {
        setCombo(0);
        livesRef.current -= 1;
        setLives(livesRef.current);
        setFeedback({
          ok: false,
          why: choice === null ? "Too slow — it hit the deadline." : card.why,
          correct: card.call,
        });
      }

      window.setTimeout(() => {
        if (livesRef.current <= 0) {
          if (scoreRef.current > best.read()) {
            best.write(scoreRef.current);
            setBestScore(scoreRef.current);
          }
          setStatus("over");
        } else {
          nextCard();
        }
      }, ok ? 850 : 1250);
    },
    [deck, idx, combo, status, nextCard, best],
  );

  // timer loop
  useEffect(() => {
    if (status !== "playing") return;
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastRef.current) / 1000);
      lastRef.current = now;
      if (!answeredRef.current) {
        setTimeLeft((t) => {
          const nt = t - dt;
          if (nt <= 0) {
            resolve(null);
            return 0;
          }
          return nt;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [status, resolve]);

  // keyboard
  useEffect(() => {
    if (status !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "s") resolve("ship");
      else if (k === "d") resolve("defer");
      else if (k === "c") resolve("cut");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, resolve]);

  const card = deck[idx];
  const total = cardTime(idx);
  const pct = Math.max(0, Math.min(1, timeLeft / total));
  const endMsg =
    score >= 180 ? shipItCopy.end.good : score >= 80 ? shipItCopy.end.mid : shipItCopy.end.low;

  return (
    <GameShell
      title="Ship It"
      intro={shipItCopy.intro}
      status={status}
      score={score}
      best={bestScore}
      endMessage={endMsg}
      endTitle="Out of calls"
      onStart={start}
    >
      {status === "playing" && card && (
        <div className="flex h-full flex-col p-4 sm:p-5">
          {/* lives + combo */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((n) => (
                <span
                  key={n}
                  className="h-2 w-2 rounded-full"
                  style={{ background: n < lives ? "var(--coral-ink)" : "var(--rule-soft)" }}
                />
              ))}
            </div>
            {combo > 1 && (
              <span className="font-mono text-xs" style={{ color: "var(--coral-ink)" }}>
                {combo}× combo
              </span>
            )}
          </div>

          {/* timer bar */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--rule-soft)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${pct * 100}%`,
                background: pct > 0.4 ? "var(--coral-ink)" : "var(--void)",
                transition: "width 0.08s linear",
              }}
            />
          </div>

          {/* card */}
          <div className="flex flex-1 items-center justify-center">
            <div
              key={idx}
              className="w-full rounded-xl border p-5 text-center rise"
              style={{
                borderColor: feedback ? (feedback.ok ? "var(--live)" : "var(--void)") : "var(--rule-soft)",
                background: "var(--sheet)",
              }}
            >
              <p className="label mb-2" style={{ color: "var(--faint)" }}>
                incoming
              </p>
              <p className="font-display text-lg leading-snug sm:text-xl">{card.text}</p>

              <div aria-live="polite">
              {feedback && (
                <div className="mt-3">
                  <p className="text-sm" style={{ color: feedback.ok ? "var(--live)" : "var(--void)" }}>
                    {feedback.ok ? "Good call." : `Should've been ${feedback.correct}.`}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                    {feedback.why}
                  </p>
                </div>
              )}
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="grid grid-cols-3 gap-2">
            {calls.map((c) => (
              <button
                key={c.id}
                onClick={() => resolve(c.id)}
                disabled={!!feedback}
                className="min-h-11 rounded-lg border py-2.5 text-sm font-medium transition-colors disabled:opacity-40"
                style={{ borderColor: c.color, color: c.color }}
              >
                {c.label} <span className="ml-1 opacity-50">{c.key}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </GameShell>
  );
}
