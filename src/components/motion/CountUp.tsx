"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { EASE } from "@/lib/motion";

type Parsed = { prefix: string; value: number; suffix: string; grouped: boolean };

/** "50,000+" → { prefix: "", value: 50000, suffix: "+", grouped: true }. Returns null for anything non-numeric. */
function parse(text: string): Parsed | null {
  const match = text.match(/^(\D*?)(\d[\d,]*)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    value: Number(match[2].replace(/,/g, "")),
    suffix: match[3],
    grouped: match[2].includes(","),
  };
}

function format({ prefix, suffix, grouped }: Parsed, n: number) {
  return `${prefix}${grouped ? n.toLocaleString("en-US") : n}${suffix}`;
}

/**
 * Counts up to a figure like "12+" or "50,000+" when scrolled into view.
 *
 * The server-rendered HTML always contains the real figure (good for SEO and
 * no-JS visitors). On the client it is reset to zero while still off-screen,
 * then counted up. It writes straight to the DOM node, so there is no React
 * re-render per frame. Falls back to plain text for anything non-numeric.
 */
export function CountUp({ value, duration = 1.8 }: { value: string; duration?: number }) {
  const parsed = useMemo(() => parse(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  // Prime the counter at zero while it is still below the fold.
  useEffect(() => {
    const el = ref.current;
    if (el && parsed && !reduce) el.textContent = format(parsed, 0);
  }, [parsed, reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed || reduce || !inView) return;
    const controls = animate(0, parsed.value, {
      duration,
      ease: EASE,
      onUpdate: (latest) => {
        el.textContent = format(parsed, Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [parsed, reduce, inView, duration]);

  return <span ref={ref}>{value}</span>;
}
