"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { inr, type Product } from "@/lib/products";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { add, openQuickView } = useCart();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-[#650D16]/20 bg-[#FFF8E9] transition-all duration-500 hover:border-[#F5C84C]/50 hover:-translate-y-2 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.04)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F4EAD5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#650D16]/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-[#650D16] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#FFF8E9]">
            {product.badge}
          </span>
        )}
        <Link
          href={`/sweets/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        />
        <div className="absolute inset-x-4 bottom-4 z-10 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={() => openQuickView(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FFF8E9]/95 px-4 py-3 text-xs font-medium text-[#650D16] backdrop-blur transition-all hover:bg-[#FFF8E9]"
          >
            <Eye className="h-4 w-4" />
            Quick View
          </button>
          <button
            type="button"
            onClick={() => add(product)}
            aria-label={`Add ${product.name} to box`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#650D16] px-4 py-3 text-xs font-medium text-[#FFF8E9] transition-all hover:bg-[#800F19]"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-8">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-lg leading-tight text-[#650D16]">
            {product.name}
          </h3>
          <span className="font-serif text-lg text-[#650D16]">
            {inr(product.price)}
          </span>
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#650D16] font-medium font-serif">
          per {product.unit}
        </p>
        <p className="mt-4 line-clamp-2 text-base leading-relaxed text-[#351B19]/70">
          {product.tagline}
        </p>
      </div>
    </article>
  );
}
