"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Search, SearchX } from "lucide-react";
import { useCart } from "@/lib/cart";
import { categories, inr, products } from "@/lib/products";

const popular = ["Kaju Katli", "Ladoo", "Barfi", "Gift Box", "Rasmalai"];

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };
    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, closeSearch]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return products.filter((product) =>
      [
        product.name,
        product.tagline,
        product.ingredients.join(" "),
        product.categories
          .map((slug) => categories.find((c) => c.slug === slug)?.name ?? "")
          .join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[80] bg-cream/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mx-auto flex h-full max-w-3xl flex-col px-5 sm:px-6">
            <div className="flex items-center gap-4 border-b border-wine/10 py-5">
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-wine hover:bg-wine/5"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex flex-1 items-center gap-3">
                <Search className="h-5 w-5 shrink-0 text-gold" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search kaju katli, ladoo, gift box…"
                  className="w-full bg-transparent font-serif text-2xl text-wine placeholder:text-ink/30 focus:outline-none sm:text-3xl"
                />
              </div>
              <kbd className="hidden shrink-0 rounded border border-wine/15 px-2 py-1 text-[10px] uppercase tracking-widest text-ink/60 sm:block">
                Esc
              </kbd>
            </div>

            <div className="flex-1 overflow-y-auto py-8">
              {!query.trim() && (
                <>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-ink/60">
                    Popular right now
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {popular.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-wine/15 bg-white/50 px-4 py-2 text-sm text-wine transition-colors hover:border-gold hover:bg-white"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  <p className="mt-10 text-[11px] uppercase tracking-[0.25em] text-ink/60">
                    Bestsellers
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {products
                      .filter((product) => product.featured)
                      .slice(0, 4)
                      .map((product) => (
                        <ResultRow
                          key={product.slug}
                          product={product}
                          onNavigate={closeSearch}
                        />
                      ))}
                  </ul>
                </>
              )}

              {query.trim() && results.length > 0 && (
                <>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-ink/60">
                    {results.length} result{results.length === 1 ? "" : "s"}
                  </p>
                  <ul className="mt-4 grid gap-3">
                    {results.map((product) => (
                      <ResultRow
                        key={product.slug}
                        product={product}
                        onNavigate={closeSearch}
                      />
                    ))}
                  </ul>
                </>
              )}

              {query.trim() && results.length === 0 && (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <SearchX className="h-10 w-10 text-gold" />
                  <h3 className="font-serif text-2xl text-wine">
                    Nothing matches “{query}”
                  </h3>
                  <p className="max-w-sm text-sm text-ink/60">
                    Try “katli”, “ladoo” or browse the full range of mithai.
                  </p>
                  <Link
                    href="/sweets"
                    onClick={closeSearch}
                    className="mt-2 rounded-full bg-wine px-7 py-3 text-sm font-medium text-cream hover:bg-wine-soft"
                  >
                    Browse all sweets
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ResultRow({
  product,
  onNavigate,
}: {
  product: (typeof products)[number];
  onNavigate: () => void;
}) {
  return (
    <li>
      <Link
        href={`/sweets/${product.slug}`}
        onClick={onNavigate}
        className="flex items-center gap-4 rounded-2xl border border-wine/10 bg-white/50 p-3 transition-colors hover:border-gold/50 hover:bg-white"
      >
        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-beige">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </span>
        <span className="flex-1">
          <span className="block font-serif text-lg text-wine">
            {product.name}
          </span>
          <span className="block truncate text-xs text-ink/55">
            {product.tagline}
          </span>
        </span>
        <span className="font-serif text-base text-wine">
          {inr(product.price)}
        </span>
      </Link>
    </li>
  );
}
