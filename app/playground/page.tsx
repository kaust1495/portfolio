import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { Playground } from "@/components/games/Playground";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "A decision deck and two small games about making product calls under pressure — Ship It and Pipeline Panic. Built by Kaustubh Jain.",
};

export default function PlaygroundPage() {
  return (
    <main className="wrap max-w-[720px] pb-24 pt-10">
      <FadeIn>
        <p className="label">Playground</p>
        <h1 className="h2 mt-3 max-w-[22ch]">Same ideas as the rest of the site — just more fun.</h1>
        <p className="mt-4 max-w-[54ch] text-sm" style={{ color: "var(--muted)" }}>
          Each of these dramatises the actual job: a stream of calls, under time pressure, with
          incomplete information. I built them, so they count as projects too.
        </p>
      </FadeIn>

      <FadeIn delay={0.05} className="mt-10">
        <Playground />
      </FadeIn>
    </main>
  );
}
