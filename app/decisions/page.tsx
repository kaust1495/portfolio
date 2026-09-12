import type { Metadata } from "next";
import { routeMetadata } from "@/lib/seo";
import { Deck } from "@/components/decisions/Deck";

export const metadata: Metadata = routeMetadata({
  path: "/decisions",
  title: "Decisions deck",
  description:
    "Twelve real calls from product, capital, and being on-call. Make the decision yourself, then see the one Kaustubh Jain made — and what happened.",
});

export default function DecisionsPage() {
  return <Deck />;
}
