import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { serviceLinks } from "@/content/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Living Hope Hospital",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-mist py-20 md:py-28">
      <Container className="max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-brand-900 sm:text-5xl">
          We couldn’t find that page
        </h1>
        <p className="mt-4 text-lg text-muted">
          The link may be old or mistyped. Try one of these instead — or, if you
          need urgent care, use the Emergency Line at the top of the page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/book-appointment" variant="outline" size="lg">
            Book an appointment
          </ButtonLink>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-2 text-sm">
          {serviceLinks.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="inline-block rounded-full border border-line bg-white px-4 py-2 text-ink hover:border-brand-300 hover:text-brand-800"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
