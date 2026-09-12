"use client";

import { useState } from "react";
import Link from "next/link";
import { ShipIt } from "./ShipIt";
import { PipelinePanic } from "./PipelinePanic";
import { BugSquash } from "./BugSquash";

type Tab = "bug-squash" | "ship-it" | "pipeline-panic";

const tabs: { id: Tab; label: string; blurb: string }[] = [
  { id: "bug-squash", label: "Bug Squash", blurb: "Thirty seconds. Bugs crawl out, you click them. No product knowledge required." },
  { id: "ship-it", label: "Ship It", blurb: "Call features ship / defer / cut before the deadline." },
  { id: "pipeline-panic", label: "Pipeline Panic", blurb: "Approve, test, or hold deploys. Keep prod alive." },
];

export function Playground() {
  const [tab, setTab] = useState<Tab>("bug-squash");

  return (
    <div>
      {/* Decisions deck — its own full-page thing */}
      <Link
        href="/decisions"
        className="tile tile-row mb-6"
      >
        <div>
          <p className="font-display text-xl" style={{ color: "var(--ink)" }}>
            Decisions deck
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            The slow version — 12 real calls, with the reasoning. You choose, then see what I did.
          </p>
        </div>
        <span className="shrink-0 text-sm" style={{ color: "var(--coral-ink)" }}>
          Open →
        </span>
      </Link>

      {/* game switcher */}
      <div className="mb-5 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="min-h-11 rounded-lg border px-3.5 py-2 text-sm transition-colors"
            style={{
              borderColor: tab === t.id ? "var(--coral-ink)" : "var(--rule-soft)",
              background: tab === t.id ? "color-mix(in srgb, var(--coral-ink) 10%, var(--sheet))" : "var(--sheet)",
              color: tab === t.id ? "var(--ink)" : "var(--muted)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm" style={{ color: "var(--muted)" }}>
        {tabs.find((t) => t.id === tab)?.blurb}
      </p>

      {tab === "bug-squash" ? <BugSquash /> : tab === "ship-it" ? <ShipIt /> : <PipelinePanic />}
    </div>
  );
}
