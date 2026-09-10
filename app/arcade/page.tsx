import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Arcade",
  description:
    "Two small games about making product calls under pressure — Ship It and Pipeline Panic — built by Kaustubh Jain.",
};

const games = [
  {
    id: "ship-it",
    name: "Ship It",
    line: "Features fly toward a deadline. Ship, defer, or cut before they hit — score is good calls per minute.",
    status: "Coming in the next build",
  },
  {
    id: "pipeline-panic",
    name: "Pipeline Panic",
    line: "Deploys queue up. Approve, hold, or send for testing — keep prod alive as the pace climbs.",
    status: "Coming in the next build",
  },
];

export default function ArcadePage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-[820px] px-4 pb-24 pt-24">
      <FadeIn>
        <p className="label">Arcade</p>
        <h1 className="h2 mt-3 max-w-[18ch]">Small games about deciding fast.</h1>
        <p className="mt-4 max-w-[52ch] text-sm" style={{ color: "var(--muted)" }}>
          Both of these dramatise something real: the job is a stream of calls under time pressure, with
          incomplete information. They&rsquo;re also listed as projects — I built them.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {games.map((g, i) => (
          <FadeIn key={g.id} delay={i * 0.05}>
            <div className="tile h-full">
              <h2 className="font-serif text-2xl" style={{ color: "var(--ink)" }}>
                {g.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {g.line}
              </p>
              <p className="mt-4 font-mono text-[0.65rem] tracking-widest" style={{ color: "var(--accent)" }}>
                {g.status}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.1}>
        <p className="mt-10 text-sm" style={{ color: "var(--faint)" }}>
          In the meantime, the <Link href="/decisions" className="link link--accent">Decisions deck</Link> is the
          thoughtful version of the same idea.
        </p>
      </FadeIn>
    </main>
  );
}
