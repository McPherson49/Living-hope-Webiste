"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { site } from "@/content/site";
import { Copy } from "@/components/ui/Copy";
import { telHref, whatsappHref } from "@/lib/contact";
import { EASE, SPRING } from "@/lib/motion";

/** A ring that draws itself, then a tick — the moment a patient knows their request went through. */
function AnimatedTick() {
  const reduce = useReducedMotion();
  const draw = (delay: number, duration: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { delay, duration, ease: EASE },
        };

  return (
    <svg viewBox="0 0 52 52" className="mx-auto h-16 w-16 text-brand-600" aria-hidden="true" fill="none">
      <m.circle cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="3" {...draw(0.1, 0.7)} />
      <m.path
        d="M15 27l8 8 15-17"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(0.6, 0.45)}
      />
    </svg>
  );
}

export function SuccessMessage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <m.div
      role="status"
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={SPRING}
      className="rounded-3xl border border-brand-200 bg-brand-50 p-8 text-center"
    >
      <AnimatedTick />
      <h2 className="mt-4 text-2xl font-bold text-brand-900">{title}</h2>
      <div className="mt-3 space-y-3 text-muted">{children}</div>
    </m.div>
  );
}

export function ErrorMessage({ children }: { children: ReactNode }) {
  const whatsapp = whatsappHref(site.contact.whatsapp);
  return (
    <m.div
      role="alert"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
    >
      <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{children}</p>
        <p className="mt-1">
          You can also call{" "}
          <a href={telHref(site.contact.phone)} className="font-semibold underline">
            <Copy>{site.contact.phone}</Copy>
          </a>{" "}
          or{" "}
          <a
            href={whatsapp}
            target={whatsapp.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            message us on WhatsApp
          </a>
          .
        </p>
      </div>
    </m.div>
  );
}
