# BRIEF.md — the spec

Reference document. `CLAUDE.md` holds the rules; this holds the detail.

---

## The concept

**The portfolio is a decision register.**

Every project, experiment, claim and opinion is a numbered, dated,
status-stamped record with visible provenance and cross-references. Records can
be superseded.

Why this and not a laboratory, an operating system, a dashboard or a 3D world:

- A change register is a real artefact from regulated release engineering.
  Kaustubh would have written them at Bank of America.
- FirstStep Legal AI — his own product — exists to answer *"what the law says,
  which Act and Section it comes from, the official source."* Citation and
  provenance. The site behaves like the product he built. Nobody else can make
  that argument.
- It reads serious rather than flashy, which protects against being remembered
  as "a cool developer portfolio" instead of a product thinker.
- Supersession solves a real problem. "What I changed my mind about" is
  universally recommended and almost never done, because as a *section* it
  reads as penance. As a *status* it is free: DEC-04 struck through, linked
  forward to DEC-11.
- It is buildable in CSS and SVG. No 3D, no physics, no WebGL.
- It is not saturated. The desktop-OS portfolio has multiple Awwwards
  recognitions and a GitHub template genre. No one has built a portfolio as a
  register.

### Record types

```
PRJ-01 … PRJ-04    Projects
DEC-01 … DEC-12    Decisions
LAB-01 … LAB-07    Lab builds
NOTE-01 …          Field notes
EX-01 …            Exhibits (diagrams, screenshots, artifacts)
```

Cross-references are real and bidirectional:
`PRJ-02 ← DEC-05, DEC-09 · → EX-03, EX-04`

---

## Record schema

```ts
type Status = 'LIVE' | 'SHIPPED' | 'PoC' | 'PROPOSED' | 'INTERNAL' | 'SUPERSEDED';
type Confidence = 'shipped' | 'tested' | 'proposed' | 'self-reported';
type Ownership = 'I OWNED' | 'I BUILT' | 'I COLLABORATED ON' | 'I INFLUENCED' | 'TEAM OUTCOME';

interface Metric {
  value: string;          // "2.5 h/day"
  measure: string;        // how it was counted
  period: string;         // "2024–2025"
  scope: string;          // "11-person cross-functional team"
  ownership: Ownership;
  limitation: string;     // "self-reported; internal tooling, not audited"
  verifiable: boolean;    // false ⇒ rendered as explicitly unverifiable
}

interface Record {
  id: string;             // "PRJ-02"
  type: 'PRJ' | 'DEC' | 'LAB' | 'NOTE' | 'EX';
  title: string;
  date: string;           // ISO
  status: Status;
  confidence: Confidence;
  ownership: { owned: string[]; collaborated: string[]; team: string[] };
  refs: { from: string[]; to: string[] };
  supersededBy?: string;
  supersedes?: string;
  metrics: Metric[];
  exhibits: string[];     // EX ids
  confidential: boolean;  // drives redaction rendering
}
```

Schema validation fails the build. Adding a record must require no component
changes.

---

## Case study structure

Eight parts. Ten would repeat four times and become the same formulaic problem
the current site has.

**Apparatus column (record header)**
```
PRJ-02 · 2025 · [PoC]
OWNED:        what he personally decided and built
COLLABORATED: what he did with others
TEAM:         what the team achieved that he contributed to
CONFIDENCE:   shipped / tested / proposed / self-reported
REFS:         ← DEC-05, DEC-09   → EX-03, EX-04
```

**Argument column**
1. `PROBLEM` — what was wrong, and for whom
2. `CONSTRAINT` — what made the obvious answer impossible
3. `OPTIONS` — at least three, honestly stated
4. `DECISION` — what he chose
5. `TRADE-OFF` — what he knowingly gave up. Required field, never empty.
6. `EVIDENCE` — EX-nn. At least one drawn diagram or real artifact.
7. `RESULT` — what changed, citation marker on every number
8. `SUPERSEDED?` — what he'd do differently, or a forward link

