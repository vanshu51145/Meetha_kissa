"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { inr, type Product } from "@/lib/products";

export default function PurchasePanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-8 rounded-2xl border border-wine/10 bg-white/50 p-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full border border-wine/15">
          <button
            type="button"
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            aria-label="Decrease quantity"
            className="grid h-11 w-11 place-items-center rounded-full text-wine hover:bg-wine/5"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium text-wine">{qty}</span>
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
          className="flex-1 rounded-full bg-wine px-8 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-wine-soft"
        >
          Add to Box · {inr(product.price * qty)}
        </button>
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.15em] text-ink/60">
        Packed fresh · Delivered within 24 hours · Free delivery over ₹999
      </p>
    </div>
  );
}
