"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal that is safe by construction: renders visible first, animates
 * as pure enhancement, and a timeout guarantees it never stays hidden.
 */
export function FadeIn({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"initial" | "hidden" | "shown">("initial");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setState("shown");
      return;
    }
    setState("hidden");
    const show = () => setState("shown");
    const fallback = window.setTimeout(show, 1600);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show();
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
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(16px)" : "none",
        transitionProperty: animate ? "opacity, transform" : "none",
        transitionDuration: animate ? "620ms" : "0ms",
        transitionTimingFunction: "cubic-bezier(0.22,0.61,0.28,1)",
        transitionDelay: state === "shown" ? `${delay}s` : "0s",
      }}
    >
      {children}
    </Tag>
  );
}
