"use client";

import { useEffect, useState } from "react";
import { nav, person } from "@/content/profile";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "color-mix(in srgb, var(--bg) 82%, transparent)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--line-soft)" : "transparent"}`,
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <nav className="shell flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-2.5 group" aria-label={`${person.name} — home`}>
          <span
            className="grid place-items-center h-7 w-7 rounded-md border text-[0.7rem] font-mono"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
          >
            {person.monogram}
          </span>
          <span className="hidden sm:block text-sm" style={{ color: "var(--muted)" }}>
            {person.name}
          </span>
        </a>

        <div className="flex items-center gap-5 sm:gap-7 text-sm">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="link" style={{ color: "var(--muted)" }}>
              {item.label}
            </a>
          ))}
          <a
            href={person.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="link link--accent"
          >
            CV<span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
