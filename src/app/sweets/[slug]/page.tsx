import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, HeartHandshake, Leaf, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import PurchasePanel from "@/components/PurchasePanel";
import { categories, getProduct, inr, products, relatedProducts } from "@/lib/products";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Sweet not found" };
  return {
    title: product.name,
    description: product.tagline,
    openGraph: { title: product.name, description: product.tagline },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://meethakissa.in${product.image}`,
    description: `${product.tagline} ${product.description}`,
    sku: product.slug,
    brand: { "@type": "Brand", name: "Meetha Kissa" },
    offers: {
      "@type": "Offer",
      url: `https://meethakissa.in/sweets/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  const promises = [
    { icon: Leaf, text: "No preservatives or artificial colour" },
    { icon: ShieldCheck, text: "Prepared in a FSSAI-certified kitchen" },
    { icon: HeartHandshake, text: "Hand-finished, never machine-cut" },
    { icon: Truck, text: "Same-day dispatch for orders before 4 PM" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="border-b border-[#650D16]/20 bg-[#F4EAD5]/30">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-xs uppercase tracking-[0.18em] text-[#351B19]/65 font-serif sm:px-6 lg:px-8"
        >
          <Link href="/" className="hover:text-[#650D16]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/sweets" className="hover:text-[#650D16]">
            Sweets
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#650D16]">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#C49A3A]/30 shadow-[0_40px_80px_-45px_rgba(61,8,15,0.4)]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {product.categories.map((slug) => {
              const category = categories.find((c) => c.slug === slug);
              if (!category) return null;
              return (
                <Link
                  key={slug}
                  href={`/sweets?cat=${slug}`}
                  className="rounded-full border border-[#C49A3A]/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#F5C84C] transition-all hover:bg-[#650D16] hover:text-[#FFF8E9]"
                >
                  {category.name}
                </Link>
              );
            })}
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-tight text-[#650D16] sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 text-xl italic text-[#351B19]/60">{product.tagline}</p>

          <p className="mt-8 font-serif text-3xl text-[#650D16]">
            {inr(product.price)}
            <span className="ml-2 font-sans text-base not-italic text-[#351B19]/60">
              / {product.unit}
            </span>
          </p>

          <p className="mt-8 leading-relaxed text-[#351B19]/75 text-lg">
            {product.description}
          </p>

          <div className="mt-10">
            <h2 className="text-[11px] uppercase tracking-[0.25em] text-[#351B19]/60 font-serif">
              What&apos;s inside
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="rounded-full bg-[#F4EAD5] px-5 py-2 text-base text-[#650D16]"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <PurchasePanel product={product} />

          <ul className="mt-10 grid gap-6 border-t border-[#650D16]/10 pt-8 sm:grid-cols-2">
            {promises.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-4 text-base text-[#351B19]/70 leading-relaxed">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#F5C84C]" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-[#650D16]/20 bg-[#FFF8E9] py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif text-5xl text-[#650D16]">
              Pairs beautifully with
            </h2>
            <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
