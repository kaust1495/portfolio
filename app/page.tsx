import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Now } from "@/components/Now";
import { Work } from "@/components/Work";
import { Principles } from "@/components/Principles";
import { Beyond } from "@/components/Beyond";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Now />
        <Work />
        <Principles />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
