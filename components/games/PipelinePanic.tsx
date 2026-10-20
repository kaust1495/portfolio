"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { deployLabels, pipelineCopy, type Deploy } from "@/content/games";
import { GameShell, useBest, type GameStatus } from "./GameShell";

const BEST_KEY = "kj-pipeline-best";
const PRACTICE_ROUNDS = 3;
const PRACTICE_TIME = 8;
const START_TIME = 4.4;
const MIN_TIME = 2.2;

type Action = "approve" | "test" | "hold";
const actions: { id: Action; label: string; key: string; color: string }[] = [
  { id: "approve", label: "Approve", key: "A", color: "var(--live)" },
  { id: "test", label: "Test", key: "T", color: "var(--coral-ink)" },
  { id: "hold", label: "Hold", key: "H", color: "var(--review)" },
];

let seq = 0;

function scriptedDeploy(round: number): Deploy | null {
  const script = [
    { label: "copy change", tested: true, touchesProd: false, offHours: false },
    { label: "payment webhook", tested: false, touchesProd: true, offHours: false },
    { label: "feature flag flip", tested: true, touchesProd: true, offHours: true },
  ] as const;
  const item = script[round - 1];
  return item ? { id: ++seq, ...item } : null;
}

function makeDeploy(round: number): Deploy {
  const scripted = scriptedDeploy(round);
  if (scripted) return scripted;

  const scenario = Math.random();
  const label = deployLabels[Math.floor(Math.random() * deployLabels.length)];
  if (scenario < 0.25) {
    return { id: ++seq, label, tested: Math.random() > 0.25, touchesProd: false, offHours: false };
  }
  if (scenario < 0.5) {
    return { id: ++seq, label, tested: false, touchesProd: true, offHours: false };
  }
  if (scenario < 0.75) {
    return { id: ++seq, label, tested: true, touchesProd: true, offHours: true };
  }
  return { id: ++seq, label, tested: true, touchesProd: true, offHours: false };
}

function correctAction(deploy: Deploy): Action {
  if (!deploy.touchesProd) return "approve";
  if (!deploy.tested) return "test";
  if (deploy.offHours) return "hold";
  return "approve";
}

function judge(deploy: Deploy, action: Action, combo: number) {
  const correct = correctAction(deploy);
  if (action === correct) {
    const base = action === "approve" ? 12 : action === "test" ? 10 : 8;
    const msg =
      action === "approve"
        ? deploy.touchesProd
          ? "Tested production change shipped during work hours."
          : "Staging deploy approved. No prod risk."
        : action === "test"
          ? "Untested production change got a gate before release."
          : "After-hours production change held for work hours.";
    return { ok: true, gain: base + combo * 2, uptimeDelta: 2, msg, delay: 1700 };
  }

  if (action === "approve" && !deploy.tested && deploy.touchesProd) {
    return { ok: false, gain: 0, uptimeDelta: -22, msg: "Untested change went to production. Incident.", delay: 2800 };
  }
  if (action === "approve" && deploy.offHours && deploy.touchesProd) {
    return { ok: false, gain: 0, uptimeDelta: -12, msg: "It shipped after hours with nobody watching. Hold these.", delay: 2400 };
  }
  if (action === "hold" && !deploy.tested && deploy.touchesProd) {
    return { ok: false, gain: 0, uptimeDelta: -12, msg: "Holding leaves the risky change in the queue. Test it.", delay: 2400 };
  }
  if (action === "hold") {
    return { ok: false, gain: 0, uptimeDelta: -8, msg: "This was safe to approve. Holding stalls the release train.", delay: 2200 };
  }
  return {
    ok: false,
    gain: 0,
    uptimeDelta: 0,
    msg: deploy.tested ? "Already tested. You spent the window checking a safe deploy." : "Staging did not need a full test cycle.",
    delay: 2000,
  };
}

