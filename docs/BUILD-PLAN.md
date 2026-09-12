# BUILD-PLAN.md

Sequenced work with verifiable done-conditions. Do not start a phase until the
previous one's acceptance criteria all pass.

**Phase 0 is a fix-in-place on the current site. Do not restructure anything in
Phase 0.** The rebuild starts at Phase 2.

---

## Phase 0 — Blocking defects (~8 h)

These were measured live on 11 Sep 2026. Re-verify each before fixing; if a
defect is already gone, note it and move on.

### 0.1 Canonical and og:url leak into five routes
`/work`, `/about`, `/lab`, `/playground`, `/decisions` each ship
`<link rel="canonical" href="https://kaustubhjain.vercel.app">` — the homepage
URL. This instructs search engines to treat them as duplicates. `og:url` is
wrong on the same five. The root layout's metadata is being inherited.

**Fix:** per-route `generateMetadata` setting `alternates.canonical` and
`openGraph.url`.
**Accept:** `curl -s <route> | grep canonical` returns the route's own URL for
all 10 routes. Add a test that fails if any two routes share a canonical.

### 0.2 Case studies have no share image
`/work/helix` and `/work/firststep` declare `twitter:card=summary_large_image`
and ship no `og:image` and no `og:url`.

**Fix:** `app/work/[slug]/opengraph-image.tsx` rendering record number, title
and thesis line.
**Accept:** every route returns a 200 `og:image`; validate one URL in a social
card debugger.

### 0.3 Mobile navigation is broken
`<span class="hidden … sm:flex">` wraps Lab, Playground, About and Résumé —
`display:none` below 640px, with no hamburger. Under 640px the only header
controls are "Work" (32×20px) and a button labelled **⌘K**, on a device with
no ⌘ key. The résumé is unreachable.

**Fix:** 44×44 menu button opening a full-height sheet with all destinations at
56px row height. Pin Résumé as a visible pill at every breakpoint. ⌘K
desktop-only.
**Accept:** at 390px every nav destination is reachable in ≤2 taps; résumé in 1.

### 0.4 Tap targets below 44px
Measured: Work 32×20 · KJ 28×28 · HN link 160×18 · Playground chips 35px ·
Sound 94×34 · chat 122×36.

**Fix:** padding, not font size.
**Accept:** a script asserting every `a`/`button` has a rendered box ≥44×44 at
390px, excluding inline text links inside prose.

### 0.5 No `aria-live` anywhere
Game scores, timers and the Decisions reveal are silent to screen readers.

**Fix:** `aria-live="polite"` on reveals and score changes. Timer is
`aria-live="off"` with a summary announced at the end, not per second.
**Accept:** a VoiceOver or NVDA pass announces a decision reveal and a final
game score.

### 0.6 No skip link
**Fix:** `<a href="#main" class="skip">` as the first focusable element.
**Accept:** Tab once from page load reveals it; Enter moves focus into `<main>`.

### 0.7 Fonts are 65% of page weight
6 files, 381 KB of a 582 KB page. Caveat is loaded for roughly two strings.

**Fix:** drop Caveat and IBM Plex Mono. Subset the remainder with
`unicode-range` limited to Latin.
**Accept:** total font transfer under 120 KB.

### 0.8 No tablet breakpoint
Compiled CSS contains only `40rem`, `64rem`, `640px`. 641–1023px gets the phone
layout.
**Fix:** add a 768px tier restoring full nav and a two-column grid.
**Accept:** iPad portrait (768×1024) shows full navigation.

### 0.9 Design tokens have drifted
`--lav` holds `#bf3d1e` (a terracotta). `--mint` duplicates `--sage`.
`--accent-soft`, `--coral-soft` and `--lav-soft` are all `#ffeee8`.
`--font-serif` is the unused Tailwind default. The focus ring is currently
`2.5px solid var(--lav)`.
**Fix:** rename to the Phase 2 token set; delete unused tokens.
**Accept:** no token name contradicts its value; no duplicate hex under two names.

### 0.10 The domain
`.vercel.app`, a Gmail address inside the site's own JSON-LD, and FirstStep
living at `firststeplegalai.lovable.app`.
**Fix:** buy `kaustubhjain.com`; Vercel project domain + DNS. Move email to
`hello@`. Point a subdomain at FirstStep.
**Accept:** the apex resolves, old Vercel URL 308s to it, JSON-LD `email` and
`url` updated, `sameAs` includes GitHub.

**Phase 0 exit:** all ten accept. Lighthouse SEO ≥ 95. Deploy and confirm
Search Console shows the five routes as indexable.

---

## Phase 1 — Content (blocking, mostly Kaustubh's work)

The agent cannot proceed without this. See `docs/CONTENT-NEEDED.md`.

**Accept:** `content/records/*.mdx` exists for PRJ-01…04 with every required
frontmatter field populated, no `TODO`, and every metric carrying a full
provenance block. Ownership declared per record. The eight questions in
CONTENT-NEEDED are answered in `docs/ANSWERS.md`.

**Do not begin Phase 2 with placeholder content.** A visual system built around
absent evidence produces a polished shell, which is the failure mode of the
current site.

---

## Phase 2 — The record system (~20 h)

