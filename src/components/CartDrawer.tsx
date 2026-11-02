"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/products";

export default function CartDrawer() {
  const {
    items,
    subtotal,
    count,
    cartOpen,
    closeCart,
    setQty,
    remove,
  } = useCart();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-wine-dark/50 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-wine/10 px-6 py-5">
              <div>
                <h2 className="font-serif text-2xl text-wine">Your Sweet Box</h2>
                <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-ink/65">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close sweet box"
                className="grid h-10 w-10 place-items-center rounded-full text-wine hover:bg-wine/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-cream-dark">
                  <ShoppingBag className="h-8 w-8 text-gold" />
                </span>
                <h3 className="font-serif text-2xl text-wine">
                  Your box is empty
                </h3>
                <p className="max-w-xs text-sm text-ink/60">
                  Add a box of something handcrafted — the Kaju Katli never
                  lasts long.
                </p>
                <Link
                  href="/sweets"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-wine px-7 py-3 text-sm font-medium text-cream transition-colors hover:bg-wine-soft"
                >
                  Browse Sweets
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-wine/5 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.slug}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4 overflow-hidden py-5"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-beige">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-serif text-lg leading-tight text-wine">
                                {item.name}
                              </h3>
                              <p className="mt-0.5 text-xs text-ink/65">
                                {item.unit}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(item.slug)}
                              aria-label={`Remove ${item.name}`}
                              className="text-ink/60 transition-colors hover:text-wine-soft"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center rounded-full border border-wine/15">
                              <button
                                type="button"
                                onClick={() => setQty(item.slug, item.qty - 1)}
                                aria-label="Decrease quantity"
                                className="grid h-8 w-8 place-items-center rounded-full text-wine hover:bg-wine/5"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium text-wine">
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQty(item.slug, item.qty + 1)}
                                aria-label="Increase quantity"
                                className="grid h-8 w-8 place-items-center rounded-full text-wine hover:bg-wine/5"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="font-serif text-lg text-wine">
                              {inr(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="border-t border-wine/10 bg-cream-dark/60 px-6 py-5">
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between text-ink/70">
                      <dt>Subtotal</dt>
                      <dd>{inr(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-ink/70">
                      <dt>Delivery</dt>
                      <dd>{shipping === 0 ? "Free" : inr(shipping)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-wine/10 pt-2 font-serif text-xl text-wine">
                      <dt>Total</dt>
                      <dd>{inr(subtotal + shipping)}</dd>
                    </div>
                  </dl>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-4 block w-full rounded-full bg-wine py-3.5 text-center text-sm font-medium tracking-wide text-cream transition-colors hover:bg-wine-soft"
                  >
                    Proceed to Checkout
                  </Link>
                  <p className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-ink/60">
                    Freshly packed · Delivered within 24 hours in Delhi NCR
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
