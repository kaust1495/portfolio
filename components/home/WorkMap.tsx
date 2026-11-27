"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { caseStudies } from "@/content/profile";

/**
 * THE MAP — the discovery layer.
 * The four projects are nodes in one system, positioned by two real axes:
 * the product-lifecycle stage each project proves (x) and who the work
 * serves (y). Edges are the threads the work shares, named from the
 * principles and insights published in the chapters (content/profile.ts).
 * Selecting a node opens its dossier. Fully keyboard navigable.
 */

type NodeId = "helix" | "subpoena-migration" | "firststep" | "platform-automation";

type Pt = { x: number; y: number };

const STAGE: Record<NodeId, string> = {
  helix: "Define",
  "subpoena-migration": "Build",
  firststep: "Launch",
  "platform-automation": "Grow",
};

const ORDER: NodeId[] = ["helix", "subpoena-migration", "firststep", "platform-automation"];

/**
 * Edges: the threads, named from his published principles/insights.
 * Label positions are explicit per layout so they never collide with nodes.
 * bend: perpendicular bow of the curve (+ one side, - the other).
 */
type Edge = { a: NodeId; b: NodeId; label: string; quote?: boolean; bend: number; dLabel: Pt; mLabel: Pt };
const EDGES: Edge[] = [
  { a: "helix", b: "platform-automation", label: "Automation is a trust exercise", quote: true,
    bend: -70, dLabel: { x: 500, y: 105 }, mLabel: { x: 285, y: 160 } },
  { a: "platform-automation", b: "subpoena-migration", label: "Internal tools have users too", quote: true,
    bend: 70, dLabel: { x: 700, y: 330 }, mLabel: { x: 285, y: 505 } },
  { a: "subpoena-migration", b: "firststep", label: "Making opaque work legible",
    bend: 40, dLabel: { x: 400, y: 508 }, mLabel: { x: 285, y: 350 } },
  { a: "helix", b: "firststep", label: "Trust as the feature",
    bend: -50, dLabel: { x: 416, y: 285 }, mLabel: { x: 285, y: 270 } },
];

/**
 * Desktop layout, viewBox 1000x600. The Build node sits below the
 * Helix-FirstStep line so the "trust" edge clears it entirely.
 */
const DESKTOP: Record<NodeId, Pt> = {
  helix: { x: 140, y: 140 },
  "subpoena-migration": { x: 370, y: 380 },
  firststep: { x: 700, y: 500 },
  "platform-automation": { x: 860, y: 210 },
};

/** Mobile layout, viewBox 420x680: a compact vertical spine in lifecycle order. */
const MOBILE: Record<NodeId, Pt> = {
  helix: { x: 105, y: 80 },
  "subpoena-migration": { x: 105, y: 250 },
  firststep: { x: 105, y: 420 },
  "platform-automation": { x: 105, y: 590 },
};

const VB = { desktop: { w: 1000, h: 600 }, mobile: { w: 420, h: 680 } };

/** A gentle bow between two points; direction alternates for readability. */
function edgePath(a: Pt, b: Pt, bend: number): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  // perpendicular unit vector
  const px = -dy / len;
  const py = dx / len;
  return `M ${a.x} ${a.y} Q ${mx + px * bend} ${my + py * bend} ${b.x} ${b.y}`;
}

