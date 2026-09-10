"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hero, destinations, person } from "@/content/profile";
import { Magnetic } from "@/components/Magnetic";
import { StatusTicker } from "./StatusTicker";
import { Portrait } from "./Portrait";

function isTyping() {
  const el = document.activeElement as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
}

export function Console() {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping()) return;
      const d = destinations.find((x) => x.kbd.toLowerCase() === e.key.toLowerCase());
      if (d) {
        e.preventDefault();
        if (d.href.startsWith("http")) window.open(d.href, "_blank");
        else router.push(d.href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <main className="relative z-10 flex min-h-[100svh] flex-col">
      <div className="wrap flex flex-1 flex-col justify-center gap-10 py-24 sm:py-20">
        {/* Identity + portrait */}
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="order-1">
            <p className="label rise" style={{ animationDelay: "0ms" }}>
              {hero.eyebrow}
            </p>
            <h1 className="display mt-5 max-w-[18ch] rise" style={{ animationDelay: "60ms" }}>
              {hero.statement}
            </h1>
            <p
              className="mt-6 max-w-[46ch] text-[0.98rem] leading-relaxed rise"
              style={{ color: "var(--muted)", animationDelay: "120ms" }}
            >
              {hero.sub}
            </p>
            <div className="mt-7 max-w-[44ch] rise" style={{ animationDelay: "200ms" }}>
              <StatusTicker />
            </div>
          </div>

          <div className="order-2 rise" style={{ animationDelay: "120ms" }}>
            <Portrait />
          </div>
        </div>

        {/* Workbench */}
        <div className="rise" style={{ animationDelay: "260ms" }}>
          <div className="mb-3 flex items-end justify-between">
            <p className="label">The workbench</p>
            <p className="label hidden sm:block" style={{ color: "var(--faint)" }}>
              press a letter · or <kbd className="kbd">⌘K</kbd>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {destinations.map((d) => {
              const external = d.href.startsWith("http");
              return (
                <Magnetic key={d.id} strength={0.2} className={d.featured ? "lg:col-span-2" : ""}>
                  <a
                    href={d.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="tile h-full"
                    style={d.featured ? { minHeight: "7.5rem" } : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={d.featured ? "font-serif text-xl" : "text-[0.95rem]"}
                        style={{ color: "var(--ink)" }}
                      >
                        {d.label}
                      </span>
                      <kbd className="kbd">{d.kbd}</kbd>
                    </div>
                    <span className="text-[0.82rem] leading-snug" style={{ color: "var(--muted)" }}>
                      {d.blurb}
                    </span>
                    {d.featured && (
                      <span className="mt-auto pt-3 text-sm" style={{ color: "var(--accent)" }}>
                        Open <span aria-hidden="true">→</span>
                      </span>
                    )}
                  </a>
                </Magnetic>
              );
            })}
          </div>
        </div>
      </div>

      <footer
        className="wrap flex flex-wrap items-center justify-between gap-3 border-t py-5 text-xs"
        style={{ borderColor: "var(--line-soft)", color: "var(--faint)" }}
      >
        <span>{person.location}</span>
        <span className="font-mono">
          © {new Date().getFullYear()} {person.fullName}
        </span>
      </footer>
    </main>
  );
}
