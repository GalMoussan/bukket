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
  const { items, total, itemCount, updateQuantity, removeFromCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const shipping = shippingFor(total);
  const grandTotal = total + shipping;

  const setField = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    const firstError = (Object.keys(nextErrors) as (keyof CheckoutForm)[])[0];
    if (firstError) {
      document.getElementById(`checkout-${firstError}`)?.focus();
      return;
    }
    if (items.length === 0) return;
    setSubmitted(true);
  };

  if (!hydrated) {
    return (
      <section className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#B8E638]">
            Checkout
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">Your order</h1>
        </div>
        <div className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/[0.02]" />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-5 pb-24 pt-28 text-center md:px-8 md:pt-32">
        <h1 className="mb-2 text-lg font-medium">Your bag is empty</h1>
        <p className="mb-8 text-sm text-white/50">
          Add a Bukket to your bag before checking out.
        </p>
        <Link
          href="/#product"
          className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="mx-auto max-w-xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#B8E638]">
            Preview
          </p>
          <h1 className="mb-3 text-3xl font-bold">Order ready</h1>
          <p className="mb-8 text-sm leading-relaxed text-white/50">
            Payment isn&apos;t live yet, so nothing was charged. Your bag still
            has {itemCount} item{itemCount === 1 ? "" : "s"} totaling $
            {grandTotal.toFixed(2)}.
          </p>
          <Link
            href="/#product"
            className="inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#B8E638]">
          Checkout
        </p>
        <h1 className="text-3xl font-bold md:text-4xl">Your order</h1>
        <p className="mt-2 text-sm text-white/40">
          Review your bag. Payment will be added next — you will not be charged.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <form onSubmit={handleSubmit} className="order-2 space-y-8 lg:order-1" noValidate>
          <fieldset className="space-y-4">
            <legend className="mb-2 text-lg font-semibold">Contact</legend>
            <Field
              id="checkout-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={form.email}
              error={errors.email}
              onChange={(value) => setField("email", value)}
            />
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

          <button
            type="submit"
            className="w-full rounded-xl bg-white py-4 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]"
          >
            Place order
          </button>
          <p className="text-center text-xs text-white/30">
            Preview only. Payment is not live yet.
          </p>
        </form>

        <aside className="order-1 h-fit rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:order-2">
          <h2 className="mb-5 text-lg font-semibold">Bag</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.variant.id}
                className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#1a1a24]">
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
                      <p className="text-sm text-white/50">{item.variant.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.variant.id)}
                      className="text-white/30 transition hover:text-white/60"
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
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-sm transition hover:bg-white/5"
                        aria-label={`Decrease quantity of ${item.variant.name}`}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variant.id, item.quantity + 1)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-sm transition hover:bg-white/5"
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
              <dt className="text-white/50">Subtotal</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/50">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <dt>Total</dt>
              <dd>${grandTotal.toFixed(2)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-white/30">
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
      <span className="mb-1.5 block text-white/60">{label}</span>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-white/20 focus:border-white/30 ${
          error ? "border-red-400/60" : "border-white/10"
        }`}
      />
      {error ? (
        <span id={errorId} className="mt-1 block text-xs text-red-400">
          {error}
        </span>
      ) : null}
    </label>
  );
}