"use client";

import { m, useReducedMotion } from "framer-motion";

const blob = (rgb: string, alpha: number) =>
  `radial-gradient(closest-side, rgb(${rgb} / ${alpha}), transparent)`;

/**
 * Backdrop for light hero sections: the static `.hero-wash` gradient plus one
 * very slow-drifting blob for a touch of life. Deliberately restrained —
 * earlier drafts stacked several animated blobs, a texture and a heartbeat
 * trace here, which read as busy rather than premium. One quiet motion only.
 */
export function HeroBackdrop({ variant = "hero" }: { variant?: "hero" | "page" }) {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="hero-wash pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <m.div
        className={`absolute -right-40 rounded-full ${variant === "hero" ? "-top-48 h-[34rem] w-[34rem]" : "-top-56 h-[28rem] w-[28rem]"}`}
        style={{ background: blob("94 224 243", 0.22) }}
        animate={reduce ? undefined : { x: [0, -24, 0], y: [0, 18, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
