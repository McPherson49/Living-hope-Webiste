"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The animation engine is fetched after first paint (so it never delays the
 * page), and `strict` makes any accidental full `motion.*` import throw in
 * development instead of quietly bloating the bundle — use `m.*` everywhere.
 *
 * `reducedMotion="user"` honours the visitor's OS "reduce motion" setting.
 */
const loadFeatures = () => import("./features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