The spine repeats; the *evidence instrument* varies per record so the pages
don't feel identical. See `BUILD-PLAN.md` Phase 3.

---

## Provenance

Every number carries a superscript marker. Activating it fills the apparatus
column:

```
2.5 h/day ⁽¹⁾
  ────────────────────────────────────────────
  MEASURE      manual deploy time × 2–3 components/day
  PERIOD       2024–2025
  SCOPE        11 people, cross-functional
  OWNERSHIP    owned the automation; figure is a team outcome
  LIMITATION   self-reported; internal tooling, not independently audited
```

Recruiters are trained to distrust unscoped enterprise numbers. Volunteering
the scope converts a suspicious claim into a credible one.

**Known scoping fix:** the site currently says both *"consolidated 50+ physical
servers"* and *"coordinated a 150+ server upgrade for the Captiva platform."*
Both are true and they are different things. Render as
`50+ servers consolidated · 150+ upgraded (Captiva)` — never `150+ servers`
alone.

**Two records currently resolve to nothing measurable:**
- PRJ-01 FirstStep — "Live and usable" is not an outcome. Needs queries
  answered, pathways completed, jurisdictions covered, a hand-checked accuracy
  sample. If no number exists, state what he'd measure and why; that is itself
  a product answer.
- PRJ-02 Helix — an internal award is not an outcome. Needs release steps
  automated, number of approval gates, rollback time, test conditions, and what
  stayed hypothetical.

---

## Visual system

**Feeling:** precise, serious, quietly confident. A formal record with unusually
good typography. Not warm, not futuristic.

### Colour

There is no decorative accent colour. Every colour means something. That
constraint is itself the differentiator and a reviewer will notice it.

```
--paper      #E9EAE4   cool pale grey-green, ledger stock — NOT warm cream
--sheet      #F7F7F4
--ink        #15171A
--ink-2      #3A4046
--muted      #5A6066
--rule       #CDD0C8
--rule-soft  #DEE0D9

--live       #2C5F4F   oxide green    LIVE / SHIPPED / ACCEPTED
--review     #8A6212   ochre          PoC / PROPOSED / IN REVIEW
--void       #8B2E26   oxblood        SUPERSEDED / DEPRECATED / INTERNAL
--ref        #1B3D8F   ink blue       cross-references and citations only
```

Dark: `--paper #101214`, `--sheet #171A1D`, `--ink #E8EAE6`, status colours
lifted to `#5FBF9C / #D9A63F / #E08377 / #7E9BEF`.

### Type

| Role | Face |
|---|---|
| Argument / body | **Spectral**, 19px, line-height 1.62 |
| Apparatus / headings / stamps | **Archivo** variable, using the `wdth` axis narrow for record headers and stamps |
| Identifiers / data | **Martian Mono** — record numbers, dates, metrics, cross-refs |

Scale: `12 / 14 / 17 / 19 / 26 / 40`. Six values. Nothing between, nothing below
12. This alone fixes the current ten-sizes-on-one-page problem.

### Grid

```
│← 180px apparatus →│ 32px │←──────── 64ch argument ────────→│
│                   │      │                                  │
│  PRJ-02           │      │  Helix                           │
│  ┌─────────┐      │      │                                  │
│  │  PoC    │      │      │  Enterprise banking releases     │
│  └─────────┘      │      │  are fragile and heavily…        │
│  2025             │      │                                  │
│  OWNED: design,   │      │  [argument continues]            │
│  PoC, whitepaper  │      │                                  │
│  ← DEC-05, DEC-09 │      │                                  │
│  → EX-03, EX-04   │      │                                  │
```

The apparatus column is **marginalia, not navigation.** Sticky per section,
updating as the reader scrolls. This is a real document convention — scholarly
margin notes, legal marginalia, drawing title blocks — and it is rare on the web.

Max width 1040px. Gutters 32px. Spacing `24 / 48 / 96 / 160` only, with 160
reserved for the two most important transitions on a page.

### The stamp — signature element

Rectangular outline in the status colour, rotated −2°, subtle rough edge via SVG
turbulence displacement (`baseFrequency` ≈ 0.4). Archivo condensed, uppercase,
11px, 0.18em tracking.

