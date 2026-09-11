export const CONTACT = {
  email: "hello@bukket.com",
  phoneDisplay: "+972(0)558859702",
  phoneTel: "+972558859702",
  lines: ["Kibbutz Regavim", "Menashe, 37820", "Israel"] as const,
} as const;

export type ContactForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
};

export type ContactField = keyof ContactForm;

export const EMPTY_CONTACT_FORM: ContactForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  country: "",
};

export function validateContactForm(form: ContactForm) {
  const errors: Partial<Record<ContactField, string>> = {};
  if (!form.firstName.trim()) errors.firstName = "Required";
  if (!form.lastName.trim()) errors.lastName = "Required";
  if (!form.phone.trim() || form.phone.trim().length < 6) {
    errors.phone = "Enter a valid phone number";
  }
  if (!form.email.trim() || !form.email.includes("@")) {
    errors.email = "Enter a valid email";
  }
  if (!form.country.trim()) errors.country = "Required";
  return errors;
}

export function formatContactEmail(form: ContactForm) {
  const subject = `Bukket contact from ${form.firstName} ${form.lastName}`;
  const text = [
    `Name: ${form.firstName} ${form.lastName}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Country: ${form.country}`,
  ].join("\n");
  return { subject, text, replyTo: form.email };
}
