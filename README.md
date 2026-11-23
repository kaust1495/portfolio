# Kaustubh Jain — portfolio

Personal site. Next.js (App Router) + TypeScript + Tailwind v4, deployed on Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build (fully static)
npm run lint
npx tsc --noEmit # typecheck
```

## Design system

The current preview direction is Product Teardown / Blueprint: warm paper with a measurement grid, Space Grotesk for reading and display, IBM Plex Mono for labels and controls, squared artifact frames, and restrained blueprint/orange annotations. Both fonts are served by `next/font` and are OFL-licensed.

## Accessibility

The mobile menu and ask-me panel keep keyboard focus inside while open, return focus to their launcher on close, and expose their interactive controls to assistive technology. Body copy reads at 17px on desktop and 16px on phones, with captions and informational labels raised from the original 10-12px range. On phones, Sound and Ask Me collapse into a compact two-button corner cluster so they do not cover the reading column. On desktop, Buddy starts parked in the corner instead of covering content; visitors can click it to let it roam, then use the fixed Park button, the character itself, or Escape to park it again. The parked/roaming choice is remembered on that device. The decorative Buddy artwork stays hidden from assistive technology; only its park/unpark controls are announced.

## Playground games

The Playground puts the active game before the Decisions deck so Start is visible on the first screen. Bug Squash uses a timestamp-based 30-second timer and shows the scoring legend before play. Ship It starts with three slower practice cards that cost no lives, shows a numeric countdown, and keeps feedback on screen long enough to read. Pipeline Panic starts with three scripted practice deploys that teach Approve, Test, and Hold; after that, off-hours production deploys are a real Hold case rather than decoration.

## Editing content

Almost everything lives in [`content/profile.ts`](content/profile.ts) — hero copy,
case studies, principles, background, contact. Change text there; components render it.

- Résumé PDF: `public/kaustubh-jain-resume.pdf`
- Production URL / OG / sitemap base: `person.siteUrl` in `content/profile.ts`
- Open questions / unverified facts: [`MISSING_INFO.md`](MISSING_INFO.md)

## Structure

```
app/            layout, page, globals.css, sitemap, robots, opengraph-image, icon
components/     Nav, Hero, Marquee, Now, Work, Principles, Beyond, Contact, Footer, Reveal
content/        profile.ts  ← single source of truth for copy
```

## FirstStep product flow (23 Nov 2026)

The FirstStep case study adds an optional three-step flow to `/work/firststep`, after the insight and before the existing work section. It uses the existing case-study claims only, labels the diagram illustrative, and keeps the legal-information boundary visible. It does not replace genuine product footage or generate a legal answer.

Motion starts only on request, stops after one six-second run, pauses outside the view or when the page is hidden, and respects reduced-motion preferences. All text remains readable without JavaScript. Steps are ordinary keyboard-usable buttons. No new runtime package, remote asset, video, font, likeness processing or tracking is introduced. The hero, photo and other case studies are unchanged.

The persistent-scene and time-indexed-marker pattern is adapted from Bang Motion's MIT starter, not a global installation of its plugin. See `THIRD_PARTY_NOTICES.md`. The drawing/art repositories and paid Vox Director route are not needed for this Blueprint portfolio change.

Live case study: https://kaustubhjain.vercel.app/work/firststep .

## Deploy

Connected to GitHub → Vercel. Every push to the default branch deploys automatically.