```
┌──────────┐   ┌──────────┐   ┌──────────────┐
│   LIVE   │   │   PoC    │   │  SUPERSEDED  │
└──────────┘   └──────────┘   └──────────────┘
   oxide          ochre           oxblood
```

One element delivers the status taxonomy, the confidence signal and the honesty
positioning. It is what people will describe when they talk about the site.

### Graphics

- **No photography** except one portrait, treated as an ID photo in a record
  header: square, 1px rule, no rounded corners, no card, no shadow, no
  handwritten greeting.
- Everything else is line drawing at one weight (1.25px) plus one status-colour
  fill tint at 8%.
- Screenshots sit inside a drawn **exhibit frame** with a number and a caption
  stating what it *proves*: `EX-03 — the approval gate blocks a client-facing
  deploy until a named human signs off.`
- Redactions are real black bars. Hover lifts to a generalised version:
  `████████` → "a tier-1 retail bank." This turns the biggest content
  constraint into a signature device. Use roughly six times site-wide.

### Motion

| Event | Motion |
|---|---|
| Stamp enters | `scale(1.05)→1`, 120ms, `cubic-bezier(.2,.8,.2,1)`, no bounce |
| Citation opens | apparatus fills in place, 180ms height + opacity |
| Cross-ref hover | hairline draws marker → record, 240ms `stroke-dashoffset` |
| Supersession | strikethrough draws left-to-right on scroll-in, once |
| Record → record | View Transitions, record number as `view-transition-name` |
| Everything else | nothing |

No ambient motion. No scroll reveals. Content visible at rest.

### Mobile

The apparatus reflows into a record header block above each section;
cross-references become tappable chips at the bottom of the record. A deliberate
re-layout, not a squeeze. Stamps stay full size. Everything ≥44px.

---

## Information architecture

```
/                    The register — thesis, DEC-01, records, latest entries
/work                PRJ-01…04
  /work/[slug]       One record per project
/decisions           DEC-01…12 — primary route
/lab                 LAB-01…07 — each with a live inline demo
/notes               NOTE-01… — dated, RSS
/about               Route, playbook, credentials, contact
/resume              HTML; print stylesheet generates the PDF
/404                 Incident postmortem (Bug Squash lives here)

REMOVED: /playground → 301 to /lab
```

Nav: **Work · Decisions · Lab · Notes · About** + a persistent Résumé pill.

---

## Homepage

