import { COLOR_VARIANTS, PRODUCT, SHIPPING } from "@/lib/product";
import { escapeHtml, mailLayout } from "@/lib/mail";

export type OrderCustomer = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
};

export type OrderItemInput = {
  variantId: string;
  quantity: number;
};

export type OrderLine = {
  variantId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type ParsedOrder = {
  customer: OrderCustomer;
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
};

const MAX_QTY = 20;

function clip(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function parseOrderPayload(payload: unknown): {
  order?: ParsedOrder;
  empty?: boolean;
  errors: Partial<Record<keyof OrderCustomer, string>>;
} {
  const errors: Partial<Record<keyof OrderCustomer, string>> = {};
  if (!payload || typeof payload !== "object") {
    return { errors: { email: "Invalid request" } };
  }
  const body = payload as Record<string, unknown>;
  const customer: OrderCustomer = {
    email: clip(body.email, 120),
    phone: clip(body.phone, 40),
    firstName: clip(body.firstName, 80),
    lastName: clip(body.lastName, 80),
    address: clip(body.address, 160),
    apartment: clip(body.apartment, 80),
    city: clip(body.city, 80),
    state: clip(body.state, 80),
    zip: clip(body.zip, 20),
  };

  if (!customer.email || !customer.email.includes("@")) {
    errors.email = "Enter a valid email";
  }
  if (!customer.phone || customer.phone.length < 6) {
    errors.phone = "Enter a valid phone number";
  }
  if (!customer.firstName) errors.firstName = "Required";
  if (!customer.lastName) errors.lastName = "Required";
  if (!customer.address) errors.address = "Required";
  if (!customer.city) errors.city = "Required";
  if (!customer.state) errors.state = "Required";
  if (!customer.zip) errors.zip = "Required";

  const rawItems = Array.isArray(body.items) ? body.items : [];
  const lines: OrderLine[] = [];
  for (const entry of rawItems) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as { variantId?: unknown; quantity?: unknown };
    const variant = COLOR_VARIANTS.find((item) => item.id === record.variantId);
    const quantity = Number(record.quantity);
    if (!variant || !Number.isInteger(quantity) || quantity < 1) continue;
    const qty = Math.min(quantity, MAX_QTY);
    lines.push({
      variantId: variant.id,
      name: variant.name,
      quantity: qty,
      unitPrice: PRODUCT.price,
      lineTotal: PRODUCT.price * qty,
    });
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  if (lines.length === 0) {
    return { empty: true, errors: {} };
  }

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const shipping = subtotal >= SHIPPING.freeOver ? 0 : SHIPPING.flatRate;
  return {
    errors: {},
    order: {
      customer,
      lines,
      subtotal,
      shipping,
      total: subtotal + shipping,
    },
  };
}

export function formatOrderEmail(order: ParsedOrder) {
  const { customer, lines, subtotal, shipping, total } = order;
  const itemLines = lines
    .map(
      (line) =>
        `${line.quantity} x Bukket (${line.name})  $${line.lineTotal.toFixed(2)}`
    )
    .join("\n");
  const shipTo = [
    `${customer.firstName} ${customer.lastName}`,
    customer.address,
    customer.apartment,
    `${customer.city}, ${customer.state} ${customer.zip}`,
  ]
    .filter(Boolean)
    .join("\n");

  const text = [
    "BUKKET purchase",
    "",
    itemLines,
    "",
    `Subtotal: $${subtotal.toFixed(2)}`,
    `Shipping: ${shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}`,
    `Total: $${total.toFixed(2)}`,
    "",
    "Customer",
    `Name: ${customer.firstName} ${customer.lastName}`,
    `Email: ${customer.email}`,
    `Phone: ${customer.phone}`,
    "",
    "Ship to",
    shipTo,
    "",
    "Payment is not live yet. Treat this as a purchase request.",
  ].join("\n");

  const rows = lines
    .map(
      (line) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid rgba(232,226,214,0.12);">${line.quantity} x Bukket<br/><span style="color:#a39e93;font-size:13px;">${escapeHtml(line.name)}</span></td>
        <td style="padding:8px 0;border-bottom:1px solid rgba(232,226,214,0.12);text-align:right;">$${line.lineTotal.toFixed(2)}</td>
      </tr>`
    )
    .join("");

  const html = mailLayout(
    "Purchase listed",
    `<table style="width:100%;border-collapse:collapse;color:#e8e2d6;font-size:15px;">${rows}</table>
     <p style="margin:16px 0 4px;color:#a39e93;">Subtotal $${subtotal.toFixed(2)} · Shipping ${shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
     <p style="margin:0 0 20px;font-size:20px;">Total $${total.toFixed(2)}</p>
     <p style="margin:0 0 6px;color:#a39e93;text-transform:uppercase;letter-spacing:0.08em;font-size:12px;">Customer</p>
     <p style="margin:0 0 16px;white-space:pre-line;">${escapeHtml(`${customer.firstName} ${customer.lastName}`)}
${escapeHtml(customer.email)}
${escapeHtml(customer.phone)}</p>
     <p style="margin:0 0 6px;color:#a39e93;text-transform:uppercase;letter-spacing:0.08em;font-size:12px;">Ship to</p>
     <p style="margin:0;white-space:pre-line;">${escapeHtml(shipTo)}</p>
     <p style="margin:20px 0 0;color:#a39e93;font-size:13px;">Payment is not live yet. Treat this as a purchase request.</p>`
  );

  const subject = `Bukket purchase · ${customer.firstName} ${customer.lastName} · $${total.toFixed(2)}`;
  return { subject, text, html, replyTo: customer.email };
}
