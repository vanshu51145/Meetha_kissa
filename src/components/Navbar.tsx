"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X, Phone } from "lucide-react";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/", label: "Home" },
  { href: "/sweets", label: "Our Sweets" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count, openCart, openSearch } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="bg-wine text-cream/90">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center text-[11px] tracking-[0.18em] uppercase">
          <span className="hidden sm:inline">Handmade fresh every morning</span>
          <span className="hidden sm:inline text-gold-light">·</span>
          <span>Free delivery over ₹999</span>
          <span className="text-gold-light">·</span>
          <a href="tel:+919810012345" className="flex items-center gap-1.5 hover:text-gold-light">
            <Phone className="h-3 w-3" />
            +91 98100 12345
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-wine/10 bg-cream/85 shadow-[0_8px_30px_rgba(76,16,25,0.06)] backdrop-blur-xl"
            : "border-b border-transparent bg-cream"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-gold/40 bg-cream-dark ring-1 ring-gold/20 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/logo-mark.png"
                alt="Meetha Kissa emblem"
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif text-xl font-semibold tracking-wide text-wine sm:text-2xl">
                Meetha Kissa
              </span>
              <span className="mt-1 hidden font-serif text-[11px] italic tracking-[0.2em] text-gold sm:block">
                maa se pyar se
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors ${
                    active ? "text-wine" : "text-ink/70 hover:text-wine"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search sweets"
              className="grid h-10 w-10 place-items-center rounded-full text-wine transition-colors hover:bg-wine/5"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open sweet box, ${count} items`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-wine transition-colors hover:bg-wine/5"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-semibold text-wine-dark"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-wine transition-colors hover:bg-wine/5 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-wine-dark/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-cream shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-wine/10 px-6 py-5">
                <span className="font-serif text-xl text-wine">Menu</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full text-wine hover:bg-wine/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-6 py-8">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * index + 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-wine/5 py-4 font-serif text-3xl text-wine"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto border-t border-wine/10 px-6 py-6 text-sm text-ink/70">
                <p className="font-serif text-lg text-wine">maa se pyar se</p>
                <p className="mt-2">
                  Amrit Market, Rajouri Garden
                  <br />
                  New Delhi 110027
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
