import type { ReactNode } from "react";

/**
 * Mount-time fade/rise. Pure CSS (`.rise`), so content is never gated on JS
 * or intersection — it just animates once. Items lower on the page have
 * already finished animating by the time you scroll to them, which is fine.
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
  return (
    <Tag className={`rise ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </Tag>
  );
}
