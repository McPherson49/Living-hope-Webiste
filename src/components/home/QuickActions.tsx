import Link from "next/link";
import { ArrowUpRight, LayoutGrid, Siren, Stethoscope, type LucideIcon } from "lucide-react"; // + CalendarCheck when the Book card is restored
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { telHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Action = {
  href: string;
  icon: LucideIcon;
  title: string;
  text: React.ReactNode;
  emergency?: boolean;
};

/** Four quiet, flat cards — quick doors into the site. No overlap, no gradients: just clear links. */
export function QuickActions() {
  const actions: Action[] = [
    // "Book an appointment" card hidden for now. To restore, uncomment it and set the grid below
    // back to `lg:grid-cols-4`.
    // {
    //   href: "/book-appointment",
    //   icon: CalendarCheck,
    //   title: "Book an appointment",
    //   text: "Pick a department and a time that suits you.",
    // },
    {
      href: "/doctors",
      icon: Stethoscope,
      title: "Find a doctor",
      text: "Meet our specialists — and the languages they speak.",
    },
    {
      href: "/services",
      icon: LayoutGrid,
      title: "Explore our services",
      text: `${services.length} departments under one roof.`,
    },
    {
      href: telHref(site.contact.emergencyPhone),
      icon: Siren,
      title: "Emergency line",
      text: (
        <>
          Available <Copy>{site.contact.emergencyHours}</Copy>
        </>
      ),
      emergency: true,
    },
  ];

  return (
    <section aria-label="Quick actions" className="border-b border-line bg-mist">
      <Container>
        <Stagger as="ul" className="grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {actions.map(({ href, icon: Icon, title, text, emergency }) => {
            const card = (
              <>
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-300",
                    emergency
                      ? "bg-red-50 text-emergency group-hover:bg-emergency group-hover:text-white"
                      : "bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold leading-snug text-ink">{title}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted">{text}</span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 self-center text-brand-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </>
            );
            const className =
              "group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card motion-reduce:transition-none motion-reduce:hover:translate-y-0";
            return (
              <StaggerItem as="li" key={title}>
                {href.startsWith("/") ? (
                  <Link href={href} className={className}>
                    {card}
                  </Link>
                ) : (
                  <a href={href} className={className}>
                    {card}
                  </a>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
