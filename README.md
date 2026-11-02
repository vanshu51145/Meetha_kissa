# Meetha Kissa

Storefront for a Delhi NCR mithai shop. Next.js 16 (App Router, Cache Components), Tailwind 4, React 19.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint       # eslint
npm test           # node:test — catalogue + order store
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home — hero, featured boxes, testimonials |
| `/sweets`, `/sweets/[slug]` | Catalogue and product pages (16 products, fully static) |
| `/about`, `/contact` | Story and enquiry form |
| `/checkout` | Address, order summary, Pay on Delivery / Razorpay |

Cart, search and quick-view are client-side overlays; the cart persists in `localStorage`.

## Where the data goes

Orders, enquiries and subscribers are JSON files written by `src/lib/store.ts`.

- **`npm run dev` / self-hosted** — works as is, files land in `./data` (gitignored).
- **Vercel or any serverless host** — the filesystem is read-only, so orders would fail to save. Swap `src/lib/store.ts` for a real backend (Supabase, Postgres) before going live; it is the only file that touches storage.

## Payments

Three ways to pay at checkout, nothing to configure first:

- **Pay on Delivery** — cash or UPI when the box arrives.
- **Pay now (test)** — a sandbox gateway for demos. `startPayment` issues an HMAC token over the reference and the catalogue total; `placeOrder` re-derives the total and checks it, so a box edited after "paying" can't be saved at the old price. Those orders are stored as `demo_paid`.
- **Pay now (Razorpay)** — appears on its own the moment `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are in `.env.local` (copy `.env.example`). The server creates the Razorpay order, then verifies the payment signature *and* fetches the paid amount from Razorpay before an order is saved. Prices are never trusted from the browser.

## Images

Product photos live in `public/products` (Pexels, free to use). Nothing loads from a third party at runtime.

## Layout of the code

```
src/app         routes, sitemap/robots, server actions (checkout/, contact/, actions.ts)
src/components  UI
src/lib         products.ts (catalogue) · cart.tsx · checkout.ts (pricing + validation) · store.ts (files)
tests/          node:test, run with `npm test`
```
