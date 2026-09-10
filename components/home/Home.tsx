import Link from "next/link";
import { hero, person, caseStudies } from "@/content/profile";
import { Doodle } from "@/components/Doodle";
import { FadeIn } from "@/components/FadeIn";
import { NowStrip } from "./NowStrip";

export function Home() {
  return (
    <main className="wrap pb-24 pt-10 sm:pt-16">
      {/* Hero */}
      <section className="grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <p className="label rise">{hero.eyebrow}</p>
          <h1 className="display mt-4 rise" style={{ animationDelay: "40ms" }}>
            {hero.name}
          </h1>
          <p className="mt-3 font-serif text-2xl rise" style={{ color: "var(--accent)", animationDelay: "80ms" }}>
            {hero.statement}
          </p>
          <p className="mt-5 max-w-[52ch] leading-relaxed rise" style={{ color: "var(--muted)", animationDelay: "120ms" }}>
            {hero.sub}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 rise" style={{ animationDelay: "160ms" }}>
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
          <p className="mt-4 text-xs rise" style={{ color: "var(--faint)", animationDelay: "180ms" }}>
            {hero.location}
          </p>
        </div>

        <div className="order-first flex flex-col items-start gap-2 rise lg:order-last lg:items-end" style={{ animationDelay: "100ms" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kaustubh-portrait.webp"
            alt="Kaustubh Jain"
            width={230}
            height={288}
            className="w-[150px] rounded-xl border object-cover sm:w-[190px] lg:w-[220px]"
            style={{ aspectRatio: "4 / 5", borderColor: "var(--line)" }}
            fetchPriority="high"
          />
          <div className="flex items-center gap-2 pl-1">
            <Doodle size={44} />
            <span className="font-hand text-lg" style={{ color: "var(--muted)" }}>
              hi, that&rsquo;s me
            </span>
          </div>
        </div>
      </section>

      {/* Now / live strip */}
      <FadeIn className="mt-14">
        <NowStrip />
      </FadeIn>

      {/* Selected work */}
      <section className="mt-16">
        <FadeIn>
          <div className="flex items-end justify-between">
            <h2 className="h2">Selected work</h2>
            <Link href="/work" className="link text-sm" style={{ color: "var(--muted)" }}>
              All four →
            </Link>
          </div>
        </FadeIn>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {caseStudies.map((c, i) => (
            <FadeIn key={c.id} delay={i * 0.05} as="article">
              <Link href={`/work/${c.id}`} className="tile h-full">
                <div className="flex items-center justify-between">
                  <span className="index-num">{c.index}</span>
                  <span className="label" style={{ color: "var(--faint)" }}>
                    {c.timeframe}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-xl" style={{ color: "var(--ink)" }}>
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

      {/* Playground */}
      <section className="mt-16">
        <FadeIn>
          <div className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="h2">Playground</h2>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Things to poke at — same ideas, more fun.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link href="/decisions" className="tile">
                <p className="font-serif text-lg" style={{ color: "var(--ink)" }}>
                  Decisions deck
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  12 real calls. You choose, then see what I did.
                </p>
                <span className="mt-1 text-xs" style={{ color: "var(--accent)" }}>
                  Play →
                </span>
              </Link>
              <Link href="/playground" className="tile">
                <p className="font-serif text-lg" style={{ color: "var(--ink)" }}>
                  Ship It
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Features fly at a deadline. Ship, defer, or cut.
                </p>
                <span className="mt-1 text-xs" style={{ color: "var(--faint)" }}>
                  In the playground
                </span>
              </Link>
              <Link href="/playground" className="tile">
                <p className="font-serif text-lg" style={{ color: "var(--ink)" }}>
                  Pipeline Panic
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Approve, hold, or test incoming deploys. Keep prod alive.
                </p>
                <span className="mt-1 text-xs" style={{ color: "var(--faint)" }}>
                  In the playground
                </span>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs" style={{ borderColor: "var(--line-soft)", color: "var(--faint)" }}>
        <span>{person.location}</span>
        <span className="font-mono">© {new Date().getFullYear()} {person.fullName}</span>
      </footer>
    </main>
  );
}
