"use client";

import { m } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";

/**
 * A line that draws itself left-to-right (or top-to-bottom). By default it
 * triggers on scroll into view; pass `immediate` for above-the-fold uses
 * (e.g. underlining a hero headline) so it animates on mount instead —
 * `whileInView` is meant for content the reader scrolls down to.
 */
export function GrowLine({
  className,
  axis = "x",
  delay = 0.3,
  duration = 1.4,
  immediate = false,
}: {
  className?: string;
  axis?: "x" | "y";
  delay?: number;
  duration?: number;
  immediate?: boolean;
}) {
  const from = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const to = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };
  const trigger = immediate
    ? { animate: to }
    : { whileInView: to, viewport: VIEWPORT };

  return (
    <m.div
      data-reveal
      aria-hidden="true"
      className={`${axis === "x" ? "origin-left" : "origin-top"} ${className ?? ""}`}
      initial={from}
      transition={{ duration, ease: EASE, delay }}
      {...trigger}
    />
  );
}
