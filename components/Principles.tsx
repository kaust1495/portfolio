import { principles } from "@/content/profile";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Principles() {
  return (
    <section id="thinking" className="section">
      <div className="shell">
        <SectionHeader
          index="03"
          title="How I think"
          kicker="Four things the work above taught me."
        />

        <div className="mt-12 grid gap-px sm:grid-cols-2" style={{ background: "var(--line-soft)" }}>
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 60}>
              <div
                className="h-full p-8 sm:p-10"
                style={{ background: "var(--bg)" }}
              >
                <span className="index-num">{p.n}</span>
                <h3 className="font-serif text-2xl mt-4">{p.title}</h3>
                <p className="mt-4 leading-relaxed" style={{ color: "var(--muted)" }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
