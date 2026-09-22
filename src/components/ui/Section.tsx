import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "white" | "mist" | "brand" | "dark";

const tones: Record<Tone, string> = {
  white: "bg-white",
  mist: "bg-mist",
  brand: "bg-brand-50",
  dark: "bg-brand-950 text-white",
};

export function Section({
  tone = "white",
  id,
  className,
  reveal = false,
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  /** Fade the whole section in as it scrolls into view. Leave off when the children animate themselves. */
  reveal?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-16 md:py-24", tones[tone], className)}>
      <Container>{reveal ? <Reveal y={20}>{children}</Reveal> : children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em]",
            onDark ? "text-accent-300" : "text-brand-600",
          )}
        >
          <span
            aria-hidden="true"
            className={cn("h-0.5 w-6 rounded-full", onDark ? "bg-accent-300" : "bg-accent-500")}
          />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-bold leading-tight sm:text-4xl",
          onDark ? "text-white" : "text-brand-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            onDark ? "text-brand-100" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
