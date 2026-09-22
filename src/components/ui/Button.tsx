import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "emergency"
  | "whatsapp"
  | "outline"
  | "outlineLight"
  | "white"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/*
 * Hover: a small lift and a soft light sweep across the button. Press: a tiny
 * squash. All of it switches off for visitors who prefer reduced motion.
 */
const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 before:pointer-events-none before:absolute before:inset-y-0 before:-left-full before:w-full before:bg-linear-to-r before:from-transparent before:via-white/25 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-[200%] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 motion-reduce:before:hidden";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-700 text-white shadow-md shadow-brand-700/25 hover:bg-brand-800 hover:shadow-lg hover:shadow-brand-700/30",
  accent:
    "bg-accent-300 text-brand-950 shadow-md shadow-accent-400/25 hover:bg-accent-200 hover:shadow-lg",
  emergency:
    "bg-emergency text-white shadow-md shadow-red-900/25 hover:bg-emergency-dark hover:shadow-lg",
  whatsapp:
    "bg-whatsapp text-white shadow-md shadow-green-900/25 hover:bg-whatsapp-dark hover:shadow-lg",
  outline: "border-2 border-brand-700 text-brand-800 hover:bg-brand-50",
  outlineLight:
    "border-2 border-white/60 text-white hover:border-white hover:bg-white/10",
  white: "bg-white text-emergency shadow-md hover:bg-red-50 hover:shadow-lg",
  ghost: "text-brand-800 hover:bg-brand-50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-7 py-3.5 text-base sm:text-lg",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** Internal paths use next/link; tel:, mailto: and https: links use a plain anchor. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClass(variant, size, className);

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
