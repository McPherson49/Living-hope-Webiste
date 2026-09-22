"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The sticky main bar. Once the page scrolls it gains a frosted background and
 * shadow, and its content can shrink via the `group-data-[scrolled=true]` variant.
 */
export function StickyHeader({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "group sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-line bg-white/90 shadow-[0_10px_30px_-14px_rgba(13,32,56,0.25)] backdrop-blur-xl"
          : "border-transparent bg-white/95 backdrop-blur",
      )}
    >
      {children}
    </header>
  );
}
