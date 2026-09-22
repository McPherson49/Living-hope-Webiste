import { site } from "@/content/site";

/** Matches "[phone number]", "[X]+", "[Confirm hours.]" … anything the hospital still has to fill in. */
export const PLACEHOLDER_RE = /\[[^\]]+\]/;

export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || PLACEHOLDER_RE.test(value);
}

/** Returns the value only if it is real (not a placeholder). */
export function realValue(value: string | undefined | null) {
  return isPlaceholder(value) ? undefined : (value as string);
}

/** Where a phone/WhatsApp/email link goes while the real value is still a placeholder. */
const FALLBACK_HREF = "/contact";

export function telHref(phone: string) {
  if (isPlaceholder(phone)) return FALLBACK_HREF;
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mailtoHref(email: string, subject?: string) {
  if (isPlaceholder(email)) return FALLBACK_HREF;
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${query}`;
}

/** Builds a wa.me link. Accepts local (0803…) or international (+234803…) numbers. */
export function whatsappHref(
  number: string,
  message: string = site.whatsappGreeting,
) {
  if (isPlaceholder(number)) return FALLBACK_HREF;
  let digits = number.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `234${digits.slice(1)}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function fullAddress() {
  return `${site.contact.street}, ${site.contact.area}`;
}

/**
 * Search engines are only invited once the site is really live: sample data
 * switched off, NAP details filled in and a non-local site URL configured.
 * Until then every page is `noindex` and robots.txt blocks crawling, so
 * placeholder or demonstration copy (fake phone numbers, sample doctors) can
 * never be indexed by accident.
 */
export const isIndexable =
  !site.sampleData &&
  !isPlaceholder(site.contact.phone) &&
  !isPlaceholder(site.contact.street) &&
  !/localhost|127\.0\.0\.1/.test(site.url);
