import { CalendarCheck } from "lucide-react";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ButtonLink } from "@/components/ui/Button";
import { EmergencyBand } from "@/components/ui/EmergencyBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hospital Services in Ile-Ife | Living Hope Hospital",
  description:
    "Emergency, maternity, pediatrics, surgery, lab, imaging, pharmacy, dental and physiotherapy — complete care at Living Hope Hospital, Ile-Ife.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Complete healthcare services in Ile-Ife"
        description="From emergencies to everyday family health, every department is here in Parakin — with direct access between our doctors, laboratory, imaging, surgical unit and pharmacy."
        breadcrumbs={[{ name: "Services", path: "/services" }]}
      >
        <ButtonLink href="/book-appointment" variant="primary" size="lg">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          Book an Appointment
        </ButtonLink>
      </PageHero>

      <Section tone="white">
        <ServicesGrid />
      </Section>

      <EmergencyBand />
    </>
  );
}
