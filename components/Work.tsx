import { caseStudies, type CaseStudy } from "@/content/profile";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

function Block({ study }: { study: CaseStudy }) {
  return (
    <article
      className="grid gap-8 py-12 lg:grid-cols-[16rem_1fr] lg:gap-16"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      {/* Sticky label rail */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Reveal>
          <span className="index-num">{study.index}</span>
          <h3 className="font-serif text-2xl mt-3">{study.title}</h3>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {study.kicker}
          </p>
          <p className="label mt-4">{study.timeframe}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {study.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          {study.href ? (
            <a
              href={study.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link link--accent mt-5 text-sm"
            >
              Visit the site<span aria-hidden="true"> ↗</span>
            </a>
          ) : null}
        </Reveal>
      </div>

      {/* Body */}
      <div className="space-y-8 max-w-[64ch]">
        <Reveal>
          <p className="label mb-2">Context</p>
          <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
            {study.context}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <p className="label mb-2">The insight</p>
          <p className="font-serif text-xl leading-snug">{study.insight}</p>
        </Reveal>

        <Reveal delay={90}>
          <p className="label mb-3">What I did</p>
          <ul className="space-y-3">
            {study.work.map((w, i) => (
              <li key={i} className="grid grid-cols-[1.5rem_1fr] gap-2 leading-relaxed">
                <span className="font-mono text-xs mt-1" style={{ color: "var(--accent)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ color: "var(--muted)" }}>{w}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="label mb-3">Where it landed</p>
          <ul className="space-y-2">
            {study.outcome.map((o, i) => (
              <li key={i} className="grid grid-cols-[1.5rem_1fr] gap-2 leading-relaxed">
                <span aria-hidden="true" style={{ color: "var(--accent)" }}>
                  →
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
          {study.note ? (
            <p className="mt-5 text-xs" style={{ color: "var(--faint)" }}>
              {study.note}
            </p>
          ) : null}
        </Reveal>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="section">
      <div className="shell">
        <SectionHeader
          index="02"
          title="Selected work"
          kicker="A product I shipped on my own, then three from inside Bank of America — each one where an engineering task turned into a product decision."
        />
        <div className="mt-8">
          {caseStudies.map((study) => (
            <Block key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
