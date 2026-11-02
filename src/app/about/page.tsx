import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, HeartHandshake, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Meetha Kissa began in1998 at a single counter in Rajouri Garden, roasting besan the slow way. Meet the family behind the mithai.",
};

const milestones = [
  {
    year: "1998",
    title: "One counter, one recipe",
    text: "Grandmother's besan ladoo sells out before noon at Amrit Market.",
  },
  {
    year: "2005",
    title: "Our first kitchen",
    text: "We move into a proper kitchen and start making kaju katli to order.",
  },
  {
    year: "2012",
    title: "The gift box era",
    text: "Festive boxes arrive — hand-finished, ribboned, and very quickly loved.",
  },
  {
    year: "2020",
    title: "Delivered with care",
    text: "Same-day delivery across Delhi NCR keeps families celebrating.",
  },
  {
    year: "Today",
    title: "Three generations on",
    text: "Same recipes, same ghee, same rule: nothing leaves the kitchen stale.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-wine/10 bg-cream-dark/40">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            Our story
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-wine sm:text-6xl">
            A Story That Began
            <br />
            With One Recipe.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
            Meetha Kissa began with a simple belief — that sweets are more than
            food. They are memories, celebrations and a way of bringing people
            together.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <Reveal>
          <figure className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-gold/30 shadow-[0_40px_80px_-45px_rgba(76,16,25,0.55)]">
              <Image
                src="/brand-poster.jpg"
                alt="Meetha Kissa brand poster featuring besan ladoo and the emblem of a mother holding a ladoo"
                width={1024}
                height={1536}
                sizes="(max-width: 1024px) 100vw, 460px"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-ink/60">
              Our signature poster · maa se pyar se
            </figcaption>
            <div className="absolute -right-2 top-6 grid h-24 w-24 rotate-[6deg] place-items-center rounded-full border border-gold/40 bg-cream text-center shadow-lg sm:-right-6">
              <span className="font-serif text-[10px] uppercase leading-tight tracking-[0.14em] text-wine">
                Since
                <br />
                <span className="text-2xl text-gold">1998</span>
              </span>
            </div>
          </figure>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="font-serif text-2xl leading-relaxed text-wine">
            It started at a single counter in Rajouri Garden, where our
            grandmother&apos;s besan ladoo sold out before noon every single
            day.
          </p>
          <p className="mt-6 leading-relaxed text-ink/70">
            She had one rule and we have never broken it: nothing leaves the
            kitchen unless she would serve it to her own family. The besan is
            still roasted in pure ghee for over an hour, stirred by hand, until
            it smells the way her kitchen smelled.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            Three generations later, Meetha Kissa makes over thirty varieties of
            mithai — but the rule stands. Small batches. Real ingredients. Made
            the morning it is packed, by people who know your name when you walk
            in.
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="font-serif text-4xl text-wine">30+</dt>
              <dd className="mt-1 text-sm text-ink/60">varieties of mithai</dd>
            </div>
            <div>
              <dt className="font-serif text-4xl text-wine">2,400+</dt>
              <dd className="mt-1 text-sm text-ink/60">families served</dd>
            </div>
            <div>
              <dt className="font-serif text-4xl text-wine">0</dt>
              <dd className="mt-1 text-sm text-ink/60">
                preservatives, ever
              </dd>
            </div>
          </dl>

          <Link
            href="/sweets"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-wine px-8 py-4 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-wine-soft"
          >
            Taste the story
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      <section className="border-y border-wine/10 bg-white/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
              What we stand on
            </p>
            <h2 className="mt-4 font-serif text-4xl text-wine">
              The way we still work
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: Flame,
                title: "Slow roasting",
                text: "Besan and khoya are cooked on low heat for hours. It is the only way to get the nutty depth — and it cannot be rushed.",
              },
              {
                icon: Sparkles,
                title: "Made the same day",
                text: "We cook to a daily plan, not to a warehouse. Whatever is unsold at closing is never carried to tomorrow.",
              },
              {
                icon: HeartHandshake,
                title: "Named customers",
                text: "Half our orders come from families who have bought from us for over a decade. We still write the notes by hand.",
              },
            ].map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.1}>
                <div className="h-full rounded-2xl border border-wine/10 bg-cream p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-wine text-gold-light">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-serif text-xl text-wine">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            Milestones
          </p>
          <h2 className="mt-4 font-serif text-4xl text-wine">
            Twenty-eight years, five chapters
          </h2>
        </Reveal>
        <ol className="relative mt-14 space-y-10 border-l border-gold/40 pl-8 sm:pl-12">
          {milestones.map((milestone, index) => (
            <Reveal key={milestone.year} delay={index * 0.07}>
              <li className="relative">
                <span className="absolute -left-[2.55rem] top-1 grid h-4 w-4 place-items-center rounded-full bg-gold ring-4 ring-cream sm:-left-[3.55rem]" />
                <p className="font-serif text-2xl text-gold">{milestone.year}</p>
                <h3 className="mt-1 font-serif text-xl text-wine">
                  {milestone.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink/65">
                  {milestone.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
