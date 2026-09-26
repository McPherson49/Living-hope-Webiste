export type WhyPoint = {
  icon: "location" | "doctors" | "lab" | "clean" | "emergency" | "booking";
  title: string;
  text: string;
};

export const homeContent = {
  h1Lead: "Living Hope Hospital —",
  h1Highlight: "Compassionate, Quality Healthcare",
  h1Tail: "in Parakin, Ile-Ife",
  subheadline:
    "From emergencies to everyday family health, Living Hope Hospital brings modern medical care close to home for the people of Ile-Ife, Parakin, and the OAU community — with the comfort and personal attention every patient deserves.",

  welcomeHeading: "Good healthcare should feel personal",
  welcome:
    "At Living Hope Hospital, we believe good healthcare should feel personal. Located in Parakin, Ile-Ife, Osun State, we combine skilled doctors, modern diagnostic tools, and a genuinely caring team to serve families, students, and workers across Ile-Ife and its surrounding communities. Whether you need routine care, specialist attention, or emergency treatment, we are here — close by, and ready to help.",

  why: [
    {
      icon: "location",
      title: "Conveniently located in Parakin",
      text: "Minutes from OAU and central Ile-Ife.",
    },
    {
      icon: "doctors",
      title: "Experienced doctors and nurses",
      text: "Across key specialties.",
    },
    {
      icon: "lab",
      title: "Modern laboratory and diagnostic services",
      text: "For faster, more accurate answers.",
    },
    {
      icon: "clean",
      title: "Clean, comfortable facilities",
      text: "Designed around patient dignity.",
    },
    {
      icon: "emergency",
      title: "Fast, friendly emergency response",
      text: "When every minute counts.",
    },
    {
      icon: "booking",
      title: "Simple appointment booking",
      // Was "By phone, WhatsApp, or online form." — the online form is hidden for now.
      text: "By phone or WhatsApp.",
    },
  ] satisfies WhyPoint[],

  teamTeaser:
    "Our doctors and specialists bring years of experience and a shared commitment to patient-first care.",

  /** What to expect — mirrors the "what to expect during a visit" note in the PRD. */
  visitSteps: [
    {
      title: "Book",
      // Was "Call, message us on WhatsApp or use the online form. …" — the online form is hidden for now.
      text: "Call or message us on WhatsApp. We confirm your slot promptly.",
    },
    {
      title: "Arrive & register",
      text: "A friendly front-desk team registers you quickly and directs you to the right department.",
    },
    {
      title: "See your doctor",
      text: "Your doctor listens, examines you and explains the plan in plain language.",
    },
    {
      title: "Tests & treatment",
      text: "Lab, imaging and pharmacy are on-site, so you can finish everything in one visit.",
    },
  ],

  /**
   * SAMPLE figures for design review — replace with the hospital's real numbers.
   * (See `site.sampleData` in ./site.ts.)
   */
  stats: [
    { value: "12+", label: "Years Serving Ile-Ife" },
    { value: "50,000+", label: "Patients Cared For" },
    { value: "10", label: "Specialist Departments" },
    { value: "80+", label: "Qualified Doctors & Nurses" },
  ],

  /**
   * SAMPLE patient stories, written for design review — they are NOT real
   * patients. Only publish real quotes with written patient consent on file.
   */
  testimonials: [
    {
      quote:
        "From my first antenatal visit to the day I held my baby, the doctors and midwives made me feel safe and never rushed. I recommend Living Hope to every mother in Ife.",
      name: "Mrs. T. Adeleke",
      service: "Maternity care",
    },
    {
      quote:
        "My son had a high fever late at night. We were seen within minutes, the lab results came back quickly, and the doctor explained everything in Yorùbá so I understood.",
      name: "Mr. K. Olaniyan",
      service: "Pediatrics & Emergency",
    },
    {
      quote:
        "As an OAU postgraduate student I needed somewhere close, clean and fair on price. I now do my check-ups and tests here, and booking on WhatsApp is so easy.",
      name: "Ms. C. Nwachukwu",
      service: "General medicine & Laboratory",
    },
  ],
};
