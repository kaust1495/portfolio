import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { person, github } from "@/content/profile";
import { siteTitle, siteDescription } from "@/lib/seo";
import { CommandBar } from "@/components/CommandBar";
import { SiteNav } from "@/components/SiteNav";
import { AskMe } from "@/components/chat/AskMe";
import { Buddy } from "@/components/Buddy";
import { Hum } from "@/components/Hum";
import "./globals.css";

/* Product Teardown / Blueprint — one grotesk for reading and display, one
   mono for annotations and controls. Both are OFL-licensed and served by
   next/font, so the preview adds no external font request. */
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], display: "swap" });
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(person.siteUrl),
  title: { default: siteTitle, template: `%s — ${person.name}` },
  description: siteDescription,
  keywords: [
    "Kaustubh Jain",
    "Product Manager",
    "venture",
    "founder's office",
    "chief of staff",
    "agentic AI",
    "Masters' Union",
    "Bank of America",
    "0 to 1",
  ],
  authors: [{ name: person.name, url: person.linkedin }],
  creator: person.name,
  // No `alternates` or `openGraph.url` here on purpose: every route sets its
  // own through lib/seo.ts, so nothing can inherit the homepage's URL.
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.fullName,
    alternateName: person.name,
    url: person.siteUrl,
    email: person.email,
    jobTitle: "Product · Venture · Founder",
    sameAs: [person.linkedin, github],
    address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressCountry: "IN" },
    alumniOf: [
      { "@type": "Organization", name: "Masters' Union" },
      { "@type": "Organization", name: "Centre for Development of Advanced Computing (C-DAC)" },
      { "@type": "Organization", name: "Savitribai Phule Pune University" },
    ],
    worksFor: { "@type": "Organization", name: "Bank of America (2023–2026)" },
  };

  return (
    <html lang="en" className={`${grotesk.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip">
          Skip to content
        </a>
        <div className="ambient" aria-hidden="true">
          <span className="blob blob-a" />
          <span className="blob blob-b" />
          <span className="blob blob-c" />
        </div>
        <SiteNav />
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Buddy />
        <Hum />
        <AskMe />
        <CommandBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
