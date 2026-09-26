import { homeContent } from "@/content/home";
import { GrowLine } from "@/components/motion/GrowLine";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
// import { ButtonLink } from "@/components/ui/Button"; // restore with the "Book your visit" button below
import { Section, SectionHeading } from "@/components/ui/Section";

/** "What to expect during a visit" — four steps joined by a line that draws itself as you scroll to it. */
export function VisitSteps() {
  const steps = homeContent.visitSteps;

  return (
    <Section tone="white">
      <SectionHeading
        align="center"
        eyebrow="Your visit"
        title="Simple from the first call to the pharmacy"
        description="No running around Ile-Ife between clinics. Here is what a typical visit looks like at Living Hope."
      />

      <div className="relative mt-14">
        {/* Connector runs through the centre of the number badges (desktop only) */}
        <div
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 rounded-full bg-line lg:block"
        >
          <GrowLine className="h-full rounded-full bg-linear-to-r from-brand-500 via-accent-400 to-brand-500" />
        </div>

        <Stagger as="ul" className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.14}>
          {steps.map((step, index) => (
            <StaggerItem as="li" key={step.title} className="text-center">
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-linear-to-br from-brand-500 to-brand-700 text-xl font-bold text-white shadow-lift ring-8 ring-white">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold text-brand-900">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{step.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* "Book your visit" button hidden for now. To restore, uncomment this and the ButtonLink import.
      <div className="mt-12 text-center">
        <ButtonLink href="/book-appointment" variant="primary" size="lg">
          Book your visit
        </ButtonLink>
      </div>
      */}
    </Section>
  );
}
