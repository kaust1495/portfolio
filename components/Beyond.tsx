import { beyond } from "@/content/profile";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Beyond() {
  return (
    <section id="background" className="section">
      <div className="shell">
        <SectionHeader index="04" title={beyond.heading} />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="space-y-5">
            {beyond.body.map((p, i) => (
              <p
                key={i}
                className="leading-relaxed"
                style={i === 0 ? undefined : { color: "var(--muted)" }}
              >
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <dl className="space-y-0">
              {beyond.facts.map((f, i) => (
                <div
                  key={f.k}
                  className="grid grid-cols-[8rem_1fr] gap-4 py-3.5"
                  style={{
                    borderTop: i === 0 ? "1px solid var(--line)" : "1px solid var(--line-soft)",
                  }}
                >
                  <dt className="label">{f.k}</dt>
                  <dd className="text-sm" style={{ color: "var(--muted)" }}>
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="label mt-10 mb-4">Currently chewing on</p>
            <ul className="space-y-2.5">
              {beyond.exploring.map((e) => (
                <li key={e} className="grid grid-cols-[1.25rem_1fr] gap-2 text-sm leading-relaxed">
                  <span aria-hidden="true" style={{ color: "var(--accent)" }}>
                    →
                  </span>
                  <span style={{ color: "var(--muted)" }}>{e}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
