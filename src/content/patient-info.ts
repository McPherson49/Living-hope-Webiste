export const patientInfo = {
  /**
   * HMOs / insurers the hospital accepts, e.g. ["Hygeia HMO", "AXA Mansard"].
   * Left empty on purpose: naming real insurers as "accepted" would be a claim
   * about real business relationships. While this is empty the Insurance page
   * tells patients to contact the hospital to confirm their plan.
   */
  acceptedHmos: [] as string[],

  /** SAMPLE visiting hours — confirm with the hospital. */
  visiting: {
    general: "Daily, 4:00pm – 6:00pm",
    maternity: "Daily, 5:00pm – 6:30pm (one visitor at a time)",
  },

  admission: {
    bring: [
      "Valid ID",
      "Any existing medical records or referral letters",
      "Personal toiletries",
      "Comfortable clothing",
    ],
    /** SAMPLE delivery-bag checklist — the maternity team should confirm the final list. */
    deliveryBagChecklist: {
      forMother: [
        "Maternity gowns or wrappers",
        "Sanitary pads",
        "Toiletries and towel",
        "Comfortable clothes for going home",
        "Antenatal card and valid ID",
      ],
      forBaby: [
        "Soft baby clothes, caps and socks",
        "Wrappers or blankets",
        "Diapers and wipes",
        "A going-home outfit",
      ],
    },
  },
};
