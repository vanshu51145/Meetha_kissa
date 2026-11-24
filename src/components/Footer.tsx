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
    <footer className="bg-[#3D080F] text-[#FFF8E9]/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] py-20 sm:py-28">
          <div className="border-b border-[#650D16]/30 pb-12 sm:border-b-0 sm:pb-0 lg:border-b-0 lg:pb-0">
            <div className="flex items-center gap-4 mb-8">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#C49A3A]/50 bg-[#F4EAD5] ring-1 ring-[#C49A3A]/30">
                <Image
                  src="/logo-mark.png"
                  alt="Meetha Kissa emblem"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="block font-serif text-2xl font-semibold text-[#FFF8E9] sm:text-3xl tracking-tight">
                  Meetha Kissa
                </span>
                <span className="block font-serif text-[11px] italic tracking-[0.25em] text-[#F5C84C]">
                  maa se pyar se
                </span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#FFF8E9]/80">
              Meetha Kissa brings traditional Indian sweets closer to your
              celebrations with thoughtful preparation, delightful flavours and
              a love for mithai.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#F5C84C] font-semibold mb-8">
              Explore
            </h3>
            <ul className="space-y-5">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#FFF8E9]/80 hover:text-[#F5C84C] transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#F5C84C] font-semibold mb-8">
              Visit us
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#F5C84C]" />
                <a
                  href="https://maps.google.com/?q=Bapoli+Panipat+Haryana+132104+India"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#F5C84C] hover:text-[#C49A3A] transition-all text-sm"
                >
                  Bapoli, Panipat, Haryana – 132104, India
                </a>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#F5C84C]" />
                <a href="tel:8168009506" className="text-[#F5C84C] hover:text-[#C49A3A] transition-all">
                  8168009506
                </a>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#F5C84C]" />
                <a
                  href="mailto:vanshu51165@gmail.com"
                  className="text-[#F5C84C] hover:text-[#C49A3A] transition-all"
                >
                  vanshu51165@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#F5C84C] font-semibold mb-8">
              Festive updates
            </h3>
            <p className="text-sm text-[#FFF8E9]/80 mb-8">
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
              <div className="flex items-center gap-2 rounded-full border border-[#FFF8E9]/20 bg-[#FFF8E9]/10 p-1.5 focus-within:border-[#F5C84C]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@email.com"
                  aria-label="Email address"
                  className="w-full bg-transparent px-4 text-base text-[#FFF8E9] placeholder:text-[#FFF8E9]/50 focus:outline-none focus:ring-1 focus:ring-[#F5C84C]"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="shrink-0 rounded-full bg-[#F5C84C] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#3D080F] transition-all hover:bg-[#E5B84C] disabled:opacity-60"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join"}
                </button>
              </div>
            </form>
            {error && (
              <p role="alert" className="mt-3 text-xs text-[#F5C84C]/70">{error}</p>
            )}
            {subscribed && (
              <p className="mt-3 text-xs text-[#C49A3A]">
                You&apos;re on the list — thank you.
              </p>
            )}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 text-sm text-[#FFF8E9]/80 hover:text-[#F5C84C] transition-all"
            >
              <AtSign className="h-5 w-5" />
              meethakissa on Instagram
            </a>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-[#650D16]/30 flex flex-col items-center justify-between gap-6 text-[10px] text-[#FFF8E9]/60 sm:flex-row">
          <p>© 2026 Meetha Kissa. Crafted with love.</p>
        </div>
      </div>
    </footer>
  );
}
