"use client";

import { m } from "framer-motion";
import { site } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappHref } from "@/lib/contact";

/** Floating chat button, bottom-right on every page. Opens WhatsApp with a pre-filled greeting. */
export function WhatsAppButton() {
  const href = whatsappHref(site.contact.whatsapp);
  return (
    <m.a
      data-reveal
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3.5 text-white shadow-lg shadow-black/25 ring-2 ring-white transition-colors hover:bg-whatsapp-dark print:hidden sm:bottom-6 sm:right-6"
    >
      {/* A soft ripple draws the eye without stealing focus */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-whatsapp motion-safe:animate-pulse-soft"
      />
      <WhatsAppIcon className="relative h-6 w-6" />
      <span className="relative hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
    </m.a>
  );
}
