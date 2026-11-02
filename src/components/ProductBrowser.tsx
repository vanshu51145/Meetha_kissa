"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { categories, products } from "@/lib/products";

export default function ProductBrowser() {
  const searchParams = useSearchParams();
  // Remount on ?cat= change so footer links update the filter even when already on /sweets
  const requested = searchParams.get("cat") ?? "all";

  return <BrowserInner key={requested} requested={requested} />;
}

function BrowserInner({ requested }: { requested: string }) {
  const initial = categories.some((c) => c.slug === requested)
    ? requested
    : "all";
  const [active, setActive] = useState<string>(initial);

  const list =
    active === "all"
      ? products
      : products.filter((product) => product.categories.includes(active));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 border-y border-wine/10 py-4">
        <SlidersHorizontal className="h-4 w-4 shrink-0 text-gold" />
        <div className="no-scrollbar -my-1 flex gap-2 overflow-x-auto py-1">
          {categories.map((category) => {
            const isActive = category.slug === active;
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => setActive(category.slug)}
                className={`min-w-fit whitespace-nowrap rounded-full border px-5 py-2.5 text-sm tracking-wide transition-all duration-300 ${
                  isActive
                    ? "border-wine bg-wine text-cream"
                    : "border-wine/15 bg-white/40 text-wine hover:border-gold hover:bg-white"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-ink/60">
        Showing {list.length} of {products.length} items
        {active !== "all" &&
          ` · ${categories.find((c) => c.slug === active)?.name}`}
      </p>

      {list.length === 0 ? (
        <p className="py-24 text-center font-serif text-2xl text-wine">
          Nothing in this counter just now.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {list.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 4) * 0.05}>
              <ProductCard product={product} priority={index < 4} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
