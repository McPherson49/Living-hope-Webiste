import type { ServiceSlug } from "./services";

export type Doctor = {
  /** URL-safe id, used for anchors and booking links. */
  slug: string;
  name: string;
  specialty: string;
  /** Which service page this doctor belongs to (drives grouping, filter and "related doctors"). */
  department: ServiceSlug;
  qualifications: string;
  experience: string;
  bio: string;
  /** Languages a patient can be seen in — a real comfort factor in Ile-Ife. */
  languages: string[];
  /** Consulting days, shown on the profile card. */
  days: string;
  /** A few areas of clinical interest, shown as chips. */
  focus: string[];
  /** Optional photo in /public, e.g. "/images/doctors/dr-adeyemi.jpg". Without one, a monogram avatar is used. */
  photo?: string;
  /** Show in the homepage "Meet our team" strip. */
  featured?: boolean;
};

/**
 * SAMPLE PROFILES — every doctor below is fictional, written so the design can
 * be reviewed with realistic Nigerian names, credentials and bios (mixed
 * Yorùbá, Igbo and Hausa names, as in a real Ile-Ife hospital). Any resemblance
 * to a real person is coincidental.
 *
 * Before launch: replace each block with a real doctor (name, credentials,
 * photo), confirm MDCN registration and get their consent. Bios are written
 * without gendered pronouns so they are easy to adapt.
 */
