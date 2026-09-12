import type { Status } from "@/lib/records";
import { toneFor } from "@/lib/records";

/**
 * The status stamp — the signature element.
 *
 * Rectangular outline in the status colour, rotated −2°, with a rough edge
 * from SVG turbulence displacement. One element delivers the status
 * taxonomy, the confidence signal and the honesty positioning.
 *
 * Deviation from docs/BRIEF.md: the brief asks for Archivo condensed at 11px,
 * but the type scale forbids anything below 12. The scale wins; the condensed
 * look comes from tracking rather than the `wdth` axis, which costs 56 KB.
 */
export function Stamp({ status, className = "" }: { status: Status; className?: string }) {
  const tone = toneFor(status);
  const id = `rough-${status.toLowerCase()}`;

  return (
    <span className={`stamp stamp--${tone} ${className}`} data-status={status}>
      <svg className="stamp__edge" aria-hidden="true" focusable="false">
        <filter id={id}>
          {/* baseFrequency ~0.4 gives a worn, inked edge rather than a wobble */}
          <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          filter={`url(#${id})`}
        />
      </svg>
      <span className="stamp__label">{status}</span>
    </span>
  );
}
