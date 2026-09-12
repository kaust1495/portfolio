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
