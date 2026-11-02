"use server";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import {
  cleanCustomer,
  customerError,
  priceItems,
  type PlaceOrderInput,
  type PlaceOrderResult,
  type StartPaymentResult,
  type CheckoutItem,
  type CheckoutPayment,
} from "../../lib/checkout.ts";
import { append } from "../../lib/store.ts";

const checkoutEnabled = () =>
  Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

const razorpayAuth = () =>
  `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64")}`;

const VERIFY_ERROR =
  "We couldn't verify that payment. Please try again, or choose cash on delivery.";

/** Creates a Razorpay order for the box total. Amount comes from the catalogue, never the client. */
export async function startPayment(items: CheckoutItem[]): Promise<StartPaymentResult> {
  if (!checkoutEnabled()) {
    return { ok: false, error: "Online payment is not configured yet." };
  }
  const priced = priceItems(items);
  if (!priced.ok) return priced;

  try {
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { Authorization: razorpayAuth(), "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: priced.total * 100,
        currency: "INR",
        receipt: `mk-${Date.now()}`,
      }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`razorpay ${response.status}`);
    const order = (await response.json()) as { id: string; amount: number };
    return { ok: true, orderId: order.id, amount: order.amount, keyId: process.env.RAZORPAY_KEY_ID! };
  } catch (error) {
    console.error("startPayment failed", error);
    return { ok: false, error: "We couldn't start the payment. Please try again, or choose cash on delivery." };
  }
}

async function verifyPayment(
  payment: Extract<CheckoutPayment, { method: "razorpay" }>,
  total: number,
): Promise<string | null> {
  if (!checkoutEnabled()) return "Online payment is not available right now — please choose cash on delivery.";
  if (!payment.orderId?.startsWith("order_") || !payment.paymentId?.startsWith("pay_")) {
    return VERIFY_ERROR;
  }

  const expected = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${payment.orderId}|${payment.paymentId}`)
    .digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(String(payment.signature));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return VERIFY_ERROR;

  // The signature proves Razorpay made the payment; this proves it was for this box.
  try {
    const response = await fetch(`https://api.razorpay.com/v1/orders/${payment.orderId}`, {
      headers: { Authorization: razorpayAuth() },
      cache: "no-store",
    });
    if (!response.ok) return VERIFY_ERROR;
    const order = (await response.json()) as { status: string; amount: number };
    if (order.status !== "paid" || order.amount !== total * 100) return VERIFY_ERROR;
  } catch (error) {
    console.error("verifyPayment failed", error);
    return VERIFY_ERROR;
  }
  return null;
}

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const priced = priceItems(input?.items);
  if (!priced.ok) return priced;

  const addressProblem = customerError(input?.customer);
  if (addressProblem) return { ok: false, error: addressProblem };

  const payment = input?.payment;
  if (!payment || (payment.method !== "cod" && payment.method !== "razorpay")) {
    return { ok: false, error: "Please choose how you'd like to pay." };
  }
  if (payment.method === "razorpay") {
    const problem = await verifyPayment(payment, priced.total);
    if (problem) return { ok: false, error: problem };
  }

  const id = `MK-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString("hex").toUpperCase()}`;
  try {
    await append("orders.json", {
      id,
      createdAt: new Date().toISOString(),
      status: payment.method === "cod" ? "cod_pending" : "paid",
      payment:
        payment.method === "cod"
          ? { method: "cod" }
          : { method: "razorpay", orderId: payment.orderId, paymentId: payment.paymentId },
      customer: cleanCustomer(input.customer),
      items: priced.items,
      subtotal: priced.subtotal,
      delivery: priced.delivery,
      total: priced.total,
    });
  } catch (error) {
    console.error("placeOrder failed", error);
    return {
      ok: false,
      error:
        payment.method === "razorpay"
          ? "Your payment went through but we couldn't save the order — please call +91 98100 12345 so we can pack it by hand."
          : "We couldn't save your order — please try again, or call +91 98100 12345.",
    };
  }

  return { ok: true, orderId: id };
}
