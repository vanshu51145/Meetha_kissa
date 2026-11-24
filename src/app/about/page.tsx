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
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-8 py-28">
        <Reveal>
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#C49A3A]/30 shadow-[0_40px_80px_-45px_rgba(61,8,15,0.4)]">
              <Image
                src="/images/mithai-preparation.jpg"
                alt="Traditional Indian mithai preparation, hands shaping homemade sweets"
                width={1024}
                height={1280}
                sizes="(max-width: 1024px) 100vw, 460px"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-[#351B19]/60 font-serif">
              Temporary stock photograph · to be replaced with original image
            </figcaption>

          </figure>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="text-xs uppercase tracking-[0.4em] text-[#650D16] font-medium font-serif">
            Our journey
          </p>
          <h2 className="mt-8 font-serif text-5xl leading-tight text-[#650D16] sm:text-6xl">
            From a Home Kitchen to an Entrepreneurial Idea
          </h2>
          <p className="mt-10 text-xl leading-relaxed text-[#351B19]/80">
            Every great idea begins with a small thought.
          </p>
          <p className="mt-6 leading-relaxed text-[#351B19]/70 text-lg">
            Meetha Kissa started with a simple passion for making sweets at
            home. What began as homemade mithai soon inspired a bigger idea —
            bringing those flavours beyond our kitchen.
          </p>
          <p className="mt-6 leading-relaxed text-[#351B19]/70 text-lg">
            The idea of introducing homemade sweets in college came from
            noticing an opportunity where there was little competition and a
            chance to offer something different.
          </p>
          <p className="mt-6 leading-relaxed text-[#351B19]/70 text-lg">
            One small idea turned into a journey of creativity, learning and
            entrepreneurship.
          </p>
          <Link
            href="/sweets"
            className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[#650D16] px-12 py-5 text-sm font-medium tracking-wide text-[#FFF8E9] transition-all hover:bg-[#800F19] hover:-translate-y-1 shadow-[0_10px_25px_-10px_rgba(101,13,22,0.3)]"
          >
            Taste the story
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      <section className="border-y border-[#650D16]/20 bg-[#FFF8E9] py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#650D16] font-medium font-serif">
              What we stand on
            </p>
            <h2 className="mt-6 font-serif text-5xl text-[#650D16] sm:text-6xl">
              The way we still work
            </h2>
          </Reveal>
          <div className="mt-20 grid gap-10 sm:grid-cols-3">
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
                <div className="h-full rounded-3xl border border-[#650D16]/20 bg-[#F4EAD5] p-12 transition-all duration-500 hover:border-[#F5C84C]/50 hover:shadow-[0_16px_40px_-16px_rgba(61,8,15,0.1)]">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-[#650D16] text-[#F5C84C] shadow-[0_10px_20px_-10px_rgba(101,13,22,0.2)]">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-10 font-serif text-xl text-[#650D16]">{title}</h3>
                  <p className="mt-5 text-base leading-relaxed text-[#351B19]/70">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-28">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#650D16] font-medium font-serif">
            Our journey
          </p>
          <h2 className="mt-6 font-serif text-5xl text-[#650D16] sm:text-6xl">
            From a Simple Idea to Something Meaningful
          </h2>
        </Reveal>
        <ol className="relative mt-24 space-y-16 border-l border-[#F5C84C]/40 pl-8 sm:pl-12">
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
                <span className="absolute -left-[2.55rem] top-1 grid h-6 w-6 place-items-center rounded-full bg-[#F5C84C] ring-4 ring-[#FFF8E9] sm:-left-[3.75rem] shadow-[0_0_0_4px_rgba(245,200,76,0.3)]" />
                <p className="font-serif text-3xl text-[#650D16]">{milestone.stage}</p>
                <h3 className="mt-2 font-serif text-xl text-[#650D16]">
                  {milestone.title}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-[#351B19]/70">
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
