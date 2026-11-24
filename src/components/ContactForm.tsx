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
      <div className="flex h-full flex-col items-center justify-center gap-6 rounded-3xl border border-[#F5C84C]/40 bg-[#FFF8E9]/60 p-12 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-[#650D16] text-[#F5C84C]">
          <Check className="h-8 w-8" />
        </span>
        <h3 className="font-serif text-3xl text-[#650D16]">
          Thank you, {form.name.split(" ")[0] || "friend"}!
        </h3>
        <p className="max-w-sm text-lg leading-relaxed text-[#351B19]/70">
          Your message is with our kitchen. We reply to every enquiry within one
          working day — usually much sooner.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(empty);
            setSent(false);
          }}
          className="mt-4 rounded-full border border-[#650D16]/30 px-8 py-3.5 text-base font-medium tracking-wide text-[#650D16] transition-all hover:border-[#650D16] hover:bg-[#650D16]/10"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-3xl border border-[#650D16]/20 bg-[#FFF8E9] p-8 sm:p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]"
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
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#351B19]/60 font-serif">
            Your name
          </span>
          <input
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
            className="mt-3 w-full rounded-xl border border-[#650D16]/20 bg-white px-4 py-4 text-base text-[#650D16] placeholder:text-[#351B19]/40 focus:border-[#F5C84C] focus:ring-1 focus:ring-[#F5C84C] focus:outline-none transition-all"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#351B19]/60 font-serif">
            Phone
          </span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+91 98xxx xxxxx"
            className="mt-3 w-full rounded-xl border border-[#650D16]/20 bg-white px-4 py-4 text-base text-[#650D16] placeholder:text-[#351B19]/40 focus:border-[#F5C84C] focus:ring-1 focus:ring-[#F5C84C] focus:outline-none transition-all"
          />
        </label>
      </div>
      <label className="mt-6 block">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#351B19]/60 font-serif">
          Email
        </span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="you@email.com"
          className="mt-3 w-full rounded-xl border border-[#650D16]/20 bg-white px-4 py-4 text-base text-[#650D16] placeholder:text-[#351B19]/40 focus:border-[#F5C84C] focus:ring-1 focus:ring-[#F5C84C] focus:outline-none transition-all"
        />
      </label>
      <label className="mt-6 block">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#351B19]/60 font-serif">
          What can we make for you?
        </span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="I'd like to order 5kg of assorted gift boxes for Diwali, delivering on 8 November…"
          className="mt-3 w-full resize-none rounded-xl border border-[#650D16]/20 bg-white px-4 py-4 text-base text-[#650D16] placeholder:text-[#351B19]/40 focus:border-[#F5C84C] focus:ring-1 focus:ring-[#F5C84C] focus:outline-none transition-all"
        />
      </label>
      {error && (
        <p role="alert" className="mt-6 rounded-xl border border-[#F5C84C]/30 bg-[#FFF8E9]/30 px-4 py-3 text-base text-[#3D080F]/80">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#650D16] py-5 text-base font-medium tracking-wide text-[#FFF8E9] transition-all hover:bg-[#800F19] hover:-translate-y-1 shadow-[0_10px_25px_-10px_rgba(101,13,22,0.3)] sm:px-12"
      >
        {busy && <Loader2 className="h-5 w-5 animate-spin" />}
        Send Message
      </button>
      <p className="mt-6 text-xs text-[#351B19]/60 font-serif">
        Bulk & corporate orders: please mention quantities and delivery date.
      </p>
    </form>
  );
}
