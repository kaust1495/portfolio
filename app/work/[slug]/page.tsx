import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/profile";
import { routeMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/FadeIn";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.id === slug);
  if (!c) return {};
  // image: false — opengraph-image.tsx in this segment supplies the card
  return routeMetadata({
    path: `/work/${c.id}`,
    title: c.title,
    description: `${c.kicker} — ${c.insight}`,
    image: false,
  });
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = caseStudies.findIndex((x) => x.id === slug);
  if (idx === -1) notFound();
  const c = caseStudies[idx];
  const nextCase = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <div className="relative z-10 mx-auto w-full max-w-[720px] px-4 pb-24 pt-10">

      <FadeIn>
        <Link href="/work" className="tap label link">
          ← All work
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="index-num">{c.index}</span>
          <span className="label" style={{ color: "var(--faint)" }}>
            {c.timeframe}
          </span>
        </div>
        <h1 className="display mt-3 text-[clamp(2rem,5vw,3.4rem)]">{c.title}</h1>
        <p className="mt-3 text-lg" style={{ color: "var(--muted)" }}>
          {c.kicker}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {c.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        {c.href && (
          <a href={c.href} target="_blank" rel="noopener noreferrer" className="tap link link--accent mt-5 inline-flex text-sm">
            Visit the live site <span aria-hidden="true">↗</span>
          </a>
        )}
      </FadeIn>

      <div className="mt-14 space-y-12">
        <FadeIn>
          <p className="label mb-2">Context</p>
          <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
            {c.context}
          </p>
        </FadeIn>

        <FadeIn>
          <p className="label mb-2">The insight</p>
          <p className="font-display text-[1.35rem] leading-snug">{c.insight}</p>
        </FadeIn>

        <FadeIn>
          <p className="label mb-3">What I did</p>
          <ul className="space-y-3">
            {c.work.map((w, i) => (
              <li key={i} className="grid grid-cols-[1.6rem_1fr] gap-2 leading-relaxed">
                <span className="font-mono text-xs" style={{ color: "var(--coral-ink)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ color: "var(--muted)" }}>{w}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn>
          <p className="label mb-3">Where it landed</p>
          <ul className="space-y-2">
            {c.outcome.map((o, i) => (
              <li key={i} className="grid grid-cols-[1.4rem_1fr] gap-2 leading-relaxed">
                <span aria-hidden="true" style={{ color: "var(--coral-ink)" }}>
                  →
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
          {c.note && (
            <p className="mt-5 text-xs" style={{ color: "var(--faint)" }}>
              {c.note}
            </p>
          )}
        </FadeIn>
      </div>

      <FadeIn>
        <div className="mt-16 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--rule-soft)" }}>
          <Link href="/decisions" className="tap text-sm link" style={{ color: "var(--muted)" }}>
            Play the Decisions deck
          </Link>
          <Link href={`/work/${nextCase.id}`} className="tap link link--accent text-sm">
            Next: {nextCase.title} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
