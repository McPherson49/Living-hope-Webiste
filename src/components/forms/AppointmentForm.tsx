"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CalendarCheck, LoaderCircle } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { ErrorMessage, SuccessMessage } from "./FormFeedback";
import { Field, fieldProps, inputClass } from "./Field";
import { submitEnquiry } from "./submit-enquiry";

type Department = { slug: string; name: string };
type Errors = Record<string, string>;

export function AppointmentForm({ departments }: { departments: Department[] }) {
  const params = useSearchParams();
  const requested = params.get("department") ?? "";
  const defaultDepartment = departments.some((d) => d.slug === requested)
    ? requested
    : requested === "not-sure"
      ? "not-sure"
      : "";
  const doctor = params.get("doctor")?.slice(0, 120) ?? "";

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus("submitting");
    setErrors({});
    setMessage(null);

    const result = await submitEnquiry({
      type: "appointment",
      ...data,
      consent: data.consent === "on",
    });

    if (result.ok) {
      trackEvent("appointment_request", { department: data.department });
      setFirstName(data.name.trim().split(/\s+/)[0] ?? "");
      setStatus("success");
      return;
    }

    setStatus("error");
    if (result.errors) {
      setErrors(result.errors);
      setMessage("Please check the highlighted fields and try again.");
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
    } else {
      setMessage(result.message ?? null);
    }
  }

  if (status === "success") {
    return (
      <SuccessMessage title={`Thank you${firstName ? `, ${firstName}` : ""}`}>
        <p>
          We’ve received your appointment request. A member of our team will contact you shortly
          to confirm your booking.
        </p>
        <p className="text-sm">
          If you need care urgently, please call our emergency line rather than waiting for a
          reply.
        </p>
      </SuccessMessage>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate={false} className="space-y-5" aria-label="Appointment request">
      {status === "error" && message && <ErrorMessage>{message}</ErrorMessage>}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name}>
          <input
            {...fieldProps("name", errors.name)}
            type="text"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className={inputClass}
          />
        </Field>
        <Field id="phone" label="Phone number" required error={errors.phone}>
          <input
            {...fieldProps("phone", errors.phone)}
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 0803 000 0000"
            className={inputClass}
          />
        </Field>
      </div>

      <Field
        id="email"
        label="Email"
        hint="Add it if you’d like a written confirmation."
        error={errors.email}
      >
        <input
          {...fieldProps("email", errors.email, "Add it if you’d like a written confirmation.")}
          type="email"
          maxLength={254}
          autoComplete="email"
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="department" label="Department needed" required error={errors.department}>
          <select
            {...fieldProps("department", errors.department)}
            required
            defaultValue={defaultDepartment}
            className={inputClass}
          >
            <option value="" disabled>
              Select a department…
            </option>
            {departments.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
            <option value="not-sure">Not sure / general enquiry</option>
          </select>
        </Field>
        <Field id="preferredAt" label="Preferred date & time" required error={errors.preferredAt}>
          <input
            {...fieldProps("preferredAt", errors.preferredAt)}
            type="datetime-local"
            required
            className={inputClass}
          />
        </Field>
      </div>

      {doctor && (
        <div className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-900">
          Requesting an appointment with <strong>{doctor}</strong>.
          <input type="hidden" name="doctor" value={doctor} />
        </div>
      )}

      <Field
        id="note"
        label="Brief note"
        hint="Please don’t include detailed medical information here."
        error={errors.note}
      >
        <textarea
          {...fieldProps("note", errors.note, "Please don’t include detailed medical information here.")}
          rows={4}
          maxLength={1000}
          className={inputClass}
        />
      </Field>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink">
          <input
            {...fieldProps("consent", errors.consent)}
            type="checkbox"
            required
            className="mt-1 h-5 w-5 shrink-0 rounded border-line accent-brand-700"
          />
          <span>
            I agree to be contacted about my appointment and understand my information will be
            handled in line with the hospital’s{" "}
            <Link href="/privacy-policy" className="font-semibold text-brand-700 underline">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-1.5 text-sm font-medium text-emergency">
            {errors.consent}
          </p>
        )}
        <p className="mt-2 pl-8 text-xs text-muted">
          We process your details in line with the Nigeria Data Protection Act (NDPA) 2023.
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={buttonClass("primary", "lg", "w-full sm:w-auto")}
      >
        {submitting ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Request appointment
          </>
        )}
      </button>
    </form>
  );
}
