"use client";

import { useState } from "react";
import { techFacts } from "@/content/facts";

export function NowStrip() {
  const [fi, setFi] = useState(0);
  const fact = techFacts[fi % techFacts.length];

  return (
    <div className="grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0" style={{ borderColor: "var(--rule-soft)" }}>
      <div className="py-4 sm:pr-6">
        <p className="label flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--live)" }} />
          Now
        </p>
        <p className="mt-1.5 text-sm leading-snug" style={{ color: "var(--ink-2)" }}>
          At Masters&rsquo; Union, and shipping FirmQuote, a fixed-price quoting tool for freelancers.
        </p>
      </div>

      <button
        onClick={() => setFi((i) => i + 1)}
        className="py-4 text-left transition-colors hover:bg-[var(--paper)] sm:pl-6"
      >
        <p className="label flex items-center justify-between">
          <span>Tech fun fact</span>
          <span aria-hidden="true">↻</span>
        </p>
        <p className="mt-1.5 line-clamp-3 text-sm leading-snug" style={{ color: "var(--ink-2)" }}>
          {fact.fact}
        </p>
      </button>
    </div>
  );
}
