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
