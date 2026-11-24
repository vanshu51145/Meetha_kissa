"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Loader2, Lock, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { deliveryFor, FREE_DELIVERY_OVER, type CheckoutPayment, type Customer } from "@/lib/checkout";
import { inr } from "@/lib/products";
import { placeOrder, startPayment } from "@/app/checkout/actions";

type Props = { razorpayEnabled: boolean };

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
  "mt-2 w-full rounded-xl border border-[#650D16]/20 bg-white px-4 py-4 text-base text-[#650D16] placeholder:text-[#351B19]/40 focus:border-[#F5C84C] focus:ring-1 focus:ring-[#F5C84C] focus:outline-none transition-all";

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
      <span className="text-[11px] uppercase tracking-[0.2em] text-[#351B19]/60 font-serif">
        {label}
      </span>
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

export default function CheckoutForm({ razorpayEnabled }: Props) {
  const { items, subtotal, count, clear } = useCart();
  const [customer, setCustomer] = useState(empty);
  const [method, setMethod] = useState<"cod" | "online">("cod");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sheet, setSheet] = useState<{
    orderId: string;
    amount: number;
    signature: string;
  } | null>(null);
  const [placed, setPlaced] = useState<{
    id: string;
    total: number;
    method: "cod" | "demo" | "razorpay";
  } | null>(null);

  const delivery = deliveryFor(subtotal);
  const total = subtotal + delivery;
  const update = (field: keyof Customer, value: string) =>
    setCustomer((current) => ({ ...current, [field]: value }));
  const lineItems = items.map(({ slug, qty }) => ({ slug, qty }));

  // The sandbox sheet behaves like a gateway modal: it holds the page until paid or dismissed.
  useEffect(() => {
    if (!sheet) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSheet(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  const pay = (payment: { orderId: string; signature: string }) => {
    setSheet(null);
    void confirm({ method: "demo", orderId: payment.orderId, signature: payment.signature });
  };

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
    if (busy || placed || sheet) return;
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
      if (start.mode === "demo") {
        setSheet({ orderId: start.orderId, amount: start.amount, signature: start.signature });
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
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 sm:px-6 py-28 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-[#650D16] text-[#F5C84C]">
          <Check className="h-8 w-8" />
        </span>
        <h1 className="font-serif text-4xl text-[#650D16] sm:text-5xl">
          Your box is on its way
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#351B19]/70">
          Order <span className="font-medium text-[#650D16]">{placed.id}</span> is confirmed for{" "}
          {customer.name.split(" ")[0] || "you"} — {inr(placed.total)}. We&apos;ll call{" "}
          {customer.phone}.
        </p>
        <p className="mt-4 text-base text-[#351B19]/60 leading-relaxed">
          {placed.method === "cod"
            ? "Keep the exact amount ready — you pay when the box arrives."
            : placed.method === "demo"
              ? "This was a test payment — no money moved, and the order is flagged as sandbox in our records."
              : "Paid online — your receipt is on its way to your inbox."}
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/sweets"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#650D16] px-10 py-4 text-base font-medium tracking-wide text-[#FFF8E9] transition-all hover:bg-[#800F19]"
          >
            Order something else
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#FFF8E9]/30 px-10 py-4 text-base font-medium tracking-wide text-[#650D16] transition-all hover:border-[#650D16] hover:bg-[#FFF8E9]/10"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 sm:px-6 py-28 text-center">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-[#F4EAD5]">
          <ShoppingBag className="h-10 w-10 text-[#F5C84C]" />
        </span>
        <h1 className="font-serif text-4xl text-[#650D16] sm:text-5xl">
          Your box is empty
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#351B19]/70 max-w-sm">
          There is nothing to check out yet — fill it with something handcrafted first.
        </p>
        <Link
          href="/sweets"
          className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-[#650D16] px-10 py-4 text-base font-medium tracking-wide text-[#FFF8E9] transition-all hover:bg-[#800F19]"
        >
          Browse Sweets
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <h1 className="font-serif text-4xl text-[#650D16] sm:text-5xl">
        Checkout
      </h1>
      <p className="mt-4 text-base uppercase tracking-[0.2em] text-[#351B19]/60 font-serif">
        {count} {count === 1 ? "item" : "items"} · thoughtfully prepared for you
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <form onSubmit={submit} className="rounded-3xl border border-[#650D16]/20 bg-white p-8 sm:p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
          <h2 className="text-[11px] uppercase tracking-[0.25em] text-[#351B19]/60 font-serif mb-6">
            Deliver to
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Full name"
              value={customer.name}
              onChange={(value) => update("name", value)}
              placeholder="Your name"
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
          <div className="mt-6">
            <Field
              label="Email"
              type="email"
              value={customer.email}
              onChange={(value) => update("email", value)}
              placeholder="you@email.com"
              autoComplete="email"
            />
          </div>
          <div className="mt-6">
            <Field
              label="Address"
              value={customer.address}
              onChange={(value) => update("address", value)}
              placeholder="Flat / house, street, landmark"
              autoComplete="street-address"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
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
          <label className="mt-6 block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#351B19]/60 font-serif">
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

          <fieldset className="mt-10">
            <legend className="text-[11px] uppercase tracking-[0.25em] text-[#351B19]/60 font-serif">
              How would you like to pay?
            </legend>
            <div className="mt-6 space-y-4">
              <label
                className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-6 transition-all duration-300 ${
                  method === "cod" ? "border-[#F5C84C] bg-[#FFF8E9]/30 shadow-[0_4px_12px_-4px_rgba(245,200,76,0.1)]" : "border-[#650D16]/20 bg-white hover:border-[#650D16]/40 hover:shadow-sm"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                  className="mt-1 accent-[#650D16]"
                />
                <span>
                  <span className="block text-base font-medium text-[#650D16]">Pay on Delivery</span>
                  <span className="mt-1 block text-base text-[#351B19]/60 leading-relaxed">
                    Cash or UPI when your box arrives.
                  </span>
                </span>
              </label>
              <label
                className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-6 transition-all duration-300 ${
                  method === "online"
                    ? "border-[#F5C84C] bg-[#FFF8E9]/30 shadow-[0_4px_12px_-4px_rgba(245,200,76,0.1)]"
                    : "border-[#650D16]/20 bg-white hover:border-[#650D16]/40 hover:shadow-sm"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={method === "online"}
                  onChange={() => setMethod("online")}
                  className="mt-1 accent-[#650D16]"
                />
                <span>
                  <span className="flex items-center gap-3 text-base font-medium text-[#650D16]">
                    {razorpayEnabled ? "Pay now" : "Pay now (test)"}
                    <Lock className="h-5 w-5 text-[#F5C84C]" />
                  </span>
                  <span className="mt-1 block text-base text-[#351B19]/60 leading-relaxed">
                    {razorpayEnabled
                      ? "UPI, cards and netbanking — secured by Razorpay."
                      : "Simulated gateway for this demo — no money moves. Add Razorpay keys to go live."}
                  </span>
                </span>
              </label>
            </div>
          </fieldset>

          {error && (
            <p role="alert" className="mt-8 rounded-xl border border-[#F5C84C]/30 bg-[#FFF8E9]/30 px-4 py-3 text-base text-[#3D080F]/80">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-[#650D16] py-5 text-base font-medium tracking-wide text-[#FFF8E9] transition-all hover:bg-[#800F19] hover:-translate-y-1 shadow-[0_10px_25px_-10px_rgba(101,13,22,0.3)] sm:w-auto sm:px-12"
          >
            {busy && <Loader2 className="h-5 w-5 animate-spin" />}
            {method === "cod" ? `Place Order · ${inr(total)}` : `Pay ${inr(total)}`}
          </button>
          <p className="mt-6 text-base text-[#351B19]/60 font-serif">
            By placing this order you agree to our thoughtful preparation policy.
          </p>
        </form>

        <aside className="h-fit rounded-3xl border border-[#650D16]/20 bg-white p-8 sm:p-10 lg:sticky lg:top-28 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
          <h2 className="text-[11px] uppercase tracking-[0.25em] text-[#351B19]/60 font-serif mb-6">
            Your box
          </h2>
          <ul className="mt-4 divide-y divide-[#650D16]/20">
            {items.map((item) => (
              <li key={item.slug} className="flex items-start justify-between gap-5 py-5">
                <span>
                  <span className="block font-serif text-lg leading-tight text-[#650D16]">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-base text-[#351B19]/50 leading-relaxed">
                    {item.unit} · Qty {item.qty}
                  </span>
                </span>
                <span className="shrink-0 text-base text-[#650D16]">{inr(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-[#650D16]/20 pt-6 text-base">
            <div className="flex justify-between text-[#351B19]/70">
              <dt>Subtotal</dt>
              <dd>{inr(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-[#351B19]/70">
              <dt>Delivery</dt>
              <dd>{delivery === 0 ? "Free" : inr(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-[#650D16]/20 pt-3 font-serif text-xl text-[#650D16]">
              <dt>Total</dt>
              <dd>{inr(total)}</dd>
            </div>
          </dl>
          {delivery > 0 && (
            <p className="mt-6 text-base text-[#351B19]/60 leading-relaxed">
              Add {inr(FREE_DELIVERY_OVER - subtotal)} more and delivery is on us.
            </p>
          )}
        </aside>
      </div>

      {sheet && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-[#3D080F]/70 p-4 sm:p-6 backdrop-blur-sm"
          onClick={() => setSheet(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Test payment"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-[#F5C84C]/40 bg-[#FFF8E9] p-8 sm:p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#351B19]/60 font-serif">
                <Lock className="h-4 w-4 text-[#F5C84C]" /> Test payment
              </span>
              <span className="rounded-full bg-[#F5C84C]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F5C84C]">
                Sandbox
              </span>
            </div>
            <p className="mt-6 font-serif text-3xl text-[#650D16]">
              {inr(sheet.amount / 100)}
            </p>
            <p className="mt-2 text-base text-[#351B19]/60 leading-relaxed">
              Meetha Kissa · ref {sheet.orderId}
            </p>
            <div className="mt-6 rounded-xl border border-[#650D16]/20 bg-[#FFF8E9]/60 px-4 py-3 text-base text-[#351B19]/70">
              Test card · 4111 1111 1111 1111
              <span className="mt-1 block text-[10px] text-[#351B19]/50">
                This gateway is a simulation — no money moves.
              </span>
            </div>
            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={() => pay(sheet)}
                className="flex-1 rounded-full bg-[#650D16] py-4 text-base font-medium text-[#FFF8E9] transition-all hover:bg-[#800F19]"
              >
                Pay {inr(sheet.amount / 100)}
              </button>
              <button
                type="button"
                onClick={() => setSheet(null)}
                className="rounded-full border border-[#650D16]/30 px-6 text-base font-medium text-[#650D16] transition-all hover:bg-[#FFF8E9]/50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
