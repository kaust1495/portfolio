import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { person } from "@/content/profile";
import { CommandBar } from "@/components/CommandBar";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const title = `${person.name} — builder, operator, investor-in-training`;
const description =
  "Kaustubh Jain builds products and decides what's worth building. Three years an engineer at Bank of America, now at Masters' Union — working across product, venture, and starting something. An interactive portfolio built around real decisions.";

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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="field" aria-hidden="true" />
        {children}
        <CommandBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
