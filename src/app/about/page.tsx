import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, HeartHandshake, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Meetha Kissa started with a passion for making sweets at home and grew into an entrepreneurial journey of traditional Indian mithai.",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <Reveal>
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/30 shadow-[0_40px_80px_-45px_rgba(76,16,25,0.55)]">
              <Image
                src="/images/mithai-preparation.jpg"
                alt="Traditional Indian mithai preparation, hands shaping homemade sweets"
                width={1024}
                height={1280}
                sizes="(max-width: 1024px) 100vw, 460px"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-ink/60">
              Temporary stock photograph · to be replaced with original image
            </figcaption>

          </figure>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            Our journey
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-wine sm:text-5xl">
            From a Home Kitchen to an Entrepreneurial Idea
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">
            Every great idea begins with a small thought.
          </p>
          <p className="mt-4 leading-relaxed text-ink/65">
            Meetha Kissa started with a simple passion for making sweets at
            home. What began as homemade mithai soon inspired a bigger idea —
            bringing those flavours beyond our kitchen.
          </p>
          <p className="mt-4 leading-relaxed text-ink/65">
            The idea of introducing homemade sweets in college came from
            noticing an opportunity where there was little competition and a
            chance to offer something different.
          </p>
          <p className="mt-4 leading-relaxed text-ink/65">
            One small idea turned into a journey of creativity, learning and
            entrepreneurship.
          </p>
          <Link
            href="/sweets"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-wine px-8 py-4 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-wine-soft"
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
                title: "Thoughtfully Prepared",
                text: "Every sweet deserves attention. We focus on flavour, preparation and the little details that make mithai special.",
              },
              {
                icon: HeartHandshake,
                title: "A Homemade Beginning",
                text: "What started with making sweets at home grew into an idea to share something different with others.",
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
            Our journey
          </p>
          <h2 className="mt-4 font-serif text-4xl text-wine">
            From a Simple Idea to Something Meaningful
          </h2>
        </Reveal>
        <ol className="relative mt-14 space-y-10 border-l border-gold/40 pl-8 sm:pl-12">
          {[
            {
              stage: "Stage 01",
              title: "A Passion for Sweets",
              text: "It all started with making sweets at home.",
            },
            {
              stage: "Stage 02",
              title: "A Different Opportunity",
              text: "The idea of selling homemade sweets in college came from noticing limited competition and an opportunity to offer something different.",
            },
            {
              stage: "Stage 03",
              title: "Taking the First Step",
              text: "A simple thought began turning into an entrepreneurial initiative.",
            },
            {
              stage: "Stage 04",
              title: "Growing with Purpose",
              text: "Creativity, learning and a love for traditional Indian sweets continue to shape the idea.",
            },
          ].map((milestone, index) => (
            <Reveal key={milestone.stage} delay={index * 0.07}>
              <li className="relative">
                <span className="absolute -left-[2.55rem] top-1 grid h-4 w-4 place-items-center rounded-full bg-gold ring-4 ring-cream sm:-left-[3.55rem]" />
                <p className="font-serif text-2xl text-wine">{milestone.stage}</p>
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