"use client";

import { useState } from "react";
import Link from "next/link";
import { ShipIt } from "./ShipIt";
import { PipelinePanic } from "./PipelinePanic";

type Tab = "ship-it" | "pipeline-panic";

const tabs: { id: Tab; label: string; blurb: string }[] = [
  { id: "ship-it", label: "Ship It", blurb: "Call features ship / defer / cut before the deadline." },
  { id: "pipeline-panic", label: "Pipeline Panic", blurb: "Approve, test, or hold deploys. Keep prod alive." },
];

export function Playground() {
  const [tab, setTab] = useState<Tab>("ship-it");

  return (
    <div>
      {/* Decisions deck — its own full-page thing */}
      <Link
        href="/decisions"
        className="tile mb-6 flex-row items-center justify-between gap-4"
      >
        <div>
          <p className="font-serif text-xl" style={{ color: "var(--ink)" }}>
            Decisions deck
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            The slow version — 12 real calls, with the reasoning. You choose, then see what I did.
          </p>
        </div>
        <span className="shrink-0 text-sm" style={{ color: "var(--accent)" }}>
          Open →
        </span>
      </Link>

      {/* game switcher */}
      <div className="mb-5 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="rounded-lg border px-3.5 py-2 text-sm transition-colors"
            style={{
              borderColor: tab === t.id ? "var(--accent)" : "var(--line)",
              background: tab === t.id ? "color-mix(in srgb, var(--accent) 10%, var(--surface))" : "var(--surface)",
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

      {tab === "ship-it" ? <ShipIt /> : <PipelinePanic />}
    </div>
  );
}
