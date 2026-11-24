"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { categories, products } from "@/lib/products";

export default function ProductBrowser() {
  const searchParams = useSearchParams();
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
      <div className="flex items-center gap-4 border-b border-[#650D16]/20 py-8">
        <SlidersHorizontal className="h-5 w-5 shrink-0 text-[#F5C84C]" />
        <div className="no-scrollbar -my-1 flex gap-3 overflow-x-auto py-2">
          {categories.map((category) => {
            const isActive = category.slug === active;
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => setActive(category.slug)}
                className={`min-w-fit whitespace-nowrap rounded-full border px-6 py-2.5 text-base font-medium tracking-wider transition-all duration-300 ${
                  isActive
                    ? "border-[#650D16] bg-[#650D16] text-[#FFF8E9]"
                    : "border-[#650D16]/20 bg-white text-[#650D16] hover:border-[#F5C84C] hover:bg-[#FFF8E9]/50"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#351B19]/60 font-serif">
        Showing {list.length} of {products.length} items
        {active !== "all" &&
          ` · ${categories.find((c) => c.slug === active)?.name}`}
      </p>

      {list.length === 0 ? (
        <p className="py-32 text-center font-serif text-2xl text-[#650D16]">
          Nothing in this counter just now.
        </p>
      ) : (
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
