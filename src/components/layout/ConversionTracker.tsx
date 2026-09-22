"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Sends GA4 events for the site's conversion actions without touching every link:
 * one delegated listener catches tel:, WhatsApp and mailto: clicks anywhere.
 * (Form submissions are tracked inside the forms themselves.)
 */
export function ConversionTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href) return;

      const where = window.location.pathname;
      if (href.startsWith("tel:")) {
        trackEvent("click_to_call", { page: where });
      } else if (href.includes("wa.me/")) {
        trackEvent("whatsapp_click", { page: where });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { page: where });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