### 2.1 Data model
`lib/records.ts` with a typed schema — see `docs/BRIEF.md` §Record schema.
**Accept:** schema validation fails the build on a malformed record. Adding a
new record requires no component changes.

### 2.2 Token layer and type scale
**Accept:** no hard-coded colour or font-size anywhere outside the token file.
A grep for `#[0-9a-f]{6}` outside `tokens.css` returns nothing. Only the six
permitted sizes appear. Light, dark and unset-theme all render correctly —
verify `prefers-color-scheme: dark` with no `data-theme` attribute present.

### 2.3 The apparatus grid
180px apparatus + 32px + 64ch argument, max 1040px. The apparatus is
sticky-per-section and updates as the reader scrolls, so the metadata beside a
paragraph is that paragraph's metadata.
**Accept:** at 1440px the apparatus tracks the correct record while scrolling.
At 390px it has reflowed into a header block, not shrunk. No horizontal scroll
at any width from 320px up.

### 2.4 The stamp component
Rectangular outline in the status colour, rotated −2°, subtle SVG turbulence on
the edge (`baseFrequency` ≈ 0.4), Archivo condensed, 11px, 0.18em tracking.
**Accept:** all six statuses render; readable in both themes; enters with
`scale(1.05)→1` over 120ms with no bounce; nothing animates under
`prefers-reduced-motion`.

### 2.5 Citation markers and provenance panels
Superscript marker on every number. Activating it fills the apparatus column
with measure, period, scope, ownership, limitation.
**Accept:** every number on the site has a marker or is explicitly labelled
unverifiable. Keyboard-operable. Works at 390px.

### 2.6 One record template
**Accept:** all four project records render through the same component with no
per-record special-casing except the evidence instrument slot.

---

## Phase 3 — The four records (~16 h)

Rewrite to the eight-part structure in `docs/BRIEF.md`. One exhibit minimum each.

| Record | Evidence instrument |
|---|---|
| PRJ-01 FirstStep | Five-frame walkthrough: question → retrieved source → answer structure → jurisdiction boundary → next step |
| PRJ-02 Helix | Playable approval gate — propose, gate, approve, audit line, rollback |
| PRJ-03 Subpoena | Draggable before/after routing split-screen |
| PRJ-04 Platform | Toil slider: 50 servers + manual → containerised, with the 2.5 h/day figure moving |

**Accept:** zero case studies without a visual exhibit (currently four of four).
Every exhibit caption states what it *proves*, not what it is. `TRADE-OFF` is
populated on all four. PRJ-02 is stamped `PoC` and nothing on the page implies
production.

---

## Phase 4 — Homepage and Decisions (~12 h)

Homepage per the wireframe in `docs/BRIEF.md`. DEC-01 inline, above the fold's
second screen, with a visible `skip →`.

**Accept:** a stranger can state Kaustubh's thesis after 10 seconds and name one
project after 60. DEC-01 is playable without scrolling past it. Decisions is a
top-level nav item. Each DEC cross-links to its PRJ. Aggregate percentages
render from a real counter. `/playground` 301s to `/lab`.

---

## Phase 5 — Depth (~20 h)

Three field notes + RSS · role routing (explicit, disclosed, not called AI) ·
Lab with live inline demos and a `PROVES:` line each · springs replacing `ease`
via CSS `linear()` · View Transitions with the record number as shared element ·
quiet mode · HTML `/resume` with a print stylesheet · 404 as an incident
postmortem with Bug Squash demoted into it.

**Accept:** `/notes/rss.xml` validates. Role routing changes order and depth
only — never facts. Removing the role parameter leaves the site fully usable.
View Transitions degrade to a cross-fade in Firefox without layout shift.

---

## Phase 6 — Experimental (only after Phase 5 ships)

Ship It: The Run · Governance Sandbox · Ask the register (grounded retrieval
with mandatory citations and a refusal floor) · `/notes/ai-governance`.

**Accept for the AI layer:** every answer cites a specific record and paragraph.
Below the confidence floor it declines and shows what it did find. A red-team
pass of 20 adversarial questions produces zero fabricated metrics, zero invented
ownership claims, and zero confidential disclosures.

---

## Targeted research the agent should do

Bounded. This is implementation research, not inspiration gathering — **do not
collect more portfolio references.**

1. Next.js App Router metadata: correct `generateMetadata` shape for per-route
   `alternates.canonical`, and the `opengraph-image.tsx` file convention.
2. Current browser support for View Transitions and CSS `scroll-timeline`, and
   the correct progressive-enhancement guard for Firefox.
3. Generating a CSS `linear()` spring easing curve.
4. `unicode-range` subsetting for Spectral, Archivo variable and Martian Mono;
   confirm all three are on Google Fonts with the axes needed.
5. WCAG 2.2 SC 2.5.8 target-size exceptions, so the Phase 0.4 assertion excludes
   the right cases.
6. Three implementations of sticky marginalia / margin-note layouts, for the
   apparatus column's scroll-tracking behaviour only.

---

## Standing definition of done

No phase is complete until: `typecheck`, `lint` and `build` pass; axe reports
zero violations; Lighthouse ≥ 95 on performance, accessibility, best practices
and SEO; the page renders correctly at 320, 390, 768, 1024 and 1440px; it works
with keyboard only; and it works with `prefers-reduced-motion: reduce`.
