import { Phone, Siren } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { telHref } from "@/lib/contact";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { Copy } from "./Copy";

/** Full-width red call-out shown above the footer on content pages. */
export function EmergencyBand() {
  const { emergencyPhone, emergencyHours } = site.contact;
  return (
    <section aria-label="Emergency" className="bg-emergency text-white">
      <Container>
        <Reveal className="flex flex-col gap-5 py-9 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15">
              <Siren className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold sm:text-3xl">Medical emergency?</p>
              <p className="mt-1 max-w-2xl text-red-50">
                Call our emergency line now at{" "}
                <a
                  href={telHref(emergencyPhone)}
                  className="font-bold text-white underline underline-offset-2"
                >
                  <Copy>{emergencyPhone}</Copy>
                </a>{" "}
                — available <Copy>{emergencyHours}</Copy>.
              </p>
            </div>
          </div>
          <ButtonLink href={telHref(emergencyPhone)} variant="white" size="lg">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call Emergency Line
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
