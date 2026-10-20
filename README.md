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

## Accessibility

The mobile menu and ask-me panel keep keyboard focus inside while open, return focus to their launcher on close, and expose their interactive controls to assistive technology. On phones, Sound and Ask Me collapse into a compact two-button corner cluster so they do not cover the reading column. On desktop, Buddy starts parked in the corner instead of covering content; visitors can still click it to let it roam. The decorative Buddy artwork stays hidden from assistive technology; only its park/unpark button is announced.

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

## Deploy

Connected to GitHub → Vercel. Every push to the default branch deploys automatically.
