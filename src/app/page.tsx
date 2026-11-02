import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gift, Leaf, ScrollText, Sparkles, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import { categories, featuredProducts, products } from "@/lib/products";

const trust = [
  { icon: Leaf, label: "100% Fresh Ingredients" },
  { icon: ScrollText, label: "Traditional Recipes" },
  { icon: Sparkles, label: "Handcrafted Daily" },
  { icon: Star, label: "Premium Quality" },
];

const reasons = [
  {
    icon: Sparkles,
    title: "Made Fresh",
    text: "Prepared in small batches every morning, so nothing sits on a shelf waiting for you.",
  },
  {
    icon: Leaf,
    title: "Pure Ingredients",
    text: "Pure ghee, full-fat milk, real saffron and hand-picked dry fruits. No preservatives, ever.",
  },
  {
    icon: ScrollText,
    title: "Family Recipes",
    text: "Time-tested recipes from our first kitchen in 1998, followed to the gram.",
  },
  {
    icon: Gift,
    title: "Beautifully Packed",
    text: "Hand-finished boxes, satin ribbons and handwritten notes — made for gifting.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,180,91,0.18),transparent_55%)]"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8 lg:pb-28 lg:pt-20">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-10 bg-gold/50" />
              Handcrafted mithai · Since 1998
            </p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-wine sm:text-6xl lg:text-7xl">
              Sweet Traditions,
              <br />
              Made <span className="italic text-gold">Timeless</span>.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/70">
              Handcrafted Indian sweets made with the finest ingredients,
              cherished recipes, and a whole lot of love.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/sweets"
                className="group inline-flex items-center gap-2 rounded-full bg-wine px-8 py-4 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-wine-soft"
              >
                Explore Sweets
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-wine/25 px-8 py-4 text-sm font-medium tracking-wide text-wine transition-colors hover:border-wine hover:bg-wine/5"
              >
                Our Story
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink/60">
              <span className="flex items-center gap-2">
                <span className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
                4.9 / 5 from 2,400+ families
              </span>
              <span className="hidden h-4 w-px bg-wine/15 sm:block" />
              <span>Fresh batches made daily</span>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full border border-dashed border-gold/30 sm:-inset-10 animate-spin [animation-duration:60s]"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/30 shadow-[0_40px_90px_-40px_rgba(76,16,25,0.55)] sm:aspect-[4/4.6]">
              <Image
                src="/home-hero.jpg"
                alt="Hands lifting a saffron ladoo from a brass bowl surrounded by festive flowers"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-[62%_center]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-wine-dark/40 to-transparent" />
            </div>
            <div className="absolute -left-2 bottom-8 max-w-[13rem] rounded-2xl border border-gold/30 bg-cream/95 p-4 shadow-xl backdrop-blur sm:-left-8">
              <p className="flex items-center gap-2 font-serif text-base text-wine">
                <Sparkles className="h-4 w-4 text-gold" />
                Made this morning
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink/60">
                Every box is packed the day it is ordered — never earlier.
              </p>
            </div>
            <div className="absolute -right-1 top-6 grid h-24 w-24 rotate-[-8deg] place-items-center rounded-full border border-gold/40 bg-cream/95 text-center shadow-lg sm:-right-6 sm:h-28 sm:w-28">
              <span className="px-2 font-serif text-[11px] uppercase leading-tight tracking-[0.12em] text-wine">
                100%
                <br />
                <span className="text-gold">Pure Ghee</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-wine/10 bg-cream-dark/60">
        <div className="no-scrollbar mx-auto flex max-w-7xl snap-x gap-6 overflow-x-auto px-4 py-7 sm:justify-center sm:px-6 lg:px-8">
          {trust.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-w-fit snap-start items-center gap-3"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-cream text-gold">
                <Icon className="h-4 w-4" />
              </span>
              <span className="whitespace-nowrap text-sm font-medium tracking-wide text-wine">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SWEETS */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            The counter classics
          </p>
          <h2 className="mt-4 font-serif text-4xl text-wine sm:text-5xl">
            Our Signature Sweets
          </h2>
          <p className="mt-4 text-ink/65">
            The six boxes we have been filling every single day since the first
            kitchen opened its shutters.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 3) * 0.08}>
              <ProductCard product={product} priority={index < 2} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/sweets"
            className="group inline-flex items-center gap-2 rounded-full border border-wine/25 px-8 py-3.5 text-sm font-medium tracking-wide text-wine transition-colors hover:border-wine hover:bg-wine/5"
          >
            View all sweets
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-wine/10 bg-white/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
              Browse by mood
            </p>
            <h2 className="mt-4 font-serif text-4xl text-wine">Find Your Favourite</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
              {categories.map((category) => {
                const total =
                  category.slug === "all"
                    ? products.length
                    : products.filter((p) =>
                        p.categories.includes(category.slug),
                      ).length;
                return (
                  <Link
                    key={category.slug}
                    href={
                      category.slug === "all"
                        ? "/sweets"
                        : `/sweets?cat=${category.slug}`
                    }
                    className="group flex min-w-fit snap-start items-center gap-3 rounded-full border border-wine/15 bg-cream px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_16px_30px_-20px_rgba(76,16,25,0.6)]"
                  >
                    <span className="font-serif text-lg text-wine">
                      {category.name}
                    </span>
                    <span className="grid h-6 min-w-6 place-items-center rounded-full bg-cream-dark px-1.5 text-[11px] font-medium text-gold transition-colors group-hover:bg-gold group-hover:text-cream">
                      {total}
                    </span>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* GIFTING */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid overflow-hidden rounded-[2rem] border border-gold/25 bg-wine text-cream lg:grid-cols-2">
            <div className="relative order-2 min-h-[18rem] lg:order-1 lg:min-h-[30rem]">
              <Image
                src="/home-gift-box.jpg"
                alt="Overhead view of a gift box filled with barfi, sandesh, cham cham and ladoo"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-wine/50 via-transparent to-transparent" />
            </div>
            <div className="order-1 flex flex-col justify-center p-10 lg:order-2 lg:p-16">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold-light">
                Gifting, sorted
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Made for Every Celebration
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-cream/75">
                From intimate family gatherings to grand celebrations, our
                handcrafted gift boxes make every occasion a little sweeter.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/sweets?cat=gift-boxes"
                  className="rounded-full bg-gold-light px-7 py-3.5 text-sm font-medium tracking-wide text-wine-dark transition-colors hover:bg-cream"
                >
                  Explore Gift Boxes
                </Link>
                <Link
                  href="/sweets"
                  className="rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors hover:border-gold-light hover:text-gold-light"
                >
                  Create Your Box
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* WHY MITHAAS */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            Why Meetha Kissa
          </p>
          <h2 className="mt-4 font-serif text-4xl text-wine sm:text-5xl">
            Four promises we never break
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <div className="h-full rounded-2xl border border-wine/10 bg-white/50 p-8 transition-colors duration-500 hover:border-gold/40">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-wine text-gold-light">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-serif text-xl text-wine">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="border-y border-wine/10 bg-cream-dark/50 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/30 shadow-[0_40px_80px_-45px_rgba(76,16,25,0.6)]">
              <Image
                src="/home-halwai.jpg"
                alt="A halwai frying fresh boondi in a large kadhai, the traditional way"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 grid h-28 w-28 place-items-center rounded-full border border-gold/40 bg-cream text-center shadow-xl sm:-right-8 sm:h-32 sm:w-32">
              <span className="font-serif text-[11px] uppercase tracking-[0.2em] text-gold">
                Since
                <br />
                <span className="text-3xl text-wine">1998</span>
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
              Our story
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-wine sm:text-5xl">
              A Story That Began With One Recipe.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Meetha Kissa began with a simple belief — that sweets are more
              than food. They are memories, celebrations and a way of bringing
              people together.
            </p>
            <p className="mt-4 leading-relaxed text-ink/65">
              It started at a single counter in Rajouri Garden, where our
              grandmother&apos;s besan ladoo sold out before noon. Three
              generations later we still roast besan the way she did: slowly,
              in pure ghee, without shortcuts.
            </p>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-wine underline decoration-gold decoration-2 underline-offset-8"
            >
              Read the full story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="rounded-[2rem] border border-wine/10 bg-white/50 px-8 py-16 text-center">
          <h2 className="font-serif text-4xl text-wine sm:text-5xl">
            Craving something sweet?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/65">
            Order before 4 PM and your mithai is packed the same evening.
            Free delivery across Delhi NCR on orders above ₹999.
          </p>
          <Link
            href="/sweets"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-wine px-9 py-4 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-wine-soft"
          >
            Order Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
