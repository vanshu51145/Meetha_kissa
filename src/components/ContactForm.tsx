"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { sendMessage } from "@/app/contact/actions";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const empty: FormState = { name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof FormState, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-gold/40 bg-white/60 p-12 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-wine text-gold-light">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="font-serif text-3xl text-wine">Thank you, {form.name.split(" ")[0] || "friend"}!</h3>
        <p className="max-w-sm text-sm leading-relaxed text-ink/65">
          Your message is with our kitchen. We reply to every enquiry within one
          working day — usually much sooner.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(empty);
            setSent(false);
          }}
          className="mt-2 rounded-full border border-wine/25 px-7 py-3 text-sm font-medium text-wine transition-colors hover:border-wine hover:bg-wine/5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-wine/10 bg-white/50 p-8"
      onSubmit={async (event) => {
        event.preventDefault();
        if (busy) return;
        setBusy(true);
        setError(null);
        const result = await sendMessage(form);
        if (result.ok) {
          setSent(true);
        } else {
          setError(result.error ?? "Something went wrong — please try again.");
        }
        setBusy(false);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink/65">
            Your name
          </span>
          <input
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Priya Sharma"
            className="mt-2 w-full rounded-xl border border-wine/15 bg-cream px-4 py-3 text-sm text-wine placeholder:text-ink/30 focus:border-gold focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink/65">
            Phone
          </span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+91 98xxx xxxxx"
            className="mt-2 w-full rounded-xl border border-wine/15 bg-cream px-4 py-3 text-sm text-wine placeholder:text-ink/30 focus:border-gold focus:outline-none"
          />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink/65">
          Email
        </span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="you@email.com"
          className="mt-2 w-full rounded-xl border border-wine/15 bg-cream px-4 py-3 text-sm text-wine placeholder:text-ink/30 focus:border-gold focus:outline-none"
        />
      </label>
      <label className="mt-5 block">
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink/65">
          What can we make for you?
        </span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="I'd like to order 5kg of assorted gift boxes for Diwali, delivering on 8 November…"
          className="mt-2 w-full resize-none rounded-xl border border-wine/15 bg-cream px-4 py-3 text-sm text-wine placeholder:text-ink/30 focus:border-gold focus:outline-none"
        />
      </label>
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
        Send Message
      </button>
      <p className="mt-4 text-xs text-ink/60">
        Bulk & corporate orders: please mention quantities and delivery date.
      </p>
    </form>
  );
}
