# Redesign — November 2026

Working title: **A portfolio in four chapters** (cinematic box).

## Why a rethink, not a reskin

Kaustubh's ask (23 Nov): the current site feels generic — "anyone can copy or try out,
no thought process applied." References supplied:

1. **vidhu12/what-the-folio-skills** — not a template. A method: intake → sort →
   pick a "box" (Classic / Cinematic / Playable / Product) → decode references →
   visuals → PRD → build. Rules: never invent numbers or projects, plain words,
   one accent colour, works at 375px, loads fast.
2. **portfolio-wall.pages.dev** — a gallery of workshop portfolios behind a
   Masters' Union Google sign-in. (Access pending at time of writing.)

## Brainstorm → decision

Options considered:

- **Classic** — clean page. Rejected: it is what he already feels is generic.
- **Product** — career inside a familiar app's patterns. Rejected: the current
  Blueprint/Teardown look is already close to this box; staying feels like a reskin.
- **Playable** — the portfolio as a game/world. Attractive (he already has three
  games and a decisions deck) but risky as the *only* reading path for a recruiter,
  and a full world is a v2 build. Kept as a later layer: the Playground stays and
  gets framed as part of the story.
- **Cinematic** — motion and story. **Chosen.** His content is genuinely narrative:
  every case study already reads context → insight → work → outcome. Almost nobody
  tells four real builds as chapters of one story. That is the thought process he
  wants visible.

The narrative spine comes from folio-sort's Product cut (stage buckets). Each case
study proves one stage of the product lifecycle:

| Chapter | Case study | Stage it proves |
|---|---|---|
| 01 | FirstStep Legal AI | Launch (0→1, live, his own product) |
| 02 | Helix | Define (architecture, governance, whitepaper) |
| 03 | Subpoena migration | Build (unglamorous work, shipped right) |
| 04 | Platform consolidation & release automation | Grow (platform, developer experience) |

