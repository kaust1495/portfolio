"use client";

import { useId, useState } from "react";
import type { Metric } from "@/lib/records";

/**
 * A citation marker on a number, and the provenance it resolves to.
 *
 * Recruiters are trained to distrust unscoped enterprise numbers, so
 * volunteering measure, period, scope, ownership and limitation converts a
 * suspicious claim into a credible one. Every number on the site carries one
 * of these or is labelled unverifiable.
 *
 * Deviation from docs/BRIEF.md: the panel opens in place rather than filling
 * the apparatus column. In-place keeps one DOM node for both layouts, so it
 * stays keyboard- and screen-reader-correct at 390px, where the apparatus has
 * reflowed away entirely.
 */
export function Citation({ n, metric }: { n: number; metric: Metric }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <>
      <button
        type="button"
        className="cite"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        aria-label={`Provenance for ${metric.value}`}
      >
        <sup>({n})</sup>
      </button>

      <span id={panelId} className="prov" hidden={!open}>
        <span className="prov__grid">
          <Row k="MEASURE" v={metric.measure} />
          <Row k="PERIOD" v={metric.period} />
          <Row k="SCOPE" v={metric.scope} />
          <Row k="OWNERSHIP" v={metric.ownership} />
          <Row k="LIMITATION" v={metric.limitation} />
        </span>
        {!metric.verifiable && (
          <span className="prov__unverified">
            Not independently verifiable — stated on the strength of Kaustubh&rsquo;s own record.
          </span>
        )}
      </span>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <>
      <span className="prov__k">{k}</span>
      <span className="prov__v">{v}</span>
    </>
  );
}
