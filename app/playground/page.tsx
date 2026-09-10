import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "A decision deck and two small games about making product calls under pressure — Ship It and Pipeline Panic. Built by Kaustubh Jain.",
};

const things = [
  {
    id: "decisions",
    name: "Decisions deck",
    line: "Twelve real calls — product, capital, and one you make on-call. You choose, then see what I did and what happened.",
    href: "/decisions",
    ready: true,
  },
  {
    id: "ship-it",
    name: "Ship It",
    line: "Features fly toward a deadline. Ship, defer, or cut before they hit — score is good calls per minute.",
    href: null,
    ready: false,
  },
  {
    id: "pipeline-panic",
    name: "Pipeline Panic",
    line: "Deploys queue up. Approve, hold, or send for testing — keep prod alive as the pace climbs.",
    href: null,
    ready: false,
  },
];

export default function PlaygroundPage() {
  return (
    <main className="wrap max-w-[860px] pb-24 pt-10">
      <FadeIn>
        <p className="label">Playground</p>
        <h1 className="h2 mt-3 max-w-[20ch]">Same ideas as the rest of the site — just more fun.</h1>
        <p className="mt-4 max-w-[54ch] text-sm" style={{ color: "var(--muted)" }}>
          Each of these dramatises the actual job: a stream of calls, under time pressure, with incomplete
          information. They&rsquo;re also listed as projects — I built them.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-4">
        {things.map((t, i) => (
          <FadeIn key={t.id} delay={i * 0.05}>
            {t.href ? (
              <Link href={t.href} className="tile flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-xl" style={{ color: "var(--ink)" }}>
                    {t.name}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                    {t.line}
                  </p>
                </div>
                <span className="shrink-0 text-sm" style={{ color: "var(--accent)" }}>
                  Play →
                </span>
              </Link>
            ) : (
              <div className="tile flex-row items-center justify-between gap-4 opacity-80">
                <div>
                  <p className="font-serif text-xl" style={{ color: "var(--ink)" }}>
                    {t.name}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                    {t.line}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[0.65rem] tracking-widest" style={{ color: "var(--faint)" }}>
                  BUILDING
                </span>
              </div>
            )}
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
