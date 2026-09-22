import { ArrowRight } from "lucide-react";
import { doctors } from "@/content/doctors";
import { homeContent } from "@/content/home";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";

export function FeaturedDoctors() {
  const featured = doctors.filter((d) => d.featured).slice(0, 4);
  if (featured.length === 0) return null;

  return (
    <Section tone="brand">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Meet our team"
          title="Doctors who take the time to listen"
          description={homeContent.teamTeaser}
        />
        <ButtonLink href="/doctors" variant="outline" className="self-start md:self-auto">
          Meet our doctors
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>
      <Stagger as="div" className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4" stagger={0.1}>
        {featured.map((doctor) => (
          <StaggerItem key={doctor.slug} className="h-full">
            <DoctorCard doctor={doctor} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
