import { Reveal } from "./Reveal";

export function SectionHeader({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker?: string;
}) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4">
        <span className="index-num">{index}</span>
        <div className="rule flex-1" />
      </div>
      <h2 className="h2 mt-5">{title}</h2>
      {kicker ? (
        <p className="mt-3 text-sm max-w-[52ch]" style={{ color: "var(--muted)" }}>
          {kicker}
        </p>
      ) : null}
    </Reveal>
  );
}