export function PipelinePanic() {
  const best = useBest(BEST_KEY);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [uptime, setUptime] = useState(100);
  const [combo, setCombo] = useState(0);
  const [round, setRound] = useState(0);
  const [deploy, setDeploy] = useState<Deploy | null>(null);
  const [timeLeft, setTimeLeft] = useState(PRACTICE_TIME);
  const [flash, setFlash] = useState<null | { ok: boolean; msg: string }>(null);

  const rafRef = useRef<number | undefined>(undefined);
  const lastRef = useRef(0);
  const busyRef = useRef(false);
  const uptimeRef = useRef(100);
  const scoreRef = useRef(0);
  const roundRef = useRef(0);

  useEffect(() => setBestScore(best.read()), []); // eslint-disable-line react-hooks/exhaustive-deps

  const timeFor = (r: number) => {
    if (r <= PRACTICE_ROUNDS) return PRACTICE_TIME - (r - 1) * 0.8;
    return Math.max(MIN_TIME, START_TIME - (r - PRACTICE_ROUNDS - 1) * 0.16);
  };

  const spawn = useCallback(() => {
    setFlash(null);
    busyRef.current = false;
    roundRef.current += 1;
    setRound(roundRef.current);
    setDeploy(makeDeploy(roundRef.current));
    setTimeLeft(timeFor(roundRef.current));
    lastRef.current = performance.now();
  }, []);

  const start = useCallback(() => {
    seq = 0;
    roundRef.current = 1;
    uptimeRef.current = 100;
    scoreRef.current = 0;
    busyRef.current = false;
    setScore(0);
    setUptime(100);
    setCombo(0);
    setRound(1);
    setFlash(null);
    setDeploy(makeDeploy(1));
    setTimeLeft(timeFor(1));
    lastRef.current = performance.now();
    setStatus("playing");
  }, []);

  const end = useCallback(() => {
    if (scoreRef.current > best.read()) {
      best.write(scoreRef.current);
      setBestScore(scoreRef.current);
    }
    setStatus("over");
  }, [best]);

  const act = useCallback(
    (a: Action, auto = false) => {
      if (busyRef.current || status !== "playing" || !deploy) return;
      busyRef.current = true;
      const chosen = auto ? "approve" : a;
      const practice = roundRef.current <= PRACTICE_ROUNDS;
      const result = judge(deploy, chosen, combo);
      const uptimeDelta = practice ? 0 : result.uptimeDelta;

      if (result.ok) {
        scoreRef.current += result.gain;
        setScore(scoreRef.current);
        setCombo((c) => c + 1);
      } else {
        setCombo(0);
      }

      if (uptimeDelta !== 0) {
        uptimeRef.current = Math.max(0, Math.min(100, uptimeRef.current + uptimeDelta));
        setUptime(uptimeRef.current);
      }

      const prefix = auto ? "Timed out - auto-approved. " : practice && !result.ok ? "Practice call - no uptime lost. " : "";
      setFlash({ ok: result.ok, msg: `${prefix}${result.msg}` });

      window.setTimeout(() => {
        if (uptimeRef.current <= 0) end();
        else spawn();
      }, result.delay);
    },
    [deploy, combo, status, spawn, end],
  );

  // Timer.
  useEffect(() => {
    if (status !== "playing") return;
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastRef.current) / 1000);
      lastRef.current = now;
      if (!busyRef.current) {
        setTimeLeft((t) => {
          const nt = t - dt;
          if (nt <= 0) {
            act("approve", true);
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
  }, [status, act]);

  // Keyboard.
  useEffect(() => {
    if (status !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "a") act("approve");
      else if (k === "t") act("test");
      else if (k === "h") act("hold");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, act]);

  const practice = round <= PRACTICE_ROUNDS;
  const total = timeFor(round);
  const pct = Math.max(0, Math.min(1, timeLeft / total));
  const endMsg =
    score >= 150 ? pipelineCopy.end.good : score >= 60 ? pipelineCopy.end.mid : pipelineCopy.end.low;

  return (
    <GameShell
      title="Pipeline Panic"
      intro={pipelineCopy.intro}
      coach={["Approve safe deploys.", "Test untested production changes.", "Hold after-hours production changes."]}
      extra={(
        <div className="grid gap-1.5 text-left font-mono text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
          <p><span style={{ color: "var(--live)" }}>Approve</span> staging, or tested prod during work hours.</p>
          <p><span style={{ color: "var(--coral-ink)" }}>Test</span> anything untested that touches prod.</p>
          <p><span style={{ color: "var(--review)" }}>Hold</span> tested prod changes marked off-hours.</p>
        </div>
      )}
      status={status}
      score={score}
      best={bestScore}
      endTitle="Prod went down"
      endMessage={endMsg}
      onStart={start}
    >
      {status === "playing" && deploy && (
        <div className="flex h-full flex-col p-4 sm:p-5">
          {/* Numeric timer plus bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "var(--rule-soft)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${pct * 100}%`, background: pct > 0.35 ? "var(--coral-ink)" : "var(--void)", transition: "width 0.08s linear" }}
              />
            </div>
            <span className="w-11 text-right font-mono text-xs" style={{ color: "var(--muted)" }} aria-live="off">
              {Math.max(0, timeLeft).toFixed(1)}s
            </span>
          </div>

          {/* Uptime */}
          <div>
            <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
              <span className="label" style={{ color: uptime < 35 ? "var(--void)" : "var(--muted)" }}>
                prod uptime
              </span>
              <span className="font-mono">{Math.round(uptime)}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--rule-soft)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${uptime}%`,
                  background: uptime < 35 ? "var(--void)" : uptime < 65 ? "var(--review)" : "var(--live)",
                  transition: "width 0.3s var(--ease)",
                }}
              />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3 text-xs" style={{ color: "var(--faint)" }}>
            <span style={{ color: practice ? "var(--coral-ink)" : "var(--faint)" }}>
              {practice ? `practice ${round}/${PRACTICE_ROUNDS} - no uptime lost` : `deploy round ${round}`}
            </span>
            {combo > 1 && <span style={{ color: "var(--coral-ink)" }}>{combo}× clean</span>}
          </div>

          {/* Deploy card */}
          <div className="flex flex-1 items-center justify-center">
            <div
              key={deploy.id}
              className="w-full rounded-xl border p-5 text-center rise"
              style={{ borderColor: flash ? (flash.ok ? "var(--live)" : "var(--void)") : "var(--rule-soft)", background: "var(--sheet)" }}
            >
              <p className="label mb-2" style={{ color: "var(--faint)" }}>
                deploy #{deploy.id}
              </p>
              <p className="font-mono text-lg">{deploy.label}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                <Chip on={deploy.tested} yes="tests pass" no="untested" />
                <Chip on={deploy.touchesProd} yes="→ production" no="→ staging" invert />
                {deploy.touchesProd && (
                  <span className="tag" style={{ color: deploy.offHours ? "var(--review)" : "var(--live)", borderColor: deploy.offHours ? "var(--review)" : "var(--live)" }}>
                    {deploy.offHours ? "off-hours" : "work hours"}
                  </span>
                )}
              </div>

              <div aria-live="polite">
                {flash && (
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: flash.ok ? "var(--live)" : "var(--void)" }}>
                    {flash.msg}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {actions.map((a) => (
              <button
                key={a.id}
                onClick={(e) => { e.currentTarget.blur(); act(a.id); }}
                disabled={!!flash}
                className="min-h-11 rounded-lg border py-2.5 text-sm font-medium transition-colors disabled:opacity-40"
                style={{ borderColor: a.color, color: a.color }}
              >
                {a.label} <span className="ml-1 opacity-50">{a.key}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </GameShell>
  );
}

function Chip({ on, yes, no, invert }: { on: boolean; yes: string; no: string; invert?: boolean }) {
  const good = invert ? !on : on;
  return (
    <span
      className="tag"
      style={{ color: good ? "var(--live)" : "var(--void)", borderColor: good ? "var(--live)" : "var(--void)" }}
    >
      {on ? yes : no}
    </span>
  );
}
