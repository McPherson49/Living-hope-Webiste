import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Doctor } from "@/content/doctors";
import type { Faq } from "@/content/services";
import type { Post } from "@/lib/blog";
import { PLACEHOLDER_RE, realValue } from "@/lib/contact";

const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

type MetaInput = { title: string; description: string; path: string };

/** Per-page metadata: unique title/description, canonical URL, Open Graph and Twitter cards. */
export function buildMetadata({ title, description, path }: MetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_NG",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ---------------------------------------------------------------------------
 * JSON-LD builders. Anything still holding a [placeholder] is left out so we
 * never publish "[phone number]" to search engines.
 * ------------------------------------------------------------------------ */

const hasPlaceholder = (text: string) => PLACEHOLDER_RE.test(text);

export function hospitalJsonLd() {
  const c = site.contact;
  const sameAs = [site.social.facebook, site.social.instagram].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": abs("/#hospital"),
    name: site.name,
    url: site.url,
    description: site.description,
    logo: abs("/icon.svg"),
    image: abs("/opengraph-image"),
    telephone: realValue(c.phone),
    email: realValue(c.email),
    address: {
      "@type": "PostalAddress",
      streetAddress: realValue(c.street),
      addressLocality: "Ile-Ife",
      addressRegion: "Osun State",
      addressCountry: "NG",
    },
    geo: site.map.geo && {
      "@type": "GeoCoordinates",
      latitude: site.map.geo.lat,
      longitude: site.map.geo.lng,
    },
    openingHours: site.openingHours,
    areaServed: ["Ile-Ife", "Parakin", "Moro", "Asherifa", "Sabo"],
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** FAQPage data — only questions with a fully confirmed answer. Returns null if none qualify. */
export function faqJsonLd(faqs: Faq[]) {
  const usable = faqs.filter(
    (f) => !hasPlaceholder(f.question) && !hasPlaceholder(f.answer),
  );
  if (usable.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: usable.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function physicianJsonLd(doctor: Doctor) {
  if (hasPlaceholder(doctor.name)) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: hasPlaceholder(doctor.specialty)
      ? undefined
      : doctor.specialty,
    description: hasPlaceholder(doctor.bio) ? undefined : doctor.bio,
    image: doctor.photo ? abs(doctor.photo) : undefined,
    url: abs(`/doctors#${doctor.slug}`),
    worksFor: { "@id": abs("/#hospital") },
  };
}

export function blogPostingJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: abs("/icon.svg") },
    },
    mainEntityOfPage: abs(`/blog/${post.slug}`),
  };
}
