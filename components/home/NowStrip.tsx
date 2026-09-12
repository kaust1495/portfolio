"use client";

import { useState } from "react";
import { techFacts } from "@/content/facts";
import { useTechPulse } from "@/components/useTechPulse";

export function NowStrip() {
  const pulse = useTechPulse();
  const [fi, setFi] = useState(0);
  const fact = techFacts[fi % techFacts.length];

  return (
    <div className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0" style={{ borderColor: "var(--rule-soft)" }}>
      <div className="py-4 sm:pr-6">
        <p className="label flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--live)" }} />
          Now
        </p>
        <p className="mt-1.5 text-[0.82rem] leading-snug" style={{ color: "var(--ink-2)" }}>
          Running a top-percentile book at the Masters&rsquo; Union Investment Fund, and shipping side projects.
        </p>
      </div>

      <div className="py-4 sm:px-6">
        <p className="label">Tech pulse · live</p>
        <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-snug" style={{ color: "var(--ink-2)" }}>
          {pulse.loading ? "Checking what tech is arguing about…" : pulse.headline}
        </p>
        {pulse.url && !pulse.loading && (
          <a href={pulse.url} target="_blank" rel="noopener noreferrer" className="tap link mt-1 inline-flex text-[0.7rem]" style={{ color: "var(--coral-ink)" }}>
            top of Hacker News, right now ↗
          </a>
        )}
      </div>

      <button
        onClick={() => setFi((i) => i + 1)}
        className="py-4 text-left transition-colors hover:bg-[var(--paper)] sm:pl-6"
      >
        <p className="label flex items-center justify-between">
          <span>Tech fun fact</span>
          <span aria-hidden="true">↻</span>
        </p>
        <p className="mt-1.5 line-clamp-3 text-[0.82rem] leading-snug" style={{ color: "var(--ink-2)" }}>
          {fact.fact}
        </p>
      </button>
    </div>
  );
}
