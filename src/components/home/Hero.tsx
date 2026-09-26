import { Check, Clock, MapPin, Phone, Siren } from "lucide-react"; // + CalendarCheck when the Book button is restored
import { homeContent } from "@/content/home";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { FloatIn } from "@/components/motion/Float";
import { HeroBackdrop } from "@/components/motion/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { telHref, whatsappHref } from "@/lib/contact";
import { stagger } from "@/lib/utils";

const trustPoints = [
  "Minutes from OAU and central Ile-Ife",
  "Fast emergency response",
  // Was "Book by phone, WhatsApp or online" — online booking is hidden for now.
  "Reach us by phone or WhatsApp",
];

function QuickRow({
  icon,
  label,
  children,
  tone = "brand",
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  tone?: "brand" | "emergency" | "whatsapp";
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-700",
    emergency: "bg-red-50 text-emergency",
    whatsapp: "bg-green-50 text-whatsapp",
  };
  return (
    <li className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${tones[tone]}`}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted">{label}</p>
        <div className="font-semibold text-ink">{children}</div>
      </div>
    </li>
  );
}

/**
 * Light, uncluttered hero: one headline, one card, one stat strip. The
 * headline uses the CSS `.rise` entrance (not JS) so it — the page's LCP
 * element — paints immediately; the card and stat strip can load a beat later.
 */
export function Hero() {
  const c = site.contact;
  const whatsapp = whatsappHref(c.whatsapp);

  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackdrop />

      <Container className="grid items-center gap-14 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20 lg:pt-24">
        <div>
          <p
            className="rise inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-brand-100"
            style={stagger(0)}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-brand-500 motion-safe:animate-pulse-soft" />
              <span className="relative h-2 w-2 rounded-full bg-brand-500" />
            </span>
            Parakin, Ile-Ife · Osun State
          </p>

          <p
            className="rise mt-6 text-lg font-semibold text-brand-600 sm:text-xl"
            style={stagger(1)}
          >
            {homeContent.h1Lead}
          </p>
          <h1
            className="rise mt-2 text-[2.5rem] font-bold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[3.85rem]"
            style={stagger(2)}
          >
            <span className="text-brand-600">{homeContent.h1Highlight}</span>{" "}
            {homeContent.h1Tail}
          </h1>

          <p
            className="rise mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
            style={stagger(3)}
          >
            {homeContent.subheadline}
          </p>

          <div className="rise mt-8 flex flex-wrap gap-3" style={stagger(4)}>
            {/* "Book an Appointment" hidden for now — the Call button below is the primary action meanwhile
                (was variant="outline"). To restore, uncomment this and set the Call button back to "outline".
            <ButtonLink href="/book-appointment" variant="primary" size="lg">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Book an Appointment
            </ButtonLink>
            */}
            <ButtonLink href={telHref(c.phone)} variant="primary" size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span>
                Call <Copy>{c.phone}</Copy> Now
              </span>
            </ButtonLink>
          </div>

          <ul className="rise mt-10 grid gap-3 text-sm text-muted sm:grid-cols-3" style={stagger(5)}>
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600"
                  aria-hidden="true"
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <FloatIn delay={0.3}>
          <aside
            aria-label="Quick contact"
            className="rounded-3xl bg-white p-6 shadow-lift ring-1 ring-line sm:p-8"
          >
            <h2 className="text-2xl font-bold text-brand-900">How can we help today?</h2>
            <ul className="mt-6 divide-y divide-line">
              <QuickRow
                tone="emergency"
                label="Emergency line"
                icon={<Siren className="h-5 w-5" aria-hidden="true" />}
              >
                <a href={telHref(c.emergencyPhone)} className="hover:underline">
                  <Copy>{c.emergencyPhone}</Copy>
                </a>
                <p className="text-sm font-normal text-muted">
                  Available <Copy>{c.emergencyHours}</Copy>
                </p>
              </QuickRow>
              <QuickRow
                tone="whatsapp"
                label="WhatsApp"
                icon={<WhatsAppIcon className="h-5 w-5" />}
              >
                <a
                  href={whatsapp}
                  target={whatsapp.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <Copy>{c.whatsapp}</Copy>
                </a>
              </QuickRow>
              <QuickRow
                label="Find us"
                icon={<MapPin className="h-5 w-5" aria-hidden="true" />}
              >
                <span>Parakin, Ile-Ife</span>
                <p className="text-sm font-normal">
                  <a
                    href={site.map.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 underline underline-offset-2 hover:text-brand-900"
                  >
                    Get directions
                  </a>
                </p>
              </QuickRow>
              <QuickRow
                label="Opening hours"
                icon={<Clock className="h-5 w-5" aria-hidden="true" />}
              >
                <Copy>{c.hours}</Copy>
              </QuickRow>
            </ul>
          </aside>
        </FloatIn>
      </Container>

      {/* One quiet line of facts — replaces scattered badges with a single calm row */}
      <div className="border-t border-line">
        <Container>
          <ul
            className="rise flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-sm font-medium text-muted sm:justify-between"
            style={stagger(6)}
          >
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
              {services.length} departments under one roof
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
              24/7 emergency care
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
              Minutes from OAU
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
              Reach us by phone or WhatsApp
            </li>
          </ul>
        </Container>
      </div>
    </section>
  );
}
