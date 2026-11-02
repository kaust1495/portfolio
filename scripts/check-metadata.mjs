#!/usr/bin/env node
/**
 * Route metadata check — run after `next build`.
 *
 * Fails if any route's canonical or og:url isn't its own URL, if a route has
 * no og:image, or if two routes share a canonical. Guards against the root
 * layout's metadata leaking into child routes (BUILD-PLAN 0.1 / 0.2).
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://kaustubhjain.vercel.app";
const OUT = join(process.cwd(), ".next", "server", "app");
const MANIFEST = join(process.cwd(), ".next", "prerender-manifest.json");

if (!existsSync(MANIFEST)) {
  console.error("✗ .next/prerender-manifest.json missing — run `next build` first");
  process.exit(1);
}

// Every prerendered page from the build itself, so a new route is checked without editing this file.
// Image, robots and sitemap routes have no .html file and drop out; /_not-found is internal.
const routes = Object.keys(JSON.parse(readFileSync(MANIFEST, "utf8")).routes)
  .filter((path) => !path.startsWith("/_"))
  .map((path) => [path, path === "/" ? "index.html" : `${path.slice(1)}.html`])
  .filter(([, file]) => existsSync(join(OUT, file)));

const attr = (html, re) => html.match(re)?.[1] ?? null;
const strip = (u) => (u ? u.replace(/\/$/, "") : u);

const failures = [];
const seen = new Map();

for (const [path, file] of routes) {
  const full = join(OUT, file);
  if (!existsSync(full)) {
    failures.push(`${path}: built file missing (${file}) — run \`next build\` first`);
    continue;
  }
  const html = readFileSync(full, "utf8");
  const want = strip(SITE + path);

  const canonical = strip(attr(html, /<link rel="canonical" href="([^"]+)"/));
  const ogUrl = strip(attr(html, /<meta property="og:url" content="([^"]+)"/));
  const ogImage = attr(html, /<meta property="og:image" content="([^"]+)"/);
  const ogImageCount = (html.match(/<meta property="og:image" content=/g) ?? []).length;

  if (canonical !== want) failures.push(`${path}: canonical is ${canonical ?? "MISSING"}, expected ${want}`);
  if (ogUrl !== want) failures.push(`${path}: og:url is ${ogUrl ?? "MISSING"}, expected ${want}`);
  if (!ogImage) failures.push(`${path}: no og:image`);
  if (ogImageCount > 1) failures.push(`${path}: ${ogImageCount} og:image tags (expected 1)`);

  if (canonical) {
    if (seen.has(canonical)) failures.push(`${path}: shares canonical ${canonical} with ${seen.get(canonical)}`);
    else seen.set(canonical, path);
  }

  console.log(`${failures.length ? "…" : "ok"}  ${path.padEnd(28)} canonical=${canonical}  og:image=${ogImage ? "yes" : "NO"}`);
}

if (failures.length) {
  console.error(`\n✗ ${failures.length} metadata problem(s):\n  - ${failures.join("\n  - ")}`);
  process.exit(1);
}
console.log(`\n✓ ${routes.length} routes: unique self-canonicals, og:url and og:image on every one`);
