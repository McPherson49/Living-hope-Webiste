import { z } from "zod";
import { getService } from "@/content/services";

/**
 * Server-side validation for the appointment and contact forms.
 * (The browser forms use native HTML validation; this is the source of truth.)
 */

const name = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(100, "That name is too long.");

const phone = z
  .string()
  .trim()
  .refine((v) => {
    const digits = v.replace(/\D/g, "");
    return /^\+?[\d\s\-()]{7,20}$/.test(v) && digits.length >= 7 && digits.length <= 15;
  }, "Please enter a valid phone number.");

const optionalEmail = z
  .string()
  .trim()
  .max(254)
  .refine(
    (v) => v === "" || z.email().safeParse(v).success,
    "Please enter a valid email address.",
  )
  .optional();

const consent = z
  .boolean()
  .refine((v) => v === true, "Please tick the box so we can contact you.");

/** Hidden field real users never fill in — bots do. */
const honeypot = z.string().max(200).optional();

export const appointmentSchema = z.object({
  type: z.literal("appointment"),
  name,
  phone,
  email: optionalEmail,
  department: z
    .string()
    .trim()
    .refine(
      (v) => v === "not-sure" || Boolean(getService(v)),
      "Please choose a department.",
    ),
  doctor: z.string().trim().max(120).optional(),
  preferredAt: z
    .string()
    .trim()
    .min(1, "Please choose a preferred date and time.")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Please enter a valid date and time.")
    .refine(
      (v) => Date.parse(v) > Date.now() - 24 * 60 * 60 * 1000,
      "Please choose a date and time in the future.",
    ),
  note: z.string().trim().max(1000, "Please keep this under 1,000 characters.").optional(),
  consent,
  website: honeypot,
});

export const contactSchema = z.object({
  type: z.literal("contact"),
  name,
  phone,
  email: optionalEmail,
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(2000, "Please keep your message under 2,000 characters."),
  consent,
  website: honeypot,
});

export const enquirySchema = z.discriminatedUnion("type", [
  appointmentSchema,
  contactSchema,
]);

export type Enquiry = z.infer<typeof enquirySchema>;

/** First error message per field, for showing next to inputs. */
export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