/** Midpoint of the bowed edge curve (quadratic bezier at t=0.5). */
function edgeMid(a: Pt, b: Pt, bend: number): Pt {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const cx = mx + px * bend;
  const cy = my + py * bend;
  return { x: 0.25 * a.x + 0.5 * cx + 0.25 * b.x, y: 0.25 * a.y + 0.5 * cy + 0.25 * b.y };
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

export function WorkMap() {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<NodeId | null>(null);
  const [active, setActive] = useState<NodeId | null>(null); // hover/focus
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const layout = isMobile ? MOBILE : DESKTOP;
  const vb = isMobile ? VB.mobile : VB.desktop;

  const studies = useMemo(
    () => Object.fromEntries(caseStudies.map((c) => [c.id, c])),
    []
  );

  const lit = active ?? selected;

  const onKey = (e: React.KeyboardEvent, id: NodeId) => {
    const i = ORDER.indexOf(id);
    let next: NodeId | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = ORDER[(i + 1) % ORDER.length];
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = ORDER[(i + ORDER.length - 1) % ORDER.length];
    if (next) {
      e.preventDefault();
      nodeRefs.current[next]?.focus();
    }
    if (e.key === "Escape") setSelected(null);
  };

  const sel = selected ? studies[selected] : null;

  return (
    <div className="workmap" data-mobile={isMobile || undefined}>
      <div
        className="workmap-canvas"
        style={{ aspectRatio: `${vb.w} / ${vb.h}` }}
        role="group"
        aria-label="Map of the four projects"
      >
        <svg
          viewBox={`0 0 ${vb.w} ${vb.h}`}
          preserveAspectRatio="none"
          className="workmap-svg"
          aria-hidden="true"
        >
          {EDGES.map((e) => {
            const a = layout[e.a];
            const b = layout[e.b];
            const isLit = lit === e.a || lit === e.b;
            const bend = isMobile ? Math.abs(e.bend) + 30 : e.bend;
            const state = lit ? (isLit ? "lit" : "dim") : "";
            return (
              <g key={e.label}>
                <path d={edgePath(a, b, bend)} className={["workmap-edge", state].join(" ")} />
                {isMobile && (
                  <line
                    x1={edgeMid(a, b, bend).x}
                    y1={edgeMid(a, b, bend).y}
                    x2={e.mLabel.x}
                    y2={e.mLabel.y}
                    className={["workmap-leader", state].join(" ")}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {EDGES.map((e) => {
          const m = isMobile ? e.mLabel : e.dLabel;
          const isLit = lit === e.a || lit === e.b;
          return (
            <span
              key={e.label}
              className={["workmap-thread", lit ? (isLit ? "lit" : "dim") : ""].join(" ")}
              style={{ left: `${(m.x / vb.w) * 100}%`, top: `${(m.y / vb.h) * 100}%` }}
            >
              {e.quote ? `“${e.label}”` : e.label}
            </span>
          );
        })}

        {ORDER.map((id) => {
          const c = studies[id];
          const p = layout[id];
          return (
            <button
              key={id}
              ref={(el) => { nodeRefs.current[id] = el; }}
              type="button"
              className={[
                "workmap-node",
                selected === id ? "selected" : "",
                lit && lit !== id && !EDGES.some((e) => (e.a === lit && e.b === id) || (e.b === lit && e.a === id)) ? "dim" : "",
              ].join(" ")}
              style={{ left: `${(p.x / vb.w) * 100}%`, top: `${(p.y / vb.h) * 100}%` }}
              aria-pressed={selected === id}
              aria-controls="workmap-dossier"
              onClick={() => setSelected(selected === id ? null : id)}
              onMouseEnter={() => setActive(id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(id)}
              onBlur={() => setActive(null)}
              onKeyDown={(e) => onKey(e, id)}
            >
              <span className="workmap-node-stage">{STAGE[id]}</span>
              <span className="workmap-node-title">{c.title}</span>
              <span className="workmap-node-time">{c.timeframe}</span>
            </button>
          );
        })}

        <span className="workmap-axis workmap-axis-x" aria-hidden="true">
          {isMobile ? "lifecycle stage ↓" : "lifecycle stage →"}
        </span>
        <span className="workmap-axis workmap-axis-y" aria-hidden="true">
          {isMobile ? "" : "inside the bank ↑ · the public ↓"}
        </span>
      </div>

      <div className="workmap-dossier" id="workmap-dossier" aria-live="polite">
        {sel ? (
          <div key={sel.id} className="workmap-dossier-in">
            <p className="workmap-dossier-meta">
              <span className="index-num">{sel.index}</span>
              <span className="menu-stage">{STAGE[sel.id as NodeId]}</span>
              <span className="menu-time">{sel.timeframe}</span>
            </p>
            <h3 className="workmap-dossier-title">{sel.title}</h3>
            <p className="workmap-dossier-kicker">{sel.kicker}</p>
            <ul className="workmap-dossier-outcomes">
              {sel.outcome
                // "Reframed the internal conversation..." states a changed
                // internal conversation as fact with no original user source;
                // omitted from the candidate until verified. The published
                // chapter page (production copy) is unchanged.
                .filter((o) => !o.startsWith("Reframed the internal conversation"))
                .map((o) => (
                  <li key={o}>{o}</li>
                ))}
            </ul>
            {sel.note && <p className="workmap-dossier-note">{sel.note}</p>}
            <div className="workmap-dossier-links">
              <Link href={`/work/${sel.id}`} className="btn btn--primary">
                Read the chapter <span className="arr" aria-hidden="true">→</span>
              </Link>
              {sel.href && (
                <a href={sel.href} target="_blank" rel="noopener noreferrer" className="btn">
                  Use it live <span className="arr" aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="workmap-dossier-in workmap-dossier-empty">
            <p className="label">The system at a glance</p>
            <p className="workmap-index-hint">
              Four projects, one per lifecycle stage. The threads are
              principles from the chapters. Pick one to open its dossier.
            </p>
            <div className="workmap-index">
              {ORDER.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="workmap-index-row"
                  onClick={() => setSelected(id)}
                >
                  <span className="workmap-index-stage">{STAGE[id]}</span>
                  <span className="workmap-index-title">{studies[id].title}</span>
                  <span className="workmap-index-kicker">{studies[id].kicker}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* accessible fallback: the chapters as a plain list */}
      <ul className="sr-only">
        {ORDER.map((id) => (
          <li key={id}>
            <Link href={`/work/${id}`}>{studies[id].title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
