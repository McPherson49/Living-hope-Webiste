import Link from "next/link";
import { Clock, MapPin, Phone, Siren } from "lucide-react"; // + CalendarCheck when the Book button is restored
import { primaryNav } from "@/content/navigation";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { telHref, whatsappHref } from "@/lib/contact";
import { DesktopNav, MobileNav } from "./Nav";
import { StickyHeader } from "./StickyHeader";

export function Header() {
  const c = site.contact;
  const whatsapp = whatsappHref(c.whatsapp);

  return (
    <>
      {/* Utility bar: NAP at a glance (scrolls away; the main bar below stays sticky) */}
      <div className="hidden bg-brand-950 text-sm text-brand-100 md:block">
        <Container className="flex h-10 items-center justify-between gap-6">
          <p className="flex min-w-0 items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-accent-300" aria-hidden="true" />
            <span className="truncate">
              <Copy>{`${c.street}, ${c.area}`}</Copy>
            </span>
          </p>
          <ul className="flex shrink-0 items-center gap-6">
            <li className="hidden items-center gap-2 lg:flex">
              <Clock className="h-4 w-4 text-accent-300" aria-hidden="true" />
              <Copy>{c.hours}</Copy>
            </li>
            <li>
              <a
                href={telHref(c.phone)}
                className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-accent-200"
              >
                <Phone className="h-4 w-4 text-accent-300" aria-hidden="true" />
                <Copy>{c.phone}</Copy>
              </a>
            </li>
            <li>
              <a
                href={whatsapp}
                target={whatsapp.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4 text-accent-300" />
                WhatsApp
              </a>
            </li>
          </ul>
        </Container>
      </div>

      <StickyHeader>
        <Container className="flex h-16 items-center justify-between gap-3 transition-[height] duration-300 lg:h-20 lg:group-data-[scrolled=true]/header:h-16">
          <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo />
          </Link>

          <DesktopNav items={primaryNav} />

          <div className="flex shrink-0 items-center gap-2">
            <ButtonLink
              href={telHref(c.emergencyPhone)}
              variant="emergency"
              size="sm"
              className="whitespace-nowrap"
              aria-label="Emergency line — call now"
            >
              <Siren className="h-4 w-4" aria-hidden="true" />
              {/* Icon-only on very narrow phones; the aria-label above still names it. */}
              <span className="hidden min-[380px]:inline">
                Emergency<span className="hidden sm:inline"> Line</span>
              </span>
            </ButtonLink>
            {/* Hidden for now (the /book-appointment page still exists). To restore, uncomment this block
                and the CalendarCheck import above. The wrapper div does the hiding because `hidden` on
                the button itself would fight its own `inline-flex`.
            <div className="hidden xl:block">
              <ButtonLink
                href="/book-appointment"
                variant="primary"
                size="sm"
                className="whitespace-nowrap"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Book an Appointment
              </ButtonLink>
            </div>
            */}
            <MobileNav items={primaryNav} whatsappHref={whatsapp} />
          </div>
        </Container>
      </StickyHeader>
    </>
  );
}
