/**
 * Minimal transactional email via the Resend REST API (no SDK dependency).
 * Swap this file out if the hospital prefers another provider (SMTP, SendGrid…).
 *
 * Required env vars: RESEND_API_KEY, EMAIL_FROM, FRONT_DESK_EMAIL (comma-separated).
 */

export type MailConfig = { apiKey: string; from: string; frontDesk: string[] };

export function getMailConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const frontDesk = (process.env.FRONT_DESK_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!apiKey || !from || frontDesk.length === 0) return null;
  return { apiKey, from, frontDesk };
}

type Mail = {
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendMail(config: MailConfig, mail: Mail) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      reply_to: mail.replyTo,
    }),
  });
  if (!res.ok) {
    throw new Error(`Email provider responded with ${res.status}`);
  }
}
