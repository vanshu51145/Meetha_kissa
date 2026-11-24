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
      <section className="border-b border-[#650D16]/20 bg-[#F4EAD5]/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#650D16] font-medium font-serif">
            Fresh from the kitchen
          </p>
          <h1 className="mt-8 font-serif text-5xl text-[#650D16] sm:text-6xl">
            Our Sweets
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-[#351B19]/80">
            Everything is made in small batches with pure ghee and delivered
            within 24 hours. Filter by the counter you&apos;re craving.
          </p>
        </div>
      </section>

      <div className="pt-16">
        <Suspense
          fallback={
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-4 lg:px-8 pb-32">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/5] animate-pulse rounded-3xl bg-[#F4EAD5]"
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
