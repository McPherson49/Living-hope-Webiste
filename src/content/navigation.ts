import { services } from "./services";

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const patientInfoLinks: NavChild[] = [
  { label: "Book an Appointment", href: "/book-appointment" },
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
  { label: "Doctors", href: "/doctors" },
  { label: "Services", href: "/services", children: serviceLinks },
  {
    label: "Patient Info",
    href: "/book-appointment",
    children: patientInfoLinks,
  },
  { label: "Health Blog", href: "/blog" },
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
