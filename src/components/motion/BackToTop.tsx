"use client";

import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

/** Appears once the reader has scrolled a fair way down. Sits above the WhatsApp button. */
export function BackToTop() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 700));

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          key="back-to-top"
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 14, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.85 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          className="fixed bottom-[5.25rem] right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand-900 text-white shadow-lg shadow-black/20 ring-2 ring-white transition-colors hover:bg-brand-700 print:hidden sm:bottom-24 sm:right-6"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
