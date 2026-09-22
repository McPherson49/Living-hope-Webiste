/**
 * Facts only the hospital can confirm.
 *
 * ┌─ SAMPLE DATA ────────────────────────────────────────────────────────────┐
 * │ `sampleData` is TRUE: the phone numbers, email, street address, hours,   │
 * │ doctors, statistics and testimonials in src/content/ are demonstration   │
 * │ values so the design can be reviewed with realistic content. None of it  │
 * │ is real. While the flag is on, every page stays `noindex`, robots.txt    │
 * │ blocks crawlers, and the footer says so. Replace the sample values with  │
 * │ the hospital's real ones, then set `sampleData: false` to go live.       │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * Anything still in [square brackets] is an unconfirmed placeholder. It renders
 * highlighted on the site, links fall back to the Contact page, and structured
 * data (JSON-LD) skips it until you replace it with the real value.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const site = {
  name: "Living Hope Hospital",
  tagline: "Compassionate, Quality Healthcare in Parakin, Ile-Ife",
  description:
    "Compassionate, quality healthcare in Parakin, Ile-Ife. Emergency, maternity, pediatric & general care. Book your appointment today.",
  url: siteUrl,

  /** Set to false once every sample value in src/content/ has been replaced with real details. */
  sampleData: true,

  contact: {
    // Deliberately unroutable sample numbers (all-zero subscriber part) and a
    // reserved `.example` email domain, so nothing here can reach a real person.
    phone: "0803 000 0000",
    /** Set separately if the emergency line differs from the main number. */
    emergencyPhone: "0803 000 0001",
    whatsapp: "0803 000 0002",
    email: "info@livinghopehospital.example",
    street: "Plot 12, Hope Avenue",
    area: "Parakin, Ile-Ife, Osun State, Nigeria",
    hours: "Mon–Sat, 8:00am – 6:00pm",
    emergencyHours: "24 hours a day, 7 days a week",
  },

  map: {
    /** Area-level pin for Parakin. Replace with the exact pin from Google Maps → Share → Embed a map. */
    embedUrl:
      "https://www.google.com/maps?q=Parakin,+Ile-Ife,+Osun+State,+Nigeria&output=embed",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Parakin%2C+Ile-Ife%2C+Osun+State%2C+Nigeria",
    /** e.g. { lat: 7.5, lng: 4.5 } — used in structured data once set. */
    geo: undefined as { lat: number; lng: number } | undefined,
  },

  /** Structured-data opening hours, e.g. ["Mo-Su 00:00-23:59"]. Optional. */
  openingHours: undefined as string[] | undefined,

  /** Full profile URLs. Leave undefined until the pages exist. */
  social: {
    facebook: undefined as string | undefined,
    instagram: undefined as string | undefined,
  },

  whatsappGreeting:
    "Hello Living Hope Hospital, I would like to make an enquiry.",
};

export type Site = typeof site;
