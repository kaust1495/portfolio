import type { Metadata } from "next";
import { person } from "@/content/profile";

export const siteTitle = `${person.name} — engineer turned product builder`;
export const siteDescription =
  "Kaustubh Jain — engineer turned product builder. Three years at Bank of America shipping banking infrastructure and a governed agentic-AI prototype. Now at Masters' Union, working toward product, venture, or a company of his own.";

/**
 * Metadata for one route.
 *
 * Next.js inherits `alternates` and `openGraph` from the root layout untouched
 * when a route doesn't set them, and replaces them wholesale when it does. The
 * first behaviour is how five routes shipped the homepage as their canonical;
 * the second is how the case studies lost their share image. Every route goes
 * through here so canonical, og:url and the share image always name the route.
 *
 * `image` defaults to the root share image. Pass `false` for routes with a
 * colocated `opengraph-image.tsx`, which Next attaches on its own.
 */
export function routeMetadata({
  path,
  title,
  description,
  image = "/opengraph-image",
}: {
  path: string;
  title?: string;
  description: string;
  image?: string | false;
}): Metadata {
  const fullTitle = title ? `${title} — ${person.name}` : siteTitle;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: fullTitle }] : undefined;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: person.name,
      locale: "en_IN",
      title: fullTitle,
      description,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}
