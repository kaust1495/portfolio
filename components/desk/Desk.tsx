"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { hero, status, person } from "@/content/profile";
import { techFacts } from "@/content/facts";
import { deskObjects, DESK_STORE, type DeskObjectDef } from "./deskConfig";
import { DeskObject } from "./DeskObject";
import { MiniMe } from "./MiniMe";
import { useTechPulse } from "./useTechPulse";
import {
  CRT, Arcade, Notebook, Stickies, Polaroid, ResumeSheet, Radio, DeskCalendar, Newspaper, Mug,
} from "./Objects";

type Offsets = Record<string, { dx: number; dy: number }>;

export function Desk() {
  const router = useRouter();
  const pulse = useTechPulse();

  const [offsets, setOffsets] = useState<Offsets>({});
  const [resetKey, setResetKey] = useState(0);
  const [activeWidget, setActiveWidget] = useState<null | "radio" | "calendar" | "newspaper" | "mug">(null);
  const [factIndex, setFactIndex] = useState(0);
  const [coffee, setCoffee] = useState(0);
  const [radioOn, setRadioOn] = useState(false);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DESK_STORE);
      if (raw) {
        setOffsets(JSON.parse(raw));
        setMoved(true);
      }
    } catch {}
  }, []);

  const persist = useCallback((id: string, dx: number, dy: number) => {
    setMoved(true);
    setOffsets((prev) => {
      const next = { ...prev, [id]: { dx, dy } };
      try {
        localStorage.setItem(DESK_STORE, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const tidy = useCallback(() => {
    setOffsets({});
    setMoved(false);
    setResetKey((k) => k + 1);
    try {
      localStorage.removeItem(DESK_STORE);
    } catch {}
  }, []);

  const activate = useCallback(
    (def: DeskObjectDef) => {
      const a = def.action;
      if (a.type === "route") router.push(a.href);
      else if (a.type === "link") window.open(a.href, "_blank");
      else if (a.type === "widget") {
        if (a.widget === "mug") {
          setCoffee((c) => c + 1);
          setActiveWidget("mug");
        } else if (a.widget === "radio") {
          setRadioOn(true);
          setActiveWidget("radio");
        } else {
          setActiveWidget(a.widget);
        }
      }
    },
    [router],
  );

  const visual = (id: string) => {
    switch (id) {
      case "crt": return <CRT />;
      case "arcade": return <Arcade />;
      case "notebook": return <Notebook />;
      case "stickies": return <Stickies />;
      case "polaroid": return <Polaroid />;
      case "resume": return <ResumeSheet />;
      case "radio": return <Radio playing={radioOn} />;
      case "calendar": return <DeskCalendar teaser={truncate(techFacts[factIndex % techFacts.length].fact, 88)} />;
      case "newspaper": return <Newspaper headline={pulse.loading ? "Reading the room…" : pulse.headline} />;
      case "mug": return <Mug />;
      default: return null;
    }
  };

  const dust = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        left: (i * 61) % 100,
        size: 1 + (i % 3),
        dur: 10 + (i % 7) * 2,
        delay: -(i * 1.7),
      })),
    [],
  );

  return (
    <main className="desk-scene">
      <div className="lamp-glow" aria-hidden="true" />
      <div className="desk-grain" aria-hidden="true" />
      {dust.map((d, i) => (
        <span
          key={i}
          className="dust"
          style={{
            left: `${d.left}%`,
            bottom: "-4px",
            width: d.size,
            height: d.size,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* header text */}
      <div className="pointer-events-none absolute left-1/2 top-[4%] z-[3] w-full max-w-[620px] -translate-x-1/2 px-4 text-center">
        <p className="label rise">{hero.eyebrow}</p>
        <h1
          className="mt-2 font-serif leading-[1.02] rise"
          style={{ animationDelay: "60ms", fontSize: "clamp(1.9rem, 4.4vw, 3.2rem)", letterSpacing: "-0.02em" }}
        >
          {hero.statement}
        </h1>
      </div>

      {/* mini-me */}
      <div className="mini-me-slot absolute left-1/2 top-[37%] z-[4] w-[min(36vw,258px)] -translate-x-1/2">
        <div
          className="pointer-events-none absolute left-1/2 top-[46%] -z-10 h-[130%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--lamp) 22%, transparent), transparent 62%)", filter: "blur(14px)" }}
          aria-hidden="true"
        />
        <MiniMe mood={coffee > 0 ? "happy" : "idle"} />
        <p
          className="pointer-events-none absolute -right-4 top-1 rotate-[-4deg] whitespace-nowrap rounded-xl px-2.5 py-1 font-hand text-base"
          style={{ background: "var(--paper)", color: "var(--paper-ink)", boxShadow: "0 6px 16px -6px rgba(0,0,0,0.5)" }}
        >
          poke around 👋
        </p>
      </div>

      {/* objects */}
      {deskObjects.map((def) => (
        <DeskObject
          key={`${def.id}-${resetKey}`}
          def={def}
          offset={offsets[def.id] ?? { dx: 0, dy: 0 }}
          onPersist={persist}
          onActivate={activate}
        >
          {visual(def.id)}
        </DeskObject>
      ))}

      {/* hint / controls */}
      <div className="absolute bottom-4 left-1/2 z-[50] flex -translate-x-1/2 items-center gap-4 rounded-full border px-4 py-2 text-xs backdrop-blur"
        style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--bg) 66%, transparent)", color: "var(--muted)" }}>
        <span className="hidden sm:inline">drag things around · tap to open</span>
        <button onClick={() => window.dispatchEvent(new Event("open-cmd"))} className="link">
          <kbd className="kbd">⌘K</kbd> menu
        </button>
        <button onClick={tidy} disabled={!moved} className="link disabled:opacity-30" style={{ color: moved ? "var(--accent)" : undefined }}>
          ↺ tidy desk
        </button>
      </div>

      {/* widget overlay */}
      <AnimatePresence>
        {activeWidget && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center p-4"
            style={{ background: "rgba(8,6,4,0.74)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveWidget(null)}
          >
            <motion.div
              className="w-full max-w-[420px] rounded-2xl border p-6"
              style={{ background: "var(--surface-hi)", borderColor: "var(--line)", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7)" }}
              initial={{ y: 16, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {activeWidget === "radio" && (
                <>
                  <p className="label" style={{ color: "var(--ok)" }}>● On air — what I&rsquo;m into now</p>
                  <p className="mt-1 font-mono text-[0.65rem]" style={{ color: "var(--faint)" }}>
                    updated {status.updated}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {status.items.map((s) => (
                      <li key={s} className="flex gap-2.5 text-sm leading-relaxed">
                        <span style={{ color: "var(--accent)" }}>♪</span>
                        <span style={{ color: "var(--muted)" }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {activeWidget === "calendar" && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="label">Tech fun fact</p>
                    <p className="font-mono text-[0.65rem]" style={{ color: "var(--faint)" }}>
                      {(factIndex % techFacts.length) + 1} / {techFacts.length}
                    </p>
                  </div>
                  <p className="mt-1 font-hand text-lg" style={{ color: "var(--accent-2)" }}>
                    #{techFacts[factIndex % techFacts.length].tag}
                  </p>
                  <p className="mt-3 leading-relaxed">{techFacts[factIndex % techFacts.length].fact}</p>
                  <button
                    onClick={() => setFactIndex((i) => i + 1)}
                    className="choice-btn mt-5 w-full text-center"
                    style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                  >
                    Another one ↻
                  </button>
                </>
              )}

              {activeWidget === "newspaper" && (
                <>
                  <p className="text-center font-serif text-xl">The Daily Build</p>
                  <div className="my-2 rule" />
                  <p className="label" style={{ color: "var(--faint)" }}>
                    What tech is arguing about, right now
                  </p>
                  <p className="mt-3 font-serif text-xl leading-snug">{pulse.headline}</p>
                  <p className="mt-2 text-xs" style={{ color: "var(--faint)" }}>
                    {pulse.meta}
                  </p>
                  {pulse.url && (
                    <a href={pulse.url} target="_blank" rel="noopener noreferrer" className="link link--accent mt-4 inline-flex text-sm">
                      Read the thread ↗
                    </a>
                  )}
                  <p className="mt-4 text-[0.7rem]" style={{ color: "var(--faint)" }}>
                    This pulls the top Hacker News story live — so it&rsquo;s different every time you visit.
                  </p>
                </>
              )}

              {activeWidget === "mug" && (
                <>
                  <p className="label" style={{ color: "var(--accent)" }}>☕ Refill</p>
                  <p className="mt-3 font-serif text-2xl leading-snug">
                    {coffee === 1
                      ? "First one of the day. Thanks."
                      : coffee < 5
                        ? `That's ${coffee} refills. I appreciate you.`
                        : coffee < 12
                          ? `${coffee} cups. You and I would get along.`
                          : `${coffee}. Okay, we should probably both stop.`}
                  </p>
                  <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
                    Fun fact: the average product decision is made on the second coffee, and regretted on the fourth.
                  </p>
                </>
              )}

              <button onClick={() => setActiveWidget(null)} className="mt-6 text-xs link" style={{ color: "var(--faint)" }}>
                close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEO / no-JS content */}
      <div className="sr-only">
        <p>{hero.sub}</p>
        <nav>
          <Link href="/work">Work</Link>
          <Link href="/decisions">Decisions</Link>
          <Link href="/arcade">Arcade</Link>
          <Link href="/about">About</Link>
          <a href={person.linkedin}>LinkedIn</a>
          <a href="/kaustubh-jain-resume.pdf">Résumé</a>
        </nav>
      </div>
    </main>
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
}
