"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Command } from "cmdk";
import { destinations, caseStudies, externalLinks } from "@/content/profile";

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Dot() {
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
      const typing = isTyping(e);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
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

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command menu" loop>
      <Command.Input placeholder="Where to? Try “work”, “helix”, “résumé”…" />
      <Command.List>
        <Command.Empty>Nothing matches that.</Command.Empty>

        <Command.Group heading="Go">
          {destinations.map((d) => (
            <Command.Item key={d.id} value={`${d.label} ${d.blurb}`} onSelect={() => go(d.href)}>
              <Dot />
              <span className="flex-1">{d.label}</span>
              <span style={{ color: "var(--faint)", fontSize: "0.78rem" }}>{d.blurb}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Work">
          {caseStudies.map((c) => (
            <Command.Item key={c.id} value={`${c.title} ${c.kicker} ${c.tags.join(" ")}`} onSelect={() => go(`/work/${c.id}`)}>
              <Arrow />
              <span className="flex-1">{c.title}</span>
              <span style={{ color: "var(--faint)", fontSize: "0.78rem" }}>{c.timeframe}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Elsewhere">
          {externalLinks.map((l) => (
            <Command.Item key={l.href} value={l.label} onSelect={() => go(l.href)}>
              <Arrow />
              <span className="flex-1">{l.label}</span>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

function isTyping(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null;
  return !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
}
