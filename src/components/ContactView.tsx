"use client";

import { useState, type FormEvent } from "react";
import {
  CONTACT,
  EMPTY_CONTACT_FORM,
  validateContactForm,
  type ContactField,
  type ContactForm,
} from "@/lib/contact";

type FieldErrors = Partial<Record<ContactField, string>>;

export default function ContactView() {
  const [form, setForm] = useState<ContactForm>(EMPTY_CONTACT_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const setField = (field: ContactField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(form);
    setErrors(nextErrors);
    const firstError = (Object.keys(nextErrors) as ContactField[])[0];
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    setBusy(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setSubmitError(data.error ?? "Could not send the message. Try again.");
        return;
      }
      setSubmitted(true);
      setForm(EMPTY_CONTACT_FORM);
    } catch {
      setSubmitError("Could not send the message. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="page-gutter py-10 md:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow mb-2">Write us</p>
        <h1 className="display mb-3 text-5xl md:text-6xl">Contact us</h1>
        <p className="max-w-md text-[0.98rem] leading-relaxed text-muted">
          Questions, parts, or just a good story. Fill this in and we&apos;ll
          get the message in the shop.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)] lg:gap-12">
        <form onSubmit={handleSubmit} className="panel p-6 md:p-8" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="contact-firstName"
              label="Name"
              value={form.firstName}
              autoComplete="given-name"
              error={errors.firstName}
              onChange={(value) => setField("firstName", value)}
            />
            <Field
              id="contact-lastName"
              label="Last name"
              value={form.lastName}
              autoComplete="family-name"
              error={errors.lastName}
              onChange={(value) => setField("lastName", value)}
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              id="contact-phone"
              label="Phone number"
              type="tel"
              value={form.phone}
              autoComplete="tel"
              error={errors.phone}
              onChange={(value) => setField("phone", value)}
            />
            <Field
              id="contact-email"
              label="Email"
              type="email"
              value={form.email}
              autoComplete="email"
              error={errors.email}
              onChange={(value) => setField("email", value)}
            />
          </div>
          <div className="mt-4">
            <Field
              id="contact-country"
              label="Country"
              value={form.country}
              autoComplete="country-name"
              error={errors.country}
              onChange={(value) => setField("country", value)}
            />
          </div>

          {submitError ? (
            <p className="mt-4 text-sm text-terracotta" role="alert">
              {submitError}
            </p>
          ) : null}
          <button
            type="submit"
            className="btn btn-primary mt-6"
            disabled={busy}
          >
            {busy ? "Sending…" : "Send us an email"}
          </button>

          {submitted ? (
            <p className="mt-4 text-sm text-sage">
              Sent. We&apos;ll get it in the shop inbox.
            </p>
          ) : null}
        </form>

        <aside className="chalkboard px-6 py-8 md:px-8">
          <p className="note-hand mb-4 text-2xl text-[#e8e0c8]">The shop</p>
          <address className="not-italic text-[0.98rem] leading-relaxed text-[#d9d0b4]">
            {CONTACT.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="mt-4">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="text-cream underline decoration-terracotta/70 underline-offset-4 hover:text-terracotta"
              >
                {CONTACT.phoneDisplay}
              </a>
            </p>
          </address>
        </aside>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <label htmlFor={id} className="block text-sm">
      <span className="mb-1.5 block font-bold text-muted">{label}</span>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
      />
      {error ? (
        <span id={errorId} className="mt-1 block text-xs text-terracotta">
          {error}
        </span>
      ) : null}
    </label>
  );
}
