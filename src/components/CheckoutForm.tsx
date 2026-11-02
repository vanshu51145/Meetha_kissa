"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Loader2, Lock, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { deliveryFor, FREE_DELIVERY_OVER, type CheckoutPayment, type Customer } from "@/lib/checkout";
import { inr } from "@/lib/products";
import { placeOrder, startPayment } from "@/app/checkout/actions";

type Props = { onlinePayment: boolean };

const empty: Customer = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
  notes: "",
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
  modal: { ondismiss: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadRazorpay(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("razorpay script failed"));
    document.body.appendChild(script);
  });
}

const inputClass =
  "mt-2 w-full rounded-xl border border-wine/15 bg-cream px-4 py-3 text-sm text-wine placeholder:text-ink/30 focus:border-gold focus:outline-none";

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50">{label}</span>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

export default function CheckoutForm({ onlinePayment }: Props) {
  const { items, subtotal, count, clear } = useCart();
  const [customer, setCustomer] = useState(empty);
  const [method, setMethod] = useState<"cod" | "razorpay">("cod");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState<{ id: string; total: number; method: "cod" | "razorpay" } | null>(
    null,
  );

  const delivery = deliveryFor(subtotal);
  const total = subtotal + delivery;
  const update = (field: keyof Customer, value: string) =>
    setCustomer((current) => ({ ...current, [field]: value }));
  const lineItems = items.map(({ slug, qty }) => ({ slug, qty }));

  async function confirm(payment: CheckoutPayment): Promise<void> {
    setBusy(true);
    setError(null);
    try {
      const amount = total;
      const result = await placeOrder({ items: lineItems, customer, payment });
      if (result.ok) {
        clear();
        setPlaced({ id: result.orderId, total: amount, method: payment.method });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(result.error);
      }
    } catch {
      setError("Something went wrong while saving your order. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || placed) return;
    if (method === "cod") {
      await confirm({ method: "cod" });
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const start = await startPayment(lineItems);
      if (!start.ok) {
        setError(start.error);
        return;
      }
      await loadRazorpay();
      new window.Razorpay!({
        key: start.keyId,
        amount: start.amount,
        currency: "INR",
        order_id: start.orderId,
        name: "Meetha Kissa",
        description: `${count} ${count === 1 ? "item" : "items"} from Meetha Kissa`,
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        theme: { color: "#4c1019" },
        handler: (response) => {
          void confirm({
            method: "razorpay",
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
        },
        modal: { ondismiss: () => setBusy(false) },
      }).open();
    } catch {
      setError("We couldn't reach the payment page. Please try again, or choose cash on delivery.");
    } finally {
      setBusy(false);
    }
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-24 text-center sm:px-6">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-wine text-gold-light">
          <Check className="h-7 w-7" />
        </span>
        <h1 className="font-serif text-4xl text-wine">Your box is on its way</h1>
        <p className="text-sm leading-relaxed text-ink/65">
          Order <span className="font-medium text-wine">{placed.id}</span> is confirmed for{" "}
          {customer.name.split(" ")[0] || "you"} — {inr(placed.total)}. We&apos;ll call{" "}
          {customer.phone} to fix the delivery slot, and it reaches you within 24 hours in Delhi NCR.
        </p>
        <p className="text-sm text-ink/60">
          {placed.method === "cod"
            ? "Keep the exact amount ready — you pay when the box arrives."
            : "Paid online — your receipt is on its way to your inbox."}
        </p>
        <div className="mt-3 flex gap-3">
          <Link
            href="/sweets"
            className="rounded-full bg-wine px-7 py-3 text-sm font-medium text-cream transition-colors hover:bg-wine-soft"
          >
            Order something else
          </Link>
          <Link
            href="/"
            className="rounded-full border border-wine/25 px-7 py-3 text-sm font-medium text-wine transition-colors hover:border-wine hover:bg-wine/5"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-cream-dark">
          <ShoppingBag className="h-8 w-8 text-gold" />
        </span>
        <h1 className="font-serif text-4xl text-wine">Your box is empty</h1>
        <p className="max-w-sm text-sm leading-relaxed text-ink/65">
          There is nothing to check out yet — fill it with something handcrafted first.
        </p>
        <Link
          href="/sweets"
          className="mt-2 rounded-full bg-wine px-7 py-3 text-sm font-medium text-cream transition-colors hover:bg-wine-soft"
        >
          Browse Sweets
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-wine sm:text-5xl">Checkout</h1>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-ink/50">
        {count} {count === 1 ? "item" : "items"} · delivered within 24 hours in Delhi NCR
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <form onSubmit={submit} className="rounded-2xl border border-wine/10 bg-white/50 p-6 sm:p-8">
          <h2 className="text-[11px] uppercase tracking-[0.25em] text-ink/45">Deliver to</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              value={customer.name}
              onChange={(value) => update("name", value)}
              placeholder="Priya Sharma"
              autoComplete="name"
            />
            <Field
              label="Mobile number"
              type="tel"
              value={customer.phone}
              onChange={(value) => update("phone", value)}
              placeholder="+91 98xxx xxxxx"
              autoComplete="tel"
            />
          </div>
          <div className="mt-5">
            <Field
              label="Email"
              type="email"
              value={customer.email}
              onChange={(value) => update("email", value)}
              placeholder="you@email.com"
              autoComplete="email"
            />
          </div>
          <div className="mt-5">
            <Field
              label="Address"
              value={customer.address}
              onChange={(value) => update("address", value)}
              placeholder="Flat / house, street, landmark"
              autoComplete="street-address"
            />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              label="City"
              value={customer.city}
              onChange={(value) => update("city", value)}
              placeholder="New Delhi"
              autoComplete="address-level2"
            />
            <Field
              label="Pincode"
              value={customer.pincode}
              onChange={(value) => update("pincode", value)}
              placeholder="110027"
              autoComplete="postal-code"
            />
          </div>
          <label className="mt-5 block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50">
              Delivery notes (optional)
            </span>
            <textarea
              rows={3}
              value={customer.notes}
              onChange={(event) => update("notes", event.target.value)}
              placeholder="Ring the bell twice — and please cut the rasgulla separately."
              className={`${inputClass} resize-none`}
            />
          </label>

          <fieldset className="mt-8">
            <legend className="text-[11px] uppercase tracking-[0.25em] text-ink/45">
              How would you like to pay?
            </legend>
            <div className="mt-4 space-y-3">
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                  method === "cod" ? "border-gold bg-gold/5" : "border-wine/15 hover:border-wine/40"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                  className="mt-1 accent-[#4c1019]"
                />
                <span>
                  <span className="block text-sm font-medium text-wine">Pay on Delivery</span>
                  <span className="mt-0.5 block text-sm text-ink/60">
                    Cash or UPI when your box arrives.
                  </span>
                </span>
              </label>
              {onlinePayment && (
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                    method === "razorpay"
                      ? "border-gold bg-gold/5"
                      : "border-wine/15 hover:border-wine/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={method === "razorpay"}
                    onChange={() => setMethod("razorpay")}
                    className="mt-1 accent-[#4c1019]"
                  />
                  <span>
                    <span className="flex items-center gap-2 text-sm font-medium text-wine">
                      Pay now <Lock className="h-3.5 w-3.5 text-gold" />
                    </span>
                    <span className="mt-0.5 block text-sm text-ink/60">
                      UPI, cards and netbanking — secured by Razorpay.
                    </span>
                  </span>
                </label>
              )}
            </div>
          </fieldset>

          {error && (
            <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-wine py-4 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-wine-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {method === "cod" ? `Place Order · ${inr(total)}` : `Pay ${inr(total)}`}
          </button>
          <p className="mt-4 text-xs text-ink/45">
            By placing this order you agree to our fresh-made, same-day dispatch policy.
          </p>
        </form>

        <aside className="h-fit rounded-2xl border border-wine/10 bg-cream-dark/60 p-6 sm:p-8 lg:sticky lg:top-28">
          <h2 className="text-[11px] uppercase tracking-[0.25em] text-ink/45">Your box</h2>
          <ul className="mt-5 divide-y divide-wine/10">
            {items.map((item) => (
              <li key={item.slug} className="flex items-start justify-between gap-4 py-4">
                <span>
                  <span className="block font-serif text-lg leading-tight text-wine">
                    {item.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink/50">
                    {item.unit} · Qty {item.qty}
                  </span>
                </span>
                <span className="shrink-0 text-sm text-wine">{inr(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-wine/10 pt-5 text-sm">
            <div className="flex justify-between text-ink/70">
              <dt>Subtotal</dt>
              <dd>{inr(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink/70">
              <dt>Delivery</dt>
              <dd>{delivery === 0 ? "Free" : inr(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-wine/10 pt-2 font-serif text-xl text-wine">
              <dt>Total</dt>
              <dd>{inr(total)}</dd>
            </div>
          </dl>
          {delivery > 0 && (
            <p className="mt-4 text-xs text-ink/55">
              Add {inr(FREE_DELIVERY_OVER - subtotal)} more and delivery is on us.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
