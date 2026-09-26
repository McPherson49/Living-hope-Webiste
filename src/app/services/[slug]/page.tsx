import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Phone } from "lucide-react"; // + CalendarCheck when the Book button is restored
import { doctors } from "@/content/doctors";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";
import { PostCard } from "@/components/blog/PostCard";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
// import { BookCard } from "@/components/ui/BookCard"; // restore with the Book panel in the sidebar
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { EmergencyBand } from "@/components/ui/EmergencyBand";
import { FaqList } from "@/components/ui/FaqList";
import { ServiceIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { getAllPosts, getPostsForService } from "@/lib/blog";
import { telHref } from "@/lib/contact";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const team = doctors.filter((d) => d.department === service.slug);
  const related = getPostsForService(service.slug, 2);
  const posts = related.length > 0 ? related : getAllPosts().slice(0, 2);
  const others = services.filter((s) => s.slug !== service.slug);
  const isEmergency = service.slug === "emergency-trauma-care";

  return (
    <>
      <JsonLd data={service.faqs ? faqJsonLd(service.faqs) : null} />

      <PageHero
        eyebrow="Living Hope Hospital · Parakin, Ile-Ife"
        title={service.h1}
        description={service.summary}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      >
        {isEmergency && (
          <ButtonLink href={telHref(site.contact.emergencyPhone)} variant="emergency" size="lg">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call Emergency Line
          </ButtonLink>
        )}
        {/* "Book this service" hidden for now (it was the non-emergency alternative to the button above).
            To restore, put this back as the `else` branch of `isEmergency ? … : …`, and set the Call
            button below back to variant="outline":
          <ButtonLink
            href={`/book-appointment?department=${service.slug}`}
            variant="primary"
            size="lg"
          >
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Book this service
          </ButtonLink>
        */}
        <ButtonLink
          href={telHref(site.contact.phone)}
          variant={isEmergency ? "outline" : "primary"}
          size="lg"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span>
            Call <Copy>{site.contact.phone}</Copy>
          </span>
        </ButtonLink>
      </PageHero>

      <Container className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_22rem] lg:gap-16">
        <div className="min-w-0 space-y-14">
          <article>
            <div className="flex items-center gap-3">
              <span
                className={`grid h-12 w-12 place-items-center rounded-xl ${isEmergency ? "bg-red-50 text-emergency" : "bg-brand-50 text-brand-700"}`}
              >
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </span>
              <h2 className="text-2xl font-semibold text-brand-900 sm:text-3xl">
                About our {service.name.toLowerCase()} service
              </h2>
            </div>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/90">
              {service.body.map((paragraph) => (
                <p key={paragraph}>
                  <Copy>{paragraph}</Copy>
                </p>
              ))}
            </div>

            {service.highlights && (
              <Reveal className="mt-8 rounded-3xl border border-brand-100 bg-mist p-6 sm:p-8">
                <h3 className="text-xl font-bold text-brand-900">
                  {service.highlights.heading}
                </h3>
                <Stagger as="ul" className="mt-5 grid gap-3 sm:grid-cols-2" stagger={0.06}>
                  {service.highlights.items.map((item) => (
                    <StaggerItem as="li" key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="leading-snug">{item}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Reveal>
            )}
          </article>

          {service.faqs && (
            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-semibold text-brand-900 sm:text-3xl">
                Frequently asked questions
              </h2>
              <Reveal className="mt-6">
                <FaqList faqs={service.faqs} />
              </Reveal>
            </section>
          )}

          {team.length > 0 && (
            <section aria-labelledby="team-heading">
              <h2 id="team-heading" className="text-2xl font-semibold text-brand-900 sm:text-3xl">
                Our {service.name} team
              </h2>
              <Stagger className="mt-6 grid gap-6 md:grid-cols-2">
                {team.map((doctor) => (
                  <StaggerItem key={doctor.slug} className="h-full">
                    <DoctorCard doctor={doctor} />
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )}

          {posts.length > 0 && (
            <section aria-labelledby="posts-heading">
              <h2 id="posts-heading" className="text-2xl font-semibold text-brand-900 sm:text-3xl">
                {related.length > 0 ? "Related reading" : "From our health blog"}
              </h2>
              <Stagger className="mt-6 grid gap-6 md:grid-cols-2">
                {posts.map((post) => (
                  <StaggerItem key={post.slug} className="relative h-full">
                    <PostCard post={post} />
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {/* "Book this service" / "Book a follow-up" panel hidden for now. To restore, uncomment this
              and the BookCard + CalendarCheck imports.
          <Reveal x={30} y={0}>
            <BookCard
              title={isEmergency ? "Book a follow-up" : "Book this service"}
              department={service.slug}
              message={`Hello Living Hope Hospital, I would like to book an appointment for ${service.name}.`}
            />
          </Reveal>
          */}
          <nav
            aria-label="Other services"
            className="rounded-3xl border border-line bg-white p-6 shadow-card"
          >
            <h2 className="text-lg font-semibold text-brand-900">Other services</h2>
            <ul className="mt-3 space-y-1">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="block rounded-lg px-2 py-1.5 text-sm text-ink hover:bg-brand-50 hover:text-brand-800"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </Container>

      <EmergencyBand />
    </>
  );
}
