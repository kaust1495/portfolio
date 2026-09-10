"use client";

import { useEffect, useState } from "react";

type Pulse = {
  headline: string;
  url: string | null;
  meta: string;
  loading: boolean;
};

const FALLBACK: Pulse = {
  headline: "Whether AI agents should be allowed to merge their own pull requests.",
  url: "https://news.ycombinator.com",
  meta: "the eternal debate",
  loading: false,
};

const CACHE = "kj-techpulse-v1";
const TTL = 1000 * 60 * 30;

export function useTechPulse(): Pulse {
  const [pulse, setPulse] = useState<Pulse>({ ...FALLBACK, loading: true });

  useEffect(() => {
    let cancelled = false;

    try {
      const raw = sessionStorage.getItem(CACHE);
      if (raw) {
        const c = JSON.parse(raw);
        if (c && Date.now() - c.t < TTL) {
          setPulse({ ...c.p, loading: false });
          return;
        }
      }
    } catch {}

    (async () => {
      try {
        const ids: number[] = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json").then((r) => r.json());
        for (const id of ids.slice(0, 6)) {
          const it = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((r) => r.json());
          if (it && it.title && it.type === "story") {
            const p: Pulse = {
              headline: it.title,
              url: it.url || `https://news.ycombinator.com/item?id=${id}`,
              meta: `${it.score ?? 0} points · ${it.descendants ?? 0} comments · via Hacker News`,
              loading: false,
            };
            if (!cancelled) {
              setPulse(p);
              try {
                sessionStorage.setItem(CACHE, JSON.stringify({ t: Date.now(), p }));
              } catch {}
            }
            return;
          }
        }
        if (!cancelled) setPulse(FALLBACK);
      } catch {
        if (!cancelled) setPulse(FALLBACK);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return pulse;
}
