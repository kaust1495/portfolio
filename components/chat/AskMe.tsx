"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { answers, fallback, greeting, type Answer } from "@/content/answers";
import { person } from "@/content/profile";

type Msg =
  | { role: "bot"; text: string; link?: { label: string; href: string } }
  | { role: "you"; text: string };

function findAnswer(q: string): Answer | null {
  const s = q.toLowerCase().trim();
  if (!s) return null;
  let best: Answer | null = null;
  let bestScore = 0;
  for (const a of answers) {
    let score = 0;
    for (const m of a.match) {
      if (s.includes(m)) score += m.length > 4 ? 3 : 2;
    }
    // a direct hit on the canned question is worth a lot
    if (s.includes(a.question.toLowerCase().replace(/[?']/g, ""))) score += 6;
    if (score > bestScore) {
      bestScore = score;
      best = a;
    }
  }
  return bestScore >= 2 ? best : null;
}

const suggestions = answers.filter((a) => a.suggest);

export function AskMe() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: greeting }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [asked, setAsked] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs, thinking]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ask = useCallback((raw: string) => {
    const q = raw.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: "you", text: q }]);
    setInput("");
    setThinking(true);
    setAsked((n) => n + 1);
    window.setTimeout(() => {
      const hit = findAnswer(q);
      setThinking(false);
      setMsgs((m) => [
        ...m,
        hit
          ? { role: "bot", text: hit.answer, link: hit.link }
          : { role: "bot", text: fallback.answer, link: fallback.link },
      ]);
    }, 420);
  }, []);

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        data-doodle={open ? "go on, ask it something" : "ask me anything ↓"}
        aria-label={open ? "Close the ask-me panel" : "Open the ask-me panel"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium"
        style={{
          background: open ? "var(--ink)" : "var(--coral-ink)",
          color: "#fff",
          boxShadow: "var(--puff)",
          transitionProperty: "background, box-shadow, transform",
          transitionDuration: "0.25s",
          transitionTimingFunction: "var(--ease)",
        }}
      >
        {open ? "close ✕" : "ask me anything"}
      </button>

      {open && (
        <div
          className="fixed bottom-[4.6rem] right-5 z-[70] flex w-[min(92vw,360px)] flex-col overflow-hidden border"
          style={{
            borderColor: "var(--line)",
            borderRadius: "var(--r-lg)",
            background: "var(--surface)",
            boxShadow: "var(--shadow-lg)",
            maxHeight: "min(70vh, 520px)",
          }}
          role="dialog"
          aria-label="Ask me anything about Kaustubh"
        >
          <div className="flex items-center justify-between border-b px-3 py-2" style={{ borderColor: "var(--line)" }}>
            <span className="label">Ask about {person.name.split(" ")[0]}</span>
            <span className="label" style={{ color: "var(--faint)" }}>
              not an LLM · a lookup
            </span>
          </div>

          <div ref={listRef} className="scroll-area flex-1 space-y-3 overflow-y-auto p-3">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "you" ? "flex justify-end" : ""}>
                <div
                  className="max-w-[86%] px-3 py-2 text-[0.85rem] leading-snug"
                  style={{
                    background: m.role === "you" ? "var(--coral-soft)" : "var(--bg-2)",
                    color: "var(--ink-2)",
                    borderRadius: m.role === "you" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  }}
                >
                  {m.text}
                  {m.role === "bot" && m.link && (
                    <div className="mt-2">
                      {m.link.href.startsWith("/") ? (
                        <Link href={m.link.href} className="link link--accent text-xs" onClick={() => setOpen(false)}>
                          {m.link.label} →
                        </Link>
                      ) : (
                        <a
                          href={m.link.href}
                          target={m.link.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="link link--accent text-xs"
                        >
                          {m.link.label} ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {thinking && (
              <div
                className="w-fit px-3 py-2 text-[0.85rem]"
                style={{ background: "var(--bg-2)", color: "var(--faint)", borderRadius: "14px 14px 14px 4px" }}
              >
                <span className="dots">···</span>
              </div>
            )}

            {/* suggestion chips */}
            {msgs.length < 4 && !thinking && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => ask(s.question)}
                    className="rounded-full border px-2.5 py-1 text-[0.72rem] transition-colors hover:border-[var(--coral-ink)] hover:bg-[var(--coral-soft)] hover:text-[var(--ink)]"
                    style={{ borderColor: "var(--line-2)", color: "var(--muted)" }}
                  >
                    {s.question}
                  </button>
                ))}
              </div>
            )}

            {/* suggestion box after a few questions */}
            {asked >= 3 && !thinking && (
              <div className="border-t pt-3" style={{ borderColor: "var(--line)" }}>
                <p className="text-[0.78rem]" style={{ color: "var(--muted)" }}>
                  Didn&rsquo;t find what you came for?
                </p>
                <a
                  href={`mailto:${person.email}?subject=${encodeURIComponent("Something to add to your site")}&body=${encodeURIComponent("I was looking for…")}`}
                  className="link link--accent mt-1 inline-flex text-xs"
                >
                  Tell me what to add ↗
                </a>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t p-2"
            style={{ borderColor: "var(--line)" }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              aria-label="Ask a question"
              className="flex-1 rounded-full bg-transparent px-3 py-2 text-[0.85rem] outline-none focus-visible:bg-[var(--bg-2)]"
            />
            <button
              type="submit"
              aria-label="Send question"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm"
              style={{ background: "var(--coral-ink)", color: "#fff", boxShadow: "var(--shadow-sm)" }}
            >
              ↑
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes kj-dots { 0%,100%{opacity:.3} 50%{opacity:1} }
        .dots { animation: kj-dots 1s ease-in-out infinite; letter-spacing: 2px; }
      `}</style>
    </>
  );
}
