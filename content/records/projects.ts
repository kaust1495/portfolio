import type { ProjectRecord } from "@/lib/records";

/**
 * PRJ-01…04.
 *
 * Built from Kaustubh's existing case-study copy. No number appears here that
 * he hasn't already stated. Where a record resolves to nothing measurable, it
 * says what he would measure and why — per docs/CONTENT-NEEDED.md, an honest
 * gap is on-message; a soft assertion is not.
 *
 * Fields listed in `unconfirmed` were drafted from his own wording and need
 * his sign-off before they can be treated as his words. See docs/ANSWERS.md.
 */
export const projects: ProjectRecord[] = [
  {
    id: "PRJ-01",
    slug: "firststep",
    type: "PRJ",
    title: "FirstStep Legal AI",
    date: "2025",
    timeframe: "2025 · live",
    status: "LIVE",
    confidence: "shipped",
    confidential: false,
    href: "https://firststeplegalai.lovable.app/",
    ownership: {
      owned: [
        "Product definition",
        "Interaction design",
        "The trust boundary and how it is worded",
        "Shipping it",
      ],
      collaborated: [],
      team: [],
    },
    refs: { from: [], to: ["EX-01", "EX-02"] },
    problem:
      "Most people in India meet a legal problem — a bounced cheque, an eviction notice, a delayed salary, an FIR — with no idea what the law says or what to do first. The answers exist, buried in bare acts and government portals written for lawyers.",
    constraint:
      "In a high-stakes domain a confident wrong answer is worse than no answer, and nothing here is reviewed by a lawyer. So the product cannot rely on sounding authoritative — it has to be checkable.",
    options: [
      "An open-ended legal chatbot: widest coverage, but no way to bound what it asserts.",
      "A static explainer library: safe and verifiable, but it cannot meet someone at their actual situation.",
      "Guided pathways plus cited answers: narrower coverage, every claim traceable to an Act and Section.",
    ],
    decision:
      "Guided pathways for the most common situations — cheque bounce under Section 138, tenant eviction, domestic-violence support, consumer complaints — as step-by-step flows rather than open-ended chat, with every answer carrying its Act, Section and a link to the official source (India Code, eCourts, NALSA).",
    tradeoff:
      "Coverage, deliberately. A pathway product answers far fewer questions than an open chatbot, and every situation outside the built flows gets a worse experience. The exchange is that anything it does answer can be checked against a citation, and the line between legal information and legal advice stays visible.",
    result: [
      "Live and usable at firststeplegalai.lovable.app.",
      "A working answer to a question worth asking: what a responsible AI product looks like in a high-stakes domain.",
    ],
    superseded:
      "The honest gap is evaluation. There is no hallucination harness and no hand-checked accuracy sample, so correctness is asserted rather than demonstrated. That is the next thing to build, before any coverage expansion.",
    metrics: [],
    wouldMeasure: [
      "Queries answered, and how many ended at a cited source rather than a dead end.",
      "Pathway completion rate per flow — the share who reach a concrete next step.",
      "A hand-checked accuracy sample (n=50 is enough to be worth stating), scored against the cited Act and Section.",
      "Refusal rate on out-of-jurisdiction or advice-seeking questions: the refusal is the safety feature, so it should be counted.",
    ],
    exhibits: [
      {
        id: "EX-01",
        kind: "screenshot",
        proves: "An answer names the Act and Section it rests on and links to the official source.",
      },
      {
        id: "EX-02",
        kind: "screenshot",
        proves:
          "The product states where legal information ends and legal advice begins, in the flow rather than in a footer.",
      },
    ],
    unconfirmed: ["constraint", "options", "tradeoff", "superseded"],
  },
  {
    id: "PRJ-02",
    slug: "helix",
    type: "PRJ",
    title: "Helix",
    date: "2025",
    timeframe: "2025",
    status: "PoC",
    confidence: "tested",
    confidential: true,
    ownership: {
      owned: ["The agent architecture", "The white paper", "The proof-of-concept"],
      collaborated: ["Taking it into the DCRS Innovation Challenge"],
      team: [],
    },
    refs: { from: [], to: ["EX-03"] },
    problem:
      "Enterprise banking releases are fragile and heavily manual: every deployment is a checklist a person walks by hand, and a missed step can mean downtime for thousands of internal users.",
    constraint:
      "The obvious pitch — let an agent run the pipeline — is a non-starter in a bank. An autonomous system you cannot audit or stop is a risk, not a tool.",
    options: [
      "Full agent autonomy over the pipeline: the largest time saving, and unapprovable in a regulated environment.",
      "Conventional scripted automation: approvable, but it cannot handle anything the script did not anticipate.",
      "Agents that propose and humans who approve: slower per release, auditable end to end.",
    ],
    decision:
      "A controlled architecture where agents propose actions but a human approves anything touching a client-facing environment, with change logging and automated rollback as first-class features rather than afterthoughts.",
    tradeoff:
      "Most of the speed. A gate in front of every client-facing action means the agent cannot compress the release window the way full autonomy would, and a human stays on the critical path. What that buys is the only version of the system a bank can actually approve: every action attributable, reversible, and stoppable.",
    result: [
      "A working proof-of-concept against real release workflows.",
      "Earned a High Five Award in the DCRS Innovation Challenge — recognition of the approach, not evidence that it works at scale.",
      "Reframed the internal conversation from “can we trust AI in the pipeline” to “what guardrails make it trustworthy”.",
    ],
    superseded:
      "It stayed a proof-of-concept. Nothing here was run against production, so the rollback guarantee is tested under PoC conditions only.",
    metrics: [],
    wouldMeasure: [
      "Release steps the PoC automated, as a fraction of the manual checklist.",
      "Number of approval gates, and which environments each one guards.",
      "Rollback time from a bad action, measured end to end — the number the whole design rests on.",
      "What stayed hypothetical: the conditions the PoC was exercised under, stated plainly.",
    ],
    exhibits: [
      {
        id: "EX-03",
        kind: "diagram",
        proves:
          "The approval gate blocks a client-facing deploy until a named human signs off, and every action lands in the audit trail.",
        redaction: "Internal environment and system names blacked out; generalised label — “a tier-1 retail bank”.",
      },
    ],
    unconfirmed: ["options", "tradeoff", "superseded"],
  },
  {
    id: "PRJ-03",
    slug: "subpoena-migration",
    type: "PRJ",
    title: "Subpoena processing migration",
    date: "2025-05",
    timeframe: "2024–2025",
    status: "SHIPPED",
    confidence: "shipped",
    confidential: true,
    ownership: {
      owned: ["Automated case assignment, work queues and dashboards as part of the move"],
      collaborated: ["Cutover sequencing across engineering and compliance"],
      team: ["The LOSO May 2025 release"],
    },
    refs: { from: [], to: ["EX-04"] },
    problem:
      "Subpoena and legal-document processing ran on a legacy intake system with limited visibility, manual assignment and no real reporting.",
    constraint:
      "Active legal matters cannot pause for a migration, and the mandate was written as a lift-and-shift — so any redesign had to be delivered inside a cutover that could not slip.",
    options: [
      "Lift and shift as mandated: lowest risk, and it relocates the broken workflow intact.",
      "Migrate first, redesign later: defensible, but the second phase rarely gets funded once the box is ticked.",
      "Use the cutover as the moment to redesign routing, tracking and reporting.",
    ],
    decision:
      "Treat the migration as a product decision: ship automated case assignment, personal work queues and real-time dashboards as part of the move, with forward-compatible document routing keeping digital intake and the new repository in sync.",
    tradeoff:
      "Scope risk on a date that could not move. Redesigning during a cutover meant more to get wrong while active matters were in flight, and it consumed the contingency that a plain lift-and-shift would have kept in reserve.",
    result: [
      "Delivered the LOSO May 2025 release on schedule, with continuity of active matters.",
      "Turned an opaque manual process into one with live status, ownership and management reporting.",
    ],
    superseded:
      "“On schedule” is a delivery fact, not an outcome. Without before-and-after cycle time or a misroute rate, the workflow claim rests on description rather than measurement.",
    metrics: [],
    wouldMeasure: [
      "Document volume through intake, per month, before and after.",
      "Cycle time from intake to assignment — the number the redesign was for.",
      "Error or misroute rate, before and after.",
      "Queue visibility: how long it took to answer “where is this matter” in each system.",
    ],
    exhibits: [
      {
        id: "EX-04",
        kind: "diagram",
        proves:
          "Routing before and after: manual assignment from a shared inbox becomes rule-based assignment into owned queues with live status.",
        redaction: "System names and matter identifiers blacked out; generalised label — “a tier-1 retail bank”.",
      },
    ],
    unconfirmed: ["constraint", "options", "tradeoff", "superseded"],
  },
  {
    id: "PRJ-04",
    slug: "platform-automation",
    type: "PRJ",
    title: "Platform consolidation & release automation",
    date: "2024",
    timeframe: "2024–2026",
    status: "SHIPPED",
    confidence: "self-reported",
    confidential: true,
    ownership: {
      owned: ["Automating the daily deployment cycle with Ansible and Jenkins"],
      collaborated: [
        "The .NET Framework 4.8 → .NET 8 migration",
        "Containerising applications and pipelines onto OpenShift",
      ],
      team: ["The Captiva platform upgrade", "The August release date"],
    },
    refs: { from: [], to: ["EX-05"] },
    problem:
      "Core banking applications ran on .NET Framework 4.8 across a sprawl of physical servers, with 2–3 components deployed by hand every day. Environments drifted, releases took hours, and the toil fell on a small team.",
    constraint:
      "None of it could stop. These are core banking applications, so every change had to land without a break in service, alongside the daily release load it was meant to remove.",
    options: [
      "Leave it and absorb the toil: no migration risk, and the drift compounds.",
      "Automate the existing manual process in place: quick relief, and it preserves the server sprawl underneath.",
      "Consolidate and containerise, then automate on top of a standardised environment.",
    ],
    decision:
      "Treat internal developer experience as a product with real users. Consolidate the estate, containerise applications and pipelines onto OpenShift to kill configuration drift, then automate the daily deployment cycle on top of that standard shape.",
    tradeoff:
      "A long migration paid up front by the same small team already carrying the daily releases, and a new platform they had to learn, in exchange for relief that only arrived once the estate was standardised.",
    result: [
      "Cut roughly 2.5 hours of manual release work per day for a cross-functional team of 11.",
      "Consolidated 50+ physical servers and gave every environment the same shape.",
      "Roughly 40% reduction in deployment lag on the containerised applications.",
    ],
    superseded:
      "Every number here is internally observed rather than instrumented. A time-and-motion baseline taken before the work would have made the same claims checkable by someone who was not in the team.",
    metrics: [
      {
        value: "2.5 h/day",
        measure: "Manual deploy time × 2–3 components per day, before automation",
        period: "2024–2025",
        scope: "11 people, cross-functional",
        ownership: "TEAM OUTCOME",
        limitation:
          "Self-reported; internal tooling, not independently audited. The automation was owned; the saving is a team outcome.",
        verifiable: false,
      },
      {
        value: "50+ servers consolidated",
        measure: "Physical servers removed from the estate during consolidation",
        period: "2024–2026",
        scope: "Core banking application estate",
        ownership: "I COLLABORATED ON",
        limitation:
          "A different figure from the Captiva upgrade below; the two are often collapsed into one number, which they are not.",
        verifiable: false,
      },
      {
        value: "150+ upgraded (Captiva)",
        measure: "Servers upgraded in the Captiva platform upgrade, coordinated to hit the August release",
        period: "2025",
        scope: "Captiva platform",
        ownership: "TEAM OUTCOME",
        limitation: "Separate from the 50+ consolidated. Never state as “150+ servers” alone.",
        verifiable: false,
      },
      {
        value: "~40%",
        measure: "Reduction in deployment lag on containerised applications, observed before vs after",
        period: "2024–2026",
        scope: "Containerised applications only, not the whole estate",
        ownership: "I COLLABORATED ON",
        limitation: "Self-reported and approximate; no instrumented baseline was captured before the work.",
        verifiable: false,
      },
    ],
    wouldMeasure: [
      "A time-and-motion baseline before the work, so the 2.5 h/day figure is measured rather than recalled.",
      "Change failure rate and mean time to restore, before and after containerisation.",
    ],
    exhibits: [
      {
        id: "EX-05",
        kind: "screenshot",
        proves:
          "The daily deployment that took hours by hand runs as one pipeline, with the same environment shape every time.",
        redaction: "Hostnames, job names and internal URLs blacked out; generalised label — “a tier-1 retail bank”.",
      },
    ],
    unconfirmed: ["constraint", "options", "tradeoff", "superseded"],
  },
];