Interludes: the decisions deck ("the calls"), the Playground and Lab ("the workshop"),
the Now strip ("where he is now"). Nothing invented; all copy from content/*.ts.

## PRD (folio-prd format)

- **Who it is for:** recruiters and founders hiring for product / venture /
  founder's-office roles.
- **Goal:** open a case study, then reach out (email / LinkedIn).
- **Box:** Cinematic — his case studies are real stories with real stakes; the
  site's job is to make a recruiter feel the arc, not scan a grid.
- **Sections:** title card (hero) → ticker → chapters 01–04 → the calls →
  the workshop (Playground + Lab) → now/contact epilogue.
- **Content:** content/*.ts only. Never invent, round up or recalculate numbers.
- **Look:** screening-room dark; warm near-black (#131110) with one accent,
  projection amber (#ffb000). Ink #f0e9da. Fraunces (display + body serif, OFL)
  with IBM Plex Mono annotations like director's notes. Generous rounding (14px
  panels, pill buttons) — the visual opposite of the old squared blueprint frames.
  Subtle film-grain texture, no heavy media.
- **Motion:** entrance rises, sticky chapter markers, the existing ticker;
  everything transform/opacity-only; `prefers-reduced-motion` fully quiet.
- **Must work:** 375px phones; body copy 16–17px; every link opens; images have
  alt text; no layout shift from fonts (next/font).
- **Not in scope:** games rebuild, Playable world (v2), new photography,
  publishing to production.

## Revision loop

1. v1: new tokens + fonts + cinematic home; other routes inherit the dark shell.
2. Screenshot pass on desktop + 375px; fix contrast/spacing regressions.
3. Restyle Work case pages, then Lab/Playground/Decisions/About to the shell.
4. Preview deploy → his review → only then any merge (his explicit Go required).

## v2 — "the thought process is the experience" (23 Nov, after user feedback)

User's verdict on v1: still too much of the old structure reskinned; playground/lab/games
and explanatory extras are not constraints to preserve. Rethink the experience itself.

Research (23 Nov): Kasia Sowa's portfolio-as-case-study and playable-proof hero;
Stas Bondar '25 (Awwwards) — every interaction demonstrates a real technique, none
decorate; the common failure mode is interaction for interaction's sake.

Direction change:
- The site's best asset was already in his content: the decisions deck ("make the call,
  then see the call I made"). v2 moves that mechanic out of a separate "game" page and
  into the narrative spine. Each chapter now stops at its real decision point; the
  visitor decides first, then sees his call, the reasoning, and the receipt.
  Mapping: FirstStep→legal-ai, Helix→friday-deploy, Subpoena→migration-scope,
  Platform→automate-vs-feature. All card copy is verbatim from content/decisions.ts.
- Closing section "One last call — this site" inlines the this-portfolio card: the site
  explains its own judgment, meta-proof of process.
- Ticker (decorative adjectives) replaced by a receipts band: real outcomes only
  (2.5 hrs/day, 50+ servers, ~40% deploy lag, LOSO May 2025, High Five Award, live app).
- Interlude games/workshop cards removed from home. Lab/playground/decisions pages
  still exist, demoted to a quiet "Elsewhere" link strip and the command bar.
- Nav reduced: Work · Calls · About (+ résumé, ⌘K). Mobile sheet matches.
- Kept: cinematic skin (screening-room dark, one amber accent, Fraunces), chapter
  structure + menu, CaseFlow embed (it is the product, not a toy), NowStrip.

New component: components/decisions/InlineCall.tsx (client; presentation only).

## v2 — "the thought process is the experience" (23 Nov, after user feedback)

User's verdict on v1: still too much of the old structure reskinned; playground/lab/games
and explanatory extras are not constraints to preserve. Rethink the experience itself.

Research (23 Nov): Kasia Sowa's portfolio-as-case-study and playable-proof hero;
Stas Bondar '25 (Awwwards) — every interaction demonstrates a real technique, none
decorate; the common failure mode is interaction for interaction's sake.

Direction change:
- The site's best asset was already in his content: the decisions deck ("make the call,
  then see the call I made"). v2 moves that mechanic out of a separate "game" page and
  into the narrative spine. Each chapter now stops at its real decision point; the
  visitor decides first, then sees his call, the reasoning, and the receipt.
  Mapping: FirstStep→legal-ai, Helix→friday-deploy, Subpoena→migration-scope,
  Platform→automate-vs-feature. All card copy is verbatim from content/decisions.ts.
- Closing section "One last call — this site" inlines the this-portfolio card: the site
  explains its own judgment, meta-proof of process.
- Ticker (decorative adjectives) replaced by a receipts band: real outcomes only
  (2.5 hrs/day, 50+ servers, ~40% deploy lag, LOSO May 2025, High Five Award, live app).
- Interlude games/workshop cards removed from home. Lab/playground/decisions pages
  still exist, demoted to a quiet "Elsewhere" link strip and the command bar.
- Nav reduced: Work · Calls · About (+ résumé, ⌘K). Mobile sheet matches.
- Kept: cinematic skin (screening-room dark, one amber accent, Fraunces), chapter
  structure + menu, CaseFlow embed (it is the product, not a toy), NowStrip.

New component: components/decisions/InlineCall.tsx (client; presentation only).

## Candidate comparison (23 Nov, before locking the mechanic)

Three genuinely different experience shapes, assessed against his complaint
("generic, no thought process applied") and the 10-second scan reality.

A. Inline judgment calls (what v2 builds). Each chapter stops at its real
   decision point; the visitor may make the call, then sees his call, the
   reasoning, and the receipt. Proof bullets and receipts are visible without
   clicking, so engagement is optional depth, not a gate. Risk: the mechanic
   repeats 5 times; novelty can decay by chapter 4, and card text adds length.
   Mitigations: cards render collapsed (prompt + choices only), outcomes stay
   outside the interaction, each card is a different decision type.

B. The evidence document (zero interaction). A single scroll where every claim
   sits next to its receipt - number, link, artifact, no clicks anywhere.
   Lowest visitor effort and the strongest "can't be faked" stance. But it is
   the closest to a well-typeset CV, which is adjacent to the generic look he
   rejected; the distinctiveness would have to come entirely from typography
   and editing, and the participatory proof of judgment disappears.

C. Product-first / playable. The page opens inside the work itself - the live
   FirstStep app embedded as the hero, an approval-gate simulation for Helix.
   Strongest proof-by-doing, highest build cost, and asymmetric: only
   FirstStep has a live artifact, so the other chapters could not match the
   hero's standard. Mobile risk is real.

Call: A stays the spine (built and interaction-tested 15/15). B's discipline
is already borrowed (the receipts band; outcomes outside the click). C is
borrowed where a real artifact exists (CaseFlow in chapter 01) and stays a
future option (a live FirstStep embed) if he wants more proof-by-doing.
Skin (cinematic dark + amber) remains provisional on the same evidence as A.

## Interactive verification (23 Nov)

CDP harness (Node native WebSocket, real Input.dispatchMouseEvent /
dispatchKeyEvent - no JS .click() shortcuts) against the local production
build: 15/15. Covers real mouse click reveal, his-call line when the visitor
disagrees, pick flag, disabled-after-pick, full reset via "decide again",
keyboard focus + Enter activation, provenance assertions (safety-vs-demo
inline, friday-deploy not inline), mobile 375px no-overflow and tap reveal.

## v3 — radical pass (24 Nov, user: "think more radically")

User rejected the choice between "develop the tested direction" and "radically
rethink the project interactions" in favour of radical. v2's inline cards stay
in git history (2d63af0) as the tested fallback.

Radical candidates considered:
1. RELEASE DAY (built): the site stops being a document. The visitor is the
   engineer on call shipping one release; the four lifecycle stages are the
   pipeline (DEFINE -> BUILD -> LAUNCH -> GROW). At each stage a real scenario
   from his work arrives, the visitor makes the call, and the release log shows
   the call he made and where it landed. Ends in a release report: your calls
   vs his, with the receipts. The portfolio becomes a simulation of his job,
   in his own domain (CI/CD). Content: same verified decision cards, no new facts.
2. The shift: situations arrive one at a time in real time, full-screen, no
   navigation at all. Stronger immersion, but hides the receipts behind pace
   and gives a recruiter no 10-second scan path. Rejected for the 10s rule.
3. The interrogation: no pages, one prompt - "what would you ask him?" - every
   answer with receipts. Radical but hides evidence behind the visitor knowing
   what to ask; fails the scan test too.

Why 1 wins: it keeps the evidence scannable (release report + receipts), makes
the visitor exercise judgment instead of reading about it, and the pipeline
frame is his actual craft, not a borrowed gimmick. Prototype route: /release,
full-screen overlay; v2 home intact for comparison. Swap to front door only
on his word.

## v4: Evidence first (24 Nov)

The 16:34 critique: every pass so far wrapped the same cards in a new frame. v1 changed the skin, v2 dealt the cards inline, v3 shuffled them into a quiz. The content architecture never changed.

v4 changes what the page is about:

- **The first screen is the whole pitch.** Name, one statement, three doors (work, résumé, release day), and the receipts band (only numbers traceable to content/profile.ts). A recruiter gets the evidence in ten seconds without a single required choice.
- **The work is one tap away.** Four compact menu rows, each tagged with the lifecycle stage it proves. No inline calls, no gates.
- **The process is on the page.** The site's own build log (v0-v4) with the feedback each iteration got, paraphrased, and real screenshots of two rejected iterations. Anyone can copy a layout; nobody can copy the loop of build, test, get rejected, rethink. This is the answer to "radical": the differentiator is not a frame, it is the visible process.
- **Extras demoted, kept.** Release day, the full deck, the lab, the playground: one "Elsewhere" strip.

Provenance: /release intro now states outcomes are documented and some scene-setting is compressed. Iteration screenshots are real captures of the actual rejected builds. Feedback lines are paraphrases, not quotes (quoting him directly would need his OK).

Checks: home 8/8 CDP (receipts, menu, process entries, images loaded, navigation, no console errors), /release 15/15 CDP unchanged. Desktop and mobile full-page captures measured by document height.

## v5: Use the work (24 Nov)

The 16:40 critique removed the v4 build log: the process of making the site is not his work, and showing our drafting exchange was out of bounds. The rethink had to be about HIS work, not about the redesign itself.

Alternatives considered:

- **B. One story deep.** FirstStep as a full scrollytold case study on the home page, the other three demoted to a menu. Rejected: it retells the strongest project in prose while the bank projects get shallower treatment, and retelling is still description, not evidence.
- **C. Evidence-first conventional (v4 minus the log).** Clean, fast, recruiter-friendly, and kept as the skeleton. Rejected as the concept on its own: it is a well-ordered traditional portfolio, not a rethink of the experience.
- **A. Use the work (chosen).** Most portfolios can only describe what someone built. His differentiator is that one of the four projects is a live product anyone can use. So the first screen after the pitch hands the visitor the working software: FirstStep Legal AI embedded live in the page, in a browser-chrome frame, with the caption "the deployed app, running in this page." No gate, no quiz, no wrapper. The evidence is the product itself.

What v5 is: compact pitch (name, statement, three doors), receipts band (only numbers traceable to content/profile.ts), the live product window, the four chapters one tap away with lifecycle-stage tags, now strip, elsewhere strip. The build log, its images, and all conversation-derived content are deleted from the candidate.

Feasibility verified, not assumed: firststeplegalai.lovable.app sends no X-Frame-Options / frame-ancestors headers, and the CDP pass confirmed the embedded app boots inside the frame with real content ("Understand Indian law. Know your rights."). Skeleton shimmer covers load; "open full app" is the fallback.

Provenance at the point of appearance (/release): each stage now renders a "source" line under the scenario that separates three classes: documented (corroborated by content/profile.ts or the live product), his account (his published interpretation in decisions.ts, not independently verified), and illustrative (color no source backs, e.g. the two-week delay figure). The legal-ai stage is labeled as the judgment exercise it is. decisions.ts itself is untouched (his published copy).

Checks: home 9/9 CDP (iframe present with real src and usable height, embedded app booted with real inner content, receipts, menu, elsewhere, no console errors, no mobile horizontal overflow), /release 15/15 unchanged. Full-page captures measured by document height: desktop 2603px, mobile 3203px.

## Concept comparison (24 Nov, requested review before further building)

Frame: "radical" has to mean a change in (a) how a visitor DISCOVERS the projects and (b) what the SHOWCASE is (the thing experienced as proof), not a new frame around the same list. Every rejected pass failed exactly one of those two tests.

Research grounding:
- hannadrehman.com (portfolio that gets you hired): recruiters decide in ~10 seconds; show, don't describe; outcomes visible before effort.
- ksowa.dev/work/portfolio-site: the portfolio as its own case study; playable proof beats prose.
- awwwards.com/case-study-stas-bondar-25: interactions earn their place only when they demonstrate real technique; decoration is disqualifying.
- lagrotti.dev: the portfolio treated as an engineering product.
- vidhu12/what-the-folio-skills: the Product cut (lifecycle stages), already applied as the menu's stage tags.
- portfolio-wall.pages.dev: UNREAD (Google sign-in blocked from the cloud browser; user's own-device captures pending). No concept below claims its influence.

### The candidates

C1. Evidence-first document (v4 skeleton).
- Discovery: receipts band -> four-row menu -> chapters. Ordering and compression only.
- Showcase: numbers + prose chapters.
- Passes: 10-second recruiter route, evidence standard, balance across all four projects.
- Fails: discovery is still a list; showcase is still description. Not radical in kind.

C2. Product-first: use the work (v5, current candidate).
- Discovery: pitch -> the running product in the page -> menu.
- Showcase: OPERATION for FirstStep (the visitor uses the software); prose for the rest. A change in kind for one of four projects.
- Passes: show-don't-describe in its purest available form; playable proof; only his portfolio can do this.
- Fails: asymmetric. The bank work (the more senior evidence: 50+ servers, LOSO, 2.5 hrs/day) cannot be operated, so the page's center of gravity tilts to the newest, smallest project. As a whole-page answer it adds a component more than it rethinks discovery.

C3. One story deep.
- Discovery: one narrative spine (FirstStep), other projects as exits.
- Showcase: depth on a single project.
- Fails: hides breadth; demotes the bank work that carries his seniority.

C4. The system map.
- Discovery: the four projects as nodes in one capability map (governance / migration / automation / launch), edges named by the threads the work actually shares (trust, toil, visibility); chapters entered through the map.
- Showcase: range and coherence at a glance; the discovery architecture itself changes.
- Passes: genuinely different discovery; balanced across projects; demonstrates craft if (and only if) the map is real technique, not a picture.
- Risks: becomes wrapper #4 if the map is decorative; hard on mobile; needs a real build-and-test cycle to judge.

C5. The decisions deck as the index.
- Discovery: the twelve published calls are the menu; projects discovered through the judgment they show.
- Fails now: the deck's provenance is open (no original user source found for its specifics; it entered the repo in one squashed commit), and v3 already showed the quiz-frame family resemblance. Building the home on questioned content compounds the risk.

### Where this lands

Keep C1+C2 as the candidate (built, tested: home 9/9, /release 15/15): it is the only combination that is evidence-strong today, and the live window is a genuinely different showcase for the one project that can support it. It does not claim to be the full radical answer.

The honest fork for the next iteration: C4 is the only remaining concept that changes discovery itself. It is worth one careful prototype (real map, real interactions, mobile plan, measured full-page evidence) if he wants the discovery layer rethought, with C1+C2 as the fallback that already works. C3 and C5 are recommended against, for the reasons above.

Awaiting direction before the next build.

## v6: The map (24 Nov, C4 prototype)

Two directives drove this pass: remove every claim that lacks an original source (no verification warnings as a substitute), and build the C4 concept carefully.

Removed from the candidate: the /release route and ReleaseSim entirely (the sim was built on the decision cards, whose provenance is unsettled); the hero "Release day" door; the Elsewhere links to /release and /decisions; the nav "Calls" link to /decisions. The decision cards no longer appear anywhere in the proposed visitor experience. Production pages (/decisions itself, /work inline links, the playground tile) are untouched; restoring the nav link is one line if provenance settles.

What v6 is:

- **Discovery = the map.** The four projects are nodes in one system, placed on two real axes: the lifecycle stage each proves (Define/Build/Launch/Grow) and who the work serves (inside the bank to the public). Edges are the threads the work shares, named from the principles and insights published in the chapters: "Automation is a trust exercise", "Internal tools have users too", "Making opaque work legible", "Trust as the feature". Selecting a node opens a dossier (kicker, documented outcomes from content/profile.ts, chapter link). This replaces the menu: the visitor discovers projects by seeing how they connect, not by scanning a list.
- **Showcase = the work itself.** The live FirstStep window stays: operation as evidence for the one project that can be operated, dossiers with documented outcomes for the three that cannot.
- **Craft, not decoration.** Real technique: computed quadratic-bezier edges with explicit collision-free label placement, HTML node buttons over SVG (focusable, aria-pressed, aria-controls), arrow-key navigation between nodes, Escape to close, hover/focus lights the node's edges and dims the rest, a vertical spine layout on mobile (not a list fallback), sr-only chapter list, prefers-reduced-motion respected.

Every statement a visitor sees traces to content/profile.ts or is directly verifiable (the live app). Nothing rests on the decision cards, on our exchange, or on unattributed history.

Checks: 19/19 CDP (structure, real mouse-click dossier open, keyboard Enter + arrow navigation, chapter link navigation, no console errors, mobile vertical layout + tap, no horizontal overflow, /release and /decisions absent from home). Full-page captures via captureBeyondViewport (honest vh sizing): desktop 2950px, mobile 3940px.

## v6 revision (24 Nov, review fixes)

- Mobile axis arrow follows the spine: "lifecycle stage ↓" on the vertical layout.
- Desktop geometry reworked: the Build node moved below the Helix-FirstStep line so the "Trust as the feature" edge clears it entirely (verified visually in both clean and selected states; every label collision-free by explicit placement).
- The Helix dossier omits "Reframed the internal conversation..." — no original user source. Filtered at the candidate's presentation layer; production chapter copy unchanged.
- Full audit of card-bearing routes retained in the branch (all production content, reported to parent): /decisions itself; "Play the Decisions deck" links on /work and every /work/[slug]; the playground tile; the lab entry; the ⌘K palette destination; the ask-me bot's answers and links; the sitemap entry. The candidate home neither links to nor renders any card.

## v6 preview scrub (24 Nov, candidate readiness)

Entry points to the uncertain decision deck removed from the preview branch (production untouched): the /work index promo block, the per-chapter "Play the Decisions deck" link, the playground deck tile, the lab entry (eight things become seven, counts and metadata updated), the ⌘K palette destination, the sitemap entry, and three ask-me bot answers that referenced the deck (the "how do you make decisions" answer now points at the chapters and the map).

Retained deliberately, as a user-owned content decision: the /decisions route itself, components/decisions/Deck.tsx, and content/decisions.ts. They are orphaned (no inbound links anywhere in the branch) but not deleted — whether the deck's content stands is his call, not ours.

Verified: grep audit finds zero /decisions or deck references in any visitor surface outside the deck's own files; all five edited routes render with no console errors; home suite 19/19.

## Deck exclusion from candidate build (24 Nov, ~17:05)

Per Main's direction the decisions deck is excluded from the candidate build entirely:
`app/decisions/`, `components/decisions/Deck.tsx` and `content/decisions.ts` were removed
with `git rm`, so the source stays recoverable in branch history (commit 789ac5d and the
recovery bundle). `/decisions` now renders the app 404; the sitemap has no decisions entry.
The deck's fate (restore as-is, revise, or drop for good) remains the user's call.

The ask-me answer for "What have you actually shipped?" that previously pointed at the deck
now reads: "The four chapters are the honest answer: each walks through a real build - the
situation, what I did, and what it led to. The map on the home page shows how they connect."
Every element of that description is verifiable in `content/profile.ts`.

## De-slop pass against elayadesign/ai-design-skills (24 Nov, ~18:10)

The user shared github.com/elayadesign/ai-design-skills ("remove ai slop"). Its README
points existing-site work at the companion elayadesign/redesign-skill; both were read in
full and the audit was run against the candidate. Fixed:

- Removed the two ambient radial-gradient glows (hero title card, map canvas). Backgrounds
  are flat; the existing film-grain overlay keeps texture. The skeleton shimmer inside
  LiveWindow stays (a loading state, not a background).
- Removed 55 dead CSS rule blocks from the deleted ReleaseSim/decision-card iterations
  (.sim-*, .call-*), the hidden .ambient blob DOM, and their section comments.
- Snapped the base easing curve to the reference cubic-bezier(0.22, 1, 0.36, 1); replaced
  every literal `ease`; movement transitions now 500ms, color/opacity 300ms, 200ms floor.
- Skip link animates transform instead of `top`.
- SiteNav scrolled state now uses an IntersectionObserver sentinel instead of a scroll
  listener. FadeIn upgraded from mount-time animation to IO-driven scroll reveal
  (32px rise, 700ms, once, reduced-motion drops movement to a plain fade; SSR and no-JS
  visitors still see content because the hidden state is applied only after mount).
  One component, so every route got the upgrade.

Deliberate deviations (selective adoption, per the website-quality owner's read that the
repo's values are one designer's choices, and the repo README's own note that the Design
Values section is the fork-and-edit surface):

- Fraunces + IBM Plex Mono stay: not on the banned list (Inter/Roboto/Arial/Open Sans/
  Helvetica), and the serif editorial voice is the site's identity.
- Italic emphasis stays (hero statement, amber em highlights, .font-hand): the anti-slop
  target is generic patterns, and the italic serif is the opposite of generic.
- Warm dark palette stays (#131110 family, one amber accent): flat, one accent, compliant
  in structure even if the hexes differ from the repo's neutral palette.
- Hero heading keeps flat ink + amber italic accents instead of the repo's text gradient.
- Infinite loops (ticker marquee, skeleton shimmer) keep `linear`: a weighted curve on an
  infinite loop stutters.
- Part A landing-page structure (FAQ, mandatory tagline reveal, risk reversal, one CTA)
  is for marketing pages; this is a portfolio.

Tests: v6 suite 19/19, new v13 de-slop suite 9/9 (glow gone, blobs gone, reveal arms and
fires, canvas flat, nav sentinel works, skip link transform, no console errors).

## Map legibility + default panel (24 Nov, ~18:15)

Main's review of the flat-background pass: connectors, axis and relationship labels read
too dim at normal viewing size, and the dossier panel sat mostly empty before selection.

- Edges: stroke var(--rule) -> #6e6350 at 1.5px. Thread labels 0.62 -> 0.72rem, ink-2 on
  near-opaque canvas chip, border rule-soft -> rule. Axis labels 0.6 -> 0.66rem, faint ->
  muted. Mobile thread labels 0.55 -> 0.62rem.
- The empty dossier panel is now "The system at a glance": all four projects in lifecycle
  order (stage, title, kicker), each row a button that opens that node's dossier. Doubles
  as a comfortable tap target list on mobile, where the map nodes are small.
- Dead `.ambient/.blob` CSS rule removed (DOM was already gone).

Motion verified against usability, not just the reference numbers: reduced-motion
emulation shows reveals carry no transform, all transitions collapse to instant, and every
section becomes visible on scroll-through (7/7, none stuck hidden). Full-motion suites
v6 19/19, v13 9/9, new v14 10/10 including index-click selection and mobile overflow.

## Mobile map leader lines (24 Nov, ~19:40)

Main's checkpoint review: on the mobile spine the relationship labels floated detached
from their edges. Each label now gets a dashed leader line from its edge's curve midpoint
to the label, mobile only (desktop labels sit on their curves). Leaders inherit the
edge's lit/dim state. v15 suite 5/5; v14 10/10; v6 19/19.

## Mobile discovery: index first, compact spine (24 Nov, ~19:50)

Main's checkpoint: the mobile map was too tall for four projects; project content sat
behind a long diagram scroll. Mobile now renders the dossier panel (the four-project
index) BEFORE the canvas, so every project is one tap from the section top, and the
spine compacts from viewBox 420x780 to 420x680 with labels re-placed (leader lines
recompute automatically). Desktop order unchanged. Also verified at this checkpoint:
the NowStrip "first computer bug" claim matches the Smithsonian's object page for the
1947 Harvard Mark II logbook (si.edu/object/log-book-computer-bug:nmah_334663).

## Fun-fact accuracy fix (24 Nov, ~19:50)

The moth fact claimed "the first computer bug was a real moth" - a false first-ever
superlative (the term bug predates 1947; the Smithsonian notes engineers used it since
the 1870s). Reworded to the documented incident: "In 1947, engineers debugging Harvard's
Mark II found a moth stuck in a component and taped it into the logbook with the note
'first actual case of bug being found.'" Source: si.edu/object/log-book-computer-bug:nmah_334663.
The other 19 rotating facts were audited for equivalent unsupported superlatives; the only
other superlative is "most common password in leaked databases, year after year, is still
123456", which is consistently supported by annual breach-list rankings (SplashData/NordPass).

## Fun-fact sourcing pass 2 (24 Nov, ~19:55)

Main's bar: no broad rankings resting on familiar vendor names alone. Two facts narrowed
to named, current sources:
- Password fact -> "NordPass's 2026 ranking of breached passwords - its eighth year
  running - still has 123456 at the top." Source: nordpass.com/most-common-passwords-list/
  (2026 edition; methodology: breaches Sept 2025-Sept 2026; hero + headline confirm 123456
  remains the top pick).
- USB-C fact -> the specific comparison Forrest Heller measured: "The chip inside an Anker
  USB-C wall charger (48 MHz, 8 KB of RAM) out-computes the Apollo Guidance Computer
  (about 1 MHz)". Source: forrestheller.com/Apollo-11-Computer-vs-USB-C-chargers.html.
Remaining claims rechecked: historical incidents with primary documentation (ARPANET LO,
R.U.R., Tomlinson's @, PNG/LZW, Torvalds quote, RAMAC lease "about $3,200/month" hedged),
or standard references (Shannon number 10^120).
