import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { person, github } from "@/content/profile";
import { siteTitle, siteDescription } from "@/lib/seo";
import { CommandBar } from "@/components/CommandBar";
import { SiteNav } from "@/components/SiteNav";
import { AskMe } from "@/components/chat/AskMe";
import { Buddy } from "@/components/Buddy";
import { Hum } from "@/components/Hum";
import "./globals.css";

/* Display — Fraunces with the SOFT and WONK axes, normal style only. The
   optical-size axis and the italic file were 270 KB between them; without
   them Fraunces is 62 KB and keeps its drawn look. (BUILD-PLAN 0.7) */
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK"],
});
/* Body — Manrope. Monospace uses the system stack; no mono download. */
const body = Manrope({ variable: "--font-body", subsets: ["latin"], display: "swap" });

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
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
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
