import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ServiceIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/** Every department as a card linking to its own page. Used on the homepage and /services. */
export function ServicesGrid({ exclude }: { exclude?: string }) {
  const list = services.filter((s) => s.slug !== exclude);

  return (
    <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5" stagger={0.06}>
      {list.map((service) => {
        const emergency = service.icon === "emergency";
        return (
          <StaggerItem as="li" key={service.slug} className="h-full">
            <Link
              href={`/services/${service.slug}`}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                emergency
                  ? "border-red-200 hover:border-red-300"
                  : "border-line hover:border-brand-300",
              )}
            >
              {/* A soft disc that swells behind the card on hover */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -right-12 -top-12 h-28 w-28 rounded-full transition-transform duration-500 group-hover:scale-[3] motion-reduce:transition-none",
                  emergency ? "bg-red-50" : "bg-brand-50",
                )}
              />
              <span
                className={cn(
                  "relative grid h-12 w-12 place-items-center rounded-2xl transition-colors duration-300",
                  emergency
                    ? "bg-red-100 text-emergency group-hover:bg-emergency group-hover:text-white"
                    : "bg-brand-100 text-brand-700 group-hover:bg-brand-700 group-hover:text-white",
                )}
              >
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 font-sans text-lg font-bold leading-snug text-ink">
                {service.name}
              </h3>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">
                {service.summary}
              </p>
              <span
                className={cn(
                  "relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold",
                  emergency ? "text-emergency" : "text-brand-700 group-hover:text-brand-900",
                )}
              >
                Learn more
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
