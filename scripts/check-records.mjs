#!/usr/bin/env node
/**
 * Record schema test (BUILD-PLAN 2.1).
 *
 * Proves two things: every real record is valid, and the validator actually
 * rejects the malformed shapes it claims to — so "schema validation fails the
 * build" is a demonstrated property, not an assertion.
 *
 * Run: node --experimental-strip-types scripts/check-records.mjs
 */
import { validateRecord } from "../lib/records.ts";
import { projects as projectRecords } from "../content/records/projects.ts";

let failures = 0;

// 1. The real records all validate.
projectRecords.forEach(validateRecord);
console.log(`✓ ${projectRecords.length} project records load and validate`);
for (const r of projectRecords) {
  const numbers = r.metrics.length;
  const unconfirmed = r.unconfirmed?.length ?? 0;
  console.log(
    `  ${r.id} ${r.slug.padEnd(20)} [${r.status}] confidence=${r.confidence} ` +
      `metrics=${numbers} wouldMeasure=${r.wouldMeasure.length} exhibits=${r.exhibits.length}` +
      (unconfirmed ? `  (${unconfirmed} fields awaiting sign-off)` : ""),
  );
}

// 2. The validator rejects what it promises to reject.
const base = {
  id: "PRJ-99",
  slug: "x",
  type: "PRJ",
  title: "T",
  date: "2025",
  timeframe: "2025",
  status: "LIVE",
  confidence: "shipped",
  confidential: false,
  ownership: { owned: ["a"], collaborated: [], team: [] },
  refs: { from: [], to: [] },
  problem: "p",
  constraint: "c",
  options: ["1", "2", "3"],
  decision: "d",
  tradeoff: "t",
  result: ["r"],
  superseded: "s",
  metrics: [],
  wouldMeasure: ["w"],
  exhibits: [],
};

const mustReject = [
  ["empty TRADE-OFF", { ...base, tradeoff: "" }],
  ["fewer than three options", { ...base, options: ["1", "2"] }],
  ["no metrics and no wouldMeasure", { ...base, wouldMeasure: [] }],
  ["a metric with no limitation", {
    ...base,
    metrics: [{ value: "5", measure: "m", period: "p", scope: "s", ownership: "I OWNED", limitation: "", verifiable: false }],
  }],
  ["a metric with an invalid ownership level", {
    ...base,
    metrics: [{ value: "5", measure: "m", period: "p", scope: "s", ownership: "I sort of did it", limitation: "l", verifiable: false }],
  }],
  ["an invalid status", { ...base, status: "SHIPPPED" }],
  ["a malformed id", { ...base, id: "PRJ-1" }],
  ["an exhibit that doesn't say what it proves", { ...base, exhibits: [{ id: "EX-09", kind: "diagram", proves: "" }] }],
  ["no ownership declared", { ...base, ownership: { owned: [], collaborated: [], team: [] } }],
];

console.log("\nnegative cases:");
for (const [name, rec] of mustReject) {
  try {
    validateRecord(rec);
    console.error(`  ✗ NOT REJECTED: ${name}`);
    failures++;
  } catch (e) {
    console.log(`  ✓ rejected ${name}`);
    void e;
  }
}

try {
  validateRecord(base);
  console.log("  ✓ a well-formed record still passes");
} catch (e) {
  console.error(`  ✗ well-formed record was rejected: ${e.message}`);
  failures++;
}

if (failures) {
  console.error(`\n✗ ${failures} schema test failure(s)`);
  process.exit(1);
}
console.log("\n✓ schema holds: malformed records fail the build");
