import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { companyLinks, patientInfoLinks, serviceLinks } from "@/content/navigation";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { mailtoHref, telHref, whatsappHref } from "@/lib/contact";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-accent-300">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="link-underline text-brand-100 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const c = site.contact;
  const whatsapp = whatsappHref(c.whatsapp);

  return (
    <footer className="relative isolate bg-brand-950 text-brand-100">
      {/* Thin gradient rule ties the footer back to the brand accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-400/70 to-transparent"
      />

      <Container>
        <Reveal className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* NAP is repeated here as real text on every page (not just an image or map) */}
          <div>
            <Link href="/" aria-label={`${site.name} — home`} className="inline-block">
              <Logo tone="light" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-200">
              Compassionate, quality healthcare for Ile-Ife, Parakin and the OAU
              community.
            </p>
            <address className="mt-6 space-y-3 text-sm not-italic">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-white">{site.name}</strong>
                  <br />
                  <Copy>{`${c.street}, ${c.area}`}</Copy>
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" aria-hidden="true" />
                <span>
                  Phone:{" "}
                  <a href={telHref(c.phone)} className="text-white hover:underline">
                    <Copy>{c.phone}</Copy>
                  </a>
                </span>
              </p>
              <p className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" />
                <span>
                  WhatsApp:{" "}
                  <a
                    href={whatsapp}
                    target={whatsapp.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    <Copy>{c.whatsapp}</Copy>
                  </a>
                </span>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" aria-hidden="true" />
                <span>
                  Email:{" "}
                  <a href={mailtoHref(c.email)} className="break-all text-white hover:underline">
                    <Copy>{c.email}</Copy>
                  </a>
                </span>
              </p>
              <p className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" aria-hidden="true" />
                <span>
                  Hours: <Copy>{c.hours}</Copy>
                </span>
              </p>
            </address>
            <a
              href={site.map.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200"
            >
              Get directions →
            </a>
          </div>

          <LinkColumn title="Services" links={serviceLinks} />
          <LinkColumn title="Patient information" links={patientInfoLinks} />
          <LinkColumn title="Living Hope" links={companyLinks} />
        </Reveal>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-brand-200 md:flex-row md:items-center md:justify-between">
          <div>
            <p>
              © {new Date().getFullYear()} {site.name}, Parakin, Ile-Ife. All rights reserved.
            </p>
            {site.sampleData && (
              <p className="mt-1 text-xs text-accent-200/80">
                Preview build — doctors, statistics, testimonials and contact details on this
                site are sample content.
              </p>
            )}
          </div>
          <p className="max-w-xl md:text-right">
            Information on this website is for general guidance and is not a
            substitute for professional medical advice. In an emergency, call
            our emergency line or go to the nearest emergency unit.
          </p>
        </Container>
      </div>
    </footer>
  );
}
