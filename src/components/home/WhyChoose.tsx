import {
  CalendarCheck,
  FlaskConical,
  MapPin,
  Siren,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { homeContent, type WhyPoint } from "@/content/home";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";

const icons: Record<WhyPoint["icon"], LucideIcon> = {
  location: MapPin,
  doctors: Stethoscope,
  lab: FlaskConical,
  clean: Sparkles,
  emergency: Siren,
  booking: CalendarCheck,
};

export function WhyChoose() {
  return (
    <Section tone="mist" className="pt-20 md:pt-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Welcome to Living Hope Hospital"
            title={homeContent.welcomeHeading}
            description={homeContent.welcome}
          />
          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/about" variant="primary">
              About our hospital
            </ButtonLink>
            <ButtonLink href="/doctors" variant="outline">
              Meet our doctors
            </ButtonLink>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h3 className="text-2xl font-bold text-brand-900">Why choose Living Hope Hospital</h3>
          </Reveal>
          <Stagger as="ul" className="mt-6 grid gap-4 sm:grid-cols-2" stagger={0.07}>
            {homeContent.why.map((point) => {
              const Icon = icons[point.icon];
              return (
                <StaggerItem as="li" key={point.title} className="h-full">
                  <div className="group h-full rounded-3xl border border-line bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mt-4 font-bold leading-snug text-ink">{point.title}</p>
                    <p className="mt-1 text-sm text-muted">{point.text}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
