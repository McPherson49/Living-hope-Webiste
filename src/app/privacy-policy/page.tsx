import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Copy } from "@/components/ui/Copy";
import { PageHero } from "@/components/ui/PageHero";
import { mailtoHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | Living Hope Hospital, Ile-Ife",
  description:
    "How Living Hope Hospital collects, uses and protects the personal information you share on this website, in line with the Nigeria Data Protection Act 2023.",
  path: "/privacy-policy",
});

/*
 * DRAFT for legal review. Written to match what this website actually does
 * (appointment + contact forms, optional analytics) and the Nigeria Data
 * Protection Act (NDPA) 2023 — confirm retention periods, the hospital's data
 * protection contact and any DPO/registration details before launch.
 */
export default function PrivacyPolicyPage() {
  const { email, street, area } = site.contact;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect the personal information you share with us through this website."
        breadcrumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]}
      />

      <Container className="max-w-3xl py-14 md:py-20">
        <div className="prose prose-lg article max-w-none prose-headings:font-display prose-a:font-semibold">
          <p>
            <strong>Last updated:</strong> <Copy>[date]</Copy>
          </p>

          <h2>Who we are</h2>
          <p>
            {site.name} (“we”, “us”) is a private hospital at{" "}
            <Copy>{`${street}, ${area}`}</Copy>. We are responsible for the personal information
            collected through this website. You can reach us about privacy at{" "}
            <a href={mailtoHref(email)}>
              <Copy>{email}</Copy>
            </a>
            .
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Appointment requests:</strong> your name, phone number, optional email
              address, the department you need, your preferred date and time, any doctor you ask
              for, and the note you choose to add.
            </li>
            <li>
              <strong>Contact messages:</strong> your name, phone number, optional email address
              and your message.
            </li>
            <li>
              <strong>Website usage:</strong> we may use Google Analytics to understand how the
              site is used — pages visited, device type, and clicks on call and WhatsApp links.
              This information is aggregated and is not used to identify you.
            </li>
          </ul>
          <p>
            Please <strong>do not put detailed medical information</strong> in our web forms.
            Health information is sensitive personal data; we collect it in person, during your
            care, under our duty of confidentiality.
          </p>

          <h2>Why we use it</h2>
          <p>
            We use your details only to respond to your request — to confirm or arrange your
            appointment, answer your question, and contact you about it. We rely on your consent,
            which you give by ticking the box on each form. We do not use your details for
            marketing unless you separately agree.
          </p>

          <h2>Who we share it with</h2>
          <p>
            Your information is seen by the hospital staff who handle bookings and enquiries. We
            use trusted service providers to run this website (for example hosting and email
            delivery), who may process it on our behalf under confidentiality obligations. We do
            not sell personal information. We may disclose it where the law requires.
          </p>

          <h2>How long we keep it</h2>
          <p>
            <Copy>[Insert retention period, e.g. appointment requests are deleted after X months.]</Copy>
          </p>

          <h2>Your rights under the NDPA 2023</h2>
          <p>Under the Nigeria Data Protection Act 2023 you have the right to:</p>
          <ul>
            <li>be informed about how your data is used and ask for a copy of it;</li>
            <li>have inaccurate data corrected;</li>
            <li>ask us to delete your data or restrict how we use it;</li>
            <li>object to certain uses and withdraw your consent at any time;</li>
            <li>receive your data in a portable format where applicable.</li>
          </ul>
          <p>
            To use any of these rights, contact us using the details above. You may also complain
            to the Nigeria Data Protection Commission (NDPC) if you believe your data has been
            handled unlawfully.
          </p>

          <h2>Keeping your information safe</h2>
          <p>
            This website is served over HTTPS, and we limit access to the information you send us
            to the staff who need it. No online system is completely risk-free, so if something
            is urgent please call us instead.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The date at the top shows when it last
            changed.
          </p>

          <p>
            Questions? <Link href="/contact">Contact us</Link>.
          </p>
        </div>
      </Container>
    </>
  );
}
