"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { inr, type Product } from "@/lib/products";

export default function QuickView() {
  const { quickView, closeQuickView } = useCart();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeQuickView();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeQuickView]);

  return (
    <AnimatePresence>
      {quickView && (
        <motion.div
          className="fixed inset-0 z-[75] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-wine-dark/55 backdrop-blur-sm"
            onClick={closeQuickView}
          />
          <QuickViewPanel
            key={quickView.slug}
            product={quickView}
            onClose={closeQuickView}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuickViewPanel({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <motion.div
      initial={{ y: 40, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 30, opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", damping: 28, stiffness: 300 }}
      className="relative z-10 grid max-h-[92vh] w-full max-w-3xl grid-cols-1 overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:grid-cols-2 sm:rounded-3xl"
    >
      <div className="relative aspect-[4/3] bg-beige sm:aspect-auto sm:h-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
            Quick view
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick view"
            className="-mr-2 -mt-2 grid h-10 w-10 place-items-center rounded-full text-wine hover:bg-wine/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 className="mt-4 font-serif text-3xl text-wine">{product.name}</h2>
        <p className="mt-2 text-sm italic text-ink/60">{product.tagline}</p>
        <p className="mt-4 font-serif text-2xl text-wine">
          {inr(product.price)}
          <span className="ml-2 font-sans text-sm not-italic text-ink/65">
            / {product.unit}
          </span>
        </p>
        <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-ink/70">
          {product.description}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center rounded-full border border-wine/15">
            <button
              type="button"
              onClick={() => setQty((value) => Math.max(1, value - 1))}
              aria-label="Decrease quantity"
              className="grid h-11 w-11 place-items-center rounded-full text-wine hover:bg-wine/5"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-7 text-center font-medium text-wine">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((value) => value + 1)}
              aria-label="Increase quantity"
              className="grid h-11 w-11 place-items-center rounded-full text-wine hover:bg-wine/5"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => add(product, qty)}
            className="flex-1 rounded-full bg-wine py-3.5 text-sm font-medium text-cream transition-colors hover:bg-wine-soft"
          >
            Add to Box · {inr(product.price * qty)}
          </button>
        </div>
        <Link
          href={`/sweets/${product.slug}`}
          onClick={onClose}
          className="mt-4 text-center text-sm text-ink/60 underline decoration-gold underline-offset-4 transition-colors hover:text-wine"
        >
          View full details
        </Link>
      </div>
    </motion.div>
  );
}
