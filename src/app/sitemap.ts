import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const BASE = "https://meethakissa.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "yearly") => ({
    url: `${BASE}${path}`,
    lastModified: now,
    priority,
    changeFrequency,
  });

  return [
    page("/", 1, "weekly"),
    page("/sweets", 0.9, "weekly"),
    page("/about", 0.5, "yearly"),
    page("/contact", 0.5, "yearly"),
    ...products.map((product) => page(`/sweets/${product.slug}`, 0.8, "weekly")),
  ];
}
