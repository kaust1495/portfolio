# Changelog

The register is meant to visibly evolve. Newest first.

## Phase 0 — blocking defects (unreleased, branch `phase-0-defects`)

Fixed, each re-verified live before the fix and measured after:

- **SEO (0.1, 0.2)** — `/work`, `/about`, `/lab`, `/playground` and `/decisions`
  all declared the homepage as their canonical and `og:url`; the four case
  studies shipped no share image at all. Every route now sets its own through
  `lib/seo.ts`, and case studies get a generated card showing record number,
  title and thesis. `npm run check:meta` fails the build if two routes ever
  share a canonical again.
- **Mobile navigation (0.3)** — below 640px the only controls were "Work" and a
  button labelled ⌘K, on devices with no ⌘ key; the résumé was unreachable.
  Now: a 44×44 menu button opening a full-height sheet with 56px rows, résumé
  as a visible pill at every width, ⌘K desktop-only.
- **Tap targets (0.4)** — measured 0 failures at 390px across `/`, `/work`,
  `/lab`, `/playground`, `/decisions`, `/about` and a case study, against 6
  known-undersized controls before.
- **Screen readers (0.5)** — score and end-of-run summaries announce politely;
  the per-second timer is explicitly silenced.
- **Skip link (0.6)** — first focusable element on every page.
- **Font weight (0.7)** — 380 KB across 6 files → **84 KB across 2**. Dropped
  Caveat and IBM Plex Mono (monospace now uses the system stack) and removed
  Fraunces' optical-size axis and italic file.
- **Tablet (0.8)** — 641–1023px got the phone layout; there is now a 768px tier
  restoring full navigation and two-column grids.
- **Tokens (0.9)** — renamed to the Phase 2 vocabulary, deleted the aliases that
  duplicated another token's hex, and fixed two tokens that were never defined:
  `--surface-hi` (used by both games) and `--line-soft` (used on About).

Still open: **0.10** needs a domain purchase and a `hello@` address, and
**Phase 1** content (`docs/CONTENT-NEEDED.md`) blocks Phase 2.

## Phases 2–4 — the register (branch `phase-2-records`)

- **The record system.** `lib/records.ts` is a typed schema validated at module
  load, so a malformed record fails the build; `scripts/check-records.mjs`
  proves it by feeding the validator nine malformed shapes. Adding a record
  needs no component change.
- **Tokens.** `app/tokens.css` is the only place values live. No decorative
  accent colour: colour means LIVE/SHIPPED, PoC/PROPOSED, SUPERSEDED, or a
  cross-reference. Six font sizes, four spacing steps, light and dark.
- **The apparatus grid.** 180px marginalia + 32px + 64ch, sticky beside the
  argument on desktop, reflowed into a header block on a phone.
- **The stamp.** Status colour, −2°, rough edge from SVG turbulence, 120ms
  scale-in, still at rest under `prefers-reduced-motion`.
- **Provenance.** Every number resolves to measure, period, scope, ownership
  and limitation, and says outright when it is not independently verifiable.
  `50+ consolidated` is now kept separate from `150+ upgraded (Captiva)`.
- **Honest gaps.** FirstStep and Helix had no measurable outcome, so instead of
  asserting one they state what would be measured and why.
- **Evidence instruments.** A playable approval gate (PRJ-02), a before/after
  routing wipe (PRJ-03), a toil slider (PRJ-04). FirstStep's five frames need
  product screenshots that don't exist yet; its exhibits say what they'll prove.
- **Homepage.** Thesis, then DEC-01 playable without scrolling past it (commit
  before reveal, visible skip), then the records, then the ask. No aggregate
  percentage is shown — that needs a real counter, and inventing one would be
  the exact failure this site argues against.
- **`/playground` → `/lab`** (308). The games and the builds are one argument.
- **Removed:** the cursor companion and ambient blobs, which `CLAUDE.md`
  forbids. The Lab keeps a record of the retirement rather than quietly
  dropping it.
