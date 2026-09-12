"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { decisions, deckIntro, type DecisionCard } from "@/content/decisions";
import { caseStudies } from "@/content/profile";

type Phase = "choosing" | "consequence" | "revealed";
const STORE = "kj-decisions-v1";

const kindLabel: Record<DecisionCard["kind"], string> = {
  prioritize: "Ship / defer / cut",
  invest: "Back / pass",
  branch: "Live scenario",
};

export function Deck() {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("choosing");
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s?.answers && typeof s.answers === "object") {
        setAnswers(s.answers);
        const answered = Object.keys(s.answers).length;
        if (answered >= decisions.length) {
          setDone(true);
        } else {
          const at = Math.min(answered, decisions.length - 1);
          setI(at);
          if (s.answers[decisions[at]?.id]) setPhase("revealed");
        }
      }
    } catch {}
  }, []);

  const persist = useCallback((next: Record<string, string>) => {
    try {
      localStorage.setItem(STORE, JSON.stringify({ answers: next }));
    } catch {}
  }, []);

  const card = decisions[i];
  const picked = answers[card?.id];

  const score = useMemo(() => {
    let m = 0;
    for (const d of decisions) if (answers[d.id] === d.pick) m++;
    return m;
  }, [answers]);

  const choose = useCallback(
    (choiceId: string) => {
      if (picked) return;
      const next = { ...answers, [card.id]: choiceId };
      setAnswers(next);
      persist(next);
      setPhase(card.kind === "branch" ? "consequence" : "revealed");
    },
    [answers, card, picked, persist],
  );

  const next = useCallback(() => {
    if (i + 1 >= decisions.length) {
      setDone(true);
      return;
    }
    const n = i + 1;
    setI(n);
    setPhase(answers[decisions[n].id] ? "revealed" : "choosing");
  }, [i, answers]);

  const prev = useCallback(() => {
    if (i === 0) return;
    const p = i - 1;
    setI(p);
    setPhase(answers[decisions[p].id] ? "revealed" : "choosing");
  }, [i, answers]);

  const restart = useCallback(() => {
    setAnswers({});
    setI(0);
    setPhase("choosing");
    setDone(false);
    try {
      localStorage.removeItem(STORE);
    } catch {}
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      if (done) return;
      if ((e.key === "ArrowRight" || e.key === "Enter") && (phase === "revealed" || phase === "consequence")) {
        e.preventDefault();
        if (phase === "consequence") setPhase("revealed");
        else next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (phase === "choosing" && /^[1-9]$/.test(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (card?.choices[idx]) choose(card.choices[idx].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, next, prev, choose, card, done]);

  if (done) return <Summary score={score} total={decisions.length} onReplay={restart} />;

  return (
    <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[720px] flex-col px-4 pb-16 pt-10">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl">{deckIntro.title}</h1>
          <span className="label">
            {i + 1} / {decisions.length}
          </span>
        </div>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          {deckIntro.line}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {decisions.map((d, idx) => (
            <span key={d.id} className="pip" data-on={!!answers[d.id]} data-cur={idx === i} aria-hidden="true" />
          ))}
        </div>
      </div>

      <div className="flex-1">
        <div key={card.id} className="card-face rise p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className="tag"
              style={{ borderColor: "color-mix(in srgb, var(--coral-ink) 40%, var(--rule-soft))", color: "var(--coral-ink)" }}
            >
              {kindLabel[card.kind]}
            </span>
            <span className="label" style={{ color: "var(--faint)" }}>
              {card.tag}
            </span>
          </div>

          <p className="mt-5 font-display text-[1.4rem] leading-snug sm:text-[1.65rem]">{card.prompt}</p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {card.context}
          </p>

          <div className="mt-6 grid gap-2.5">
            {card.choices.map((c, idx) => {
              const isPicked = picked === c.id;
              const isActual = phase === "revealed" && card.pick === c.id;
              return (
                <button
                  key={c.id}
                  className="choice-btn flex items-center gap-3"
                  data-picked={isPicked}
                  data-actual={isActual}
                  disabled={!!picked}
                  onClick={() => choose(c.id)}
                >
                  <span className="kbd shrink-0">{idx + 1}</span>
                  <span className="flex-1">
                    <span style={{ color: "var(--ink)" }}>{c.label}</span>
                    {c.hint && (
                      <span className="ml-2 text-xs" style={{ color: "var(--faint)" }}>
                        {c.hint}
                      </span>
                    )}
                  </span>
                  {isActual && (
                    <span className="label" style={{ color: "var(--live)" }}>
                      my call
                    </span>
                  )}
                  {isPicked && !isActual && phase === "revealed" && (
                    <span className="label" style={{ color: "var(--muted)" }}>
                      you
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div aria-live="polite">
          {phase === "consequence" && card.kind === "branch" && (
            <div className="rise mt-5">
              <div
                className="rounded-xl border p-4 text-sm leading-relaxed"
                style={{ borderColor: "var(--rule-soft)", background: "var(--paper-2)", color: "var(--muted)" }}
              >
                <span className="label mb-1 block" style={{ color: "var(--review)" }}>
                  What happens
                </span>
                {card.consequences[picked]}
              </div>
              <button
                onClick={() => setPhase("revealed")}
                className="choice-btn mt-3 w-full text-center"
                style={{ borderColor: "var(--coral-ink)", color: "var(--coral-ink)" }}
              >
                So what did I actually do? →
              </button>
            </div>
          )}

          {phase === "revealed" && (
            <div className="rise mt-6 border-t pt-5" style={{ borderColor: "var(--rule-soft)" }}>
              <span className="label" style={{ color: "var(--coral-ink)" }}>
                The call I made
              </span>
              <p className="mt-2 leading-relaxed">{card.verdict}</p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                <span className="label mr-2" style={{ color: "var(--faint)" }}>
                  What happened
                </span>
                {card.outcome}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <button onClick={prev} disabled={i === 0} className="tap text-sm disabled:opacity-30" style={{ color: "var(--muted)" }}>
                  ← Back
                </button>
                <button
                  onClick={next}
                  className="choice-btn"
                  style={{
                    borderColor: "var(--coral-ink)",
                    color: "var(--coral-ink)",
                    background: "color-mix(in srgb, var(--coral-ink) 12%, var(--sheet))",
                  }}
                >
                  {i + 1 >= decisions.length ? "See how you did →" : "Next call →"}
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-xs" style={{ color: "var(--faint)" }}>
        keys: <kbd className="kbd">1</kbd> <kbd className="kbd">2</kbd> <kbd className="kbd">3</kbd> pick ·{" "}
        <kbd className="kbd">→</kbd> next
      </p>
    </div>
  );
}

function Summary({ score, total, onReplay }: { score: number; total: number; onReplay: () => void }) {
  const pct = Math.round((score / total) * 100);
  const read =
    pct >= 75
      ? "We think about this the same way."
      : pct >= 45
        ? "We agree about half the time — the other half is where it gets interesting."
        : "You'd push me hard in a room. That's useful.";

  return (
    <div className="rise relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[640px] flex-col justify-center px-4 py-24 text-center">
      <p className="label">You&rsquo;ve been through all {total}</p>
      <p className="display mt-4">
        {score}
        <span style={{ color: "var(--faint)" }}> / {total}</span>
      </p>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        calls where you made the same choice I did.
      </p>
      <p className="mt-6 font-display text-xl">{read}</p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button onClick={onReplay} className="choice-btn" style={{ color: "var(--muted)" }}>
          Replay the deck
        </button>
        <Link href="/work" className="choice-btn" style={{ borderColor: "var(--coral-ink)", color: "var(--coral-ink)" }}>
          See the work behind these →
        </Link>
      </div>

      <div className="mt-12 grid gap-2 text-left">
        <p className="label text-center">The builds these decisions came from</p>
        {caseStudies.map((c) => (
          <Link key={c.id} href={`/work/${c.id}`} className="tile flex-row items-center justify-between">
            <span style={{ color: "var(--ink)" }}>{c.title}</span>
            <span className="text-xs" style={{ color: "var(--faint)" }}>
              {c.timeframe} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
