import type { Metadata } from "next";
import { routeMetadata } from "@/lib/seo";
import Link from "next/link";
import { beyond, now, principles, contact, person } from "@/content/profile";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = routeMetadata({
  path: "/about",
  title: "About",
  description:
    "Civil engineer → advanced computing → three years of banking infrastructure → Masters' Union. Kaustubh Jain's non-linear route, operating playbook, and what he's doing now.",
});

export default function AboutPage() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-[760px] px-4 pb-24 pt-10">

      {/* Intro */}
      <FadeIn>
        <div className="grid gap-8 sm:grid-cols-[1fr_180px] sm:items-start">
          <div>
            <p className="label">About</p>
            <h1 className="display mt-3 text-[clamp(2rem,5vw,3.2rem)]">The route here wasn&rsquo;t a straight line.</h1>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kaustubh-portrait.webp"
            alt="Kaustubh Jain"
            width={180}
            height={225}
            className="w-full max-w-[180px] rounded-xl border"
            style={{ aspectRatio: "4 / 5", objectFit: "cover", borderColor: "var(--rule-soft)", filter: "saturate(0.9)" }}
          />
        </div>
      </FadeIn>

      <div className="mt-12 space-y-5">
        {beyond.body.map((p, i) => (
          <FadeIn key={i} delay={i * 0.04}>
            <p className="leading-relaxed" style={i === 0 ? undefined : { color: "var(--muted)" }}>
              {p}
            </p>
          </FadeIn>
        ))}
      </div>

      {/* Facts */}
      <FadeIn>
        <dl className="mt-12 grid gap-0">
          {beyond.facts.map((f, i) => (
            <div
              key={f.k}
              className="grid grid-cols-[8rem_1fr] gap-4 py-3.5"
              style={{ borderTop: i === 0 ? "1px solid var(--rule-soft)" : "1px solid var(--rule-soft)" }}
            >
              <dt className="label">{f.k}</dt>
              <dd className="text-sm" style={{ color: "var(--muted)" }}>
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </FadeIn>

      {/* Playbook */}
      <section id="playbook" className="mt-20 scroll-mt-20">
        <FadeIn>
          <p className="label">Playbook</p>
          <h2 className="h2 mt-3">How I think about building.</h2>
        </FadeIn>
        <div className="mt-8 grid gap-px sm:grid-cols-2" style={{ background: "var(--rule-soft)" }}>
          {principles.map((p, i) => (
            <FadeIn key={p.n} delay={i * 0.05}>
              <div className="h-full p-6" style={{ background: "var(--paper)" }}>
                <span className="index-num">{p.n}</span>
                <h3 className="mt-3 font-display text-xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {p.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Now */}
      <section id="now" className="mt-20 scroll-mt-20">
        <FadeIn>
          <p className="label">Now</p>
          <h2 className="h2 mt-3">{now.heading}.</h2>
        </FadeIn>
        <div className="mt-8 space-y-4">
          {now.body.map((p, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <p className="leading-relaxed" style={i === 0 ? undefined : { color: "var(--muted)" }}>
                {p}
              </p>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <ul className="mt-8 grid gap-0">
            {now.targets.map((t, i) => (
              <li
                key={t.k}
                className="grid grid-cols-[7rem_1fr] gap-4 py-3.5"
                style={{ borderTop: i === 0 ? "1px solid var(--rule-soft)" : "1px solid var(--rule-soft)" }}
              >
                <span className="font-mono text-sm" style={{ color: "var(--coral-ink)" }}>
                  {t.k}
                </span>
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  {t.v}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {/* Contact */}
      <section id="contact" className="mt-20 scroll-mt-20">
        <FadeIn>
          <p className="label">Contact</p>
          <h2 className="h2 mt-3 max-w-[16ch]">{contact.heading}.</h2>
          <p className="mt-4 max-w-[46ch] text-sm" style={{ color: "var(--muted)" }}>
            {contact.line}
          </p>
        </FadeIn>
        <FadeIn>
          <ul className="mt-8 grid gap-px sm:grid-cols-2" style={{ background: "var(--rule-soft)" }}>
            {contact.links.map((l) => {
              const external = l.href.startsWith("http") || l.href.endsWith(".pdf");
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex flex-col gap-1.5 p-5"
                    style={{ background: "var(--paper)" }}
                  >
                    <span className="label">{l.label}</span>
                    <span className="link text-sm">
                      {l.value}
                      {external ? <span aria-hidden="true"> ↗</span> : null}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </section>

      <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs" style={{ borderColor: "var(--rule-soft)", color: "var(--faint)" }}>
        <Link href="/" className="tap link">
          ← Home
        </Link>
        <span className="font-mono">© {new Date().getFullYear()} {person.fullName}</span>
      </footer>
    </div>
  );
}
