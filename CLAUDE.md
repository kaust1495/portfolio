@AGENTS.md

# CLAUDE.md — standing instructions

This file is always in context. Read `docs/BRIEF.md` for the full spec and
`docs/BUILD-PLAN.md` for the current phase and its acceptance criteria.

## What this is

`kaustubhjain.com` — the personal site of Kaustubh Jain, rebuilt as **THE REGISTER**.

> The portfolio is a decision register. Every project, experiment, claim and
> opinion is a numbered, dated, status-stamped record with visible provenance
> and cross-references. Records can be superseded.

This is not a metaphor chosen for looks. Kaustubh spent three years on regulated
bank release pipelines (change records), migrated a legal-document intake system
(records and routing), and built FirstStep Legal AI, whose entire value
proposition is *"what the law says, which Act and Section it comes from, the
official source."* The site behaves like the product he built.

## Positioning

**Product-minded technical builder.**

Tie-break order for every decision:
`product thinking > building > technical depth > AI-native > creative technology > personality`

Thesis, used verbatim on the homepage:

> I build the guardrails that let organisations trust automation.
> Engineer by training. Product thinker by practice. Builder by default.

## The seven constraints — non-negotiable

1. Every element must be explicable by the register metaphor. If an element
   needs a different explanation, delete it.
2. Nothing may be included because other good portfolios have it. Justify each
   element from Kaustubh's own material, or cut it.
3. Every claim about impact carries a citation marker resolving to measure,
   period, scope, ownership and limitation — or is stated as unverifiable.
4. Every record declares ownership (`I OWNED` / `I BUILT` / `I COLLABORATED ON`
   / `I INFLUENCED` / `TEAM OUTCOME`) and a status stamp (`LIVE` / `SHIPPED` /
   `PoC` / `PROPOSED` / `INTERNAL` / `SUPERSEDED`).
5. No decorative colour. Colour encodes status or reference, nothing else.
6. Every ambitious interaction ships with a conventional path beside it,
   visible from the first frame.
7. It must work completely on a 390px phone with one thumb — including the
   résumé.

## Two tests, applied before anything ships

**Element test.** Answer in one sentence: *"What does this prove about Kaustubh
that a screenshot of someone else's portfolio could also prove?"*
If the answer is "nothing", it stays. Otherwise it goes.

**Animation test.** Every animation must answer one of: *what changed? why did
it change? what can I do? what does this teach me?* If it answers none, remove it.

## Stack rules

- Next.js App Router. Records are MDX with typed frontmatter, rendered through
  **one** template. Never hardcode content into components.
- CSS first. Native View Transitions and CSS scroll-driven animations before any
  JS. These now cover most of what Framer Motion was used for and run on the
  compositor.
- Motion One (~4 KB) or GSAP **only** for genuinely complex orchestration, and
  only off the critical path.
- Three.js only when the visual behaviour is itself the evidence. Currently: never.
- No animation library on the critical path. The site currently ships none —
  keep it that way.

## Design tokens — the only values permitted

```
--paper   #E9EAE4   --sheet  #F7F7F4   --ink    #15171A
--ink-2   #3A4046   --muted  #5A6066   --rule   #CDD0C8   --rule-soft #DEE0D9

STATUS — the only saturated colours in the build
--live    #2C5F4F   oxide green   LIVE / SHIPPED / ACCEPTED
--review  #8A6212   ochre         PoC / PROPOSED / IN REVIEW
--void    #8B2E26   oxblood       SUPERSEDED / DEPRECATED / INTERNAL
--ref     #1B3D8F   ink blue      cross-references and citations only
```

Dark theme lifts the four status colours to `#5FBF9C / #D9A63F / #E08377 /
#7E9BEF`. Define the complete light palette on bare `:root` **first**, then
redefine only tokens under `@media (prefers-color-scheme: dark)` guarded as
`:root:not([data-theme="light"])`, then again under `:root[data-theme="dark"]`.

**Type:** Spectral (argument) · Archivo variable (apparatus, stamps) ·
Martian Mono (identifiers). Scale: `12 / 14 / 17 / 19 / 26 / 40px`. Nothing else.
`font-variant-numeric: tabular-nums` on every number.

**Grid:** 180px apparatus column + 32px gutter + 64ch argument column.
Max width 1040px. Spacing scale `24 / 48 / 96 / 160` only.

**Mobile:** the apparatus column reflows into a record header block above each
section; cross-references become tappable chips. All targets ≥44px.

## Do not

- 3D or WebGL before the exhibits exist
- The desktop-OS metaphor (saturated — multiple Awwwards recognitions, a GitHub
  template genre)
- Cream + serif display + terracotta (the 2026 generated-portfolio house style,
  and what this site is moving away from)
- A chatbot avatar, or any AI that authors or embellishes facts
- Silent personalisation — role routing is explicit and disclosed, and is a
  state machine, so never describe it as AI
- More than two games
- Any decorative accent colour
- Ambient motion, scroll reveals, or a cursor companion
- Content parked at `opacity: 0` waiting for an IntersectionObserver
- Hiding the résumé, contact or project titles behind exploration

## Ask before assuming

If a metric, an ownership boundary, or a confidentiality question is unresolved,
**stop and ask.** Do not invent a number, infer a scope, or soften a limitation.
Unverifiable claims must be labelled unverifiable. See `docs/CONTENT-NEEDED.md`.

## Workflow

Branch per phase. Vercel preview on every PR. Production is protected.
Before any merge: `typecheck`, `lint`, `build`, link check, route metadata check,
axe pass, Lighthouse budget. Never commit secrets — the AI layer uses env vars.
Update `CHANGELOG.md` on every merge; the register is meant to visibly evolve.
