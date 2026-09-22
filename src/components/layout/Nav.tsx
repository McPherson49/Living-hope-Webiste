"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { CalendarCheck, ChevronDown, Menu, X } from "lucide-react";
import type { NavItem } from "@/content/navigation";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  const base = href.split("#")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

function itemActive(pathname: string, item: NavItem) {
  return (
    isActive(pathname, item.href) ||
    Boolean(item.children?.some((c) => isActive(pathname, c.href)))
  );
}

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  // One pill glides between items (shared `layoutId`): it follows the pointer,
  // and rests under the current section when the pointer leaves.
  const activeHref = items.find((item) => itemActive(pathname, item))?.href ?? null;
  const highlighted = hovered ?? activeHref;

  return (
    <nav aria-label="Primary" className="hidden xl:block">
      <ul className="flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
        {items.map((item) => {
          const active = itemActive(pathname, item);
          return (
            <li
              key={item.href}
              className="group relative"
              onMouseEnter={() => setHovered(item.href)}
              onFocus={() => setHovered(item.href)}
              onBlur={() => setHovered(null)}
            >
              {highlighted === item.href && (
                <m.span
                  layoutId="nav-pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-brand-50"
                  transition={{ type: "spring", stiffness: 480, damping: 38 }}
                />
              )}
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors",
                  active ? "text-brand-800" : "text-ink hover:text-brand-800",
                )}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className="h-4 w-4 opacity-60 transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
                    aria-hidden="true"
                  />
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 pt-2 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="rounded-2xl border border-line bg-white p-2 shadow-lift">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-xl px-3 py-2 text-sm text-ink transition-colors hover:bg-brand-50 hover:text-brand-800"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};
const rowVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
};

export function MobileNav({
  items,
  whatsappHref,
}: {
  items: NavItem[];
  whatsappHref: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  const linkClass = (active: boolean) =>
    cn(
      "block rounded-xl px-3 py-3 text-base font-medium transition-colors",
      active ? "bg-brand-50 text-brand-800" : "text-ink hover:bg-brand-50",
    );

  return (
    <div className="xl:hidden" onKeyDown={(e) => e.key === "Escape" && close()}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-brand-50"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={open ? "close" : "open"}
            initial={{ rotate: open ? -90 : 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: open ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="grid place-items-center"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </m.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white shadow-xl"
          >
            <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <m.ul
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="space-y-1"
              >
                <m.li variants={rowVariants}>
                  <Link href="/" onClick={close} className={linkClass(pathname === "/")}>
                    Home
                  </Link>
                </m.li>
                {items.map((item) =>
                  item.children ? (
                    <m.li key={item.href} variants={rowVariants}>
                      <details
                        className="group"
                        open={itemActive(pathname, item) || undefined}
                      >
                        <summary
                          className={cn(
                            linkClass(itemActive(pathname, item)),
                            "flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden",
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className="h-5 w-5 text-brand-600 transition-transform group-open:rotate-180"
                            aria-hidden="true"
                          />
                        </summary>
                        <ul className="mb-2 ml-3 space-y-0.5 border-l-2 border-brand-100 pl-3">
                          <li>
                            <Link
                              href={item.href}
                              onClick={close}
                              className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                            >
                              All {item.label.toLowerCase()} →
                            </Link>
                          </li>
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={close}
                                className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-brand-50"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </m.li>
                  ) : (
                    <m.li key={item.href} variants={rowVariants}>
                      <Link
                        href={item.href}
                        onClick={close}
                        className={linkClass(isActive(pathname, item.href))}
                      >
                        {item.label}
                      </Link>
                    </m.li>
                  ),
                )}
              </m.ul>

              <div className="mt-4 grid gap-2 border-t border-line pt-4 sm:grid-cols-2">
                <Link
                  href="/book-appointment"
                  onClick={close}
                  className={buttonClass("primary", "md")}
                >
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Book an Appointment
                </Link>
                <a
                  href={whatsappHref}
                  onClick={close}
                  target={whatsappHref.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={buttonClass("whatsapp", "md")}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp us
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
