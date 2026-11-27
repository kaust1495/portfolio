"use client";

import { useEffect, useState } from "react";

/**
 * Hide floating chrome while the visitor is scrolling down through content
 * on small screens; bring it back on any scroll up or near the top.
 * Desktop (md+) is unaffected. `active` lets a component stay visible while
 * it is doing something (open panel, playing audio).
 */
export function useHideOnScrollDown(active = true) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!active) {
      setHidden(false);
      return;
    }
    const mq = window.matchMedia("(max-width: 767px)");
    let lastY = window.scrollY;
    const onScroll = () => {
      if (!mq.matches) {
        setHidden(false);
        return;
      }
      const y = window.scrollY;
      if (y < 120) setHidden(false);
      else if (y > lastY + 4) setHidden(true);
      else if (y < lastY - 4) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  return hidden;
}

/** Inline-style patch that slides a floating control away and back. */
export function hideStyle(hidden: boolean): React.CSSProperties {
  return {
    transform: hidden ? "translateY(220%)" : "translateY(0)",
    opacity: hidden ? 0 : 1,
    pointerEvents: hidden ? "none" : "auto",
  };
}
