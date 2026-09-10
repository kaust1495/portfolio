import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/content/profile";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Four builds from Kaustubh Jain — a live legal-AI product, a governed agentic-AI framework, a platform migration, and release automation. Each one where an engineering task became a product decision.",
};

export default function WorkPage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-[1000px] px-4 pb-24 pt-10">
      <FadeIn>
        <p className="label">Work</p>
        <h1 className="h2 mt-3 max-w-[20ch]">Four builds, four turning points.</h1>
        <p className="mt-4 max-w-[52ch] text-sm" style={{ color: "var(--muted)" }}>
          One product I shipped on my own, then three from inside Bank of America. Each started as an
          engineering task and turned into a decision about what to build.
        </p>
      </FadeIn>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {caseStudies.map((c, idx) => (
          <FadeIn key={c.id} delay={idx * 0.05} as="article">
            <Link href={`/work/${c.id}`} className="tile h-full">
              <div className="flex items-center justify-between">
                <span className="index-num">{c.index}</span>
                <span className="label" style={{ color: "var(--faint)" }}>
                  {c.timeframe}
                </span>
              </div>
              <h2 className="mt-3 font-serif text-2xl" style={{ color: "var(--ink)" }}>
                {c.title}
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                {c.kicker}
              </p>
              <p className="mt-4 line-clamp-3 text-[0.86rem] leading-relaxed" style={{ color: "var(--faint)" }}>
                {c.insight}
              </p>
              <span className="mt-4 text-sm" style={{ color: "var(--accent)" }}>
                Read <span aria-hidden="true">→</span>
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.1}>
        <div className="mt-12 rounded-xl border p-6 text-center" style={{ borderColor: "var(--line)" }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Prefer to see the decisions behind these, one at a time?
          </p>
          <Link href="/decisions" className="link link--accent mt-2 inline-flex text-sm">
            Play the Decisions deck →
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
