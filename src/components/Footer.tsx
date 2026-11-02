"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AtSign, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { subscribe } from "@/app/actions";

const explore = [
  { href: "/sweets", label: "Our Sweets" },
  { href: "/sweets?cat=gift-boxes", label: "Gift Boxes" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact & Ordering" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <footer className="bg-wine-dark text-cream/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-full border border-gold-light/40">
                <Image
                  src="/logo-mark.png"
                  alt="Meetha Kissa emblem"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="block font-serif text-2xl text-cream">
                  Meetha Kissa
                </span>
                <span className="block font-serif text-xs italic tracking-[0.2em] text-gold-light">
                  maa se pyar se
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed">
              Handcrafted Indian mithai, made in small batches with pure ghee
              and recipes passed down since 1998.
            </p>
            <p className="mt-6 font-serif text-sm tracking-[0.25em] text-gold-light">
              SINCE 1998
            </p>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.25em] text-gold-light">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.25em] text-gold-light">
              Visit us
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                <span>
                  Shop 4, Amrit Market
                  <br />
                  Rajouri Garden, New Delhi 110027
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                <a href="tel:+919810012345" className="hover:text-cream">
                  +91 98100 12345
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
                <a
                  href="mailto:hello@meethakissa.in"
                  className="hover:text-cream"
                >
                  hello@meethakissa.in
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.25em] text-gold-light">
              Festive updates
            </h3>
            <p className="mt-5 text-sm">
              New boxes, festive menus and early Diwali slots — a few emails a
              year, never more.
            </p>
            <form
              className="mt-5"
              onSubmit={async (event) => {
                event.preventDefault();
                if (busy) return;
                setBusy(true);
                setError(null);
                const result = await subscribe(email);
                if (result.ok) {
                  setSubscribed(true);
                  setEmail("");
                } else {
                  setError(result.error ?? "Something went wrong — please try again.");
                }
                setBusy(false);
              }}
            >
              <div className="flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 p-1.5 focus-within:border-gold-light">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@email.com"
                  aria-label="Email address"
                  className="w-full bg-transparent px-3 text-sm text-cream placeholder:text-cream/55 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="shrink-0 rounded-full bg-gold-light px-4 py-2 text-xs font-semibold uppercase tracking-wider text-wine-dark transition-colors hover:bg-cream disabled:opacity-60"
                >
                  {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Join"}
                </button>
              </div>
            </form>
            {error && (
              <p role="alert" className="mt-3 text-xs text-red-300">
                {error}
              </p>
            )}
            {subscribed && (
              <p className="mt-3 text-xs text-gold-light">
                You&apos;re on the list — thank you.
              </p>
            )}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm transition-colors hover:text-cream"
            >
              <AtSign className="h-4 w-4" />
              meethakissa on Instagram
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/65 sm:flex-row">
          <p>© 2026 Meetha Kissa. Crafted with love.</p>
          <p>Fictional brand · Demo website for presentation purposes</p>
        </div>
      </div>
    </footer>
  );
}
