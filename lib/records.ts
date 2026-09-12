/**
 * The record system.
 *
 * Every project, decision, lab build and note is a numbered, dated,
 * status-stamped record with visible provenance. See docs/BRIEF.md.
 *
 * Records are typed data validated at module load, so a malformed record
 * fails `next build` rather than shipping. Adding a record requires no
 * component changes — the template renders whatever the registry holds.
 *
 * Deviation from CLAUDE.md: records are TypeScript, not MDX. The eight-part
 * structure is short structured prose, not long-form articles, so MDX would
 * add a toolchain for no gain. Field notes (Phase 5) are long-form and will
 * use MDX.
 */

export type Status = "LIVE" | "SHIPPED" | "PoC" | "PROPOSED" | "INTERNAL" | "SUPERSEDED";
export type Confidence = "shipped" | "tested" | "proposed" | "self-reported";
export type Ownership = "I OWNED" | "I BUILT" | "I COLLABORATED ON" | "I INFLUENCED" | "TEAM OUTCOME";
export type RecordType = "PRJ" | "DEC" | "LAB" | "NOTE" | "EX";

export const STATUSES: Status[] = ["LIVE", "SHIPPED", "PoC", "PROPOSED", "INTERNAL", "SUPERSEDED"];
export const CONFIDENCES: Confidence[] = ["shipped", "tested", "proposed", "self-reported"];
export const OWNERSHIPS: Ownership[] = ["I OWNED", "I BUILT", "I COLLABORATED ON", "I INFLUENCED", "TEAM OUTCOME"];

/** Which colour a status stamp uses. Colour encodes status, nothing else. */
export type Metric = {
  value: string;        // "2.5 h/day"
  measure: string;      // how it was counted
  period: string;
  scope: string;        // team size, systems, blast radius
  ownership: Ownership;
  limitation: string;   // what would make a sceptic doubt it
  verifiable: boolean;  // false => rendered as explicitly unverifiable
};

export type Exhibit = {
  id: string;           // EX-01
  kind: "diagram" | "screenshot" | "artifact";
  proves: string;       // what it PROVES, not what it is
  redaction?: string;   // what must be blacked out, and the generalised label
  src?: string;         // absent => rendered as an outstanding exhibit slot
};

export type ProjectRecord = {
  id: string;           // PRJ-02
  slug: string;
  type: RecordType;
  title: string;
  date: string;         // ISO
  timeframe: string;    // human label
  status: Status;
  confidence: Confidence;
  confidential: boolean;
  href?: string;

  ownership: { owned: string[]; collaborated: string[]; team: string[] };
  refs: { from: string[]; to: string[] };
  supersededBy?: string;
  supersedes?: string;

  // The eight-part argument
  problem: string;
  constraint: string;
  options: string[];    // at least three, honestly stated
  decision: string;
  tradeoff: string;     // REQUIRED, never empty
  result: string[];
  superseded: string;   // what he'd do differently now

  metrics: Metric[];
  /** Honest gaps: what he would measure and why. Rendered, not hidden. */
  wouldMeasure: string[];
  exhibits: Exhibit[];

  /** Drafted by the agent from existing copy; awaiting Kaustubh's sign-off. */
  unconfirmed?: (keyof ProjectRecord)[];
};

/** Throws on a malformed record, which fails the build. */
export function validateRecord(r: ProjectRecord): void {
  const fail = (msg: string) => {
    throw new Error(`Invalid record ${r.id ?? "(no id)"}: ${msg}`);
  };

  if (!/^(PRJ|DEC|LAB|NOTE|EX)-\d{2}$/.test(r.id)) fail(`id "${r.id}" must look like PRJ-01`);
  if (!r.slug) fail("slug is required");
  if (!r.title) fail("title is required");
  if (!/^\d{4}(-\d{2})?(-\d{2})?$/.test(r.date)) fail(`date "${r.date}" must be ISO (YYYY or YYYY-MM-DD)`);
  if (!STATUSES.includes(r.status)) fail(`status "${r.status}" is not one of ${STATUSES.join(", ")}`);
  if (!CONFIDENCES.includes(r.confidence)) fail(`confidence "${r.confidence}" is not valid`);

  // The fields the old site was missing. These are the whole point.
  if (!r.problem?.trim()) fail("PROBLEM is empty");
  if (!r.constraint?.trim()) fail("CONSTRAINT is empty");
  if (!r.tradeoff?.trim()) fail("TRADE-OFF is required and never empty (docs/BRIEF.md)");
  if (r.options.length < 3) fail(`OPTIONS needs at least three, has ${r.options.length}`);
  if (!r.result.length) fail("RESULT is empty");

  // A record with no numbers must say what it would measure instead.
  if (!r.metrics.length && !r.wouldMeasure.length) {
    fail("has no metrics and no wouldMeasure — state what you would measure and why");
  }

  r.metrics.forEach((m, i) => {
    const where = `metrics[${i}] (${m.value || "no value"})`;
    for (const k of ["value", "measure", "period", "scope", "limitation"] as const) {
      if (!m[k]?.trim()) fail(`${where}: ${k} is empty — every number carries full provenance`);
    }
    if (!OWNERSHIPS.includes(m.ownership)) fail(`${where}: ownership "${m.ownership}" is not one of the five levels`);
  });

  r.exhibits.forEach((e, i) => {
    if (!/^EX-\d{2}$/.test(e.id)) fail(`exhibits[${i}]: id "${e.id}" must look like EX-01`);
    if (!e.proves?.trim()) fail(`exhibits[${i}]: must state what it PROVES, not what it is`);
  });

  if (!r.ownership.owned.length && !r.ownership.collaborated.length && !r.ownership.team.length) {
    fail("declares no ownership at any of the five levels");
  }
}

/** Status -> the token that carries it. No decorative colour anywhere. */
export function toneFor(status: Status): "live" | "review" | "void" {
  if (status === "LIVE" || status === "SHIPPED") return "live";
  if (status === "PoC" || status === "PROPOSED") return "review";
  return "void";
}
