import { getService } from "@/content/services";
import { site } from "@/content/site";
import { realValue } from "@/lib/contact";
import { getMailConfig, sendMail } from "@/lib/email";
import { enquirySchema, fieldErrors, type Enquiry } from "@/lib/validation";

const UNAVAILABLE_MESSAGE =
  "We couldn’t send your request just now. Please call or WhatsApp us instead — we’ll be glad to help.";

function departmentName(slug: string) {
  return getService(slug)?.name ?? "Not sure / general enquiry";
}

/** Plain-text summary for the front desk. */
function frontDeskMessage(data: Enquiry) {
  const lines =
    data.type === "appointment"
      ? [
          "New APPOINTMENT request",
          "",
          `Name:            ${data.name}`,
          `Phone:           ${data.phone}`,
          `Email:           ${data.email || "—"}`,
          `Department:      ${departmentName(data.department)}`,
          `Preferred doctor: ${data.doctor || "—"}`,
          `Preferred time:  ${data.preferredAt.replace("T", " ")}`,
          `Note:            ${data.note || "—"}`,
        ]
      : [
          "New website ENQUIRY",
          "",
          `Name:    ${data.name}`,
          `Phone:   ${data.phone}`,
          `Email:   ${data.email || "—"}`,
          "",
          data.message,
        ];
  lines.push("", "Consent to be contacted: yes (ticked on the website form)");
  return lines.join("\n");
}

function autoReplyMessage(data: Enquiry) {
  const firstName = data.name.split(/\s+/)[0];
  const phone = realValue(site.contact.emergencyPhone);
  const emergency = phone
    ? `call our emergency line on ${phone}`
    : "call our emergency line";
  const about =
    data.type === "appointment"
      ? `your appointment request for ${departmentName(data.department)} (${data.preferredAt.replace("T", " ")})`
      : "your message";

  return [
    `Hello ${firstName},`,
    "",
    `Thank you for contacting ${site.name}. We have received ${about} and our team will get back to you on ${data.phone} to confirm.`,
    "",
    `If this is a medical emergency, please don’t wait for a reply — ${emergency} or go to your nearest emergency unit.`,
    "",
    site.name,
    realValue(site.contact.street)
      ? `${site.contact.street}, ${site.contact.area}`
      : site.contact.area,
  ].join("\n");
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 20_000) {
    return Response.json(
      { ok: false, message: "That request was too large." },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "We couldn’t read that request." },
      { status: 400 },
    );
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, errors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Honeypot: pretend it worked so bots don't retry.
  if (data.website) return Response.json({ ok: true });

  const mail = getMailConfig();
  if (!mail) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        `\n[enquiry] Email isn't configured, so nothing was sent. Submission:\n${frontDeskMessage(data)}\n`,
      );
      return Response.json({ ok: true });
    }
    // Never tell a patient their request was sent when it wasn't.
    console.error("[enquiry] RESEND_API_KEY / EMAIL_FROM / FRONT_DESK_EMAIL not set");
    return Response.json({ ok: false, message: UNAVAILABLE_MESSAGE }, { status: 503 });
  }

  try {
    await sendMail(mail, {
      to: mail.frontDesk,
      subject:
        data.type === "appointment"
          ? `Appointment request: ${data.name} — ${departmentName(data.department)}`
          : `Website enquiry: ${data.name}`,
      text: frontDeskMessage(data),
      replyTo: data.email || undefined,
    });
  } catch (error) {
    console.error("[enquiry] failed to email front desk", error);
    return Response.json({ ok: false, message: UNAVAILABLE_MESSAGE }, { status: 502 });
  }

  // Auto-reply is best effort: the front desk already has the request.
  if (data.email) {
    try {
      await sendMail(mail, {
        to: [data.email],
        subject: `We received your request — ${site.name}`,
        text: autoReplyMessage(data),
      });
    } catch (error) {
      console.error("[enquiry] failed to send auto-reply", error);
    }
  }

  return Response.json({ ok: true });
}
