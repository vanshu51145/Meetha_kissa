import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";

// The order store writes to <cwd>/data, so chdir into a temp dir before placing orders.
const cwd = process.cwd();
let placeOrder: typeof import("../src/app/checkout/actions.ts")["placeOrder"];
let dir: string;

const customer = {
  name: "Priya Sharma",
  phone: "+91 98100 12345",
  email: "priya@example.com",
  address: "Flat 4B, Amrit Market, Rajouri Garden",
  city: "New Delhi",
  pincode: "110027",
  notes: "Ring the bell twice.",
};

before(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "meetha-kissa-order-"));
  process.chdir(dir);
  ({ placeOrder } = await import("../src/app/checkout/actions.ts"));
});

after(async () => {
  process.chdir(cwd);
  await rm(dir, { recursive: true, force: true });
});

test("a cash-on-delivery order is priced from the catalogue and saved", async () => {
  const result = await placeOrder({
    items: [{ slug: "kaju-katli", qty: 2 }],
    customer,
    payment: { method: "cod" },
  });
  assert.ok(result.ok, JSON.stringify(result));
  if (!result.ok) return;
  assert.match(result.orderId, /^MK-/);

  const orders = JSON.parse(await readFile(path.join(dir, "data", "orders.json"), "utf8"));
  assert.equal(orders.length, 1);
  assert.equal(orders[0].id, result.orderId);
  assert.equal(orders[0].subtotal, 650 * 2);
  assert.equal(orders[0].delivery, 0); // free over ₹999
  assert.equal(orders[0].total, 1300);
  assert.equal(orders[0].status, "cod_pending");
  assert.equal(orders[0].customer.phone, "9810012345"); // normalised
});

test("an order under the threshold pays delivery", async () => {
  const result = await placeOrder({
    items: [{ slug: "jalebi", qty: 1 }],
    customer,
    payment: { method: "cod" },
  });
  assert.ok(result.ok);
  if (!result.ok) return;

  const orders = JSON.parse(await readFile(path.join(dir, "data", "orders.json"), "utf8"));
  const saved = orders.find((order: { id: string }) => order.id === result.orderId);
  assert.equal(saved.total, 300 + 79);
});

test("bad input never becomes an order", async () => {
  const cases = [
    { items: [], customer, payment: { method: "cod" as const } },
    { items: [{ slug: "not-a-sweet", qty: 1 }], customer, payment: { method: "cod" as const } },
    { items: [{ slug: "kaju-katli", qty: 2 }], customer, payment: { method: "paypal" as never } },
    { items: [{ slug: "kaju-katli", qty: 2 }], customer: { ...customer, pincode: "11002" }, payment: { method: "cod" as const } },
    { items: [{ slug: "kaju-katli", qty: 2 }], customer: { ...customer, phone: "0000000000" }, payment: { method: "cod" as const } },
  ];
  for (const input of cases) {
    const result = await placeOrder(input as never);
    assert.equal(result.ok, false, JSON.stringify(input));
  }
});

test("an unverified online payment is refused", async () => {
  const result = await placeOrder({
    items: [{ slug: "kaju-katli", qty: 1 }],
    customer,
    payment: {
      method: "razorpay",
      orderId: "order_abc",
      paymentId: "pay_abc",
      signature: "not-a-real-signature",
    },
  });
  assert.equal(result.ok, false);

  const orders = JSON.parse(await readFile(path.join(dir, "data", "orders.json"), "utf8"));
  assert.equal(orders.length, 2, "refused payments must not be saved");
});
