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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-wine/10 bg-white/50 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_28px_60px_-32px_rgba(76,16,25,0.55)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-wine px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cream">
            {product.badge}
          </span>
        )}
        <Link
          href={`/sweets/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        />
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => openQuickView(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-cream/95 px-3 py-2.5 text-xs font-medium text-wine backdrop-blur transition-colors hover:bg-cream"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>
          <button
            type="button"
            onClick={() => add(product)}
            aria-label={`Add ${product.name} to box`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-wine px-3 py-2.5 text-xs font-medium text-cream transition-colors hover:bg-wine-soft"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-lg leading-tight text-wine">
            {product.name}
          </h3>
          <span className="font-serif text-lg text-wine">
            {inr(product.price)}
          </span>
        </div>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gold">
          per {product.unit}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">
          {product.tagline}
        </p>
      </div>
    </article>
  );
}
