import type { ReactNode } from "react";
import { HeroBackdrop } from "@/components/motion/HeroBackdrop";
import { stagger } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";

/**
 * Banner used at the top of every inner page: breadcrumbs, the single H1, and optional lead + actions.
 * Light background, matching the homepage hero — the text uses the CSS `.rise` entrance (not JS) so
 * the H1, the LCP element, paints immediately.
 */
export function PageHero({
  title,
  eyebrow,
  description,
  breadcrumbs,
  children,
}: {
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  breadcrumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <HeroBackdrop variant="page" />
      <Container className="relative pb-14 pt-10 md:pb-16 md:pt-14">
        <div className="rise" style={stagger(0)}>
          <Breadcrumbs items={breadcrumbs} />
        </div>
        {eyebrow && (
          <p
            className="rise mt-7 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-brand-600"
            style={stagger(1)}
          >
            <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-500" />
            {eyebrow}
          </p>
        )}
        <h1
          className={`rise max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl ${eyebrow ? "mt-3" : "mt-7"}`}
          style={stagger(2)}
        >
          {title}
        </h1>
        {description && (
          <p className="rise mt-5 max-w-2xl text-lg leading-relaxed text-muted" style={stagger(3)}>
            {description}
          </p>
        )}
        {children && (
          <div className="rise mt-8 flex flex-wrap gap-3" style={stagger(4)}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
