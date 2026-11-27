import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import { person, github } from "@/content/profile";
import { siteTitle, siteDescription } from "@/lib/seo";
import { CommandBar } from "@/components/CommandBar";
import { SiteNav } from "@/components/SiteNav";
import { AskMe } from "@/components/chat/AskMe";
import { Buddy } from "@/components/Buddy";
import { Hum } from "@/components/Hum";
import "./globals.css";

/* Four Chapters / cinematic — Fraunces for display and reading (old-style
   serif with optical sizing), IBM Plex Mono for director's-note annotations.
   Both are OFL-licensed and served by next/font, so the preview adds no
   external font request. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});
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
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip">
          Skip to content
        </a>
        <div id="nav-sentinel" aria-hidden="true" className="absolute top-0 h-[17px] w-px" />
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
