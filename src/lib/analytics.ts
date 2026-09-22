import { sendGAEvent } from "@next/third-parties/google";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Sends a GA4 event. No-ops when analytics isn't configured, and never throws. */
export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {},
) {
  if (!GA_ID) return;
  try {
    sendGAEvent("event", name, params);
  } catch {
    // Analytics must never break the page.
  }
}
