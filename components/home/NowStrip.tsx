"use client";

import { useState } from "react";
import { techFacts } from "@/content/facts";
import { useTechPulse } from "@/components/useTechPulse";

export function NowStrip() {
  const pulse = useTechPulse();
  const [fi, setFi] = useState(0);
  const fact = techFacts[fi % techFacts.length];

  return (
    <div className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-3" style={{ borderColor: "var(--line)", background: "var(--line-soft)" }}>
      <div className="p-4" style={{ background: "var(--surface)" }}>
        <p className="label flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--ok)" }} />
          Now
        </p>
        <p className="mt-2 text-sm leading-snug" style={{ color: "var(--ink-2)" }}>
          Running a top-percentile book at the Masters&rsquo; Union Investment Fund, and shipping side projects.
        </p>
      </div>

      <div className="p-4" style={{ background: "var(--surface)" }}>
        <p className="label">Tech pulse · live</p>
        <p className="mt-2 line-clamp-2 text-sm leading-snug" style={{ color: "var(--ink-2)" }}>
          {pulse.loading ? "Checking what tech is arguing about…" : pulse.headline}
        </p>
        {pulse.url && !pulse.loading && (
          <a href={pulse.url} target="_blank" rel="noopener noreferrer" className="link mt-1.5 inline-flex text-xs" style={{ color: "var(--accent)" }}>
            top of Hacker News, right now ↗
          </a>
        )}
      </div>

      <button onClick={() => setFi((i) => i + 1)} className="p-4 text-left transition-colors hover:bg-[var(--surface-hi)]" style={{ background: "var(--surface)" }}>
        <p className="label flex items-center justify-between">
          <span>Tech fun fact</span>
          <span aria-hidden="true">↻</span>
        </p>
        <p className="mt-2 line-clamp-3 text-sm leading-snug" style={{ color: "var(--ink-2)" }}>
          {fact.fact}
        </p>
      </button>
    </div>
  );
}
