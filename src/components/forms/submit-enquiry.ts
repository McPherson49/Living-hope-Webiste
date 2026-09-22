export type SubmitResult =
  | { ok: true }
  | { ok: false; errors?: Record<string, string>; message?: string };

const GENERIC =
  "Something went wrong while sending your request. Please call or WhatsApp us instead.";

/** Posts a form to /api/enquiry and normalises the response for the UI. */
export async function submitEnquiry(
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));

    if (res.ok && json.ok) return { ok: true };
    if (res.status === 400 && json.errors) {
      return { ok: false, errors: json.errors as Record<string, string> };
    }
    return { ok: false, message: json.message ?? GENERIC };
  } catch {
    return {
      ok: false,
      message:
        "We couldn’t reach the server — please check your connection and try again, or call us instead.",
    };
  }
}