```
┌────────────────────────────────────────────────────────────────────────┐
│ KJ    Work · Decisions · Lab · Notes · About      [Résumé]  ⌘K   [☰]  │  56px
└────────────────────────────────────────────────────────────────────────┘

│← apparatus ──→│      │←──────────── argument ─────────────→│

  REGISTER              KAUSTUBH JAIN
  OPENED 2026           ════════════════════════════════════
  GURUGRAM · IN         I build the guardrails that let
  OPEN TO RELOCATE      organisations trust automation.

  [ LIVE ]              Engineer by training. Product thinker
                        by practice. Builder by default.

  ROUTE →               [ See the work ]  [ Résumé ↗ ]  [ Email ]
  recruiter
  founder               ─── 160px ───────────────────────────
  engineer
  investor              DEC-01                      00:14  [skip →]
                        ┌──────────────────────────────────┐
                        │ Two weeks of engineering. A      │
                        │ compliance ask that blocks next  │
                        │ month's release, or a dev-       │
                        │ experience fix that saves eleven │
                        │ people an hour a day.            │
                        │                                  │
                        │ [1 compliance] [2 fix] [3 split] │
                        │ ↳ commit → what I did · what     │
                        │   happened · 61% agreed          │
                        └──────────────────────────────────┘

                        ─── 160px ───────────────────────────

  PRJ-01 [LIVE]         THE WORK
  2025                  ────────
  OWNED: all            ┌──────────────────────────────────┐
  ← DEC-02, DEC-07      │ PRJ-01  FIRSTSTEP LEGAL AI       │
  → EX-01, EX-02        │ EX-01 ▸ [real product screen]    │
                        │ A plain-language guide to Indian │
                        │ law — and the next step to take. │
                        │ ⁽¹⁾ queries  ⁽²⁾ pathways        │
                        │ LIMIT: not reviewed by a lawyer  │
                        └──────────────────────────────────┘
  PRJ-02 [PoC]          ┌───────────┬───────────┬──────────┐
  PRJ-03 [SHIPPED]      │ PRJ-02    │ PRJ-03    │ PRJ-04   │
  PRJ-04 [SHIPPED]      │ HELIX     │ SUBPOENA  │ PLATFORM │
                        │ [drawing] │ [drawing] │ [drawing]│
                        │ ⁽¹⁾ gates │ ⁽¹⁾ LOSO  │2.5h/day⁽¹⁾│
                        └───────────┴───────────┴──────────┘
                             ↑ PRJ-01 gets 3× the weight

                        ─── 96px ────────────────────────────

  NOTE-03  12 AUG       NOTES                 LAB
  NOTE-02  03 JUL       What a bank needs     LAB-01 ♪ [4 bars
  NOTE-01  18 JUN       before an agent       of the hum, playing
                        touches the pipeline  inline]
                        9 min · 2 exhibits    Seven builds →

                        ─── 96px ────────────────────────────

                        THE ASK
                        One line: what, where, when, what a
                        good intro looks like.
                        hello@kaustubhjain.com · calendar ·
                        github · linkedin · résumé

  v19 · 4 SEP 2026      [ quiet mode ]   [ changelog ]
```

Roughly 2,600px. The current homepage is 1,959px carrying about a third of the
argument.

---

## The Decision Engine

- Inline on the homepage, one real call, three options, timer, visible `skip →`.
- Commit before reveal. Non-negotiable — it is the only thing that makes the
  exercise worth anything.
- After the reveal: what he chose, what happened, and what percentage of
  visitors chose each option (one edge KV counter).
- Each decision is a record. `DEC-05 → PRJ-02`. Case studies offer "the call
  behind this one" pointing at the specific card, not the generic deck.
- After twelve cards: a synthesis screen — the visitor's pattern, the
  corresponding principle, links to records, a shareable result. Not a
  personality test; the value is making his reasoning inspectable.
- Delete the `keys: 1 2 3 pick · → next` line. The options are already real
  `<button>` elements; make them look tappable instead of captioning them.

---

## The AI layer (Phase 6 only)

**Test:** an AI feature earns its place only if removing it would remove
information the visitor cannot get another way.

1. **Ask the register.** Retrieval over real source material. Every answer cites
   a specific record and paragraph, inline and clickable. Below the confidence
   floor it declines and shows what it *did* find. **The refusal is the
   feature** — a working demonstration of the thing he claims expertise in.
2. **Role routing.** A state machine. Reorders and changes default depth. Never
   call it AI.
3. **Adaptive depth.** `30 s / 3 min / 10 min` per record, generated from the
   long version, reviewed and cached at build time, never live. Show the
   compression ratio.
4. **`/notes/ai-governance`** — what the AI does, what it may not do, its
   sources, its failure behaviour, its monthly cost. Nobody publishes this. He
   is the one person whose portfolio it obviously belongs on.

---

## Games — two, plus one easter egg

1. **Ship It: The Run** — twelve calls, one shared budget of engineering-weeks,
   compounding consequences. Deferring the compliance fix in round three
   surfaces as an incident in round nine. Ends with a profile and a percentile.
2. **Governance Sandbox** — the visitor is the reviewer; an agent proposes
   twelve pipeline actions of escalating risk. Approve, deny, or demand a
   rollback plan. Too strict, nothing ships; too loose, an incident in a
   regulated environment, then the audit trail they generated. This is PRJ-02
   made playable.
3. **Bug Squash** → the 404, which is an incident postmortem for the page that
   doesn't exist.

Everything else proposed during research is cut. Shipping more would make this a
games site, which defeats the positioning.
