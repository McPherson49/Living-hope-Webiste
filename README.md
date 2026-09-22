# Living Hope Hospital website

Marketing + patient-information website for **Living Hope Hospital, Parakin, Ile-Ife**, built with
Next.js 16 (App Router), TypeScript and Tailwind CSS v4 from the Website PRD and the Website Content &
SEO Copy documents.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run typecheck            # TypeScript
npm run lint                 # ESLint
npm run placeholders         # lists every unfilled [placeholder] (needs the site running)
```

> `AGENTS.md` / `CLAUDE.md` are left in place: this Next.js version has breaking changes, and the
> docs bundled in `node_modules/next/dist/docs/` are the reference to follow.

## What's still a placeholder

The content document deliberately leaves facts only the hospital can confirm in `[square brackets]`.
They render **highlighted in amber** on the site, links that depend on them fall back to `/contact`,
and they're skipped in structured data until replaced. Run `npm run placeholders` for the full list.

| Fill in… | …in this file |
| --- | --- |
| Phone, WhatsApp, email, street address, hours, map pin, social links | `src/content/site.ts` |
| Doctors (names, credentials, photos) | `src/content/doctors.ts` (+ photos in `public/images/doctors/`) |
| Stats bar figures, testimonials (with written consent) | `src/content/home.ts` |
| Accepted HMOs, visiting hours, delivery-bag checklist | `src/content/patient-info.ts` |
| Service copy, FAQs (ambulance, walk-ins, surgery scope, imaging equipment…) | `src/content/services.ts` |
| General FAQs | `src/content/faqs.ts` |
| Founding story, bed count, accreditation | `src/app/about/page.tsx` |
| Privacy-policy retention period, dates | `src/app/privacy-policy/page.tsx` |
| Job openings | `src/content/careers.ts` |

## Going live

1. Fill in the table above and run `npm run placeholders` until it reports nothing left.
2. Set the environment variables (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` — the live domain (canonical URLs, sitemap, social cards).
   - `RESEND_API_KEY`, `EMAIL_FROM`, `FRONT_DESK_EMAIL` — appointment and contact form email.
     Without them, forms log to the terminal in development and show a "please call us" message in
     production (a patient is never told a request was sent when it wasn't).
   - `NEXT_PUBLIC_GA_ID` — Google Analytics 4 (optional). Also records call, WhatsApp and email clicks
     and form submissions as events.
3. **Search engines are blocked until the site is ready.** Every page is `noindex` and `robots.txt`
   disallows crawling until the phone number and street address are real *and* `NEXT_PUBLIC_SITE_URL`
   isn't localhost (`isIndexable` in `src/lib/contact.ts`). This stops placeholder text being indexed.
4. Have a clinician review the medical wording (service pages and the five blog posts) and a lawyer
   review the privacy policy draft.
5. Submit `/sitemap.xml` in Google Search Console and finish the Google Business Profile — keep the
   name, address and phone identical everywhere (NAP).

## How it's organised

```
content/blog/*.md          Blog posts (Markdown + front matter) — add a file to publish a post
src/content/               All editable copy and data (see table above)
src/app/                   Routes: /, /about, /doctors, /services/[slug], /book-appointment,
                           /insurance-hmo, /visiting-hours, /faqs, /contact, /careers,
                           /blog, /blog/[slug], /blog/category/[category], /privacy-policy,
                           /api/enquiry, robots, sitemap, opengraph-image
src/components/            layout/ (header, footer, WhatsApp button), home/, forms/, blog/, ui/
src/lib/                   contact links, SEO + JSON-LD builders, blog loader, validation, email
```

**Adding a blog post:** create `content/blog/my-post.md` with front matter (`title`, `description`,
`date`, `category`, optional `metaTitle`, `keyword`, `service`, `author`). It appears on the blog,
homepage, sitemap and category pages automatically. Categories: `maternal-child-health`,
`common-illnesses`, `preventive-care-screening`, `nutrition-family-wellness`,
`hospital-news-community`.

## What the PRD asks for, and where it lives

- **Sticky header** with click-to-call, red *Emergency Line* button, floating **WhatsApp** button (pre-filled message), footer with NAP as real text — `src/components/layout/`
- **SEO:** unique title/description per page (from the content doc's master table), canonical URLs, Open Graph/Twitter cards, `robots.txt`, XML sitemap, JSON-LD (`Hospital`, `Physician`, `FAQPage`, `BreadcrumbList`, `BlogPosting`), clean slugs, internal links — `src/lib/seo.ts`
- **Appointment + contact forms** with server-side validation, honeypot spam trap, NDPA 2023 consent, email to the front desk and optional auto-reply — `src/app/api/enquiry/route.ts`
- **Performance/accessibility:** mostly static pages, self-hosted fonts, no client JS except nav, doctor filter, forms; skip link, keyboard-friendly dropdowns, native `<details>` FAQs, AA-contrast emergency colours, reduced-motion support.

**Deliberately left for Phase 2 (per the PRD):** English/Yoruba toggle, on-site search, newsletter
sign-up, SMS notifications, patient portal, telemedicine. Facility/doctor **photos** aren't included
(none were supplied): the layouts use icons and placeholder avatars until you add images (set `photo`
on a doctor in `src/content/doctors.ts`).
