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
      <div className="border-b border-wine/10 bg-cream-dark/40">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-xs uppercase tracking-[0.18em] text-ink/65 sm:px-6 lg:px-8"
        >
          <Link href="/" className="hover:text-wine">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/sweets" className="hover:text-wine">
            Sweets
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-wine">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/30 shadow-[0_40px_80px_-45px_rgba(76,16,25,0.55)]">
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
                  className="rounded-full border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-cream"
                >
                  {category.name}
                </Link>
              );
            })}
          </div>

          <h1 className="mt-5 font-serif text-5xl leading-tight text-wine">
            {product.name}
          </h1>
          <p className="mt-3 text-lg italic text-ink/60">{product.tagline}</p>

          <p className="mt-7 font-serif text-3xl text-wine">
            {inr(product.price)}
            <span className="ml-2 font-sans text-sm not-italic text-ink/65">
              / {product.unit}
            </span>
          </p>

          <p className="mt-7 leading-relaxed text-ink/75">
            {product.description}
          </p>

          <div className="mt-8">
            <h2 className="text-[11px] uppercase tracking-[0.25em] text-ink/60">
              What&apos;s inside
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="rounded-full bg-cream-dark px-4 py-1.5 text-sm text-wine"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <PurchasePanel product={product} />

          <ul className="mt-8 grid gap-4 border-t border-wine/10 pt-8 sm:grid-cols-2">
            {promises.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-ink/70">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-wine/10 bg-white/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif text-4xl text-wine">
              Pairs beautifully with
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
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