export const doctors: Doctor[] = [
  {
    slug: "dr-adebayo-ogunleye",
    name: "Dr. Adebayo Ogunleye",
    specialty: "Consultant Obstetrician & Gynaecologist",
    department: "maternity-gynaecology",
    qualifications: "MBBS, FWACS, FMCOG",
    experience: "18 years of experience",
    bio: "Dr. Ogunleye leads our maternity unit and is passionate about safe, supported childbirth for Ile-Ife families — from the very first antenatal visit to postnatal follow-up.",
    languages: ["English", "Yorùbá"],
    days: "Mon · Wed · Fri",
    focus: ["High-risk pregnancy", "Safe delivery", "Family planning"],
    featured: true,
  },
  {
    slug: "dr-folasade-adeyemi",
    name: "Dr. Folasade Adeyemi",
    specialty: "Consultant Pediatrician",
    department: "pediatrics",
    qualifications: "MBBS, FWACP (Paed)",
    experience: "14 years of experience",
    bio: "Dr. Adeyemi cares for babies, children and teenagers with a gentle, unhurried approach, and loves helping parents feel confident about growth, immunization and everyday childhood illness.",
    languages: ["English", "Yorùbá"],
    days: "Mon – Thu",
    focus: ["Newborn care", "Immunization", "Childhood infections"],
    featured: true,
  },
  {
    slug: "dr-chinedu-okafor",
    name: "Dr. Chinedu Okafor",
    specialty: "Consultant General Surgeon",
    department: "surgery",
    qualifications: "MBBS, FWACS, FMCS",
    experience: "16 years of experience",
    bio: "Dr. Okafor performs a wide range of general and abdominal surgery and is known for clear explanations before every procedure and close follow-up for a smooth recovery.",
    languages: ["English", "Igbo", "Yorùbá"],
    days: "Tue · Thu · Sat",
    focus: ["General surgery", "Hernia & abdominal surgery", "Minor procedures"],
    featured: true,
  },
  {
    slug: "dr-aisha-bello",
    name: "Dr. Aisha Bello",
    specialty: "Family Physician",
    department: "general-family-medicine",
    qualifications: "MBBS, FMCFM",
    experience: "11 years of experience",
    bio: "Dr. Bello looks after the whole family under one roof, with a special interest in long-term care for hypertension and diabetes and in keeping healthy people healthy through regular screening.",
    languages: ["English", "Hausa", "Yorùbá"],
    days: "Mon – Fri",
    focus: ["Hypertension & diabetes", "Health screening", "Women's & family health"],
    featured: true,
  },
  {
    slug: "dr-oluwaseun-akinola",
    name: "Dr. Oluwaseun Akinola",
    specialty: "Emergency Physician",
    department: "emergency-trauma-care",
    qualifications: "MBBS, FWACP",
    experience: "9 years of experience",
    bio: "Dr. Akinola leads our emergency team, focused on fast assessment, calm communication with anxious families and getting each patient stabilized and to the right care without delay.",
    languages: ["English", "Yorùbá", "Pidgin"],
    days: "Rotating 24-hour cover",
    focus: ["Trauma & accidents", "Acute illness", "Resuscitation"],
  },
  {
    slug: "dr-ngozi-eze",
    name: "Dr. Ngozi Eze",
    specialty: "Obstetrician & Gynaecologist",
    department: "maternity-gynaecology",
    qualifications: "MBBS, FWACS",
    experience: "8 years of experience",
    bio: "Dr. Eze supports women through pregnancy, delivery and beyond, with a caring, easy-to-talk-to manner and a particular interest in antenatal care and fertility counselling.",
    languages: ["English", "Igbo"],
    days: "Tue · Thu",
    focus: ["Antenatal care", "Fertility counselling", "Gynaecological conditions"],
  },
  {
    slug: "dr-emeka-nwankwo",
    name: "Dr. Emeka Nwankwo",
    specialty: "Consultant Physician (Internal Medicine)",
    department: "general-family-medicine",
    qualifications: "MBBS, FWACP",
    experience: "15 years of experience",
    bio: "Dr. Nwankwo manages complex and long-term adult conditions, taking time to explain results and treatment plans so patients understand and stay involved in their own care.",
    languages: ["English", "Igbo", "Pidgin"],
    days: "Mon · Wed · Thu",
    focus: ["Diabetes", "Hypertension", "Infectious diseases"],
  },
  {
    slug: "dr-temitope-ajayi",
    name: "Dr. Temitope Ajayi",
    specialty: "Consultant Radiologist",
    department: "radiology-imaging",
    qualifications: "MBBS, FMCR",
    experience: "13 years of experience",
    bio: "Dr. Ajayi reads X-rays and ultrasound scans for the whole hospital, working closely with clinicians so results are accurate, prompt and clearly explained.",
    languages: ["English", "Yorùbá"],
    days: "Mon – Fri",
    focus: ["Ultrasound", "X-ray", "Obstetric scans"],
  },
  {
    slug: "dr-yetunde-balogun",
    name: "Dr. Yetunde Balogun",
    specialty: "Consultant Chemical Pathologist",
    department: "laboratory-diagnostics",
    qualifications: "MBBS, FMCPath",
    experience: "12 years of experience",
    bio: "Dr. Balogun oversees our laboratory, making sure every test is accurate, quality-checked and returned quickly enough for doctors to start treatment sooner.",
    languages: ["English", "Yorùbá"],
    days: "Mon – Fri",
    focus: ["Diagnostic testing", "Diabetes & kidney monitoring", "Quality assurance"],
  },
  {
    slug: "dr-ibrahim-danladi",
    name: "Dr. Ibrahim Danladi",
    specialty: "Dental Surgeon",
    department: "dental-care",
    qualifications: "BDS, FMCDS",
    experience: "10 years of experience",
    bio: "Dr. Danladi provides gentle, thorough dental care for the whole family, from routine check-ups and cleaning to extractions and relief from dental pain.",
    languages: ["English", "Hausa"],
    days: "Mon – Sat",
    focus: ["Check-ups & scaling", "Extractions", "Children's dentistry"],
  },
  {
    slug: "dr-bukola-adegoke",
    name: "Dr. Bukola Adegoke",
    specialty: "Lead Physiotherapist",
    department: "physiotherapy-rehabilitation",
    qualifications: "BMR (Physiotherapy), DPT",
    experience: "9 years of experience",
    bio: "Dr. Adegoke designs practical, encouraging rehabilitation plans that help patients regain strength, mobility and independence after surgery, injury or stroke.",
    languages: ["English", "Yorùbá"],
    days: "Mon – Sat",
    focus: ["Post-surgery rehabilitation", "Injury recovery", "Stroke rehabilitation"],
  },
];
