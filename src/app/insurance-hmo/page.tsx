import { CalendarCheck, Check, FileText, Phone, ShieldPlus } from "lucide-react";
import { patientInfo } from "@/content/patient-info";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Copy";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { telHref, whatsappHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HMO & Insurance | Living Hope Hospital, Ile-Ife",
  description:
    "Find out which HMOs and insurance plans are accepted at Living Hope Hospital, Parakin, Ile-Ife.",
  path: "/insurance-hmo",
});

export default function InsurancePage() {
  const { acceptedHmos } = patientInfo;
  const c = site.contact;

  return (
    <>
      <PageHero
        eyebrow="Patient information"
        title="Insurance & HMO Information"
        description="Whether you use an HMO plan or pay for your care yourself, we’ll help you understand your options before treatment begins."
        breadcrumbs={[{ name: "Insurance & HMO", path: "/insurance-hmo" }]}
      />

      <Section tone="mist" reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <ShieldPlus className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold text-brand-900">
              HMOs and insurance plans
            </h2>
            {acceptedHmos.length > 0 ? (
              <>
                <p className="mt-3 text-lg leading-relaxed text-ink/90">
                  Living Hope Hospital works with the following HMOs and insurance providers:
                </p>
                <ul className="mt-4 space-y-2">
                  {acceptedHmos.map((hmo) => (
                    <li key={hmo} className="flex items-center gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {hmo}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted">
                  Not on the list? Contact us and we’ll confirm whether we can work with your plan.
                </p>
              </>
            ) : (
              <p className="mt-3 text-lg leading-relaxed text-ink/90">
                Please contact us to confirm whether your HMO/insurance plan is accepted.
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-100 text-accent-700">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold text-brand-900">Self-pay patients</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink/90">
              Self-pay patients are welcome, and our billing team is happy to explain costs upfront
              before treatment.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-brand-900 p-8 text-white sm:p-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">Check your cover before you visit</h2>
          <p className="mt-3 max-w-2xl text-brand-100">
            Have your HMO or insurance details ready and get in touch — we’ll confirm what’s
            covered so there are no surprises.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={telHref(c.phone)} variant="accent" size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span>
                Call <Copy>{c.phone}</Copy>
              </span>
            </ButtonLink>
            <ButtonLink href={whatsappHref(c.whatsapp)} variant="whatsapp" size="lg">
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp us
            </ButtonLink>
            <ButtonLink href="/book-appointment" variant="outlineLight" size="lg">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Book an Appointment
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
