import { contact } from "@/content/profile";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="shell">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="index-num">05</span>
            <div className="rule flex-1" />
          </div>
          <h2 className="display mt-8 max-w-[14ch]">{contact.heading}</h2>
          <p className="mt-6 text-lg max-w-[48ch]" style={{ color: "var(--muted)" }}>
            {contact.line}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-12 grid gap-px sm:grid-cols-3" style={{ background: "var(--line-soft)" }}>
            {contact.links.map((l) => {
              const external = l.href.startsWith("http") || l.href.endsWith(".pdf");
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex flex-col gap-2 p-8 transition-colors"
                    style={{ background: "var(--bg)" }}
                  >
                    <span className="label">{l.label}</span>
                    <span className="link text-base">
                      {l.value}
                      {external ? <span aria-hidden="true"> ↗</span> : null}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
