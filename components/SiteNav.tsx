"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { person } from "@/content/profile";

const destinations = [
  { href: "/work", label: "Work" },
  { href: "/decisions", label: "Decisions" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on navigation
  useEffect(() => setOpen(false), [pathname]);

  // escape closes; focus moves into the sheet; the page behind doesn't scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkStyle = (href: string) => ({
    color: pathname.startsWith(href) ? "var(--ink)" : "var(--muted)",
  });

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "color-mix(in srgb, var(--paper) 90%, transparent)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--rule-soft)" : "transparent"}`,
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <nav className="wrap flex items-center justify-between gap-3 py-2">
        <Link href="/" className="tap flex items-center gap-2.5 pr-2" aria-label={`${person.name} — home`}>
          <span
            className="grid h-9 w-9 place-items-center rounded-md border text-[0.72rem]"
            style={{ borderColor: "var(--rule-soft)", color: "var(--ink)", fontFamily: "var(--mono)" }}
          >
            {person.monogram}
          </span>
          <span className="hidden text-sm sm:block" style={{ color: "var(--muted)" }}>
            {person.name}
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-5">
          {/* Full navigation from the tablet tier up (BUILD-PLAN 0.8) */}
          <div className="hidden items-center gap-5 text-sm md:flex">
            {destinations.map((d) => (
              <Link key={d.href} href={d.href} className="tap link" style={linkStyle(d.href)}>
                {d.label}
              </Link>
            ))}
          </div>

          {/* Résumé is a visible pill at every width (BUILD-PLAN 0.3) */}
          <a
            href={person.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--sm"
            data-doodle="one page. no fluff."
          >
            Résumé<span aria-hidden="true"> ↗</span>
          </a>

          {/* ⌘K is desktop-only: phones have no ⌘ key. The wrapper carries the
              responsive display — .btn is unlayered CSS and beats `hidden`. */}
          <span className="hidden md:block">
            <button
              onClick={() => window.dispatchEvent(new Event("open-cmd"))}
              className="btn btn--sm tap-sq"
              aria-label="Open command menu"
            >
              <span style={{ color: "var(--muted)", fontFamily: "var(--mono)" }}>⌘K</span>
            </button>
          </span>

          {/* Menu button below the tablet tier */}
          <span className="block md:hidden">
          <button
            ref={menuButtonRef}
            onClick={() => setOpen((o) => !o)}
            className="tap tap-sq"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-sheet"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
          </span>
        </div>
      </nav>

      {open && (
        <div
          id="nav-sheet"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-0 bottom-0 top-[57px] z-50 overflow-y-auto md:hidden"
          style={{ background: "var(--paper)", borderTop: "1px solid var(--rule-soft)" }}
        >
          <ul className="wrap py-2">
            {destinations.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="flex items-center justify-between border-b text-lg"
                  style={{ minHeight: 56, borderColor: "var(--rule-soft)", color: "var(--ink)" }}
                >
                  {d.label}
                  <span aria-hidden="true" style={{ color: "var(--faint)" }}>→</span>
                </Link>
              </li>
            ))}
            <li>
              <a
                href={person.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-lg"
                style={{ minHeight: 56, color: "var(--ink)" }}
              >
                Résumé
                <span aria-hidden="true" style={{ color: "var(--faint)" }}>↗</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${person.email}`}
                className="flex items-center justify-between border-t text-lg"
                style={{ minHeight: 56, borderColor: "var(--rule-soft)", color: "var(--ink)" }}
              >
                Email
                <span aria-hidden="true" style={{ color: "var(--faint)" }}>↗</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
