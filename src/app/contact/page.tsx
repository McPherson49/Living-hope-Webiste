import { Clock, Mail, MapPin, Navigation, Phone, Siren } from "lucide-react";
import { site } from "@/content/site";
// import { ContactForm } from "@/components/forms/ContactForm"; // restore with the "Send us a message" block below
import { ButtonLink } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Copy";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { mailtoHref, telHref, whatsappHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us | Living Hope Hospital, Parakin, Ile-Ife",
  description:
    "Get in touch with Living Hope Hospital, Parakin, Ile-Ife — phone, WhatsApp, email, and directions.",
  path: "/contact",
});

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted">{label}</p>
        <div className="font-semibold text-ink">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const c = site.contact;
  const whatsapp = whatsappHref(c.whatsapp);

  return (
    <>
      <PageHero
        eyebrow="We’re here to help"
        title="Contact Living Hope Hospital"
        description="Reach out anytime — by phone, WhatsApp or email. For emergencies, always call our emergency line."
        breadcrumbs={[{ name: "Contact Us", path: "/contact" }]}
      >
        <ButtonLink href={telHref(c.emergencyPhone)} variant="emergency" size="lg">
          <Siren className="h-5 w-5" aria-hidden="true" />
          Emergency Line
        </ButtonLink>
        <ButtonLink href={whatsapp} variant="whatsapp" size="lg">
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp us
        </ButtonLink>
      </PageHero>

      <Section tone="white" reveal>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold text-brand-900 sm:text-3xl">Get in touch</h2>
            <ul className="mt-8 space-y-6">
              <Row label="Address" icon={<MapPin className="h-5 w-5" aria-hidden="true" />}>
                <Copy>{`${c.street}, ${c.area}`}</Copy>
              </Row>
              <Row label="Phone" icon={<Phone className="h-5 w-5" aria-hidden="true" />}>
                <a href={telHref(c.phone)} className="hover:underline">
                  <Copy>{c.phone}</Copy>
                </a>
              </Row>
              <Row label="WhatsApp" icon={<WhatsAppIcon className="h-5 w-5" />}>
                <a
                  href={whatsapp}
                  target={whatsapp.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <Copy>{c.whatsapp}</Copy>
                </a>
              </Row>
              <Row label="Email" icon={<Mail className="h-5 w-5" aria-hidden="true" />}>
                <a href={mailtoHref(c.email)} className="break-all hover:underline">
                  <Copy>{c.email}</Copy>
                </a>
              </Row>
              <Row label="Opening hours" icon={<Clock className="h-5 w-5" aria-hidden="true" />}>
                <Copy>{c.hours}</Copy>
              </Row>
              <Row label="Emergency line" icon={<Siren className="h-5 w-5" aria-hidden="true" />}>
                <a href={telHref(c.emergencyPhone)} className="hover:underline">
                  <Copy>{c.emergencyPhone}</Copy>
                </a>{" "}
                <span className="font-normal text-muted">
                  — available <Copy>{c.emergencyHours}</Copy>
                </span>
              </Row>
            </ul>
          </div>

          {/* Directions takes the second column while the message form is hidden (see below). */}
          <div className="self-start rounded-3xl border border-line bg-mist p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-brand-900">
              <Navigation className="h-5 w-5 text-brand-600" aria-hidden="true" />
              Directions
            </h3>
            
            <p className="mt-3 leading-relaxed text-ink/90">
              We’re in the Parakin area of Ile-Ife — in the Obalufe Layout (Eleyele, Ife Central), on
              Living Hope Hospital Road.
            </p>
            <p className="mt-3 leading-relaxed text-ink/90">
              Parakin sits on the Ede Road, the same road as the OAU campus gate, so we’re a short
              trip from the OAU community and the rest of Ile-Ife.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink/90">
              <li className="flex gap-2">
                <span className="font-semibold text-brand-800">Area:</span>
                Parakin, Obalufe Layout (Eleyele)
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-brand-800">Road:</span>
                Living Hope Hospital Road
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-brand-800">Look for:</span>
                Parakin Junction, on the Ede Road
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted">
              For live turn-by-turn directions from wherever you are, open the map — or call us and
              we’ll guide you in.
            </p>
            <ButtonLink href={site.map.directionsUrl} variant="outline" size="sm" className="mt-4">
              Open in Google Maps
            </ButtonLink>
          </div>

          {/* "Send us a message" form — hidden for now (the ContactForm component and the /api/enquiry
              route still exist). To restore: uncomment this block and the ContactForm import at the top,
              restore the intro text mentioning "the form below", and move the Directions card back
              under the contact list.
          <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10">
            <h2 className="text-2xl font-semibold text-brand-900 sm:text-3xl">Send us a message</h2>
            <p className="mt-2 text-muted">
              We’ll get back to you as soon as we can. Fields marked{" "}
              <span className="text-emergency">*</span> are required.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          */}
        </div>
      </Section>

      <Section tone="mist" className="pt-0 md:pt-0" reveal>
        <MapEmbed className="h-96 md:h-112" />
      </Section>
    </>
  );
}
