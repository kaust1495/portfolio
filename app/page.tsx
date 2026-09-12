import type { Metadata } from "next";
import { Home } from "@/components/home/Home";
import { routeMetadata, siteDescription } from "@/lib/seo";

export const metadata: Metadata = routeMetadata({
  path: "/",
  description: siteDescription,
});

export default function HomePage() {
  return <Home />;
}
