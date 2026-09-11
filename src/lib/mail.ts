import nodemailer from "nodemailer";

export const MAIL_TO = process.env.MAIL_TO ?? "gal@gmail.com";

export type MailMessage = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function mailLayout(title: string, bodyHtml: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#1b211c;color:#e8e2d6;font-family:Georgia,serif;">
    <div style="max-width:560px;margin:0 auto;padding:24px;border:1px solid rgba(232,226,214,0.16);border-radius:16px;background:#272e28;">
      <p style="margin:0 0 8px;letter-spacing:0.08em;text-transform:uppercase;color:#a39e93;font-size:12px;">the BUKKET experience</p>
      <h1 style="margin:0 0 20px;font-weight:400;font-size:28px;color:#e8e2d6;">${escapeHtml(title)}</h1>
      ${bodyHtml}
    </div>
  </body>
</html>`;
}

async function sendViaSmtp(message: MailMessage) {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return false;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `Bukket shop <${user}>`,
    to: MAIL_TO,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });
  return true;
}

async function sendViaFormSubmit(message: MailMessage) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(MAIL_TO)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: message.subject,
      _template: "box",
      _captcha: "false",
      ...(message.replyTo ? { _replyto: message.replyTo, email: message.replyTo } : {}),
      message: message.text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Mail service responded ${response.status}`);
  }
}

export async function sendMail(message: MailMessage) {
  const sentSmtp = await sendViaSmtp(message);
  if (sentSmtp) return { provider: "smtp" as const };
  await sendViaFormSubmit(message);
  return { provider: "formsubmit" as const };
}
