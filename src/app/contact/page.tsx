import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit Meetha Kissa, call us or write for festive pre-orders and gifting enquiries.",
};

const details = [
    {
      icon: MapPin,
      label: "The shop",
      lines: ["Bapoli, Panipat, Haryana – 132104, India"],
      href: "https://maps.google.com/?q=Bapoli+Panipat+Haryana",
      linkText: "Get directions",
    },
    {
      icon: Phone,
      label: "Call or WhatsApp",
      lines: ["8168009506"],
      href: "tel:8168009506",
      linkText: "Tap to call",
    },
    {
      icon: Mail,
      label: "Email",
      lines: ["vanshu51165@gmail.com"],
      href: "mailto:vanshu51165@gmail.com",
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
      <section className="border-b border-[#650D16]/20 bg-[#F4EAD5]/30 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#650D16] font-medium font-serif">
            Say namaste
          </p>
          <h1 className="mt-8 font-serif text-5xl text-[#650D16] sm:text-6xl">
            Visit, Call or Write
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-[#351B19]/80">
            Festive orders, bulk gifting or a simple craving — we answer every
            message ourselves, usually within a few hours.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="font-serif text-4xl text-[#650D16] sm:text-5xl">
            Send us a message
          </h2>
          <p className="mt-4 text-lg text-[#351B19]/70 leading-relaxed">
            Tell us what you need and when — we&apos;ll confirm availability and
            pricing.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-3xl border border-[#650D16]/20 bg-[#FFF8E9] p-10 sm:p-12">
            <h2 className="font-serif text-4xl text-[#650D16] sm:text-5xl">
              Find us
            </h2>
            <ul className="mt-10 space-y-8">
              {details.map(({ icon: Icon, label, lines, href, linkText }) => (
                <li key={label} className="flex gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#F5C84C]/40 bg-[#FFF8E9] text-[#F5C84C]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#650D16] font-medium font-serif">
                      {label}
                    </p>
                    {lines.map((line) => (
                      <p key={line} className="mt-1 text-base text-[#650D16] leading-relaxed">
                        {line}
                      </p>
                    ))}
                    {href && (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mt-2 inline-block text-base text-[#650D16] underline decoration-[#650D16]/40 underline-offset-4 hover:decoration-[#650D16] hover:text-[#800F19] transition-all"
                      >
                        {linkText}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 rounded-3xl border border-[#F5C84C]/40 bg-[#3D080F]/40 p-10 sm:p-12">
            <h3 className="font-serif text-2xl text-[#650D16]">
              Festive season note
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#351B19]/70">
              During Diwali and Raksha Bandhan we take gift-box pre-orders 48
              hours in advance. Slots fill quickly — a call is the fastest way
              to book one.
            </p>
            <Link
              href="/sweets?cat=gift-boxes"
              className="mt-6 inline-block rounded-full bg-[#650D16] px-8 py-3.5 text-sm font-medium tracking-wide text-[#FFF8E9] transition-all hover:bg-[#800F19]"
            >
              See gift boxes
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
