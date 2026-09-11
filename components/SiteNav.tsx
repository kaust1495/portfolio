"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { person } from "@/content/profile";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkStyle = (href: string) => ({
    color: pathname.startsWith(href) ? "var(--ink)" : "var(--muted)",
  });

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "color-mix(in srgb, var(--bg) 90%, transparent)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
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
          <Link href="/work" className="link" style={linkStyle("/work")}>
            Work
          </Link>
          <span className="hidden items-center gap-4 sm:flex sm:gap-6">
            <Link href="/lab" className="link" style={linkStyle("/lab")}>
              Lab
            </Link>
            <Link href="/playground" className="link" style={linkStyle("/playground")}>
              Playground
            </Link>
            <Link href="/about" className="link" style={linkStyle("/about")}>
              About
            </Link>
            <a
              href={person.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
              style={{ color: "var(--muted)" }}
            >
              Résumé<span aria-hidden="true"> ↗</span>
            </a>
          </span>
          <button
            onClick={() => window.dispatchEvent(new Event("open-cmd"))}
            className="btn btn--sm"
            aria-label="Open command menu"
          >
            <span className="font-mono" style={{ color: "var(--muted)" }}>
              ⌘K
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
