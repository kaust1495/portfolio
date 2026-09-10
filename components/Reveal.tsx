"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type State = "initial" | "hidden" | "shown";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // SSR + first client paint: "initial" renders fully visible, so content is
  // never dependent on JS. Enhancement (fade/rise) only kicks in after mount.
  const [state, setState] = useState<State>("initial");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setState("shown");
      return;
    }

    // Arm the animation.
    setState("hidden");

    const reveal = () => setState("shown");
    const fallback = window.setTimeout(reveal, 1800);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            io.disconnect();
            window.clearTimeout(fallback);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const hidden = state === "hidden";
  const animate = state !== "initial";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(14px)" : "none",
        transitionProperty: animate ? "opacity, transform" : "none",
        transitionDuration: animate ? "700ms" : "0ms",
        transitionTimingFunction: "cubic-bezier(0.2, 0.6, 0.2, 1)",
        transitionDelay: state === "shown" ? `${delay}ms` : "0ms",
        willChange: hidden ? "opacity, transform" : "auto",
      }}
    >
      {children}
    </div>
  );
}
