import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-32 text-center">
      <p className="font-serif text-8xl text-gold">404</p>
      <h1 className="mt-4 font-serif text-4xl text-wine sm:text-5xl">
        This one melted away
      </h1>
      <p className="mt-4 max-w-md text-ink/65">
        The sweet you were looking for isn&apos;t on the counter — but there are
        plenty of others waiting for you.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link
          href="/sweets"
          className="rounded-full bg-wine px-8 py-4 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-wine-soft"
        >
          Browse Sweets
        </Link>
        <Link
          href="/"
          className="rounded-full border border-wine/25 px-8 py-4 text-sm font-medium tracking-wide text-wine transition-colors hover:border-wine hover:bg-wine/5"
        >
          Back Home
        </Link>
      </div>
    </section>
  );
}
