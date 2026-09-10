import { now } from "@/content/profile";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Now() {
  return (
    <section id="now" className="section">
      <div className="shell">
        <SectionHeader index="01" title={now.heading} />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="space-y-5">
            {now.body.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "text-lg leading-relaxed" : "leading-relaxed"}
                style={i === 0 ? undefined : { color: "var(--muted)" }}
              >
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <p className="label mb-5">What I&rsquo;m aiming at</p>
            <ul className="space-y-0">
              {now.targets.map((t, i) => (
                <li
                  key={t.k}
                  className="grid grid-cols-[7rem_1fr] gap-4 py-4"
                  style={{
                    borderTop: i === 0 ? "1px solid var(--line)" : "1px solid var(--line-soft)",
                  }}
                >
                  <span className="font-mono text-sm" style={{ color: "var(--accent)" }}>
                    {t.k}
                  </span>
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    {t.v}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
