'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import SplitText from '@/components/kairo/SplitText';
import { useScrollApi } from '@/components/kairo/ScrollProvider';
import {
  BehanceIcon,
  DribbbleIcon,
  GitHubIcon,
  LinkedInIcon,
  TelegramIcon,
  UpworkIcon,
} from '@/components/sections/ToolIcons';
import { ArrowUpRight, ChevronDown, KairoMark } from '@/components/kairo/Icons';
import { identity, socials } from '@/data/profile';

const ICONS: Record<string, (p: { className?: string }) => JSX.Element> = {
  Behance: BehanceIcon,
  Dribbble: DribbbleIcon,
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Upwork: UpworkIcon,
  Telegram: TelegramIcon,
};

export default function Hero() {
  const { scrollTo } = useScrollApi();
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        '[data-hero-header]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.1
      )
        .fromTo(
          '[data-hero-title]',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.95 },
          0.2
        )
        .fromTo(
          '[data-hero-bio]',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.35
        )
        .fromTo(
          '[data-hero-metrics] > *',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
          0.45
        )
        .fromTo(
          '[data-hero-portrait]',
          { opacity: 0, scale: 0.97, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1 },
          0.3
        )
        .fromTo(
          '[data-hero-actions]',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.65
        )
        .fromTo(
          '[data-hero-cue]',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.9
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      <div className="shell w-full">
        <div className="grid grid-cols-12 items-center gap-x-8 gap-y-12 lg:gap-x-12 xl:gap-x-16">
          {/* Main Info Column: Expansive & Typographic */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            
            {/* Studio Provenance & Status */}
            <div data-hero-header className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs text-soft backdrop-blur">
                <KairoMark className="h-3.5 w-auto text-accent shrink-0" />
                <span className="font-amharic text-accent font-medium">
                  {identity.greetingAmharic}
                </span>
                <span className="text-soft/40">/</span>
                <span className="tracking-wide">{identity.location}</span>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs text-accent font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span>{identity.availability}</span>
              </span>
            </div>

            {/* Commanding Name & Editorial Title */}
            <div data-hero-title className="mt-6 sm:mt-8">
              <h1 className="display-lg text-ink font-normal tracking-tight">
                <SplitText text={identity.name} mode="char" duration={1.1} start="top 99%" />
              </h1>
              <p className="mt-3 editorial text-xl sm:text-2xl md:text-3xl text-accent font-normal">
                {identity.role}
              </p>
            </div>

            {/* Humanized Narrative */}
            <div data-hero-bio className="mt-5 sm:mt-6 max-w-[56ch]">
              <p className="text-base sm:text-lg leading-relaxed text-soft font-normal">
                {identity.bio}
              </p>
            </div>

            {/* Integrated Architectural Metrics Bar */}
            <div
              data-hero-metrics
              className="mt-8 sm:mt-9 grid grid-cols-3 gap-4 sm:gap-6 border-y border-line py-5 max-w-[54ch]"
            >
              <div>
                <p className="font-display text-2xl sm:text-3xl text-ink font-normal">2+</p>
                <p className="mt-1 text-[0.625rem] sm:text-[0.6875rem] uppercase tracking-wider text-soft">
                  Years Experience
                </p>
              </div>
              <div className="border-l border-line/60 pl-4 sm:pl-6">
                <p className="font-display text-2xl sm:text-3xl text-ink font-normal">4</p>
                <p className="mt-1 text-[0.625rem] sm:text-[0.6875rem] uppercase tracking-wider text-soft">
                  Shipped Systems
                </p>
              </div>
              <div className="border-l border-line/60 pl-4 sm:pl-6">
                <p className="font-display text-2xl sm:text-3xl text-accent font-normal">100%</p>
                <p className="mt-1 text-[0.625rem] sm:text-[0.6875rem] uppercase tracking-wider text-soft">
                  Fidelity to Code
                </p>
              </div>
            </div>

            {/* Intentional Action Buttons & Socials */}
            <div data-hero-actions className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                onClick={() => scrollTo('#stay', -10)}
                className="btn btn--solid group shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300"
              >
                <span>Explore Selected Work</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href={identity.resumeFile}
                download
                className="btn btn--ghost hover:border-accent hover:text-accent transition-all duration-300"
              >
                Download Résumé
              </a>

              <div className="hidden sm:block h-6 w-px bg-line/80 mx-1" />

              {/* Social Links */}
              <ul className="flex items-center gap-1.5">
                {socials.map((s) => {
                  const Icon = ICONS[s.name];
                  return (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        title={s.name}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-line/80 bg-surface/40 text-soft transition-all duration-300 hover:border-accent hover:text-accent hover:bg-surface hover:scale-105"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right Showcase: Framed Editorial Portrait */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <div data-hero-portrait className="w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[420px]">
              <div className="group relative rounded-3xl border border-line/80 bg-surface/30 p-3 sm:p-3.5 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-line-strong hover:shadow-accent/10">
                
                {/* Archival Inset Frame with double hairline */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-bg-alt border border-line/60">
                  <Image
                    src={identity.portrait}
                    alt={identity.portraitAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 36vw, 400px"
                    className="object-cover object-[center_18%] grayscale-[0.2] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
                  />

                  {/* Gentle ambient film vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent opacity-60" />
                </div>

                {/* Editorial Archival Plate below the portrait */}
                <div className="mt-3.5 px-1 flex items-center justify-between text-soft">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[0.6875rem] uppercase tracking-[0.16em] font-medium text-ink">
                      Active In Studio
                    </span>
                  </div>
                  <span className="text-[0.6875rem] uppercase tracking-wider text-soft/70">
                    Addis Ababa · 9°N 38°E
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Cue */}
        <div
          data-hero-cue
          className="mt-14 sm:mt-16 flex justify-center cursor-pointer"
          onClick={() => scrollTo('#faces', -10)}
        >
          <div className="flex flex-col items-center gap-1.5 text-soft hover:text-accent transition-colors">
            <span className="text-[0.625rem] uppercase tracking-[0.3em]">Explore</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
