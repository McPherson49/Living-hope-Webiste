import type { Faq } from "./services";

/**
 * General hospital FAQs (also emitted as FAQPage structured data once complete).
 *
 * Operational answers below (hours, walk-ins, ambulance, distance) are SAMPLE
 * wording — confirm each with the hospital. The registration/licensing answer is
 * intentionally left as a placeholder: regulatory claims must come from the
 * hospital's real documents, never from sample copy.
 */
export const generalFaqs: Faq[] = [
  {
    question: "Where is Living Hope Hospital located?",
    answer:
      "Living Hope Hospital is located in Parakin, Ile-Ife, Osun State, close to Obafemi Awolowo University. You will find us at Plot 12, Hope Avenue, Parakin, and you can open our location in Google Maps from the Contact page.",
  },
  {
    question: "What are your operating hours?",
    answer:
      "Our outpatient clinics are open Monday to Saturday, 8:00am to 6:00pm. Our emergency unit is open 24 hours a day, 7 days a week.",
  },
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "Walk-ins are welcome for general consultations, emergencies and routine lab tests. Specialist clinics such as maternity and pediatrics are best booked in advance so we can keep your waiting time short.",
  },
  {
    question: "What services does Living Hope Hospital offer?",
    answer:
      "We offer emergency care, maternity and gynaecology, pediatrics, general medicine, surgery, laboratory and diagnostics, radiology, pharmacy, dental care, and physiotherapy.",
  },
  {
    question: "Do you accept HMO/insurance?",
    answer:
      "Please contact us to confirm whether your HMO/insurance plan is accepted — see our Insurance & HMO page. Self-pay patients are always welcome, and our billing team will explain costs upfront.",
  },
  {
    question: "Do you have an ambulance service?",
    answer:
      "Yes. Call our emergency line and our team will guide you and help arrange ambulance support. Availability can vary, so please call ahead whenever you can.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "By phone, WhatsApp, or our online booking form — see our Book an Appointment page.",
  },
  {
    question: "Is Living Hope Hospital registered/licensed?",
    answer: "[Insert MDCN/state Ministry of Health registration details.]",
  },
  {
    question: "How far is Living Hope Hospital from OAU main gate?",
    answer:
      "We are a short drive from the OAU main gate — usually about 5 to 10 minutes depending on traffic. Directions are on our Contact page.",
  },
  {
    question: "Can I get lab tests done without seeing a doctor first?",
    answer:
      "For most routine tests, yes — walk-ins are welcome. Some specialised tests need a doctor’s request form.",
  },
];
