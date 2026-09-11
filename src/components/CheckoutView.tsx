"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCT, SHIPPING } from "@/lib/product";

function useHasHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

type CheckoutForm = {
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

type FieldErrors = Partial<Record<keyof CheckoutForm, string>>;

const EMPTY_FORM: CheckoutForm = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
};

function shippingFor(subtotal: number) {
  return subtotal >= SHIPPING.freeOver ? 0 : SHIPPING.flatRate;
}

function validate(form: CheckoutForm): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.email.trim() || !form.email.includes("@")) {
    errors.email = "Enter a valid email";
  }
  if (!form.phone.trim() || form.phone.trim().length < 6) {
    errors.phone = "Enter a valid phone number";
  }
  if (!form.firstName.trim()) errors.firstName = "Required";
  if (!form.lastName.trim()) errors.lastName = "Required";
  if (!form.address.trim()) errors.address = "Required";
  if (!form.city.trim()) errors.city = "Required";
  if (!form.state.trim()) errors.state = "Required";
  if (!form.zip.trim()) errors.zip = "Required";
  return errors;
}

export default function CheckoutView() {
  const hydrated = useHasHydrated();
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [placedTotal, setPlacedTotal] = useState(0);
  const [placedCount, setPlacedCount] = useState(0);

  const shipping = shippingFor(total);
  const grandTotal = total + shipping;

  const setField = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitError("");
    const firstError = (Object.keys(nextErrors) as (keyof CheckoutForm)[])[0];
    if (firstError) {
      document.getElementById(`checkout-${firstError}`)?.focus();
      return;
    }
    if (items.length === 0) return;

    setBusy(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            variantId: item.variant.id,
            quantity: item.quantity,
          })),
        }),
      });
      const data = (await response.json()) as {
        error?: string;
        errors?: FieldErrors;
        total?: number;
        itemCount?: number;
      };
      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
          const serverError = (Object.keys(data.errors) as (keyof CheckoutForm)[])[0];
          if (serverError) {
            document.getElementById(`checkout-${serverError}`)?.focus();
          }
        }
        setSubmitError(data.error ?? "Could not send the order. Try again.");
        return;
      }
      setPlacedTotal(data.total ?? grandTotal);
      setPlacedCount(data.itemCount ?? itemCount);
      clearCart();
      setSubmitted(true);
    } catch {
      setSubmitError("Could not send the order. Try again.");
    } finally {
      setBusy(false);
    }
  };

  if (!hydrated) {
    return (
      <section className="page-gutter py-12">
        <div className="mb-10">
          <p className="eyebrow mb-2">Checkout</p>
          <h1 className="display text-4xl">Your order</h1>
        </div>
        <div className="panel h-64 animate-pulse" />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="page-gutter flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="display mb-3 text-4xl">Your bag is empty</h1>
        <p className="mb-8 text-sm text-muted">
          Add a Bukket to your bag before checking out.
        </p>
        <Link href="/#product" className="btn btn-primary">
          Continue shopping
        </Link>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="page-gutter py-16">
        <div className="panel mx-auto max-w-xl p-8 text-center">
          <p className="eyebrow mb-2">Purchase listed</p>
          <h1 className="display mb-3 text-4xl">Order received</h1>
          <p className="mb-8 text-sm leading-relaxed text-muted">
            We have {placedCount} item{placedCount === 1 ? "" : "s"} totaling $
            {placedTotal.toFixed(2)}. Payment isn&apos;t live yet, so nothing
            was charged — the shop has the purchase on email.
          </p>
          <Link href="/#product" className="btn btn-primary">
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-gutter py-12">
      <div className="mb-10">
        <p className="eyebrow mb-2">Checkout</p>
        <h1 className="display text-4xl md:text-5xl">Your order</h1>
        <p className="mt-2 max-w-[58ch] text-sm text-muted">
          Review your bag and place the order. Payment will be added next —
          you will not be charged yet.
        </p>
      </div>

      <div className="panel grid gap-10 p-6 md:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <form onSubmit={handleSubmit} className="order-2 space-y-8 lg:order-1" noValidate>
          <fieldset className="space-y-4">
            <legend className="mb-2 text-lg font-semibold">Contact</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="checkout-email"
                label="Email"
                type="email"
                autoComplete="email"
                value={form.email}
                error={errors.email}
                onChange={(value) => setField("email", value)}
              />
              <Field
                id="checkout-phone"
                label="Phone number"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                error={errors.phone}
                onChange={(value) => setField("phone", value)}
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-2 text-lg font-semibold">Shipping</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="checkout-firstName"
                label="First name"
                autoComplete="given-name"
                value={form.firstName}
                error={errors.firstName}
                onChange={(value) => setField("firstName", value)}
              />
              <Field
                id="checkout-lastName"
                label="Last name"
                autoComplete="family-name"
                value={form.lastName}
                error={errors.lastName}
                onChange={(value) => setField("lastName", value)}
              />
            </div>
            <Field
              id="checkout-address"
              label="Address"
              autoComplete="address-line1"
              value={form.address}
              error={errors.address}
              onChange={(value) => setField("address", value)}
            />
            <Field
              id="checkout-apartment"
              label="Apartment, suite (optional)"
              autoComplete="address-line2"
              value={form.apartment}
              onChange={(value) => setField("apartment", value)}
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                id="checkout-city"
                label="City"
                autoComplete="address-level2"
                value={form.city}
                error={errors.city}
                onChange={(value) => setField("city", value)}
              />
              <Field
                id="checkout-state"
                label="State"
                autoComplete="address-level1"
                value={form.state}
                error={errors.state}
                onChange={(value) => setField("state", value)}
              />
              <Field
                id="checkout-zip"
                label="ZIP"
                autoComplete="postal-code"
                value={form.zip}
                error={errors.zip}
                onChange={(value) => setField("zip", value)}
              />
            </div>
          </fieldset>

          {submitError ? (
            <p className="text-sm text-terracotta" role="alert">
              {submitError}
            </p>
          ) : null}
          <button type="submit" className="btn btn-primary w-full" disabled={busy}>
            {busy ? "Sending order…" : "Place order"}
          </button>
          <p className="text-center text-xs text-muted">
            Places the purchase with the shop by email. Payment is not live yet.
          </p>
        </form>

        <aside className="order-1 h-fit rounded-xl bg-night p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] lg:order-2">
          <h2 className="display mb-5 text-2xl">Bag</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.variant.id}
                className="flex gap-4 rounded-xl bg-raised p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-dusk">
                  <Image
                    src={item.variant.image}
                    alt={item.variant.name}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{PRODUCT.name}</p>
                      <p className="text-sm text-muted">{item.variant.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.variant.id)}
                      className="text-muted hover:text-cream"
                      aria-label={`Remove ${item.variant.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variant.id, item.quantity - 1)
                        }
                        className="qty-btn"
                        aria-label={`Decrease quantity of ${item.variant.name}`}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variant.id, item.quantity + 1)
                        }
                        className="qty-btn"
                        aria-label={`Increase quantity of ${item.variant.name}`}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-medium">
                      ${(PRODUCT.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            <div className="flex justify-between text-base font-bold">
              <dt>Total</dt>
              <dd>${grandTotal.toFixed(2)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted">
            Free shipping on orders over ${SHIPPING.freeOver.toFixed(0)}.
          </p>
        </aside>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: FieldProps) {
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