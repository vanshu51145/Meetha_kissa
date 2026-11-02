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

- **Pay on Delivery** works with no configuration.
- **Pay online** — copy `.env.example` to `.env.local` and add Razorpay test keys. The "Pay now" option then appears at checkout. The server creates the Razorpay order, then verifies both the payment signature and the paid amount against the catalogue before an order is saved — prices are never trusted from the browser.

## Images

Product photos live in `public/products` (Pexels, free to use). Nothing loads from a third party at runtime.

## Layout of the code

```
src/app         routes, sitemap/robots, server actions (checkout/, contact/, actions.ts)
src/components  UI
src/lib         products.ts (catalogue) · cart.tsx · checkout.ts (pricing + validation) · store.ts (files)
tests/          node:test, run with `npm test`
```
