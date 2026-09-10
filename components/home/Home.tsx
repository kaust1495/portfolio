import Link from "next/link";
import { hero, person, caseStudies } from "@/content/profile";
import { Doodle } from "@/components/Doodle";
import { FadeIn } from "@/components/FadeIn";
import { NowStrip } from "./NowStrip";

export function Home() {
  const [lead, ...rest] = caseStudies;

  return (
    <main className="pb-24">
      {/* Hero — airy, one big element */}
      <section className="wrap grid gap-8 pt-8 sm:pt-14 lg:grid-cols-[1fr_260px] lg:gap-14">
        <div className="max-w-[38ch] lg:max-w-none">
          <p className="label rise">{hero.eyebrow}</p>
          <h1
            className="rise mt-3 font-serif leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.8rem, 9vw, 5.6rem)", animationDelay: "40ms" }}
          >
            {hero.name}
          </h1>
          <p
            className="rise mt-3 font-serif text-2xl sm:text-3xl"
            style={{ color: "var(--accent)", animationDelay: "80ms" }}
          >
            {hero.statement}
          </p>
          <p
            className="rise mt-6 max-w-[54ch] leading-relaxed"
            style={{ color: "var(--muted)", animationDelay: "120ms" }}
          >
            {hero.sub}
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "160ms" }}>
            <Link href="/work" className="btn btn--primary">
              See the work <span aria-hidden="true">→</span>
            </Link>
            <a href={person.resumeHref} target="_blank" rel="noopener noreferrer" className="btn">
              Résumé <span aria-hidden="true">↗</span>
            </a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="rise mt-4 text-xs" style={{ color: "var(--faint)", animationDelay: "180ms" }}>
            {hero.location}
          </p>
        </div>

        <div className="rise flex flex-col items-start gap-2 lg:-mt-2 lg:items-end" style={{ animationDelay: "100ms" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kaustubh-portrait.webp"
            alt="Kaustubh Jain"
            width={260}
            height={325}
            className="w-[160px] rounded-xl border object-cover sm:w-[210px] lg:w-[260px]"
            style={{ aspectRatio: "4 / 5", borderColor: "var(--line)" }}
            fetchPriority="high"
          />
          <div className="flex items-center gap-2 pl-1 lg:pr-1">
            <Doodle size={42} />
            <span className="font-hand text-lg" style={{ color: "var(--muted)" }}>
              hi, that&rsquo;s me
            </span>
          </div>
        </div>
      </section>

      {/* Now — a tight, dense status band (rhythm contrast) */}
      <div className="mt-14 border-y" style={{ borderColor: "var(--line)", background: "var(--bg-2)" }}>
        <div className="wrap py-0">
          <NowStrip />
        </div>
      </div>

      {/* Selected work — asymmetric: one featured, then a row */}
      <section className="wrap mt-16">
        <FadeIn>
          <div className="flex items-end justify-between">
            <h2 className="h2">Selected work</h2>
            <Link href="/work" className="link text-sm" style={{ color: "var(--muted)" }}>
              All four →
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.04}>
          <Link
            href={`/work/${lead.id}`}
            className="tile mt-6 gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7"
          >
            <div className="max-w-[46ch]">
              <div className="flex items-center gap-3">
                <span className="index-num">{lead.index}</span>
                <span className="label" style={{ color: "var(--faint)" }}>
                  {lead.timeframe}
                </span>
              </div>
              <h3 className="mt-2 font-serif text-2xl" style={{ color: "var(--ink)" }}>
                {lead.title}
              </h3>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                {lead.kicker}
              </p>
              <p className="mt-3 hidden text-sm leading-relaxed sm:block" style={{ color: "var(--faint)" }}>
                {lead.insight}
              </p>
            </div>
            <span className="shrink-0 text-sm" style={{ color: "var(--accent)" }}>
              Read <span aria-hidden="true">→</span>
            </span>
          </Link>
        </FadeIn>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {rest.map((c, i) => (
            <FadeIn key={c.id} delay={0.06 + i * 0.05} as="article">
              <Link href={`/work/${c.id}`} className="tile h-full">
                <div className="flex items-center justify-between">
                  <span className="index-num">{c.index}</span>
                  <span className="label" style={{ color: "var(--faint)" }}>
                    {c.timeframe}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-lg" style={{ color: "var(--ink)" }}>
                  {c.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {c.kicker}
                </p>
                <span className="mt-3 text-sm" style={{ color: "var(--accent)" }}>
                  Read <span aria-hidden="true">→</span>
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Playground — a slim band, not a headline section */}
      <section className="wrap mt-16">
        <FadeIn>
          <div
            className="flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            style={{ borderColor: "var(--line)", background: "var(--surface)" }}
          >
            <div className="max-w-[40ch]">
              <p className="label">Playground</p>
              <p className="mt-1.5 text-sm" style={{ color: "var(--muted)" }}>
                A decision deck and two small games about calling shots under pressure. Built by me.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/decisions" className="btn text-xs">
                Decisions deck
              </Link>
              <Link href="/playground" className="btn text-xs">
                Ship It
              </Link>
              <Link href="/playground" className="btn text-xs">
                Pipeline Panic
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <footer
        className="wrap mt-16 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs"
        style={{ borderColor: "var(--line-soft)", color: "var(--faint)" }}
      >
        <span>{person.location}</span>
        <span className="font-mono">
          © {new Date().getFullYear()} {person.fullName}
        </span>
      </footer>
    </main>
  );
}
