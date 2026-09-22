"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

/** Slides + fades in on page load (used for above-the-fold cards). */
export function FloatIn({
  children,
  className,
  delay = 0.25,
  x = 32,
  y = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
}) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

/** Gentle, endless hover — for decorative chips. Static when reduced motion is on. */
export function Bob({
  children,
  className,
  amount = 8,
  duration = 5,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  duration?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      animate={reduce ? undefined : { y: [0, -amount, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </m.div>
  );
}
