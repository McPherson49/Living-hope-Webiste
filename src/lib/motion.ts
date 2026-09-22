import type { Transition } from "framer-motion";

/** Shared easing so every animation on the site feels like the same hand made it. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const SPRING: Transition = { type: "spring", stiffness: 320, damping: 28 };
export const SPRING_SOFT: Transition = { type: "spring", stiffness: 180, damping: 22 };

/**
 * Scroll-triggered animations fire once, slightly before the element is fully
 * on screen, so content is already settling by the time the reader gets to it.
 */
export const VIEWPORT = {
  once: true,
  amount: "some" as const,
  margin: "0px 0px -8% 0px",
};
