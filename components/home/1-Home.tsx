import Link from "next/link";
import { hero, person } from "@/content/profile";
import { FadeIn } from "@/components/FadeIn";
import { NowStrip } from "./NowStrip";
import { RecentBuilds } from "./RecentBuilds";
import { WorkMap } from "./WorkMap";
import { LiveWindow } from "./LiveWindow";

/** Receipts, not adjectives. Every line traces to content/profile.ts. */
const receipts = [
  "2.5 hrs/day back for a team of 11",
  "50+ servers consolidated",
  "~40% less deploy lag",
  "LOSO May 2025 · on schedule",
  "High Five Award · DCRS",
  "Live · firststeplegalai.lovable.app",
];

/**
 * v6: the map + the work. Discovery is one system map of the four projects
 * (lifecycle stage x who it serves, threads from the published principles);
 * the showcase is the working product, live in the page. Receipts up front.
 * No decision cards anywhere in this experience.
 */
export function Home() {
  return (
    <div className="pb-32 md:pb-24">
      {/* ── The ten-second pitch ─────────────────────────────── */}
      <section className="titlecard wrap">
        <div className="titlecard-meta rise">
          <span>KJ · use the work</span>
          <span>Selected work · 2024–2026</span>
        </div>

        <div className="mt-12 md:mt-16">
          <h1 className="display rise" style={{ animationDelay: "40ms" }}>
            {hero.name}
          </h1>

          <p
            className="rise mt-4 font-display text-[clamp(1.5rem,3.2vw,2.3rem)] italic leading-tight"
            style={{ color: "var(--amber-ink)", animationDelay: "70ms" }}
          >
            {hero.statement}
          </p>

          <p
            className="rise mt-6 max-w-[54ch] leading-relaxed"
            style={{ color: "var(--muted)", animationDelay: "110ms" }}
          >
            {hero.sub}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-2.5" style={{ animationDelay: "150ms" }}>
            <a href="#live" className="btn btn--primary">
              Use it live <span className="arr" aria-hidden="true">↓</span>
            </a>
            <a href={person.resumeHref} target="_blank" rel="noopener noreferrer" className="btn">
              Résumé <span className="arr" aria-hidden="true">↗</span>
            </a>
            <a href="#work" className="btn">
              Explore the map <span className="arr" aria-hidden="true">↓</span>
            </a>
          </div>

          <p className="rise mt-6 text-xs" style={{ color: "var(--faint)", animationDelay: "170ms" }}>
            {hero.location}
          </p>
        </div>
      </section>

      {/* ── Receipts: the evidence, up front ─────────────────── */}
      <div className="wrap mt-12" aria-label="Outcomes">
        <FadeIn>
          <div className="receipts">
            {receipts.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* ── The product, running in the page ─────────────────── */}
      <section className="wrap mt-12 scroll-mt-20" id="live">
        <FadeIn>
          <p className="label">Don&rsquo;t take my word for it</p>
          <h2 className="h2 mt-1.5">
            This is not a mockup. <em style={{ color: "var(--amber-ink)", fontStyle: "italic" }}>Use it.</em>
          </h2>
          <p className="mt-3 max-w-[56ch]" style={{ color: "var(--muted)" }}>
            FirstStep Legal AI, live in this page. Everyday legal questions for
            India, answered in plain language with the exact Act and Section,
            the official source, and the next step. Try a bounced cheque or an
            eviction notice.
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <LiveWindow />
        </FadeIn>
      </section>

      {/* ── The map: the discovery layer ───────────────────── */}
      <section className="wrap mt-12 scroll-mt-20" id="work">
        <FadeIn>
          <p className="label">The map</p>
          <h2 className="h2 mt-1.5">
            Four projects. <em style={{ color: "var(--amber-ink)", fontStyle: "italic" }}>One system.</em>
          </h2>
          <p className="mt-3 max-w-[56ch]" style={{ color: "var(--muted)" }}>
            Positioned by the lifecycle stage each one proves and who the work
            serves. The threads between them are the principles the chapters
            are built on.
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <div className="mt-6">
            <WorkMap />
          </div>
        </FadeIn>
      </section>

      {/* ── Recent builds: shipped, smaller than a chapter ────── */}
      <section className="wrap mt-12 scroll-mt-20" id="recent">
        <FadeIn>
          <p className="label">Recent builds</p>
          <h2 className="h2 mt-1.5">
            Smaller than a chapter, <em style={{ color: "var(--amber-ink)", fontStyle: "italic" }}>still shipped.</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.06}>
          <div className="mt-6">
            <RecentBuilds />
          </div>
        </FadeIn>
      </section>

      {/* ── Now / live ───────────────────────────────────────── */}
      <div className="wrap mt-10">
        <FadeIn>
          <div className="card overflow-hidden px-5 sm:px-7">
            <NowStrip />
          </div>
        </FadeIn>
      </div>

      {/* ── Elsewhere: extras, demoted but kept ──────────────── */}
      <section className="wrap mt-14">
        <FadeIn>
          <p className="label">Elsewhere</p>
          <div className="elsewhere mt-3">
            <Link href="/lab" className="link">The lab — how this site is built</Link>
            <Link href="/playground" className="link">The playground — three small games</Link>
          </div>
        </FadeIn>
      </section>

      <footer
        className="wrap mt-16 flex flex-wrap items-center justify-between gap-3 pt-6 text-xs"
        style={{ borderTop: "1px solid var(--rule-soft)", color: "var(--faint)" }}
      >
        <span>{person.location}</span>
        <span>
          © {new Date().getFullYear()} {person.fullName}
        </span>
      </footer>
    </div>
  );
}
