'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BehanceIcon,
  DribbbleIcon,
  GitHubIcon,
  LinkedInIcon,
  TelegramIcon,
} from '@/components/sections/ToolIcons';
import { KairoMark } from '@/components/kairo/Icons';
import { useScrollApi } from '@/components/kairo/ScrollProvider';
import { identity, footerSocials, stats } from '@/data/profile';

const ICONS: Record<string, (p: { className?: string }) => JSX.Element> = {
  Behance: BehanceIcon,
  Dribbble: DribbbleIcon,
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Telegram: TelegramIcon,
};

const TZ = 'Africa/Addis_Ababa';

function addisAbabaTime(d: Date) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(d);
  } catch {
    // Fallback: UTC+3
    const p = (n: number) => String(n).padStart(2, '0');
    const t = new Date(d.getTime() + 3 * 60 * 60 * 1000);
    return `${p(t.getUTCHours())}:${p(t.getUTCMinutes())}:${p(t.getUTCSeconds())}`;
  }
}

export default function Footer() {
  const { scrollTo } = useScrollApi();
  const [clock, setClock] = useState('--:--:--');
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const tick = () => setClock(addisAbabaTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Marquee: two identical runs translated by exactly -50% loops seamlessly.
      gsap.to('[data-marquee]', {
        xPercent: -50,
        duration: 24,
        ease: 'none',
        repeat: -1,
      });

      gsap.fromTo(
        '[data-foot-reveal]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        }
      );
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <footer
      ref={root}
      onPointerMove={onMove}
      className="footer relative isolate mt-px border-t border-line bg-bg/40 backdrop-blur"
    >
      <div className="footer__glow" aria-hidden="true" />

      {/* Stats marquee */}
      <div className="relative overflow-hidden border-b border-line py-5">
        <div data-marquee className="flex w-max will-change-transform">
          {[0, 1].map((run) => (
            <ul key={run} className="flex shrink-0 items-center" aria-hidden={run === 1}>
              {stats.map((s) => (
                <li
                  key={`${run}-${s.label}`}
                  className="flex shrink-0 items-baseline gap-3 px-8 sm:px-12"
                >
                  <span className="font-display text-2xl sm:text-3xl text-ink font-semibold">
                    {s.value}
                  </span>
                  <span className="text-[0.625rem] uppercase tracking-[0.2em] text-soft">
                    {s.label}
                  </span>
                  <span className="ml-8 h-1.5 w-1.5 rounded-full bg-accent" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="shell relative py-16">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {/* Identity */}
          <div data-foot-reveal className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-2.5 text-ink">
              <KairoMark className="h-6 w-auto shrink-0" />
              <span className="font-display text-xl">
                {identity.name}
                <span className="text-accent">.</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-soft">{identity.role}</p>
            <p className="caption mt-1">{identity.location}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-soft">
                React & Next.js
              </span>
              <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-soft">
                Figma Systems
              </span>
              <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-soft">
                Node.js & FastAPI
              </span>
            </div>
          </div>

          {/* Links */}
          <nav
            data-foot-reveal
            aria-label="Footer"
            className="col-span-12 sm:col-span-4 lg:col-span-3"
          >
            <p className="eyebrow">Index</p>
            <ul className="mt-5 space-y-2.5">
              {[
                { id: 'home', label: 'Home' },
                { id: 'faces', label: 'Approach' },
                { id: 'passage', label: 'Journey' },
                { id: 'stay', label: 'Selected Work' },
                { id: 'capabilities', label: 'Skills' },
                { id: 'expedition', label: 'Contact' },
              ].map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollTo(`#${n.id}`, -15)}
                    className="link text-sm"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div data-foot-reveal className="col-span-12 sm:col-span-4 lg:col-span-2">
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-5 space-y-2.5">
              {footerSocials.map((s) => {
                const Icon = ICONS[s.name];
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 text-sm text-soft transition-colors duration-[var(--dur)] hover:text-accent"
                    >
                      <Icon className="h-4 w-4" />
                      {s.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Clock */}
          <div data-foot-reveal className="col-span-12 sm:col-span-4 lg:col-span-2 lg:text-right">
            <p className="eyebrow">Addis Ababa Time</p>
            <p className="mt-4 font-display text-2xl sm:text-3xl tabular-nums text-ink">{clock}</p>
            <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.2em] text-accent font-medium">
              UTC+3 (East Africa Time)
            </p>
            <a
              href={identity.resumeFile}
              download
              className="link-line mt-6"
            >
              Download Résumé
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-soft">
            © {new Date().getFullYear()} {identity.name}. Built with Next.js, TypeScript & Tailwind CSS.
          </p>
          <button
            onClick={() => scrollTo('#home')}
            className="link self-start text-xs uppercase tracking-[0.2em] sm:self-auto"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
