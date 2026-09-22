import { site } from "@/content/site";
import { FeaturedDoctors } from "@/components/home/FeaturedDoctors";
import { FindUs } from "@/components/home/FindUs";
import { Hero } from "@/components/home/Hero";
import { LatestPosts } from "@/components/home/LatestPosts";
import { QuickActions } from "@/components/home/QuickActions";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { StatsBar } from "@/components/home/StatsBar";
import { Testimonials } from "@/components/home/Testimonials";
import { VisitSteps } from "@/components/home/VisitSteps";
import { WhyChoose } from "@/components/home/WhyChoose";
import { EmergencyBand } from "@/components/ui/EmergencyBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section, SectionHeading } from "@/components/ui/Section";
import { buildMetadata, hospitalJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Living Hope Hospital | Private Hospital in Parakin, Ile-Ife",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={hospitalJsonLd()} />
      <Hero />
      <QuickActions />
      <WhyChoose />

      <Section tone="white">
        <SectionHeading
          align="center"
          eyebrow="Our services"
          title="Complete care under one roof"
          description="From emergencies to everyday family health — every department is here in Parakin, so you don’t have to travel across town for the care you need."
        />
        <div className="mt-12">
          <ServicesGrid />
        </div>
      </Section>

      <FeaturedDoctors />
      <VisitSteps />
      <StatsBar />
      <Testimonials />
      <EmergencyBand />
      <LatestPosts />
      <FindUs />
    </>
  );
}
