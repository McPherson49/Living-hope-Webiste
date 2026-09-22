import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Copy";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Section, SectionHeading } from "@/components/ui/Section";
import { mailtoHref, telHref, whatsappHref } from "@/lib/contact";

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <StaggerItem as="li" className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted">{label}</p>
        <div className="font-semibold text-ink">{children}</div>
      </div>
    </StaggerItem>
  );
}

/** Address, hours and map — sits just above the footer on the homepage. */
export function FindUs() {
  const c = site.contact;
  const whatsapp = whatsappHref(c.whatsapp);

  return (
    <Section tone="mist">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
        <div>
          <SectionHeading
            eyebrow="Find us"
            title="Close to OAU, right here in Parakin"
            description="Walk in, call ahead, or message us on WhatsApp — we’re easy to reach from Ile-Ife town and the OAU community."
          />
          <Stagger as="ul" className="mt-8 space-y-5" stagger={0.08}>
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
          </Stagger>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.map.directionsUrl} variant="primary">
              Get directions
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact us
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal x={40} y={0} delay={0.1} className="min-h-80 lg:min-h-full">
          <MapEmbed className="h-full min-h-80 lg:min-h-full" />
        </Reveal>
      </div>
    </Section>
  );
}
