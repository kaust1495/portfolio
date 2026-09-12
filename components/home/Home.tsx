import Link from "next/link";
import { hero, person, caseStudies, marqueeWords } from "@/content/profile";
import { FadeIn } from "@/components/FadeIn";
import { NowStrip } from "./NowStrip";

const tints = ["tint-peach", "tint-sky", "tint-butter"];

export function Home() {
  const [lead, ...rest] = caseStudies;
  const ticker = [...marqueeWords, ...marqueeWords];

  return (
    <div className="pb-24">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="wrap grid items-center gap-10 pt-10 sm:pt-16 md:grid-cols-[1.15fr_0.85fr] md:gap-12 lg:gap-16">
        <div>
          <span
            className="rise inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
            style={{ background: "var(--coral-soft)", color: "var(--coral-ink)" }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--coral)" }} />
            {hero.eyebrow}
          </span>

          <h1 className="display rise mt-5" style={{ animationDelay: "40ms" }}>
            {hero.name}
          </h1>

          <p
            className="rise mt-3 font-display text-[clamp(1.45rem,3.1vw,2.2rem)] italic leading-tight"
            style={{
              color: "var(--coral-ink)",
              animationDelay: "70ms",
              fontVariationSettings: '"opsz" 72, "SOFT" 80, "WONK" 1',
            }}
          >
            {hero.statement}
          </p>

          <p
            className="rise mt-5 max-w-[54ch] leading-relaxed"
            style={{ color: "var(--muted)", animationDelay: "110ms" }}
          >
            {hero.sub}
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-2.5" style={{ animationDelay: "150ms" }}>
            <Link href="/work" className="btn btn--primary" data-doodle="four builds. start with FirstStep.">
              See the work →
            </Link>
            <a
              href={person.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              data-doodle="one page. no fluff."
            >
              Résumé ↗
            </a>
            <Link href="/playground" className="btn" data-doodle="30 seconds of bug squashing?">
              Playground ↗
            </Link>
          </div>

          <p className="rise mt-5 text-xs" style={{ color: "var(--faint)", animationDelay: "170ms" }}>
            {hero.location}
          </p>
        </div>

        {/* portrait, softly framed */}
        <div className="rise lg:justify-self-end" style={{ animationDelay: "90ms" }}>
          <div
            className="relative mx-auto w-[220px] p-2.5 sm:w-[260px] lg:w-[300px]"
            style={{
              background: "var(--sheet)",
              borderRadius: "var(--r-lg)",
              boxShadow: "var(--shadow)",
              border: "1px solid var(--rule-soft)",
            }}
            data-doodle="that's him"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kaustubh-portrait.webp"
              alt="Kaustubh Jain"
              width={300}
              height={375}
              className="block w-full object-cover"
              style={{ aspectRatio: "4 / 5", borderRadius: "calc(var(--r-lg) - 6px)" }}
              fetchPriority="high"
            />
            <span
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium"
              style={{ background: "var(--peach-soft)", color: "var(--ink-2)", boxShadow: "var(--shadow-sm)" }}
            >
              hi, that&rsquo;s me 👋
            </span>
          </div>
        </div>
      </section>

      {/* ── Ticker ───────────────────────────────────────────── */}
      <div className="ticker-wrap mt-16 overflow-hidden py-3" aria-hidden="true">
        <div className="ticker">
          {ticker.map((w, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="px-4 text-sm" style={{ color: "var(--faint)" }}>
                {w}
              </span>
              <span style={{ color: "var(--peach)" }}>✿</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Now / live ───────────────────────────────────────── */}
      <div className="wrap mt-2">
        <div className="card overflow-hidden px-5 sm:px-7">
          <NowStrip />
        </div>
      </div>

      {/* ── Selected work ────────────────────────────────────── */}
      <section className="wrap mt-16">
        <FadeIn>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="label">Selected work</p>
              <h2 className="h2 mt-1.5">Four builds worth talking about.</h2>
            </div>
            <Link href="/work" className="tap link px-2 text-sm" style={{ color: "var(--muted)" }}>
              All four →
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.04}>
          <Link
            href={`/work/${lead.id}`}
            className="tile tile-row tint-coral mt-6"
            data-doodle="my own product. it's live."
          >
            <div className="max-w-[48ch]">
              <div className="flex items-center gap-3">
                <span className="index-num">{lead.index}</span>
                <span className="tag">{lead.timeframe}</span>
              </div>
              <h3 className="mt-3 text-[clamp(1.4rem,2.8vw,1.95rem)]">{lead.title}</h3>
              <p className="mt-1.5 text-sm" style={{ color: "var(--ink-2)" }}>
                {lead.kicker}
              </p>
              <p className="mt-3 hidden text-sm leading-relaxed sm:block" style={{ color: "var(--muted)" }}>
                {lead.insight}
              </p>
            </div>
            <span className="shrink-0 text-sm font-medium" style={{ color: "var(--coral-ink)" }}>
              Read →
            </span>
          </Link>
        </FadeIn>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {rest.map((c, i) => (
            <FadeIn key={c.id} delay={0.06 + i * 0.04} as="article">
              <Link href={`/work/${c.id}`} className={`tile h-full ${tints[i % tints.length]}`} data-doodle={doodleFor(c.id)}>
                <div className="flex items-center justify-between">
                  <span className="index-num">{c.index}</span>
                  <span className="tag">{c.timeframe}</span>
                </div>
                <h3 className="mt-2.5 text-lg leading-snug">{c.title}</h3>
                <p className="text-sm" style={{ color: "var(--ink-2)" }}>
                  {c.kicker}
                </p>
                <span className="mt-3 text-sm font-medium" style={{ color: "var(--coral-ink)" }}>
                  Read →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Playground + Lab ─────────────────────────────────── */}
      <section className="wrap mt-16 grid gap-4 md:grid-cols-2">
        <FadeIn>
          <div className="card h-full p-6 sm:p-7">
            <p className="label">Playground</p>
            <h2 className="mt-1.5 text-2xl">Three things to actually play with.</h2>
            <p className="mt-2 max-w-[40ch] text-sm" style={{ color: "var(--muted)" }}>
              A bug-squashing arcade round, a prioritisation game, and a deck of real calls
              I&rsquo;ve made.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link href="/playground" className="btn btn--sm" data-doodle="30 seconds. go.">
                Bug Squash
              </Link>
              <Link href="/playground" className="btn btn--sm" data-doodle="ship / defer / cut">
                Ship It
              </Link>
              <Link href="/decisions" className="btn btn--sm" data-doodle="you choose, then I show you mine">
                Decisions
              </Link>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="card h-full p-6 sm:p-7" style={{ background: "var(--coral-soft)" }}>
            <p className="label">Lab</p>
            <h2 className="mt-1.5 text-2xl">
              The site <em style={{ color: "var(--coral-ink)" }}>is</em> the portfolio.
            </h2>
            <p className="mt-2 max-w-[40ch] text-sm" style={{ color: "var(--muted)" }}>
              The soundtrack composes itself as it plays. The little guy following your cursor
              runs at 60fps without a library. Seven builds, each with notes on how it works.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link href="/lab" className="btn btn--primary btn--sm" data-doodle="how it's all made">
                Open the Lab →
              </Link>
            </div>
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

function doodleFor(id: string) {
  switch (id) {
    case "helix":
      return "the one he's proudest of";
    case "subpoena-migration":
      return "a migration that was really a redesign";
    default:
      return "internal tools have users too";
  }
}
