"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import type { Doctor } from "@/content/doctors";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { DoctorCard } from "./DoctorCard";

/**
 * Doctor grid with a department filter. Switching departments slides the
 * remaining cards into their new places (layout animation) while the others
 * fade out, and the active pill glides between filters.
 */
export function DoctorsExplorer({
  doctors,
  departments,
}: {
  doctors: Doctor[];
  departments: { slug: string; name: string }[];
}) {
  const [selected, setSelected] = useState("all");
  const visible =
    selected === "all" ? doctors : doctors.filter((d) => d.department === selected);

  return (
    <>
      {departments.length > 1 && (
        <div role="group" aria-label="Filter doctors by department" className="flex flex-wrap gap-2">
          {[{ slug: "all", name: "All departments" }, ...departments].map((d) => {
            const active = selected === d.slug;
            return (
              <button
                key={d.slug}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(d.slug)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-transparent text-white"
                    : "border-line bg-white text-ink hover:border-brand-300 hover:bg-brand-50",
                )}
              >
                {active && (
                  <m.span
                    layoutId="doctor-filter-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-brand-700 shadow-md shadow-brand-700/30"
                    transition={SPRING}
                  />
                )}
                <span className="relative">{d.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "doctor" : "doctors"}
      </p>

      <m.div layout className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((doctor) => (
            <m.div
              key={doctor.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="h-full"
            >
              <DoctorCard doctor={doctor} />
            </m.div>
          ))}
        </AnimatePresence>
      </m.div>
    </>
  );
}
