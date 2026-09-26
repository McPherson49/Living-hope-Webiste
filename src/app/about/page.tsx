import {
  Bed,
  // CalendarCheck, // restore with the "Book an Appointment" band at the bottom
  FlaskConical,
  Heart,
  HandHeart,
  Pill,
  ScanLine,
  ShieldCheck,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { about } from "@/content/about";
import { GrowLine } from "@/components/motion/GrowLine";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Copy";
import { EmergencyBand } from "@/components/ui/EmergencyBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Living Hope Hospital | Parakin, Ile-Ife",
  description:
    "Learn about Living Hope Hospital’s story, mission, and the team providing trusted, compassionate healthcare to Ile-Ife, Parakin, and the OAU community.",
  path: "/about",
});

const values: { icon: LucideIcon; name: string; text: string }[] = [
  {
    icon: Heart,
    name: "Compassion",
    text: "Every patient is treated with dignity and warmth.",
  },
  {
    icon: Star,
    name: "Excellence",
    text: "We hold ourselves to high clinical standards.",
  },
  {
    icon: ShieldCheck,
    name: "Integrity",
    text: "Honest, transparent care and communication.",
  },
  {
    icon: HandHeart,
    name: "Accessibility",
    text: "Quality healthcare should be within reach, not out of reach.",
  },
  {
    icon: Users,
    name: "Community",
    text: "We exist to serve Ile-Ife and grow alongside it.",
  },
];

const facilityHighlights: { icon: LucideIcon; label: string }[] = [
  { icon: Bed, label: about.facility.beds },
  { icon: FlaskConical, label: "Modern laboratory" },
  { icon: ScanLine, label: "Diagnostic imaging" },
  { icon: Pill, label: "Fully stocked pharmacy" },
  { icon: Heart, label: "Maternity ward" },
  { icon: Users, label: "Children’s ward" },
  { icon: Bed, label: "General admissions" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our hospital"
        title="About Living Hope Hospital"
        description="Compassionate, medically sound healthcare for the families, students and workers of Ile-Ife — close to home in Parakin."
        breadcrumbs={[{ name: "About Us", path: "/about" }]}
      >
        <ButtonLink href="/doctors" variant="primary" size="lg">
          Meet our doctors
        </ButtonLink>
        <ButtonLink href="/services" variant="outline" size="lg">
          Explore our services
        </ButtonLink>
      </PageHero>

      <Section id="story" tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="Our story" title="Care that started with a simple conviction" />
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-ink/90">
            <p>
              Living Hope Hospital was founded with a simple conviction: that every family in
              Ile-Ife deserves access to healthcare that is both medically sound and genuinely
              compassionate.
            </p>
            <p>
              Situated in Parakin, within easy reach of Obafemi Awolowo University and the wider
              Ile-Ife community, we have grown into a trusted name for families, students, and
              workers seeking dependable, nearby medical care.
            </p>
            <p>
              What began as a small practice has grown, step by step, into a full-service hospital —
              with dedicated wards, an on-site laboratory and imaging, a pharmacy, and specialists
              under one roof.
            </p>
          </Reveal>
        </div>

        {/* Milestones — the line draws itself as the section scrolls into view */}
        <div className="mx-auto mt-16 max-w-3xl">
          <Reveal>
            <h3 className="text-center text-2xl font-bold text-brand-900">Our journey so far</h3>
          </Reveal>
          <div className="relative mt-10">
            <div
              aria-hidden="true"
              className="absolute bottom-3 left-5 top-3 w-0.5 rounded-full bg-line"
            >
              <GrowLine
                axis="y"
                duration={2.2}
                delay={0.2}
                className="h-full w-full rounded-full bg-linear-to-b from-brand-500 via-accent-400 to-brand-500"
              />
            </div>
            <Stagger as="ol" className="space-y-9" stagger={0.15}>
              {about.timeline.map((step) => (
                <StaggerItem as="li" key={step.year} className="relative pl-16">
                  <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-linear-to-br from-brand-500 to-brand-700 text-[0.7rem] font-bold text-white shadow-md shadow-brand-700/30 ring-8 ring-white">
                    {step.year}
                  </span>
                  <h4 className="text-lg font-bold text-brand-900">{step.title}</h4>
                  <p className="mt-1 leading-relaxed text-muted">{step.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      <Section id="mission" tone="mist">
        <SectionHeading
          align="center"
          eyebrow="Mission, vision & values"
          title="Restoring hope and health at every stage of life"
        />

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          <StaggerItem className="h-full">
            <div className="relative isolate h-full overflow-hidden rounded-3xl bg-linear-to-br from-brand-950 via-brand-900 to-brand-700 p-8 text-white sm:p-10">
              <h3 className="text-2xl font-bold text-accent-300">Our mission</h3>
              <p className="mt-4 text-lg leading-relaxed text-brand-100">
                To provide accessible, high-quality, and compassionate healthcare to the people of
                Ile-Ife and its surrounding communities, restoring hope and health at every stage of
                life.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem className="h-full">
            <div className="h-full rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10">
              <h3 className="text-2xl font-bold text-brand-800">Our vision</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink/90">
                To be the most trusted private hospital in Ile-Ife and Osun State, known for
                clinical excellence and patient-centred care.
              </p>
            </div>
          </StaggerItem>
        </Stagger>

        <Reveal>
          <h3 className="mt-14 text-center text-2xl font-bold text-brand-900">Our values</h3>
        </Reveal>
        <Stagger as="ul" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
          {values.map(({ icon: Icon, name, text }) => (
            <StaggerItem as="li" key={name} className="h-full">
              <div className="group h-full rounded-3xl border border-line bg-white p-5 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="mt-4 font-bold text-brand-900">{name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="facility" tone="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Our facility" title="Equipped for whole-family care" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-ink/90">
                <Copy>{about.facility.summary}</Copy>
              </p>
            </Reveal>
            <Stagger as="ul" className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.06}>
              {facilityHighlights.map(({ icon: Icon, label }) => (
                <StaggerItem
                  as="li"
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-mist px-4 py-3"
                >
                  <Icon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <span className="font-medium">
                    <Copy>{label}</Copy>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal x={40} y={0} delay={0.1} className="self-start">
            <div className="rounded-3xl border border-brand-100 bg-brand-50 p-8">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand-700 shadow-card">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-brand-900">
                Accreditation &amp; registration
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-ink/90">
                <Copy>{about.accreditation}</Copy>
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* "Ready to experience care that feels personal? — Book an Appointment" band hidden for now.
          To restore, uncomment this and the CalendarCheck import above.
      <section className="bg-brand-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl font-display text-2xl font-bold text-brand-900 sm:text-3xl">
              Ready to experience care that feels personal?
            </p>
            <ButtonLink href="/book-appointment" variant="primary" size="lg">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Book an Appointment
            </ButtonLink>
          </Reveal>
        </div>
      </section>
      */}

      <EmergencyBand />
    </>
  );
}
