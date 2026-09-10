"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { deployLabels, pipelineCopy, type Deploy } from "@/content/games";
import { GameShell, useBest, type GameStatus } from "./GameShell";

const BEST_KEY = "kj-pipeline-best";
const START_TIME = 4.4;
const MIN_TIME = 1.8;

type Action = "approve" | "test" | "hold";
const actions: { id: Action; label: string; key: string; color: string }[] = [
  { id: "approve", label: "Approve", key: "A", color: "var(--ok)" },
  { id: "test", label: "Test", key: "T", color: "var(--accent)" },
  { id: "hold", label: "Hold", key: "H", color: "var(--wait)" },
];

let seq = 0;
function makeDeploy(round: number): Deploy {
  const risk = Math.min(0.62, 0.18 + round * 0.03);
  return {
    id: ++seq,
    label: deployLabels[Math.floor(Math.random() * deployLabels.length)],
    tested: Math.random() > risk,
    touchesProd: Math.random() > 0.35,
    offHours: Math.random() > 0.7,
  };
}

export function PipelinePanic() {
  const best = useBest(BEST_KEY);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [uptime, setUptime] = useState(100);
  const [held, setHeld] = useState(0);
  const [combo, setCombo] = useState(0);
  const [round, setRound] = useState(0);
  const [deploy, setDeploy] = useState<Deploy | null>(null);
  const [timeLeft, setTimeLeft] = useState(START_TIME);
  const [flash, setFlash] = useState<null | { ok: boolean; msg: string }>(null);

  const rafRef = useRef<number | undefined>(undefined);
  const lastRef = useRef(0);
  const busyRef = useRef(false);
  const uptimeRef = useRef(100);
  const scoreRef = useRef(0);
  const heldRef = useRef(0);
  const roundRef = useRef(0);

  useEffect(() => setBestScore(best.read()), []); // eslint-disable-line react-hooks/exhaustive-deps

  const timeFor = (r: number) => Math.max(MIN_TIME, START_TIME - r * 0.16);

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
    roundRef.current = 0;
    uptimeRef.current = 100;
    scoreRef.current = 0;
    heldRef.current = 0;
    busyRef.current = false;
    setScore(0);
    setUptime(100);
    setHeld(0);
    setCombo(0);
    setRound(0);
    setFlash(null);
    setStatus("playing");
    roundRef.current = 1;
    setRound(1);
    setDeploy(makeDeploy(1));
    setTimeLeft(timeFor(1));
    lastRef.current = performance.now();
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
      const risky = !deploy.tested && deploy.touchesProd;
      let ok = true;
      let msg = "";
      let delay = 800;

      const effAction: Action = auto ? "approve" : a;

      if (effAction === "approve") {
        if (risky) {
          ok = false;
          uptimeRef.current = Math.max(0, uptimeRef.current - 22);
          setUptime(uptimeRef.current);
          setCombo(0);
          msg = auto ? "Timed out → auto-deployed an untested prod change. Incident." : "Untested change to prod. Incident.";
          delay = 1300;
        } else {
          const gain = 10 + combo * 2;
          scoreRef.current += gain;
          setScore(scoreRef.current);
          setCombo((c) => c + 1);
          uptimeRef.current = Math.min(100, uptimeRef.current + 2);
          setUptime(uptimeRef.current);
          msg = "Shipped clean.";
        }
      } else if (effAction === "test") {
        scoreRef.current += 4;
        setScore(scoreRef.current);
        setCombo(0);
        msg = risky ? "Good — testing caught the risk." : "Tested. Safe, if a little cautious.";
      } else {
        heldRef.current += 1;
        setHeld(heldRef.current);
        setCombo(0);
        if (heldRef.current >= 3) {
          heldRef.current = 0;
          setHeld(0);
          uptimeRef.current = Math.max(0, uptimeRef.current - 12);
          setUptime(uptimeRef.current);
          ok = false;
          msg = "Queue backed up. The team's blocked.";
          delay = 1200;
        } else {
          msg = "Held. The clock's still running.";
        }
      }

      setFlash({ ok, msg });
      window.setTimeout(() => {
        if (uptimeRef.current <= 0) end();
        else spawn();
      }, delay);
    },
    [deploy, combo, status, spawn, end],
  );

  // timer
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

  // keyboard
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

  const total = timeFor(round);
  const pct = Math.max(0, Math.min(1, timeLeft / total));
  const endMsg =
    score >= 150 ? pipelineCopy.end.good : score >= 60 ? pipelineCopy.end.mid : pipelineCopy.end.low;

  return (
    <GameShell
      title="Pipeline Panic"
      intro={pipelineCopy.intro}
      status={status}
      score={score}
      best={bestScore}
      endTitle="Prod went down"
      endMessage={endMsg}
      onStart={start}
    >
      {status === "playing" && deploy && (
        <div className="flex h-full flex-col p-4 sm:p-5">
          {/* uptime */}
          <div>
            <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
              <span className="label" style={{ color: uptime < 35 ? "var(--no)" : "var(--muted)" }}>
                prod uptime
              </span>
              <span className="font-mono">{Math.round(uptime)}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${uptime}%`,
                  background: uptime < 35 ? "var(--no)" : uptime < 65 ? "var(--wait)" : "var(--ok)",
                  transition: "width 0.3s var(--ease)",
                }}
              />
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs" style={{ color: "var(--faint)" }}>
            <span>held: {held}/3</span>
            {combo > 1 && <span style={{ color: "var(--accent)" }}>{combo}× clean</span>}
          </div>

          {/* timer */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${pct * 100}%`, background: pct > 0.35 ? "var(--accent)" : "var(--no)", transition: "width 0.08s linear" }}
            />
          </div>

          {/* deploy card */}
          <div className="flex flex-1 items-center justify-center">
            <div
              key={deploy.id}
              className="w-full rounded-xl border p-5 text-center rise"
              style={{ borderColor: flash ? (flash.ok ? "var(--ok)" : "var(--no)") : "var(--line)", background: "var(--surface-hi)" }}
            >
              <p className="label mb-2" style={{ color: "var(--faint)" }}>
                deploy #{deploy.id}
              </p>
              <p className="font-mono text-lg">{deploy.label}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                <Chip on={deploy.tested} yes="tests pass" no="untested" />
                <Chip on={deploy.touchesProd} yes="→ production" no="→ staging" invert />
                {deploy.offHours && <span className="tag" style={{ color: "var(--wait)", borderColor: "var(--wait)" }}>off-hours</span>}
              </div>

              {flash && (
                <p className="mt-3 text-sm" style={{ color: flash.ok ? "var(--ok)" : "var(--no)" }}>
                  {flash.msg}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {actions.map((a) => (
              <button
                key={a.id}
                onClick={() => act(a.id)}
                disabled={!!flash}
                className="rounded-lg border py-2.5 text-sm font-medium transition-colors disabled:opacity-40"
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
      style={{ color: good ? "var(--ok)" : "var(--no)", borderColor: good ? "var(--ok)" : "var(--no)" }}
    >
      {on ? yes : no}
    </span>
  );
}
