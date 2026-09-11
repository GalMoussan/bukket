import { NextResponse } from "next/server";
import {
  formatContactEmail,
  validateContactForm,
  type ContactForm,
} from "@/lib/contact";
import { escapeHtml, mailLayout, sendMail } from "@/lib/mail";

function readField(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 200) : "";
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const form: ContactForm = {
    firstName: readField(body.firstName),
    lastName: readField(body.lastName),
    phone: readField(body.phone),
    email: readField(body.email),
    country: readField(body.country),
  };

  const errors = validateContactForm(form);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Check the form", errors }, { status: 400 });
  }

  const message = formatContactEmail(form);
  try {
    await sendMail({
      ...message,
      html: mailLayout(
        "Shop message",
        `<p style="white-space:pre-line;margin:0;">${escapeHtml(message.text)}</p>`
      ),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not send the message. Try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
