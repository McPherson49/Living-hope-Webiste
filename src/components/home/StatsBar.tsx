import { homeContent } from "@/content/home";
import { CountUp } from "@/components/motion/CountUp";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { isPlaceholder } from "@/lib/contact";

/** Figures live in src/content/home.ts (currently sample values — see `site.sampleData`). */
export function StatsBar() {
  return (
    <section aria-label="Living Hope Hospital at a glance" className="bg-brand-900 text-white">
      <Container>
        <Stagger as="div" stagger={0.1}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4 md:py-16">
            {homeContent.stats.map((stat) => (
              <StaggerItem key={stat.label} className="flex flex-col-reverse text-center">
                <dt className="mt-2 text-sm font-medium text-brand-100 sm:text-base">
                  {stat.label}
                </dt>
                <dd className="font-display text-4xl font-bold tabular-nums text-accent-300 sm:text-5xl">
                  {isPlaceholder(stat.value) ? (
                    <Copy>{stat.value}</Copy>
                  ) : (
                    <CountUp value={stat.value} />
                  )}
                </dd>
              </StaggerItem>
            ))}
          </dl>
        </Stagger>
      </Container>
    </section>
  );
}
