"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const quotes = [
  {
    quote:
      "Absolutely delicious. The Kaju Katli tasted exactly like the sweets I grew up eating.",
    name: "Priya Sharma",
    detail: "Ordering since 2019 · Delhi",
    initials: "PS",
  },
  {
    quote:
      "Beautiful packaging and incredible taste. Perfect for gifting — my clients kept asking where the box was from.",
    name: "Rohan Mehta",
    detail: "Festive gifting · Gurugram",
    initials: "RM",
  },
  {
    quote:
      "Fresh, premium and genuinely authentic. The besan ladoo tastes like my nani made it.",
    name: "Ananya Kapoor",
    detail: "Weekly regular · Noida",
    initials: "AK",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const go = (step: number) =>
    setIndex((current) => (current + step + quotes.length) % quotes.length);

  useEffect(() => {
    const timer = setInterval(() => go(1), 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-wine py-24 text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full border border-gold-light/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full border border-gold-light/20"
      />
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold-light">
          Sweet words
        </p>
        <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
          Loved by families across Delhi NCR
        </h2>

        {/* All quotes share one grid cell: the section can never render empty */}
        <div className="mt-12 grid">
          {quotes.map((item, quoteIndex) => {
            const active = quoteIndex === index;
            return (
              <motion.figure
                key={item.name}
                className="col-start-1 row-start-1 flex flex-col items-center"
                initial={false}
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                aria-hidden={!active}
                style={{ pointerEvents: active ? "auto" : "none" }}
              >
                <div className="flex gap-1 text-gold-light">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-6 font-serif text-2xl leading-relaxed sm:text-[1.7rem]">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-light/50 font-serif text-sm text-gold-light">
                    {item.initials}
                  </span>
                  <span className="text-left">
                    <span className="block font-medium">{item.name}</span>
                    <span className="block text-xs text-cream/70">
                      {item.detail}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 transition-colors hover:border-gold-light hover:text-gold-light"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {quotes.map((quote, dotIndex) => (
              <button
                key={quote.name}
                type="button"
                onClick={() => setIndex(dotIndex)}
                aria-label={`Show testimonial ${dotIndex + 1}`}
                aria-current={dotIndex === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIndex === index
                    ? "w-8 bg-gold-light"
                    : "w-1.5 bg-cream/40 hover:bg-cream/70"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 transition-colors hover:border-gold-light hover:text-gold-light"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
