"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, VIEWPORT } from "@/lib/motion";

/*
 * Scroll-reveal primitives. They are thin client wrappers: everything passed
 * as `children` is still rendered on the server, so the content is in the
 * initial HTML for search engines. A <noscript> rule in the root layout makes
 * `[data-reveal]` elements visible if JavaScript is unavailable.
 */

const tags = {
  div: m.div,
  section: m.section,
  article: m.article,
  ul: m.ul,
  ol: m.ol,
  li: m.li,
  p: m.p,
  header: m.header,
} as const;

type Tag = keyof typeof tags;

type CommonProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
};

/** Fade + rise (or slide) into place once, when scrolled into view. */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 24,
  x = 0,
}: CommonProps & { delay?: number; y?: number; x?: number }) {
  const Component = tags[as] as typeof m.div;
  return (
    <Component
      data-reveal
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Container that reveals its <StaggerItem> children one after another. */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0,
}: CommonProps & { stagger?: number; delay?: number }) {
  const Component = tags[as] as typeof m.div;
  return (
    <Component
      className={className}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as = "div" }: CommonProps) {
  const Component = tags[as] as typeof m.div;
  return (
    <Component data-reveal className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
