import { services } from "./services";

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

/** Used by the header's "Patient Info" dropdown and the footer's "Patient information" column. */
export const patientInfoLinks: NavChild[] = [
  // Hidden site-wide for now — the /book-appointment page file still exists but nothing links to it.
  // { label: "Book an Appointment", href: "/book-appointment" },
  { label: "Insurance & HMO", href: "/insurance-hmo" },
  { label: "Visiting Hours & Admission Guide", href: "/visiting-hours" },
  { label: "FAQs", href: "/faqs" },
];

export const aboutLinks: NavChild[] = [
  { label: "Our Story", href: "/about#story" },
  { label: "Mission, Vision & Values", href: "/about#mission" },
  { label: "Facility & Accreditation", href: "/about#facility" },
];

export const serviceLinks: NavChild[] = services.map((s) => ({
  label: s.name,
  href: `/services/${s.slug}`,
}));

/** Header navigation. The logo is the "Home" link on desktop. */
export const primaryNav: NavItem[] = [
  { label: "About", href: "/about", children: aboutLinks },
  // Hidden from the header for now — the /doctors page still exists and is linked from the footer and homepage.
  // { label: "Doctors", href: "/doctors" },
  { label: "Services", href: "/services", children: serviceLinks },
  {
    label: "Patient Info",
    // Was "/book-appointment"; points at the first remaining link while booking is hidden.
    href: "/insurance-hmo",
    children: patientInfoLinks,
  },
  // Hidden from the header for now — the /blog pages still exist and are linked from the footer and homepage.
  // { label: "Health Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const companyLinks: NavChild[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "Health Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];
