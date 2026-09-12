import type { Metadata } from "next";
import { Spectral, Archivo, Martian_Mono } from "next/font/google";
import { person, github } from "@/content/profile";
import { siteTitle, siteDescription } from "@/lib/seo";
import { CommandBar } from "@/components/CommandBar";
import { SiteNav } from "@/components/SiteNav";
import { AskMe } from "@/components/chat/AskMe";
import { Hum } from "@/components/Hum";
import "./tokens.css";
import "./globals.css";
import "./register.css";

/* Argument — Spectral. The reading face. */
const argument = Spectral({
  variable: "--font-argument",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});
/* Apparatus, headings, stamps — Archivo variable.
   Deviation from docs/BRIEF.md: weight axis only. The `wdth` axis costs
   +56 KB (90 vs 34) for a subtle narrowing; stamps get their condensed
   look from tracking instead. */
const apparatus = Archivo({
  variable: "--font-apparatus",
  subsets: ["latin"],
  display: "swap",
});
/* Identifiers — Martian Mono. Record numbers, dates, metrics, cross-refs. */
const identifier = Martian_Mono({
  variable: "--font-id",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
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
    <html
      lang="en"
      className={`${argument.variable} ${apparatus.variable} ${identifier.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip">
          Skip to content
        </a>
        <SiteNav />
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Hum />
        <AskMe />
        <CommandBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
