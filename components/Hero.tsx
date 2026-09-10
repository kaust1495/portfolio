import { hero, person } from "@/content/profile";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="lattice" aria-hidden="true" />
      <div className="aperture" aria-hidden="true" />

      <div className="shell relative z-10 pt-36 pb-16 sm:pt-44 sm:pb-24">
        <p className="label hero-fade">{hero.eyebrow}</p>

        <h1 className="display mt-6 max-w-[16ch] hero-fade" style={{ animationDelay: "60ms" }}>
          {hero.statement}
        </h1>

        <p
          className="mt-8 text-[0.98rem] sm:text-[1.06rem] leading-relaxed max-w-[62ch] hero-fade"
          style={{ color: "var(--muted)", animationDelay: "120ms" }}
        >
          {hero.sub}
        </p>

        <div
          className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm hero-fade"
          style={{ animationDelay: "180ms" }}
        >
          <a href="#work" className="link">
            View selected work<span aria-hidden="true"> ↓</span>
          </a>
          <a
            href={person.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            style={{ color: "var(--muted)" }}
          >
            Résumé<span aria-hidden="true"> ↗</span>
          </a>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            style={{ color: "var(--muted)" }}
          >
            LinkedIn<span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </div>

      <div className="shell relative z-10 pb-6">
        <div className="rule" />
        <div className="flex flex-wrap gap-x-10 gap-y-2 pt-4 label">
          <span>Bank of America · 2023–2026</span>
          <span>Masters&rsquo; Union · PGP TBM</span>
          <span>{person.location}</span>
        </div>
      </div>
    </section>
  );
}
