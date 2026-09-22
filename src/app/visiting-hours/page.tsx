import Link from "next/link";
import { Baby, Check, Clock, HandHeart } from "lucide-react";
import { patientInfo } from "@/content/patient-info";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Copy } from "@/components/ui/Copy";
import { EmergencyBand } from "@/components/ui/EmergencyBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Visiting Hours & Admission Guide | Living Hope Hospital",
  description:
    "Visiting hours, what to bring, and admission guidance for patients and families at Living Hope Hospital, Parakin, Ile-Ife.",
  path: "/visiting-hours",
});

const card =
  "rounded-3xl border border-line bg-white p-8 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0";

function Tick({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
        <Check className="h-4 w-4" aria-hidden="true" />
      </span>
      {children}
    </li>
  );
}

export default function VisitingHoursPage() {
  const { visiting, admission } = patientInfo;
  const bag = admission.deliveryBagChecklist;

  return (
    <>
      <PageHero
        eyebrow="Patient information"
        title="Visiting Hours & Admission Guide"
        description="Everything patients and families need to know before a visit or an admission."
        breadcrumbs={[{ name: "Visiting Hours & Admission Guide", path: "/visiting-hours" }]}
      />

      <Section tone="mist">
        <Stagger className="grid gap-6 md:grid-cols-2">
          {[
            { label: "General ward visiting hours", value: visiting.general },
            { label: "Maternity ward visiting hours", value: visiting.maternity },
          ].map((item) => (
            <StaggerItem key={item.label} className="h-full">
              <div className={`${card} h-full`}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <Clock className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-brand-900">{item.label}</h2>
                <p className="mt-2 text-2xl font-bold text-ink">
                  <Copy>{item.value}</Copy>
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-6 grid gap-6 md:grid-cols-2">
          <StaggerItem className="h-full">
            <div className={`${card} h-full`}>
              <h2 className="text-2xl font-bold text-brand-900">What to bring on admission</h2>
              <ul className="mt-5 space-y-3">
                {admission.bring.map((item) => (
                  <Tick key={item}>{item}</Tick>
                ))}
              </ul>
            </div>
          </StaggerItem>

          <StaggerItem className="h-full">
            <div className={`${card} h-full`}>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-100 text-accent-700">
                <HandHeart className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-brand-900">Expecting a baby?</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink/90">
                Maternity patients should refer to our delivery bag checklist below.
              </p>
              <p className="mt-4">
                <Link
                  href="/services/maternity-gynaecology"
                  className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-900"
                >
                  Learn about our maternity care →
                </Link>
              </p>
            </div>
          </StaggerItem>
        </Stagger>

        <Stagger className="mt-6 grid gap-6 md:grid-cols-2">
          <StaggerItem className="h-full">
            <div className={`${card} h-full`}>
              <h3 className="flex items-center gap-2 text-xl font-bold text-brand-900">
                <HandHeart className="h-5 w-5 text-brand-600" aria-hidden="true" />
                Delivery bag — for mum
              </h3>
              <ul className="mt-4 space-y-3">
                {bag.forMother.map((item) => (
                  <Tick key={item}>{item}</Tick>
                ))}
              </ul>
            </div>
          </StaggerItem>
          <StaggerItem className="h-full">
            <div className={`${card} h-full`}>
              <h3 className="flex items-center gap-2 text-xl font-bold text-brand-900">
                <Baby className="h-5 w-5 text-brand-600" aria-hidden="true" />
                Delivery bag — for baby
              </h3>
              <ul className="mt-4 space-y-3">
                {bag.forBaby.map((item) => (
                  <Tick key={item}>{item}</Tick>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </Stagger>
      </Section>

      <EmergencyBand />
    </>
  );
}
