import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { person } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const title = `${person.name} — Product & Systems`;
const description =
  "Kaustubh Jain builds and evaluates technical products. Three years of enterprise banking infrastructure at Bank of America, now at Masters' Union — working toward product, venture, and founder's-office roles.";

export const metadata: Metadata = {
  metadataBase: new URL(person.siteUrl),
  title: {
    default: title,
    template: `%s — ${person.name}`,
  },
  description,
  keywords: [
    "Kaustubh Jain",
    "Product Manager",
    "Associate Product Manager",
    "Masters' Union",
    "Bank of America",
    "agentic AI",
    "release engineering",
    "venture",
    "founder's office",
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
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
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
    jobTitle: "Product / Technical Product",
    sameAs: [person.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurugram",
      addressCountry: "IN",
    },
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
        <div className="grain" aria-hidden="true" />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
