import { cn } from "@/lib/utils";

/** A cross rising over a sunrise arc: care + hope. Same drawing as app/icon.svg. */
export function LogoMark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="40" height="40" rx="11" fill={light ? "#ffffff" : "#1a54a6"} />
      <path
        d="M20 8.5v13M13.5 15h13"
        stroke={light ? "#1a54a6" : "#ffffff"}
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M11 31.5a9 9 0 0 1 18 0"
        fill="none"
        stroke={light ? "#0aa9c9" : "#5fe0f3"}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <span className="group/logo flex items-center gap-3">
      <LogoMark
        className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover/logo:-rotate-6 group-hover/logo:scale-105 motion-reduce:transition-none motion-reduce:group-hover/logo:transform-none"
        tone={tone}
      />
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-xl font-bold tracking-tight",
            light ? "text-white" : "text-brand-900",
          )}
        >
          Living Hope
        </span>
        <span
          className={cn(
            "mt-1 hidden text-[0.66rem] font-semibold uppercase tracking-[0.18em] sm:block",
            light ? "text-brand-200" : "text-brand-600",
          )}
        >
          Hospital · Ile-Ife
        </span>
      </span>
    </span>
  );
}
