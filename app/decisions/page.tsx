import type { Metadata } from "next";
import { Deck } from "@/components/decisions/Deck";

export const metadata: Metadata = {
  title: "Decisions",
  description:
    "Twelve real calls from product, capital, and being on-call. Make the decision yourself, then see the one Kaustubh Jain made — and what happened.",
};

export default function DecisionsPage() {
  return (
    <>
      <div className="glow" style={{ top: "-20vw", left: "-12vw" }} aria-hidden="true" />
      <Deck />
    </>
  );
}
