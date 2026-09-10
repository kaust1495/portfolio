"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Command } from "cmdk";
import {
  person,
  destinations,
  caseStudies,
  externalLinks,
} from "@/content/profile";
import { decisions } from "@/content/decisions";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DotIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
    </svg>
  );
}

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isTyping(e))) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmd", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmd", onOpen);
    };
  }, []);

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      if (href.startsWith("http") || href.startsWith("mailto:")) {
        window.open(href, href.startsWith("mailto:") ? "_self" : "_blank");
      } else {
        router.push(href);
      }
    },
    [router],
  );

  const surprise = useCallback(() => {
    const pool = [
      "/decisions",
      ...caseStudies.map((c) => `/work/${c.id}`),
      "/about",
    ];
    go(pool[Math.floor(Math.random() * pool.length)]);
  }, [go]);

  return (
    <>
      {/* persistent trigger — top right on every page */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className="fixed right-3 top-3 z-40 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur transition-colors hover:text-[var(--ink)]"
        style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--bg) 70%, transparent)", color: "var(--muted)" }}
      >
        <span className="hidden sm:inline">Jump to</span>
        <kbd className="kbd">⌘K</kbd>
      </button>

      {/* home link — top left, hidden on home */}
      {pathname !== "/" && (
        <Link
          href="/"
          className="fixed left-3 top-3 z-40 flex h-8 items-center gap-2 rounded-full border px-3 text-xs backdrop-blur transition-colors hover:text-[var(--ink)]"
          style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--bg) 70%, transparent)", color: "var(--muted)" }}
        >
          <span aria-hidden="true">←</span> {person.monogram}
        </Link>
      )}

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command menu"
        loop
      >
        <Command.Input placeholder="Where to? Try “decisions”, “helix”, “résumé”…" />
        <Command.List>
          <Command.Empty>Nothing matches that.</Command.Empty>

          <Command.Group heading="Go">
            {destinations.map((d) => (
              <Command.Item key={d.id} value={`${d.label} ${d.blurb}`} onSelect={() => go(d.href)}>
                <DotIcon />
                <span className="flex-1">{d.label}</span>
                <span style={{ color: "var(--faint)", fontSize: "0.78rem" }}>{d.blurb}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Work">
            {caseStudies.map((c) => (
              <Command.Item key={c.id} value={`${c.title} ${c.kicker} ${c.tags.join(" ")}`} onSelect={() => go(`/work/${c.id}`)}>
                <ArrowIcon />
                <span className="flex-1">{c.title}</span>
                <span style={{ color: "var(--faint)", fontSize: "0.78rem" }}>{c.timeframe}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Decisions">
            <Command.Item value="play the decisions deck game" onSelect={() => go("/decisions")}>
              <DotIcon />
              <span className="flex-1">Play the deck</span>
              <span style={{ color: "var(--faint)", fontSize: "0.78rem" }}>{decisions.length} calls</span>
            </Command.Item>
            <Command.Item value="surprise me random" onSelect={surprise}>
              <DotIcon />
              <span className="flex-1">Surprise me</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Elsewhere">
            {externalLinks.map((l) => (
              <Command.Item key={l.href} value={l.label} onSelect={() => go(l.href)}>
                <ArrowIcon />
                <span className="flex-1">{l.label}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}

function isTyping(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null;
  return !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
}
