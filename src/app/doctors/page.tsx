// import { CalendarCheck } from "lucide-react"; // restore with the Book button
import { doctors } from "@/content/doctors";
import { getService } from "@/content/services";
import { DoctorsExplorer } from "@/components/doctors/DoctorsExplorer";
// import { ButtonLink } from "@/components/ui/Button"; // restore with the Book button
import { EmergencyBand } from "@/components/ui/EmergencyBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata, physicianJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Doctors | Living Hope Hospital, Ile-Ife",
  description:
    "Meet the experienced doctors and specialists at Living Hope Hospital, Parakin, Ile-Ife — dedicated to your family’s health.",
  path: "/doctors",
});

export default function DoctorsPage() {
  const departments = [...new Set(doctors.map((d) => d.department))].flatMap((slug) => {
    const service = getService(slug);
    return service ? [{ slug, name: service.name }] : [];
  });

  return (
    <>
      {doctors.map((d) => (
        <JsonLd key={d.slug} data={physicianJsonLd(d)} />
      ))}

      <PageHero
        eyebrow="Our team"
        title="Meet Our Doctors & Specialists"
        description="Behind every successful treatment at Living Hope Hospital is a team of dedicated, experienced medical professionals. Our doctors combine strong clinical training with a patient-first approach — taking the time to listen, explain, and involve you in your own care."
        breadcrumbs={[{ name: "Our Doctors", path: "/doctors" }]}
      >
        {/* "Book an Appointment" hidden for now. To restore, uncomment this and the two imports above.
        <ButtonLink href="/book-appointment" variant="primary" size="lg">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          Book an Appointment
        </ButtonLink>
        */}
      </PageHero>

      <Section tone="mist">
        <DoctorsExplorer doctors={doctors} departments={departments} />
      </Section>

      <EmergencyBand />
    </>
  );
}
