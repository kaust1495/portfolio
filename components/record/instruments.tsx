"use client";

import { useState } from "react";

/**
 * Evidence instruments (BUILD-PLAN Phase 3).
 *
 * The eight-part spine repeats across records; the instrument varies, so four
 * case studies don't read as the same page four times. Each one demonstrates
 * the mechanism the record argues for — it is evidence, not decoration.
 *
 * The page picks which one to render; a server component may render a client
 * component but may not call a function from a client module.
 *
 * PRJ-01 has no instrument: its evidence is five product screenshots, which
 * don't exist yet, so its exhibit frames state what they will prove instead.
 */
/* ---- PRJ-02 — the approval gate, playable -------------------------- */

type GateStep = "idle" | "proposed" | "approved" | "denied" | "rolledback";

export function ApprovalGate() {
  const [step, setStep] = useState<GateStep>("idle");
  const [log, setLog] = useState<string[]>([]);

  const append = (line: string) => setLog((l) => [...l, `${stamp()} ${line}`]);

  const propose = () => {
    setStep("proposed");
    append("AGENT proposed: deploy payments-api 4.2.1 → client-facing");
    append("GATE held: client-facing environment requires a named human");
  };
  const approve = () => {
    setStep("approved");
    append("HUMAN k.jain approved");
    append("AGENT executed: deploy payments-api 4.2.1");
  };
  const deny = () => {
    setStep("denied");
    append("HUMAN k.jain denied — no change record attached");
    append("AGENT stopped. Nothing executed.");
  };
  const rollback = () => {
    setStep("rolledback");
    append("HUMAN k.jain triggered rollback");
    append("AGENT restored payments-api 4.2.0");
  };
  const reset = () => {
    setStep("idle");
    setLog([]);
  };

  return (
    <div className="instr">
      <p className="instr__label">The gate, playable</p>
      <p className="instr__note">
        This is the mechanism the record argues for: the agent proposes, a named human decides, and
        every action lands in the audit trail. Try denying it.
      </p>

      <div className="instr__controls">
        {step === "idle" && (
          <button className="instr__btn" onClick={propose}>
            Agent proposes a deploy
          </button>
        )}
        {step === "proposed" && (
          <>
            <button className="instr__btn instr__btn--live" onClick={approve}>
              Approve
            </button>
            <button className="instr__btn instr__btn--void" onClick={deny}>
              Deny
            </button>
          </>
        )}
        {step === "approved" && (
          <button className="instr__btn instr__btn--void" onClick={rollback}>
            Roll it back
          </button>
        )}
        {(step === "denied" || step === "rolledback") && (
          <button className="instr__btn" onClick={reset}>
            Run it again
          </button>
        )}
      </div>

      <ol className="instr__log" aria-live="polite" aria-label="Audit trail">
        {log.length === 0 && <li className="instr__logEmpty">Audit trail empty.</li>}
        {log.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ol>
    </div>
  );
}

function stamp() {
  return new Date().toISOString().slice(11, 19);
}

/* ---- PRJ-03 — routing, before and after ---------------------------- */

export function RoutingWipe() {
  const [after, setAfter] = useState(0); // 0 = legacy, 100 = redesigned

  return (
    <div className="instr">
      <p className="instr__label">Routing, before and after</p>
      <p className="instr__note">
        Drag between the legacy intake and what shipped with the migration. The move was the excuse;
        the routing change was the point.
      </p>

      <div className="wipe" style={{ ["--after" as string]: `${after}%` }}>
        <div className="wipe__side">
          <p className="wipe__title">Legacy intake</p>
          <ul className="wipe__list">
            <li>One shared queue</li>
            <li>Assignment by hand</li>
            <li>Status by asking someone</li>
            <li>No management reporting</li>
          </ul>
        </div>
        <div className="wipe__side wipe__side--after" aria-hidden={after < 50}>
          <p className="wipe__title">After the cutover</p>
          <ul className="wipe__list">
            <li>Owned personal work queues</li>
            <li>Rule-based case assignment</li>
            <li>Live status on every matter</li>
            <li>Real-time dashboards</li>
          </ul>
        </div>
      </div>

      <label className="instr__sliderLabel">
        <span>Legacy → redesigned</span>
        <input
          type="range"
          min={0}
          max={100}
          value={after}
          onChange={(e) => setAfter(Number(e.target.value))}
          aria-label="Wipe between legacy intake and the redesigned routing"
        />
      </label>
    </div>
  );
}

/* ---- PRJ-04 — the toil slider -------------------------------------- */

export function ToilSlider() {
  const [pct, setPct] = useState(0); // % of the estate standardised

  // Endpoints are Kaustubh's stated figures. The path between them is a
  // straight line for illustration — it is not measured data, and the caption
  // says so.
  const hours = (2.5 * (1 - pct / 100)).toFixed(2);
  const byHand = Math.round(3 * (1 - pct / 100));

  return (
    <div className="instr">
      <p className="instr__label">Where the 2.5 hours went</p>

      <div className="toil">
        <p className="toil__figure">
          {hours}
          <span className="toil__unit"> h/day</span>
        </p>
        <p className="toil__sub">
          {byHand === 0 ? "Deployments run from one pipeline" : `${byHand} components still deployed by hand`}
        </p>
      </div>

      <label className="instr__sliderLabel">
        <span>{pct}% of the estate standardised</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-label="Percentage of the estate containerised and standardised"
        />
      </label>

      <p className="instr__note">
        Illustrative. The endpoints are the figures in the record — 2.5 h/day across 11 people, 2–3
        components deployed by hand each day. The line between them is drawn straight for the sake of
        the control; no per-step measurement was taken.
      </p>
    </div>
  );
}
