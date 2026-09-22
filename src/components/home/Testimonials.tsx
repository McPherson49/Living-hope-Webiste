import { Quote } from "lucide-react";
import { homeContent } from "@/content/home";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Copy } from "@/components/ui/Copy";
import { Section, SectionHeading } from "@/components/ui/Section";
import { initials } from "@/lib/utils";

/** Only publish real quotes with written patient consent on file (current ones are samples). */
export function Testimonials() {
  return (
    <Section tone="mist">
      <SectionHeading
        align="center"
        eyebrow="Patient stories"
        title="Care our patients remember"
        description="Words from the families and individuals we’ve had the privilege of caring for."
      />
      <Stagger as="div" className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
        {homeContent.testimonials.map((t, i) => (
          <StaggerItem key={i} className="h-full">
            <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <span
                aria-hidden="true"
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-50 transition-transform duration-500 group-hover:scale-[2.4] motion-reduce:transition-none"
              />
              <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-700/25">
                <Quote className="h-5 w-5" aria-hidden="true" />
              </span>
              <blockquote className="relative mt-5 flex-1 text-lg leading-relaxed text-ink">
                “<Copy>{t.quote}</Copy>”
              </blockquote>
              <figcaption className="relative mt-6 flex items-center gap-3 border-t border-line pt-4 text-sm">
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-800"
                >
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block font-semibold text-brand-900">
                    <Copy>{t.name}</Copy>
                  </span>
                  <span className="text-muted">
                    <Copy>{t.service}</Copy>
                  </span>
                </span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
