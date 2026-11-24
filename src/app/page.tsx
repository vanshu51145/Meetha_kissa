import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gift, Leaf, ScrollText, Sparkles, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
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
    title: "Traditional Craftsmanship",
    text: "Every sweet is thoughtfully prepared with attention to detail, flavour and quality.",
  },
  {
    icon: Gift,
    title: "Elegantly Presented",
    text: "Beautifully curated boxes, refined details and thoughtful presentation for every special occasion.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-[#650D16] text-[#FFF8E9] overflow-hidden">
        {/* Decorative golden shapes */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#F5C84C]/20 blur-[120px]"
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#F5C84C]/20 blur-[120px]"
          aria-hidden
        />
        <div
          className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full border-2 border-[#C49A3A]/30"
          aria-hidden
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 lg:py-40">
          <div className="grid lg:grid-cols-2 lg:gap-24 items-center gap-10">
            {/* Left: Text Content */}
            <div className="relative z-10">
              <Reveal>
                <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[#F5C84C] font-medium border border-[#C49A3A]/40 px-5 py-2 rounded-full bg-[#FFF8E9]/10 backdrop-blur-sm">
                  <span className="h-px w-10 bg-[#C49A3A]/50" />
                  Handcrafted mithai · Timeless
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-8 font-serif text-6xl leading-[1.05] text-[#FFF8E9] sm:text-8xl lg:text-[5rem]">
                  Sweet Traditions,
                  <br />
                  Made <span className="italic text-[#F5C84C]">Timeless</span>.
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-10 max-w-xl text-xl leading-relaxed text-[#FFF8E9]/90">
                  Handcrafted Indian mithai, prepared in small batches with pure
                  ghee, traditional techniques, and meticulous attention to detail.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-12 flex flex-wrap items-center gap-5">
                  <Link
                    href="/sweets"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F5C84C] px-12 py-5 text-sm font-medium tracking-wide text-[#3D080F] transition-all hover:bg-[#E5B84C] hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(245,200,76,0.3)]"
                  >
                    Explore Sweets
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FFF8E9]/40 px-12 py-5 text-sm font-medium tracking-wide text-[#FFF8E9] transition-all hover:border-[#F5C84C] hover:bg-[#FFF8E9]/10"
                  >
                    Our Story
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.32}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#FFF8E9]/80">
                  <span className="flex items-center gap-4">
                    <span className="flex items-center gap-2">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#F5C84C] font-medium font-serif">
                        Rated by Our Customers
                      </span>
                      <span className="flex gap-0.5 text-[#F5C84C]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="h-4 w-4 fill-current" />
                        ))}
                      </span>
                      <span className="text-lg font-serif text-[#FFF8E9]">4.9 / 5</span>
                    </span>
                  </span>
                  <span className="hidden h-4 w-px bg-[#FFF8E9]/30 sm:block" />
                  <span>Fresh batches made daily</span>
                </div>
              </Reveal>
            </div>

            {/* Right: Circular Mithai Image */}
            <div className="relative z-10">
              <Reveal delay={0.15}>
                <div className="relative">
                  {/* Decorative rings behind image */}
                  <div
                    className="absolute -inset-3 rounded-full border-2 border-[#F5C84C]/30 animate-ping"
                    aria-hidden
                  />
                  <div
                    className="absolute -inset-6 rounded-full border-2 border-[#C49A3A]/20 animate-[spin_20s_linear_infinite]"
                    aria-hidden
                  />
                  <div
                    className="relative rounded-full overflow-hidden border-5 border-[#C49A3A]/60 shadow-[0_30px_80px_-25px_rgba(61,8,15,0.6)]"
                    style={{
                      width: "100%",
                      aspectRatio: 1,
                    }}
                  >
                    <Image
                      src="/home-hero.jpg"
                      alt="Hands lifting a saffron ladoo from a brass bowl surrounded by festive flowers"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </Reveal>
              <div className="absolute -left-4 bottom-4 max-w-[14rem] rounded-2xl border border-[#C49A3A]/40 bg-[#FFF8E9]/90 p-6 shadow-[0_20px_60px_-20px_rgba(61,8,15,0.3)] backdrop-blur-sm">
                <p className="flex items-center gap-3 font-serif text-base text-[#650D16]">
                  <Sparkles className="h-4 w-4 text-[#F5C84C]" />
                  Made this morning
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#351B19]/70">
                  Every box is packed the day it is ordered — never earlier.
                </p>
              </div>
              <div className="absolute -right-1 top-4 grid h-24 w-24 rotate-[-8deg] place-items-center rounded-full border border-[#C49A3A]/40 bg-[#FFF8E9]/90 text-center shadow-[0_20px_60px_-20px_rgba(61,8,15,0.3)] sm:h-28 sm:w-28">
                <span className="px-2 font-serif text-[11px] uppercase leading-tight tracking-[0.12em] text-[#650D16]">
                  100%
                  <br />
                  <span className="text-[#B8860B]">Pure Ghee</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-[#650D16]/20 bg-[#F4EAD5]/40 py-20">
        <div className="no-scrollbar mx-auto flex max-w-7xl snap-x gap-6 overflow-x-auto px-4 py-8 sm:justify-center sm:px-6 lg:px-8">
          {trust.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-w-fit snap-start items-center gap-4"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#F5C84C]/40 bg-[#FFF8E9] text-[#F5C84C]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="whitespace-nowrap text-base font-medium tracking-wide text-[#650D16] font-serif">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SWEETS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#650D16] font-medium font-serif">
            The counter classics
          </p>
          <h2 className="mt-6 font-serif text-5xl text-[#650D16] sm:text-6xl">
            Our Signature Sweets
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-[#351B19]/80">
            The six boxes we have been filling every single day since the first
            kitchen opened its shutters.
          </p>
        </Reveal>
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 3) * 0.08}>
              <ProductCard product={product} priority={index < 2} />
            </Reveal>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/sweets"
            className="group inline-flex items-center gap-2 rounded-full border border-[#650D16]/30 px-12 py-5 text-sm font-medium tracking-wide text-[#650D16] transition-all hover:border-[#650D16] hover:bg-[#650D16]/10"
          >
            View all sweets
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-[#650D16]/20 bg-[#FFF8E9] py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#650D16] font-medium font-serif">
              Browse by mood
            </p>
            <h2 className="mt-6 font-serif text-5xl text-[#650D16]">
              Find Your Favourite
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-16">
            <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
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
                    className={`group flex min-w-fit snap-start items-center gap-4 rounded-full border px-6 py-3.5 transition-all duration-300 border-[#C49A3A]/30 bg-[#FFF8E9] text-[#650D16] hover:border-[#650D16] hover:bg-[#650D16] hover:text-[#FFF8E9]`}
                    >
                      <span className="font-serif text-lg text-[#650D16] group-hover:text-[#FFFFFF]">
                        {category.name}
                      </span>
                      <span className="grid h-7 min-w-7 place-items-center rounded-full bg-[#650D16]/10 px-2 text-[11px] font-medium text-[#650D16] transition-colors group-hover:bg-[#FFF8E9] group-hover:text-[#F5C84C]">
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28">
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl border border-[#C49A3A]/30 bg-[#650D16] text-[#FFF8E9] lg:grid-cols-2">
            <div className="relative order-2 min-h-[20rem] lg:order-1 lg:min-h-[32rem]">
              <Image
                src="/home-gift-box.jpg"
                alt="Overhead view of a gift box filled with barfi, sandesh, cham cham and ladoo"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#650D16]/60 via-transparent to-transparent" />
            </div>
            <div className="order-1 flex flex-col justify-center p-10 lg:order-2 lg:p-16">
              <p className="text-xs uppercase tracking-[0.3em] text-[#FFF8E9] font-medium font-serif">
                Gifting, sorted
              </p>
              <h2 className="mt-6 font-serif text-5xl leading-tight sm:text-6xl text-[#FFF8E9]">
                Made for Every Celebration
              </h2>
              <p className="mt-6 max-w-md text-xl leading-relaxed text-[#FFF8E9]/80">
                From intimate family gatherings to grand celebrations, our
                handcrafted gift boxes make every occasion a little sweeter.
              </p>
              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  href="/sweets?cat=gift-boxes"
                  className="rounded-full bg-[#F5C84C] px-8 py-4 text-sm font-medium tracking-wide text-[#3D080F] transition-all hover:bg-[#E5B84C]"
                >
                  Explore Gift Boxes
                </Link>
                <Link
                  href="/sweets"
                  className="rounded-full border border-[#FFF8E9]/40 px-8 py-4 text-sm font-medium tracking-wide text-[#FFF8E9] transition-all hover:border-[#F5C84C] hover:text-[#F5C84C]"
                >
                  Create Your Box
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* WHY MITHAAS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#650D16] font-medium font-serif">
            Why Meetha Kissa
          </p>
          <h2 className="mt-6 font-serif text-5xl text-[#650D16] sm:text-6xl">
            Four promises we keep
          </h2>
        </Reveal>
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <div className="h-full rounded-2xl border border-[#650D16]/20 bg-[#FFF8E9] p-10 transition-all duration-500 hover:border-[#F5C84C]/50 hover:shadow-[0_16px_40px_-16px_rgba(61,8,15,0.1)]">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[#650D16] text-[#F5C84C] shadow-[0_10px_20px_-10px_rgba(101,13,22,0.2)]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-8 font-serif text-xl text-[#650D16]">{title}</h3>
                <p className="mt-5 text-base leading-relaxed text-[#351B19]/70">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="border-y border-[#650D16]/20 bg-[#F4EAD5]/30 py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#C49A3A]/30 shadow-[0_40px_80px_-45px_rgba(61,8,15,0.4)]">
              <Image
                src="/images/mithai-preparation.jpg"
                alt="Traditional Indian mithai preparation, hands shaping homemade sweets"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#650D16] font-medium font-serif">
              Our story
            </p>
            <h2 className="mt-6 font-serif text-5xl leading-tight text-[#650D16] sm:text-6xl">
              A Sweet Idea That Started at Home.
            </h2>
            <p className="mt-8 text-xl leading-relaxed text-[#351B19]/80">
              Every great idea begins with a small thought. Meetha Kissa started
              with a simple passion for making sweets at home.
            </p>
            <p className="mt-6 leading-relaxed text-[#351B19]/70">
              The idea of introducing homemade sweets in college came from
              noticing an opportunity where there was little competition and a
              chance to offer something different.
            </p>
            <p className="mt-6 leading-relaxed text-[#351B19]/70">
              One small idea turned into a journey of creativity, learning and
              entrepreneurship.
            </p>
            <p className="mt-6 leading-relaxed text-[#351B19]/70">
              Today, Meetha Kissa represents our love for traditional Indian
              sweets, thoughtful preparation and the courage to turn a simple
              idea into something meaningful.
            </p>
            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-[#650D16] underline decoration-[#F5C84C] decoration-2 underline-offset-8"
            >
              Read the full story
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* BRAND HIGHLIGHTS */}
      <section className="border-y border-[#650D16]/20 bg-[#F4EAD5]/20 py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#650D16] font-medium font-serif">
              Meetha Kissa
            </p>
            <h2 className="mt-6 font-serif text-5xl text-[#650D16] sm:text-6xl">
              Made with Care, Shared with Love
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-[#351B19]/80">
              Every sweet has a story of tradition, flavour and thoughtful
              preparation. At Meetha Kissa, we bring you delightful Indian
              sweets made to make your special moments sweeter.
            </p>
          </Reveal>
          <div className="mt-20 grid gap-10 grid-cols-1 sm:grid-cols-3">
            {[
              {
                title: "Traditional Indian Flavours",
                text: "Authentic recipes and real ingredients that capture the essence of Indian mithai.",
              },
              {
                title: "Thoughtful Preparation",
                text: "Each sweet is carefully prepared with attention to detail and quality.",
              },
              {
                title: "Beautifully Presented",
                text: "Thoughtfully arranged and presented for every special occasion.",
              },
            ].map(({ title, text }, index) => (
              <Reveal key={title} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-[#650D16]/20 bg-[#FFF8E9] p-10 text-center transition-all duration-500 hover:border-[#F5C84C]/50 hover:shadow-[0_16px_40px_-16px_rgba(61,8,15,0.1)]">
                  <h3 className="mt-8 font-serif text-xl text-[#650D16]">{title}</h3>
                  <p className="mt-5 text-base leading-relaxed text-[#351B19]/70">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="rounded-3xl border border-[#650D16]/30 bg-[#650D16] text-[#FFF8E9] p-12 sm:p-20 text-center shadow-[0_30px_80px_-25px_rgba(101,13,22,0.3)]">
            <h2 className="font-serif text-5xl sm:text-6xl">
              A Little Sweetness for Every Occasion
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-[#FFF8E9]/90">
              Discover our collection of traditional Indian sweets, thoughtfully
              prepared and beautifully presented for your special moments.
            </p>
            <div className="mt-12">
              <Link
                href="/sweets"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F5C84C] px-14 py-5 text-sm font-medium tracking-wide text-[#3D080F] transition-all hover:bg-[#E5B84C] hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(245,200,76,0.3)]"
              >
                Explore Our Sweets
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
