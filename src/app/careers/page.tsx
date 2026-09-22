import { Mail } from "lucide-react";
import { openings } from "@/content/careers";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Copy } from "@/components/ui/Copy";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { mailtoHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers at Living Hope Hospital | Ile-Ife",
  description:
    "Join the team at Living Hope Hospital, Parakin, Ile-Ife. View current openings or send us your CV.",
  path: "/careers",
});

const values = [
  ["Compassion", "Every patient is treated with dignity and warmth."],
  ["Excellence", "We hold ourselves to high clinical standards."],
  ["Integrity", "Honest, transparent care and communication."],
  ["Accessibility", "Quality healthcare should be within reach, not out of reach."],
  ["Community", "We exist to serve Ile-Ife and grow alongside it."],
] as const;

export default function CareersPage() {
  const { email } = site.contact;

  return (
    <>
      <PageHero
        eyebrow="Join our team"
        title="Careers at Living Hope Hospital"
        description="We’re always glad to hear from skilled, compassionate healthcare professionals who share our commitment to patient-first care."
        breadcrumbs={[{ name: "Careers", path: "/careers" }]}
      />

      <Section tone="white" reveal>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold text-brand-900 sm:text-3xl">Current openings</h2>

            {openings.length > 0 ? (
              <ul className="mt-6 space-y-4">
                {openings.map((job) => (
                  <li key={job.title} className="rounded-2xl border border-line bg-mist p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-600">
                      {job.department}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-brand-900">{job.title}</h3>
                    <p className="mt-2 text-muted">{job.description}</p>
                    <ButtonLink
                      href={mailtoHref(email, `Application: ${job.title}`)}
                      variant="outline"
                      size="sm"
                      className="mt-4"
                    >
                      Apply by email
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-lg leading-relaxed text-ink/90">
                We have no open positions at the moment, but you’re welcome to send your CV to{" "}
                <Copy>{email}</Copy> for future consideration.
              </p>
            )}

            <ButtonLink
              href={mailtoHref(email, "CV submission")}
              variant="primary"
              size="lg"
              className="mt-8"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              Send your CV
            </ButtonLink>
          </div>

          <div className="rounded-3xl bg-brand-50 p-8">
            <SectionHeading title="What we stand for" />
            <ul className="mt-6 space-y-4">
              {values.map(([name, text]) => (
                <li key={name}>
                  <p className="font-semibold text-brand-900">{name}</p>
                  <p className="text-muted">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
