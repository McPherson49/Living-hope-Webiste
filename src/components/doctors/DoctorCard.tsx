import Image from "next/image";
import { GraduationCap, Languages } from "lucide-react"; // + CalendarCheck when the Book button is restored
import type { Doctor } from "@/content/doctors";
import { getService } from "@/content/services";
// import { ButtonLink } from "@/components/ui/Button"; // restore with the "Book with …" button
import { Copy } from "@/components/ui/Copy";
import { ServiceIcon } from "@/components/ui/Icons";
import { isPlaceholder } from "@/lib/contact";
import { initials } from "@/lib/utils";

/** Banner colour per department — all cool tones, with the emergency team in red. */
const banners: Record<string, string> = {
  "emergency-trauma-care": "from-red-900 to-red-600",
  "maternity-gynaecology": "from-brand-700 to-accent-500",
  pediatrics: "from-accent-600 to-brand-500",
  "general-family-medicine": "from-brand-800 to-brand-500",
  surgery: "from-brand-950 to-brand-600",
  "laboratory-diagnostics": "from-accent-700 to-brand-600",
  "radiology-imaging": "from-brand-900 to-accent-600",
  "dental-care": "from-brand-600 to-accent-400",
  "physiotherapy-rehabilitation": "from-brand-700 to-brand-400",
};
const fallbackBanner = "from-brand-800 to-brand-500";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  // Booking-link params, used by the hidden "Book with …" button below:
  // const params = new URLSearchParams({ department: doctor.department });
  // if (!isPlaceholder(doctor.name)) params.set("doctor", doctor.name);

  const service = getService(doctor.department);

  return (
    <article
      id={doctor.slug}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Banner: department colour + the department chip */}
      <div
        className={`relative h-24 bg-linear-to-br ${banners[doctor.department] ?? fallbackBanner}`}
      >
        {service && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm">
            <ServiceIcon name={service.icon} className="h-3.5 w-3.5" />
            {service.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6">
        {/* Avatar overlaps the banner. A real photo replaces the monogram when `photo` is set. */}
        {doctor.photo ? (
          <Image
            src={doctor.photo}
            alt={`Portrait of ${doctor.name}`}
            width={80}
            height={80}
            className="relative -mt-10 h-20 w-20 shrink-0 rounded-2xl object-cover ring-4 ring-white"
          />
        ) : (
          <span
            aria-hidden="true"
            className="relative -mt-10 grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-white text-2xl font-bold tracking-tight text-brand-700 shadow-md ring-4 ring-white transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
          >
            <span className="grid h-full w-full place-items-center rounded-xl bg-brand-50">
              {isPlaceholder(doctor.name) ? "Dr" : initials(doctor.name)}
            </span>
          </span>
        )}

        <h3 className="mt-4 text-xl font-bold leading-snug text-brand-900">
          <Copy>{doctor.name}</Copy>
        </h3>
        <p className="mt-1 text-sm font-semibold text-brand-600">
          <Copy>{doctor.specialty}</Copy>
        </p>

        <dl className="mt-4 space-y-2 text-sm text-muted">
          <div className="flex items-start gap-2">
            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            <div>
              <dt className="sr-only">Qualifications</dt>
              <dd className="font-medium text-ink">
                <Copy>{doctor.qualifications}</Copy>
              </dd>
              <dt className="sr-only">Experience</dt>
              <dd>
                <Copy>{doctor.experience}</Copy>
              </dd>
            </div>
          </div>
          {doctor.languages.length > 0 && (
            <div className="flex items-start gap-2">
              <Languages className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              <div>
                <dt className="sr-only">Languages spoken</dt>
                <dd>{doctor.languages.join(" · ")}</dd>
              </div>
            </div>
          )}
        </dl>

        <p className="mt-4 flex-1 leading-relaxed text-muted">
          <Copy>{doctor.bio}</Copy>
        </p>

        {doctor.focus.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Areas of interest">
            {doctor.focus.map((item) => (
              <li
                key={item}
                className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-xs font-medium text-muted">
          Consulting: <span className="text-ink">{doctor.days}</span>
        </p>

        {/* "Book with Dr …" button hidden for now. To restore, uncomment this, the `params` lines above,
            and the CalendarCheck + ButtonLink imports.
        <ButtonLink
          href={`/book-appointment?${params.toString()}`}
          variant="outline"
          size="sm"
          className="mt-5 self-start"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          <span>
            Book with <Copy>{doctor.name}</Copy>
          </span>
        </ButtonLink>
        */}
      </div>
    </article>
  );
}
