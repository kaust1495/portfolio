import type { Metadata } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono, Caveat } from "next/font/google";
import { person } from "@/content/profile";
import { CommandBar } from "@/components/CommandBar";
import { SiteNav } from "@/components/SiteNav";
import { AskMe } from "@/components/chat/AskMe";
import { Buddy } from "@/components/Buddy";
import { Hum } from "@/components/Hum";
import "./globals.css";

/* Display — Fraunces. A "wonky" old-style serif; the SOFT and WONK axes are
   what make it look drawn rather than set. Nothing else on Google Fonts
   looks like it, which is the entire point. */
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});
/* Body — Manrope: geometric with warmth. Inter's job, more personality. */
const body = Manrope({ variable: "--font-body", subsets: ["latin"], display: "swap" });
/* Mono — IBM Plex Mono. Labels and numbers only. */
const mono = IBM_Plex_Mono({ variable: "--font-mono-k", subsets: ["latin"], display: "swap", weight: ["400", "500"] });
/* Hand — small handwritten asides only. */
const caveat = Caveat({ variable: "--font-caveat", weight: ["400", "600", "700"], subsets: ["latin"], display: "swap" });

const title = `${person.name} — engineer turned product builder`;
const description =
  "Kaustubh Jain — engineer turned product builder. Three years at Bank of America shipping banking infrastructure and a governed agentic-AI prototype. Now at Masters' Union, working toward product, venture, or a company of his own.";

export const metadata: Metadata = {
  metadataBase: new URL(person.siteUrl),
  title: { default: title, template: `%s — ${person.name}` },
  description,
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: person.siteUrl,
    title,
    description,
    siteName: person.name,
  },
  twitter: { card: "summary_large_image", title, description },
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
    sameAs: [person.linkedin],
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
      className={`${display.variable} ${body.variable} ${mono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="ambient" aria-hidden="true">
          <span className="blob blob-a" />
          <span className="blob blob-b" />
          <span className="blob blob-c" />
        </div>
        <SiteNav />
        {children}
        <Buddy />
        <Hum />
        <AskMe />
        <CommandBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
