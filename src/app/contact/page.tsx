import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit the Meetha Kissa shop in Rajouri Garden, call us or write for festive pre-orders and gifting enquiries.",
};

const details = [
  {
    icon: MapPin,
    label: "The shop",
    lines: ["Shop 4, Amrit Market", "Rajouri Garden, New Delhi 110027"],
    href: "https://maps.google.com/?q=Rajouri+Garden+New+Delhi",
    linkText: "Get directions",
  },
  {
    icon: Phone,
    label: "Call or WhatsApp",
    lines: ["+91 98100 12345"],
    href: "tel:+919810012345",
    linkText: "Tap to call",
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["hello@meethakissa.in", "orders@meethakissa.in"],
    href: "mailto:hello@meethakissa.in",
    linkText: "Write to us",
  },
  {
    icon: Clock,
    label: "Shop hours",
    lines: ["Tuesday – Sunday: 9 AM – 9 PM", "Closed on Mondays"],
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-wine/10 bg-cream-dark/40">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            Say namaste
          </p>
          <h1 className="mt-4 font-serif text-5xl text-wine sm:text-6xl">
            Visit, Call or Write
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-ink/65">
            Festive orders, bulk gifting or a simple craving — we answer every
            message ourselves, usually within a few hours.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-20">
        <Reveal>
          <h2 className="font-serif text-3xl text-wine">Send us a message</h2>
          <p className="mt-2 text-sm text-ink/60">
            Tell us what you need and when — we&apos;ll confirm availability and
            pricing.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-2xl border border-wine/10 bg-white/50 p-8">
            <h2 className="font-serif text-3xl text-wine">Find us</h2>
            <ul className="mt-8 space-y-7">
              {details.map(({ icon: Icon, label, lines, href, linkText }) => (
                <li key={label} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-cream text-gold">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
                      {label}
                    </p>
                    {lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-wine">
                        {line}
                      </p>
                    ))}
                    {href && (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-1 inline-block text-sm text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
                      >
                        {linkText}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-gold/40 bg-cream-dark/60 p-8">
            <h3 className="font-serif text-xl text-wine">
              Festive season note
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              During Diwali and Raksha Bandhan we take gift-box pre-orders 48
              hours in advance. Slots fill quickly — a call is the fastest way
              to book one.
            </p>
            <Link
              href="/sweets?cat=gift-boxes"
              className="mt-5 inline-block rounded-full bg-wine px-7 py-3 text-sm font-medium text-cream transition-colors hover:bg-wine-soft"
            >
              See gift boxes
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
