"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { person } from "@/content/profile";

const links = [
  { label: "Work", href: "/work" },
  { label: "Playground", href: "/playground" },
  { label: "About", href: "/about" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "color-mix(in srgb, var(--bg) 88%, transparent)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--line-soft)" : "transparent"}`,
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <nav className="wrap flex items-center justify-between py-3.5">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${person.name} — home`}>
          <span
            className="grid h-7 w-7 place-items-center rounded-md border font-mono text-[0.7rem]"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
          >
            {person.monogram}
          </span>
          <span className="hidden text-sm sm:block" style={{ color: "var(--muted)" }}>
            {person.name}
          </span>
        </Link>

        <div className="flex items-center gap-4 text-sm sm:gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link"
              style={{ color: pathname.startsWith(l.href) ? "var(--ink)" : "var(--muted)" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={person.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="link hidden sm:inline-flex"
            style={{ color: "var(--muted)" }}
          >
            Résumé<span aria-hidden="true"> ↗</span>
          </a>
          <button
            onClick={() => window.dispatchEvent(new Event("open-cmd"))}
            className="btn px-2.5 py-1.5 text-xs"
            aria-label="Open command menu"
          >
            <kbd className="kbd" style={{ borderColor: "transparent", background: "transparent", padding: 0 }}>
              ⌘K
            </kbd>
          </button>
        </div>
      </nav>
    </header>
  );
}
