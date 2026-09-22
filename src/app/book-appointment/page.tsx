import { Suspense } from "react";
import { Mail, Phone, Siren } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { ButtonLink } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Copy";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { mailtoHref, telHref, whatsappHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book an Appointment | Living Hope Hospital, Ile-Ife",
  description:
    "Book your appointment at Living Hope Hospital, Parakin, Ile-Ife, by phone, WhatsApp, or our simple online form.",
  path: "/book-appointment",
});

const departments = services.map((s) => ({ slug: s.slug, name: s.name }));

export default function BookAppointmentPage() {
  const c = site.contact;
  const whatsapp = whatsappHref(c.whatsapp);

  return (
    <>
      <PageHero
        eyebrow="Patient information"
        title="Book an Appointment"
        description="Getting the care you need starts with a simple step. Call us, message us on WhatsApp, or fill out the form below, and our team will confirm your appointment promptly."
        breadcrumbs={[{ name: "Book an Appointment", path: "/book-appointment" }]}
      />

      <Section tone="mist" reveal>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10">
            <h2 className="text-2xl font-semibold text-brand-900 sm:text-3xl">
              Request an appointment
            </h2>
            <p className="mt-2 text-muted">
              Fields marked <span className="text-emergency">*</span> are required.
            </p>
            <div className="mt-8">
              {/* useSearchParams (pre-selecting a department/doctor) needs a Suspense boundary */}
              <Suspense fallback={<p className="text-muted">Loading form…</p>}>
                <AppointmentForm departments={departments} />
              </Suspense>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-brand-900">Prefer to talk to someone?</h2>
              <p className="mt-2 text-muted">
                Book without the form — whichever is easiest for you.
              </p>
              <ul className="mt-5 space-y-3">
                <li>
                  <ButtonLink href={telHref(c.phone)} variant="outline" className="w-full justify-start!">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    <span>
                      Call: <Copy>{c.phone}</Copy>
                    </span>
                  </ButtonLink>
                </li>
                <li>
                  <ButtonLink href={whatsapp} variant="whatsapp" className="w-full justify-start!">
                    <WhatsAppIcon className="h-5 w-5" />
                    <span>
                      WhatsApp: <Copy>{c.whatsapp}</Copy>
                    </span>
                  </ButtonLink>
                </li>
                <li>
                  <ButtonLink
                    href={mailtoHref(c.email, "Appointment request")}
                    variant="outline"
                    className="w-full justify-start!"
                  >
                    <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="break-all text-left">
                      Email: <Copy>{c.email}</Copy>
                    </span>
                  </ButtonLink>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-emergency p-6 text-white sm:p-8">
              <p className="flex items-center gap-2 font-display text-xl font-semibold">
                <Siren className="h-5 w-5" aria-hidden="true" />
                Is this an emergency?
              </p>
              <p className="mt-2 text-red-50">
                Don’t wait for an appointment. Call our emergency line now at{" "}
                <a href={telHref(c.emergencyPhone)} className="font-bold underline">
                  <Copy>{c.emergencyPhone}</Copy>
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
