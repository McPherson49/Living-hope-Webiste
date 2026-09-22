import { Phone } from "lucide-react";
import { generalFaqs } from "@/content/faqs";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { FaqList } from "@/components/ui/FaqList";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { telHref, whatsappHref } from "@/lib/contact";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions | Living Hope Hospital",
  description:
    "Answers to common questions about services, hours, appointments, and more at Living Hope Hospital, Parakin, Ile-Ife.",
  path: "/faqs",
});

export default function FaqsPage() {
  const c = site.contact;

  return (
    <>
      <JsonLd data={faqJsonLd(generalFaqs)} />

      <PageHero
        eyebrow="Patient information"
        title="Frequently Asked Questions"
        description="Quick answers about our services, opening hours, appointments and more."
        breadcrumbs={[{ name: "FAQs", path: "/faqs" }]}
      />

      <Container className="max-w-4xl py-14 md:py-20">
        <Reveal>
          <FaqList faqs={generalFaqs} />
        </Reveal>

        <Reveal className="mt-12 rounded-3xl border border-brand-100 bg-brand-50 p-8 text-center sm:p-10">
          <h2 className="text-2xl font-semibold text-brand-900">Still have a question?</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            Our team is happy to help — call us or send a WhatsApp message.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href={telHref(c.phone)} variant="primary" size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span>
                Call <Copy>{c.phone}</Copy>
              </span>
            </ButtonLink>
            <ButtonLink href={whatsappHref(c.whatsapp)} variant="whatsapp" size="lg">
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp us
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Contact us
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
