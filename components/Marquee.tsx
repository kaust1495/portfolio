import { marqueeWords } from "@/content/profile";

export function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <section aria-hidden="true" className="marquee-track overflow-hidden border-y" style={{ borderColor: "var(--line-soft)" }}>
      <div className="marquee py-4">
        {items.map((word, i) => (
          <span key={i} className="flex items-center">
            <span className="px-5 text-sm" style={{ color: "var(--muted)" }}>
              {word}
            </span>
            <span style={{ color: "var(--accent)" }}>·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
