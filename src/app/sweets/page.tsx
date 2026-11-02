import type { Metadata } from "next";
import { Suspense } from "react";
import ProductBrowser from "@/components/ProductBrowser";

export const metadata: Metadata = {
  title: "Our Sweets",
  description:
    "Browse the full range of handcrafted Meetha Kissa mithai — kaju katli, ladoo, barfi, Bengali sweets and premium gift boxes.",
};

export default function SweetsPage() {
  return (
    <>
      <section className="border-b border-wine/10 bg-cream-dark/40">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            Fresh from the kitchen
          </p>
          <h1 className="mt-4 font-serif text-5xl text-wine sm:text-6xl">
            Our Sweets
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink/65">
            Everything is made in small batches with pure ghee and delivered
            within 24 hours. Filter by the counter you&apos;re craving.
          </p>
        </div>
      </section>

      <div className="pt-10">
        <Suspense
          fallback={
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 pb-24 sm:px-6 md:grid-cols-3 lg:grid-cols-4 lg:px-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/5] animate-pulse rounded-2xl bg-cream-dark"
                />
              ))}
            </div>
          }
        >
          <ProductBrowser />
        </Suspense>
      </div>
    </>
  );
}
