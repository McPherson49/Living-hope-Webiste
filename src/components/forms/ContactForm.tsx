"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { ErrorMessage, SuccessMessage } from "./FormFeedback";
import { Field, fieldProps, inputClass } from "./Field";
import { submitEnquiry } from "./submit-enquiry";

type Errors = Record<string, string>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus("submitting");
    setErrors({});
    setMessage(null);

    const result = await submitEnquiry({
      type: "contact",
      ...data,
      consent: data.consent === "on",
    });

    if (result.ok) {
      trackEvent("contact_form_submit");
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
      <SuccessMessage title="Message sent">
        <p>Thank you — our team will get back to you as soon as possible.</p>
        <p className="text-sm">
          If you need care urgently, please call our emergency line instead of waiting for a reply.
        </p>
      </SuccessMessage>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" aria-label="Contact us">
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
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="email" label="Email" error={errors.email}>
        <input
          {...fieldProps("email", errors.email)}
          type="email"
          maxLength={254}
          autoComplete="email"
          className={inputClass}
        />
      </Field>

      <Field
        id="message"
        label="How can we help?"
        required
        hint="Please don’t include detailed medical information here."
        error={errors.message}
      >
        <textarea
          {...fieldProps("message", errors.message, "Please don’t include detailed medical information here.")}
          rows={5}
          required
          minLength={10}
          maxLength={2000}
          className={inputClass}
        />
      </Field>

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
            I agree to be contacted about my enquiry and understand my information will be handled
            in line with the hospital’s{" "}
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
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClass("primary", "lg", "w-full sm:w-auto")}
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
