import type { Metadata } from "next";
import { Register } from "@/components/home/Register";
import { routeMetadata, siteDescription } from "@/lib/seo";

export const metadata: Metadata = routeMetadata({
  path: "/",
  description: siteDescription,
});

export default function HomePage() {
  return <Register />;
}
