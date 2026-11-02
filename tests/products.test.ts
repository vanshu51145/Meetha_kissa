import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { categories, getProduct, inr, products, relatedProducts } from "../src/lib/products.ts";
import { customerError, deliveryFor, priceItems } from "../src/lib/checkout.ts";

test("slugs are unique and every one resolves", () => {
  const slugs = products.map((product) => product.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) assert.ok(getProduct(slug), `missing product for ${slug}`);
});

test("every product has a real local image", () => {
  assert.ok(products.length > 0);
  for (const product of products) {
    assert.match(product.image, /^\/products\/[a-z0-9-]+\.jpg$/, product.slug);
    assert.ok(
      existsSync(path.join(process.cwd(), "public", product.image)),
      `image not on disk: ${product.image}`,
    );
  }
});

test("products only use categories that exist", () => {
  const known = new Set(categories.map((category) => category.slug));
  for (const product of products) {
    for (const category of product.categories) assert.ok(known.has(category), `${product.slug}: ${category}`);
  }
});

test("prices are whole rupees above zero", () => {
  for (const product of products) {
    assert.ok(Number.isInteger(product.price) && product.price > 0, product.slug);
    assert.ok(product.unit.length > 0, product.slug);
  }
});

test("related products exclude the product itself", () => {
  const product = products[0];
  const related = relatedProducts(product);
  assert.ok(related.every((item) => item.slug !== product.slug));
  assert.ok(related.length <= 4);
});

test("inr formats Indian-style", () => {
  assert.equal(inr(1450), "₹1,450");
});

test("priceItems looks prices up in the catalogue, never from the caller", () => {
  const priced = priceItems([{ slug: "kaju-katli", qty: 2 }]);
  assert.ok(priced.ok);
  if (priced.ok) {
    assert.equal(priced.subtotal, 650 * 2);
    assert.equal(priced.total, priced.subtotal + priced.delivery);
    assert.deepEqual(priced.items[0], {
      slug: "kaju-katli",
      name: "Kaju Katli",
      price: 650,
      unit: "500g",
      qty: 2,
    });
  }

  assert.equal(priceItems([]).ok, false, "empty box");
  assert.equal(priceItems([{ slug: "not-a-sweet", qty: 1 }]).ok, false, "unknown slug");
  assert.equal(priceItems([{ slug: "kaju-katli", qty: 0 }]).ok, false, "zero qty");
  assert.equal(priceItems([{ slug: "kaju-katli", qty: 1.5 }]).ok, false, "fractional qty");
  assert.equal(priceItems([{ slug: "kaju-katli", qty: 999 }]).ok, false, "absurd qty");
  assert.equal(priceItems([{ slug: "kaju-katli", qty: 1 }, { slug: "kaju-katli", qty: 1 }]).ok, false, "duplicates");
});

test("delivery is free over the threshold", () => {
  assert.equal(deliveryFor(0), 0);
  assert.equal(deliveryFor(998), 79);
  assert.equal(deliveryFor(999), 0);
});

test("customerError only accepts a deliverable address", () => {
  const good = {
    name: "Priya Sharma",
    phone: "+91 98100 12345",
    email: "priya@example.com",
    address: "Flat 4B, Amrit Market, Rajouri Garden",
    city: "New Delhi",
    pincode: "110027",
    notes: "",
  };
  assert.equal(customerError(good), null);
  assert.equal(customerError(undefined), "Please fill in your delivery details.");
  assert.ok(customerError({ ...good, phone: "12345" }));
  assert.ok(customerError({ ...good, pincode: "11002" }));
  assert.ok(customerError({ ...good, email: "not-an-email" }));
  assert.ok(customerError({ ...good, address: "1 Main St" }));
});
