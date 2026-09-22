import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/content/site";
import { telHref, whatsappHref } from "@/lib/contact";
import { ButtonLink } from "./Button";
import { Copy } from "./Copy";
import { WhatsAppIcon } from "./Icons";

/** "Book this service" panel: online form, phone and WhatsApp in one place. */
export function BookCard({
  title = "Book an appointment",
  department,
  message,
}: {
  title?: string;
  /** Service slug to pre-select on the booking form. */
  department?: string;
  /** Pre-filled WhatsApp message. */
  message?: string;
}) {
  const bookHref = department
    ? `/book-appointment?department=${department}`
    : "/book-appointment";

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
      <h2 className="text-2xl font-semibold text-brand-900">{title}</h2>
      <p className="mt-2 text-muted">
        Call, message us on WhatsApp, or use the online form — our team will
        confirm your appointment promptly.
      </p>
      <div className="mt-5 grid gap-3">
        <ButtonLink href={bookHref} variant="primary" size="lg">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          Book online
        </ButtonLink>
        <ButtonLink href={telHref(site.contact.phone)} variant="outline" size="lg">
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span>
            Call <Copy>{site.contact.phone}</Copy>
          </span>
        </ButtonLink>
        <ButtonLink
          href={whatsappHref(site.contact.whatsapp, message)}
          variant="whatsapp"
          size="lg"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp us
        </ButtonLink>
      </div>
    </div>
  );
}
