"use client";

import { type ReactNode } from "react";

export type GameStatus = "idle" | "playing" | "over";

export function GameShell({
  title,
  intro,
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
  status: GameStatus;
  score: number;
  best: number;
  extra?: ReactNode;
  endTitle?: string;
  endMessage?: string;
  onStart: () => void;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="font-serif text-2xl">{title}</h2>
        <div className="flex items-center gap-4 font-mono text-xs" style={{ color: "var(--muted)" }}>
          <span>
            score <span style={{ color: "var(--ink)" }}>{score}</span>
          </span>
          <span>best {best}</span>
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl border"
        style={{ borderColor: "var(--line)", background: "var(--surface)", aspectRatio: "3 / 4", maxHeight: "72vh" }}
      >
        {children}

        {status !== "playing" && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 p-6 text-center"
              style={{ background: "var(--surface)" }}
            >
              {status === "over" ? (
                <>
                  <p className="label">{endTitle ?? "Run over"}</p>
                  <p className="display" style={{ fontSize: "clamp(2.5rem,10vw,3.5rem)" }}>
                    {score}
                  </p>
                  {score >= best && score > 0 && (
                    <p className="font-hand text-xl" style={{ color: "var(--accent)" }}>
                      new best!
                    </p>
                  )}
                  {endMessage && (
                    <p className="max-w-[38ch] text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {endMessage}
                    </p>
                  )}
                  <button onClick={onStart} className="btn btn--primary mt-1">
                    Play again
                  </button>
                </>
              ) : (
                <>
                  <p className="max-w-[36ch] text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {intro}
                  </p>
                  {extra}
                  <button onClick={onStart} className="btn btn--primary mt-1">
                    Start
                  </button>
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
