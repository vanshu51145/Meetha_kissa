import { getProduct, type Product } from "./products.ts";

// Everything the checkout shares between the server actions and the client form.
// Prices are NEVER taken from the client — they are looked up here from the catalogue.

export type CheckoutItem = { slug: string; qty: number };

export type Customer = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  notes: string;
};

export type CheckoutPayment =
  | { method: "cod" }
  | { method: "demo"; orderId: string; signature: string }
  | { method: "razorpay"; orderId: string; paymentId: string; signature: string };

export type PricedItem = {
  slug: string;
  name: string;
  price: number;
  unit: string;
  qty: number;
};

export type PlaceOrderInput = {
  items: unknown;
  customer: Customer;
  payment: CheckoutPayment;
};

export type PlaceOrderResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

export type StartPaymentResult =
  | { ok: true; mode: "razorpay"; orderId: string; amount: number; keyId: string }
  | { ok: true; mode: "demo"; orderId: string; amount: number; signature: string }
  | { ok: false; error: string };

export type Priced =
  | { ok: true; items: PricedItem[]; subtotal: number; delivery: number; total: number }
  | { ok: false; error: string };

export const FREE_DELIVERY_OVER = 999;
export const DELIVERY_FEE = 79;

export const deliveryFor = (subtotal: number) =>
  subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;

export function priceItems(raw: unknown): Priced {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 40) {
    return { ok: false, error: "Your box is empty." };
  }

  const items: PricedItem[] = [];
  for (const entry of raw) {
    const slug = typeof entry === "object" && entry ? (entry as CheckoutItem).slug : undefined;
    const qty = typeof entry === "object" && entry ? (entry as CheckoutItem).qty : undefined;
    const product: Product | undefined = typeof slug === "string" ? getProduct(slug) : undefined;
    if (!product) return { ok: false, error: "One of the items in your box is no longer available." };
    if (!Number.isInteger(qty) || (qty as number) < 1 || (qty as number) > 25) {
      return { ok: false, error: `Please check the quantity for ${product.name}.` };
    }
    if (items.some((item) => item.slug === product.slug)) {
      return { ok: false, error: `${product.name} appears twice in your box.` };
    }
    items.push({
      slug: product.slug,
      name: product.name,
      price: product.price,
      unit: product.unit,
      qty: qty as number,
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = deliveryFor(subtotal);
  return { ok: true, items, subtotal, delivery, total: subtotal + delivery };
}

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Returns an error message, or null when the address is good enough to pack a box for. */
export function customerError(customer: Customer | undefined): string | null {
  if (!customer) return "Please fill in your delivery details.";
  if (text(customer.name, 80).length < 2) return "Please enter your name.";
  if (!/^[6-9]\d{9}$/.test(text(customer.phone, 20).replace(/\D/g, "").slice(-10))) {
    return "Please enter a valid 10-digit mobile number.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(customer.email, 120))) {
    return "Please enter a valid email address.";
  }
  if (text(customer.address, 200).length < 10) return "Please enter your full delivery address.";
  if (text(customer.city, 60).length < 2) return "Please enter your city.";
  if (!/^\d{6}$/.test(text(customer.pincode, 10))) return "Please enter a valid 6-digit pincode.";
  return null;
}

export const cleanCustomer = (customer: Customer): Customer => ({
  name: text(customer.name, 80),
  phone: text(customer.phone, 20).replace(/\D/g, "").slice(-10),
  email: text(customer.email, 120),
  address: text(customer.address, 200),
  city: text(customer.city, 60),
  pincode: text(customer.pincode, 10),
  notes: text(customer.notes, 500),
});
