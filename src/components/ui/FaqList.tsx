"use client";

import { m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { Faq } from "@/content/services";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Copy } from "./Copy";

/**
 * Accessible accordion (heading → button pattern). Answers stay in the DOM when
 * collapsed so the text is still there for search engines; `inert` keeps the
 * collapsed panels out of the tab order and away from screen readers.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      {faqs.map((faq, index) => {
        const isOpen = open.has(index);
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={faq.question} className={cn("transition-colors", isOpen && "bg-brand-50/50")}>
            <h3 className="font-sans text-base font-semibold leading-snug sm:text-lg">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-start justify-between gap-4 p-5 text-left text-ink transition-colors hover:bg-brand-50/70"
              >
                <span>
                  <Copy>{faq.question}</Copy>
                </span>
                <m.span
                  aria-hidden="true"
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className={cn(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors",
                    isOpen ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600",
                  )}
                >
                  <ChevronDown className="h-4 w-4" />
                </m.span>
              </button>
            </h3>
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-5 leading-relaxed text-muted">
                <Copy>{faq.answer}</Copy>
              </p>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
