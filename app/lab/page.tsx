import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { labIntro, labItems } from "@/content/lab";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Seven small things Kaustubh Jain built for this site — a generative Web Audio soundtrack, a cursor-following character, a zero-backend chat lookup, three games and a live Hacker News feed — with notes on how each one works.",
};

export default function LabPage() {
  return (
    <main className="wrap pb-24 pt-10">
      <FadeIn>
        <p className="label">Lab</p>
        <h1 className="h2 mt-3 max-w-[20ch]">
          The site <em style={{ color: "var(--coral-ink)" }}>is</em> the portfolio.
        </h1>
        <p className="mt-4 max-w-[58ch] leading-relaxed" style={{ color: "var(--muted)" }}>
          {labIntro}
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {labItems.map((item, i) => (
          <FadeIn key={item.id} delay={0.04 + i * 0.03} as="article">
            <div className={`tile h-full ${item.tint}`} data-doodle={item.name.toLowerCase()}>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-lg leading-snug">
                  <span aria-hidden="true" style={{ color: "var(--coral-ink)" }}>
                    {item.glyph}
                  </span>{" "}
                  {item.name}
                </h2>
                {item.ambient ? <span className="tag">live on every page</span> : null}
              </div>

              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
                {item.blurb}
              </p>

              <details className="mt-3">
                <summary
                  className="cursor-pointer text-xs font-medium"
                  style={{ color: "var(--coral-ink)" }}
                >
                  How it works
                </summary>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {item.how}
                </p>
              </details>

              <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
                {item.stack.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>

              {item.href ? (
                <Link href={item.href} className="link mt-3 text-sm font-medium" style={{ color: "var(--coral-ink)" }}>
                  {item.cta} →
                </Link>
              ) : (
                <p className="mt-3 text-xs" style={{ color: "var(--faint)" }}>
                  {item.cta}
                </p>
              )}
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <p className="mt-10 max-w-[58ch] text-sm" style={{ color: "var(--faint)" }}>
          None of this is the day job — that&rsquo;s under{" "}
          <Link href="/work" className="link" style={{ color: "var(--coral-ink)" }}>
            Work
          </Link>
          . This is what I do when nobody assigns it.
        </p>
      </FadeIn>
    </main>
  );
}
