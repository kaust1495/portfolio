import Link from "next/link";
import { hero, person, caseStudies, marqueeWords } from "@/content/profile";
import { Doodle } from "@/components/Doodle";
import { FadeIn } from "@/components/FadeIn";
import { NowStrip } from "./NowStrip";

export function Home() {
  const [lead, ...rest] = caseStudies;
  const ticker = [...marqueeWords, ...marqueeWords];

  return (
    <main className="pb-20">
      {/* ── Name, set very large ─────────────────────────────── */}
      <section className="wrap pt-6 sm:pt-10">
        <div className="flex items-center justify-between gap-4">
          <p className="label rise">{hero.eyebrow}</p>
          <p className="label rise hidden sm:block" style={{ color: "var(--faint)" }}>
            {hero.location}
          </p>
        </div>
        <h1 className="display rise mt-2" style={{ animationDelay: "40ms" }}>
          {hero.name}
        </h1>
        <div className="rule-bold mt-3" />
      </section>

      {/* ── Statement + portrait + the doodle ────────────────── */}
      <section className="wrap mt-8 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
        <div>
          <p
            className="rise font-display text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.05]"
            style={{ color: "var(--accent)", animationDelay: "60ms" }}
          >
            {hero.statement}
          </p>
          <p
            className="rise mt-5 max-w-[56ch] leading-relaxed"
            style={{ color: "var(--muted)", animationDelay: "100ms" }}
          >
            {hero.sub}
          </p>
          <div className="rise mt-7 flex flex-wrap items-center gap-2.5" style={{ animationDelay: "140ms" }}>
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
            <Link href="/playground" className="btn" data-doodle="squash some bugs, it's 30 seconds">
              Playground ↗
            </Link>
          </div>
        </div>

        <div className="rise flex items-end gap-4 lg:flex-col lg:items-end lg:gap-6" style={{ animationDelay: "80ms" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kaustubh-portrait.webp"
            alt="Kaustubh Jain"
            width={300}
            height={375}
            className="w-[132px] border object-cover sm:w-[180px] lg:w-[300px]"
            style={{ aspectRatio: "4 / 5", borderColor: "var(--ink)", borderWidth: 1.5 }}
            fetchPriority="high"
          />
          <div className="mb-1 lg:mb-0 lg:self-start">
            <Doodle size={112} />
          </div>
        </div>
      </section>

      {/* ── Ticker ───────────────────────────────────────────── */}
      <div
        className="ticker-wrap mt-12 overflow-hidden border-y py-2.5"
        style={{ borderColor: "var(--ink)", borderTopWidth: 1.5, borderBottomWidth: 1.5 }}
        aria-hidden="true"
      >
        <div className="ticker">
          {ticker.map((w, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="label px-4" style={{ fontSize: "0.62rem" }}>
                {w}
              </span>
              <span style={{ color: "var(--accent)" }}>✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Now / live ───────────────────────────────────────── */}
      <div className="border-b" style={{ borderColor: "var(--line)" }}>
        <div className="wrap">
          <NowStrip />
        </div>
      </div>

      {/* ── Selected work ────────────────────────────────────── */}
      <section className="wrap mt-14">
        <FadeIn>
          <div className="flex items-end justify-between gap-4">
            <h2 className="h2">Selected work</h2>
            <Link href="/work" className="link text-sm" style={{ color: "var(--muted)" }}>
              All four →
            </Link>
          </div>
          <div className="rule mt-4" />
        </FadeIn>

        <FadeIn delay={0.04}>
          <Link
            href={`/work/${lead.id}`}
            className="tile tile-row mt-5"
            data-doodle="my own product. it's live."
          >
            <div className="max-w-[48ch]">
              <div className="flex items-center gap-3">
                <span className="index-num">{lead.index}</span>
                <span className="label" style={{ color: "var(--faint)" }}>
                  {lead.timeframe}
                </span>
              </div>
              <h3 className="font-display mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">{lead.title}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                {lead.kicker}
              </p>
              <p className="mt-3 hidden text-sm leading-relaxed sm:block" style={{ color: "var(--faint)" }}>
                {lead.insight}
              </p>
            </div>
            <span className="shrink-0 font-mono text-xs" style={{ color: "var(--accent)" }}>
              READ →
            </span>
          </Link>
        </FadeIn>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {rest.map((c, i) => (
            <FadeIn key={c.id} delay={0.06 + i * 0.04} as="article">
              <Link href={`/work/${c.id}`} className="tile h-full" data-doodle={doodleFor(c.id)}>
                <div className="flex items-center justify-between">
                  <span className="index-num">{c.index}</span>
                  <span className="label" style={{ color: "var(--faint)" }}>
                    {c.timeframe}
                  </span>
                </div>
                <h3 className="font-display mt-2 text-lg leading-tight">{c.title}</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {c.kicker}
                </p>
                <span className="mt-3 font-mono text-xs" style={{ color: "var(--accent)" }}>
                  READ →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Playground ───────────────────────────────────────── */}
      <section className="wrap mt-14">
        <FadeIn>
          <div
            className="flex flex-col gap-4 border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            style={{ borderColor: "var(--ink)", borderWidth: 1.5 }}
          >
            <div className="max-w-[42ch]">
              <p className="label">Playground</p>
              <p className="font-display mt-1 text-xl">Three things to actually play with.</p>
              <p className="mt-1.5 text-sm" style={{ color: "var(--muted)" }}>
                A bug-squashing arcade round, a prioritisation game, and a deck of real calls I&rsquo;ve made.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/playground" className="btn" data-doodle="30 seconds. go.">
                Bug Squash
              </Link>
              <Link href="/playground" className="btn" data-doodle="ship / defer / cut">
                Ship It
              </Link>
              <Link href="/decisions" className="btn" data-doodle="you choose, then I show you mine">
                Decisions
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <footer
        className="wrap mt-14 flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-xs"
        style={{ borderColor: "var(--line)", color: "var(--faint)" }}
      >
        <span className="font-mono">{person.location}</span>
        <span className="font-mono">
          © {new Date().getFullYear()} {person.fullName}
        </span>
      </footer>
    </main>
  );
}

function doodleFor(id: string) {
  switch (id) {
    case "helix":
      return "the one I'm proudest of";
    case "subpoena-migration":
      return "a migration that was really a redesign";
    default:
      return "internal tools have users too";
  }
}
