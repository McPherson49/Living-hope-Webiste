export type ServiceSlug =
  | "emergency-trauma-care"
  | "maternity-gynaecology"
  | "pediatrics"
  | "general-family-medicine"
  | "surgery"
  | "laboratory-diagnostics"
  | "radiology-imaging"
  | "pharmacy"
  | "dental-care"
  | "physiotherapy-rehabilitation";

export type ServiceIconKey =
  | "emergency"
  | "maternity"
  | "pediatrics"
  | "general"
  | "surgery"
  | "laboratory"
  | "radiology"
  | "pharmacy"
  | "dental"
  | "physio";

export type Faq = { question: string; answer: string };

export type Service = {
  slug: ServiceSlug;
  /** Short name for nav, cards and the booking form. */
  name: string;
  icon: ServiceIconKey;
  /** <title> — kept under ~60 characters. */
  metaTitle: string;
  /** <meta name="description"> — kept under ~155 characters. */
  metaDescription: string;
  h1: string;
  /** One-line blurb for cards. */
  summary: string;
  body: string[];
  highlights?: { heading: string; items: string[] };
  faqs?: Faq[];
};

export const services: Service[] = [
  {
    slug: "emergency-trauma-care",
    name: "Emergency & Trauma Care",
    icon: "emergency",
    metaTitle: "Emergency Hospital in Ile-Ife | Living Hope Hospital",
    metaDescription:
      "Fast, reliable emergency care in Parakin, Ile-Ife. Living Hope Hospital’s emergency team is ready to respond when every minute matters.",
    h1: "Emergency & Trauma Care in Ile-Ife",
    summary:
      "Rapid assessment and stabilization for accidents, sudden illness and urgent conditions.",
    body: [
      "In a medical emergency, speed and readiness save lives. Living Hope Hospital’s emergency unit in Parakin is equipped to respond quickly to accidents, sudden illness, severe pain, breathing difficulty, and other urgent conditions affecting residents of Ile-Ife, the OAU community, and surrounding towns.",
      "Our emergency team assesses and stabilizes patients promptly, with direct access to our laboratory, diagnostic imaging, and surgical unit when further treatment is required.",
    ],
    highlights: {
      heading: "We respond to",
      items: [
        "Accidents and injuries",
        "Sudden illness",
        "Severe pain",
        "Breathing difficulty",
        "Other urgent conditions",
      ],
    },
    faqs: [
      {
        question: "Is Living Hope Hospital’s emergency unit open 24 hours?",
        answer:
          "Yes. Our emergency unit is open 24 hours a day, 7 days a week, including public holidays.",
      },
      {
        question: "Do you provide ambulance service?",
        answer:
          "Yes. Call our emergency line and our team will guide you and help arrange ambulance support. Availability can vary, so please call ahead whenever you can.",
      },
      {
        question: "What should I bring for an emergency admission?",
        answer:
          "A valid ID, any existing medical records, and, where possible, a family member or contact person.",
      },
    ],
  },
  {
    slug: "maternity-gynaecology",
    name: "Maternity & Gynaecology",
    icon: "maternity",
    metaTitle: "Maternity Hospital in Ile-Ife | Living Hope Hospital",
    metaDescription:
      "Safe pregnancy, delivery, and women’s health care in Parakin, Ile-Ife. Book antenatal and gynaecology appointments at Living Hope Hospital.",
    h1: "Maternity & Gynaecology Care in Ile-Ife",
    summary:
      "Antenatal care, safe delivery, postnatal follow-up and women’s health, with privacy and warmth.",
    body: [
      "From your first antenatal visit to delivery and beyond, Living Hope Hospital’s maternity team supports women through every stage of pregnancy and women’s health. Our Obstetrics & Gynaecology department offers antenatal care, safe delivery services, postnatal follow-up, family planning counselling, and treatment for gynaecological conditions — all delivered with privacy, safety, and warmth.",
      "We know choosing where to deliver your baby is one of the most important decisions a family makes, and our team is here to support you with clear guidance at every step.",
    ],
    highlights: {
      heading: "Services include",
      items: [
        "Antenatal care & scans",
        "Safe delivery (normal & assisted)",
        "Postnatal care",
        "Family planning",
        "Fertility counselling",
        "Treatment of gynaecological conditions",
      ],
    },
    faqs: [
      {
        question: "When should I start antenatal care?",
        answer:
          "As soon as you confirm your pregnancy — early antenatal visits help catch and manage risks early.",
      },
      {
        question: "Do you offer a birth plan consultation?",
        answer:
          "Yes. During your antenatal visits you can talk through your preferences for labour and delivery with your doctor or midwife, and we will help you put a birth plan together.",
      },
      {
        question: "What should I pack for delivery?",
        answer:
          "For you: maternity gowns or wrappers, sanitary pads, toiletries, comfortable clothing, and your antenatal card and ID. For your baby: soft clothes, wrappers or blankets, diapers, caps and socks. Your midwife will confirm our full checklist during your antenatal visits.",
      },
    ],
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    icon: "pediatrics",
    metaTitle: "Children’s Hospital in Ile-Ife | Living Hope Hospital",
    metaDescription:
      "Gentle, expert care for babies and children in Parakin, Ile-Ife. Living Hope Hospital’s pediatric team supports your child from birth to adolescence.",
    h1: "Pediatric Care for Ile-Ife’s Children",
    summary:
      "Gentle care for babies and children — check-ups, immunizations and everyday illnesses.",
    body: [
      "Children need care that is both medically sound and gentle. Living Hope Hospital’s pediatric team treats infants, toddlers, and older children for everyday childhood illnesses, growth and development concerns, and immunizations — helping Ile-Ife families raise healthy children with confidence.",
    ],
    highlights: {
      heading: "Services include",
      items: [
        "Well-baby checks",
        "Immunizations",
        "Treatment of common childhood illnesses (malaria, respiratory infections, diarrhoea)",
        "Growth monitoring",
        "Newborn care",
      ],
    },
    faqs: [
      {
        question: "Do you follow the national immunization schedule?",
        answer:
          "Yes — our team follows Nigeria’s routine immunization schedule and can guide you on catching up missed doses.",
      },
      {
        question: "At what age should my child have their first check-up?",
        answer:
          "Within the first week of life, then at routine intervals recommended by your pediatrician.",
      },
    ],
  },
  {
    slug: "general-family-medicine",
    name: "General & Family Medicine",
    icon: "general",
    metaTitle: "General Hospital | Family Medicine in Ile-Ife",
    metaDescription:
      "Everyday healthcare for the whole family in Parakin, Ile-Ife — consultations, check-ups, and treatment of common illnesses at Living Hope Hospital.",
    h1: "General & Family Medicine",
    summary:
      "Consultations, check-ups and treatment of common illnesses for the whole family.",
    body: [
      "Not every health concern needs a specialist — but every health concern deserves attention. Living Hope Hospital’s general practice team treats common illnesses such as malaria, typhoid fever, hypertension, diabetes, and infections, and provides routine check-ups and health screening for adults across Ile-Ife and Parakin.",
    ],
    highlights: {
      heading: "Conditions we treat",
      items: [
        "Malaria",
        "Typhoid fever",
        "Hypertension",
        "Diabetes",
        "Infections",
        "Routine check-ups & health screening",
      ],
    },
    faqs: [
      {
        question: "Can I walk in without an appointment?",
        answer:
          "Yes, walk-ins are welcome for general consultations. Calling ahead or booking online usually means a shorter wait, and specialist clinics are best booked in advance.",
      },
      {
        question:
          "Do you manage chronic conditions like hypertension and diabetes?",
        answer:
          "Yes, including ongoing monitoring and medication management.",
      },
    ],
  },
  {
    slug: "surgery",
    name: "Surgery",
    icon: "surgery",
    metaTitle: "Surgical Services in Ile-Ife | Living Hope Hospital",
    metaDescription:
      "Safe, well-equipped surgical care in Parakin, Ile-Ife, from minor procedures to major operations, at Living Hope Hospital.",
    h1: "Surgical Services",
    summary:
      "From minor outpatient procedures to major operations, with full pre- and post-operative support.",
    body: [
      "Living Hope Hospital provides a range of surgical care, from minor outpatient procedures to major operations, performed by experienced surgeons in a safe, well-monitored theatre environment, with full pre- and post-operative support.",
    ],
    highlights: {
      heading: "Our surgical care",
      items: [
        "Minor outpatient procedures",
        "Major operations",
        "Well-monitored theatre environment",
        "Full pre-operative preparation",
        "Post-operative support and follow-up",
      ],
    },
    faqs: [
      {
        question: "What types of surgery do you perform?",
        answer:
          "Our surgical team performs general surgery, obstetric and gynaecological procedures (including caesarean section) and minor outpatient procedures. Please contact us to confirm whether a specific procedure is available.",
      },
      {
        question: "How do I prepare for surgery at Living Hope Hospital?",
        answer:
          "Your surgical team will provide specific pre-operative instructions, including fasting guidance and required tests.",
      },
    ],
  },
  {
    slug: "laboratory-diagnostics",
    name: "Laboratory & Diagnostics",
    icon: "laboratory",
    metaTitle: "Medical Laboratory in Ile-Ife | Living Hope Hospital",
    metaDescription:
      "Fast, accurate lab testing in Parakin, Ile-Ife — blood tests, malaria and typhoid screening, and more at Living Hope Hospital.",
    h1: "Laboratory & Diagnostic Services",
    summary:
      "On-site blood tests, malaria and typhoid screening and more, with fast turnaround.",
    body: [
      "Accurate diagnosis starts with reliable testing. Our on-site laboratory offers a wide range of tests — including full blood count, malaria and typhoid screening, pregnancy tests, blood grouping, liver and kidney function tests, and more — with fast turnaround so your doctor can begin treatment sooner.",
    ],
    highlights: {
      heading: "Tests include",
      items: [
        "Full blood count",
        "Malaria screening",
        "Typhoid screening",
        "Pregnancy tests",
        "Blood grouping",
        "Liver function tests",
        "Kidney function tests",
      ],
    },
    faqs: [
      {
        question: "Do I need a doctor’s referral for lab tests?",
        answer:
          "No referral is needed for most routine tests, so walk-ins are welcome. Some specialised tests need a doctor’s request form.",
      },
      {
        question: "How soon will I get my results?",
        answer:
          "Most routine results are available within 1 to 3 hours. Some tests take longer, and our team will tell you when to expect yours.",
      },
    ],
  },
  {
    slug: "radiology-imaging",
    name: "Radiology & Imaging",
    icon: "radiology",
    metaTitle: "X-Ray & Ultrasound in Ile-Ife | Living Hope Hospital",
    metaDescription:
      "On-site X-ray and ultrasound imaging in Parakin, Ile-Ife, supporting fast, accurate diagnosis at Living Hope Hospital.",
    h1: "Radiology & Imaging Services",
    summary:
      "On-site imaging to support fast, accurate diagnosis — without referring patients elsewhere.",
    body: [
      "Our imaging unit supports accurate diagnosis with services such as X-ray and obstetric & abdominal ultrasound, helping our doctors see clearly and treat confidently, without the delay of referring patients elsewhere.",
    ],
    highlights: {
      heading: "Imaging services",
      items: ["X-ray", "Obstetric ultrasound", "Abdominal ultrasound"],
    },
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    icon: "pharmacy",
    metaTitle: "Hospital Pharmacy in Ile-Ife | Living Hope Hospital",
    metaDescription:
      "A fully stocked, on-site pharmacy at Living Hope Hospital, Parakin, Ile-Ife — genuine medication dispensed by qualified pharmacy staff.",
    h1: "Our Pharmacy",
    summary:
      "Fill your prescription right after your consultation — genuine medication, no extra trips.",
    body: [
      "Living Hope Hospital’s in-house pharmacy makes it easy to fill your prescription right after your consultation — no extra trips, no guesswork about medication authenticity. Our pharmacy team is available to answer questions about dosage and usage.",
    ],
    highlights: {
      heading: "Why patients use our pharmacy",
      items: [
        "Fill your prescription right after your consultation",
        "Genuine medication, no guesswork",
        "Dosage and usage advice from our pharmacy team",
      ],
    },
  },
  {
    slug: "dental-care",
    name: "Dental Care",
    icon: "dental",
    metaTitle: "Dental Clinic in Ile-Ife | Living Hope Hospital",
    metaDescription:
      "Complete dental care in Parakin, Ile-Ife — check-ups, cleaning, extractions, and more at Living Hope Hospital.",
    h1: "Dental Care Services",
    summary:
      "Routine check-ups, scaling, extractions and treatment of dental pain.",
    body: [
      "From routine check-ups and scaling to extractions and treatment of dental pain, Living Hope Hospital’s dental unit helps Ile-Ife families maintain healthy smiles in a comfortable, hygienic setting.",
    ],
    highlights: {
      heading: "Dental services",
      items: [
        "Routine check-ups",
        "Scaling",
        "Extractions",
        "Treatment of dental pain",
      ],
    },
  },
  {
    slug: "physiotherapy-rehabilitation",
    name: "Physiotherapy & Rehabilitation",
    icon: "physio",
    metaTitle: "Physiotherapy in Ile-Ife | Living Hope Hospital",
    metaDescription:
      "Recover strength and mobility with physiotherapy services at Living Hope Hospital, Parakin, Ile-Ife.",
    h1: "Physiotherapy & Rehabilitation",
    summary:
      "Tailored rehabilitation plans to regain strength, mobility and independence.",
    body: [
      "Whether recovering from surgery, an injury, or managing a chronic condition affecting movement, our physiotherapy team designs tailored rehabilitation plans to help patients regain strength, mobility, and independence.",
    ],
    highlights: {
      heading: "We help with",
      items: [
        "Recovery after surgery",
        "Injury rehabilitation",
        "Chronic conditions affecting movement",
        "Tailored rehabilitation plans",
      ],
    },
  },
];

export const servicesBySlug = Object.fromEntries(
  services.map((s) => [s.slug, s]),
) as Record<ServiceSlug, Service>;

export function getService(slug: string): Service | undefined {
  return (servicesBySlug as Record<string, Service | undefined>)[slug];
}
