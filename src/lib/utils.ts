import type { CSSProperties } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Sets `--i` for the `.rise` entrance animation so siblings cascade in order. */
export function stagger(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}

/** "Dr. Adebayo Ogunleye" → "AO". Skips titles such as Dr., Pharm., Mr. and Mrs. */
export function initials(name: string) {
  const words = name
    .replace(/^(dr|pharm|mr|mrs|miss|ms|prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
