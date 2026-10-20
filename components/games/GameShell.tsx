"use client";

import { useRef, type ReactNode } from "react";

export type GameStatus = "idle" | "playing" | "over";

export function GameShell({
  title,
  intro,
  coach,
  status,
  score,
  best,
  extra,
  endTitle,
  endMessage,
  onStart,
  children,
}: {
  title: string;
  intro: string;
  coach?: string[];
  status: GameStatus;
  score: number;
  best: number;
  extra?: ReactNode;
  endTitle?: string;
  endMessage?: string;
  onStart: () => void;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const startAndScroll = () => {
    onStart();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const rect = rootRef.current?.getBoundingClientRect();
        if (rect) window.scrollTo({ top: window.scrollY + rect.top - 64, behavior: "auto" });
      });
    });
  };

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-[560px]">
      {/* Score and the end-of-run summary are announced; the per-second
          timer is not - that would talk over everything. */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {status === "over"
          ? `${endTitle ?? "Run over"}. Final score ${score}. Best ${best}.`
          : status === "playing"
            ? `Score ${score}`
            : ""}
      </p>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <h2 className="font-display text-2xl">{title}</h2>
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-center gap-4 font-mono text-xs" style={{ color: "var(--muted)" }}>
            <span>
              score <span style={{ color: "var(--ink)" }}>{score}</span>
            </span>
            <span>best {best}</span>
          </div>
          {status === "idle" && (
            <button onClick={startAndScroll} className="btn btn--primary btn--sm">
              Start
            </button>
          )}
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl border"
        style={{ borderColor: "var(--rule-soft)", background: "var(--sheet)", aspectRatio: "3 / 4", maxHeight: "72vh" }}
      >
        {children}

        {status !== "playing" && (
          <div
            className={`absolute inset-0 z-20 flex flex-col items-center gap-4 overflow-y-auto p-5 text-center sm:p-6 ${status === "over" ? "justify-center" : "justify-start"}`}
            style={{ background: "var(--sheet)" }}
          >
            {status === "over" ? (
              <>
                <p className="label">{endTitle ?? "Run over"}</p>
                <p className="display" style={{ fontSize: "clamp(2.5rem,10vw,3.5rem)" }}>
                  {score}
                </p>
                {score >= best && score > 0 && (
                  <p className="font-hand text-xl" style={{ color: "var(--coral-ink)" }}>
                    new best!
                  </p>
                )}
                {endMessage && (
                  <p className="max-w-[38ch] text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {endMessage}
                  </p>
                )}
                <button onClick={startAndScroll} className="btn btn--primary mt-1">
                  Play again
                </button>
              </>
            ) : (
              <>
                <p className="max-w-[38ch] text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {intro}
                </p>
                {coach && coach.length > 0 && (
                  <div className="grid w-full max-w-[440px] gap-2 text-left sm:grid-cols-3">
                    {coach.map((line, i) => (
                      <div key={line} className="rounded-lg border px-3 py-2" style={{ borderColor: "var(--rule-soft)", background: "var(--paper-2)" }}>
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--coral-ink)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-1 text-xs leading-snug" style={{ color: "var(--ink)" }}>
                          {line}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {extra}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function useBest(key: string) {
  return {
    read() {
      try {
        return parseInt(localStorage.getItem(key) || "0", 10) || 0;
      } catch {
        return 0;
      }
    },
    write(v: number) {
      try {
        localStorage.setItem(key, String(v));
      } catch {}
    },
  };
}
