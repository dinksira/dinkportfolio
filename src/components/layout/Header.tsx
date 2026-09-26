'use client';

import { useEffect, useRef, useState } from 'react';
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
import ThemeToggle from '@/components/kairo/ThemeToggle';
import { useScrollApi } from '@/components/kairo/ScrollProvider';
import { identity } from '@/data/profile';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'faces', label: 'Approach' },
  { id: 'passage', label: 'Journey' },
  { id: 'stay', label: 'Work' },
  { id: 'capabilities', label: 'Skills' },
  { id: 'expedition', label: 'Contact' },
];

export default function Header() {
  const { scrollTo } = useScrollApi();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 30);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[id]')
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -45% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-header-mark]',
        { yPercent: 40, opacity: 0, rotate: -8 },
        { yPercent: 0, opacity: 1, rotate: 0, duration: 0.9, ease: 'expo.out', delay: 0.1 }
      );
      gsap.fromTo(
        '[data-header-title]',
        { x: -16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.18 }
      );
      gsap.fromTo(
        '[data-header-nav] > *',
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.05,
          delay: 0.25,
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => window.clearTimeout(t);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(`#${id}`, -15);
  };

  return (
    <header
      ref={root}
      data-header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-[var(--dur)] ease-[var(--ease)] ${
        scrolled
          ? 'border-b border-line bg-bg/85 backdrop-blur-xl shadow-sm'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] bg-accent transition-[width] duration-75 ease-linear z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="shell">
        <div
          data-header-nav
          className="flex h-16 items-center justify-between gap-4 md:h-20"
        >
          {/* Logo Mark */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => go('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
              aria-label={`${identity.name} — back to top`}
            >
              <span
                data-header-mark
                className="block text-ink group-hover:text-accent group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ease-[var(--ease)] shrink-0"
              >
                <KairoMark className="h-6 w-auto shrink-0" />
              </span>
              <span
                data-header-title
                className="relative inline-flex flex-col overflow-hidden h-[1.125rem] leading-[1.125rem] text-xs uppercase tracking-[0.2em] font-medium"
              >
                <span className="inline-block text-ink transition-transform duration-500 ease-[var(--ease)] group-hover:-translate-y-full">
                  {identity.name}
                </span>
                <span
                  className="inline-block text-accent transition-transform duration-500 ease-[var(--ease)] group-hover:-translate-y-full font-semibold"
                  aria-hidden="true"
                >
                  {identity.name}
                </span>
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`text-xs uppercase tracking-[0.18em] transition-all duration-[var(--dur)] ${
                  active === item.id
                    ? 'text-accent font-semibold'
                    : 'text-soft hover:text-ink'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={identity.resumeFile}
              download
              className="hidden sm:inline-flex btn btn--ghost text-[0.6875rem] py-2 px-4"
            >
              CV
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-1/2 block h-px w-4 bg-ink transition-transform duration-[var(--dur)] ${
                    open ? 'rotate-45' : '-translate-y-[3px]'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 block h-px w-4 bg-ink transition-transform duration-[var(--dur)] ${
                    open ? '-rotate-45' : 'translate-y-[3px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`overflow-y-auto overscroll-contain border-line transition-[max-height,opacity] duration-[var(--dur)] ease-[var(--ease)] md:hidden ${
          open ? 'max-h-[34rem] border-t bg-bg/95 backdrop-blur-2xl opacity-100 shadow-xl' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="shell flex flex-col gap-1 py-5">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`py-2 text-left font-display text-xl transition-colors ${
                active === item.id ? 'text-accent' : 'text-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <a
              href={identity.resumeFile}
              download
              className="btn btn--solid text-xs py-2 px-4"
            >
              Download CV
            </a>
            <div className="flex items-center gap-3">
              {[
                { name: 'Behance', href: 'https://www.behance.net/dinksiraelsa', Icon: BehanceIcon },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dinksira-elsa-13904b319/', Icon: LinkedInIcon },
                { name: 'GitHub', href: 'https://github.com/dinksira', Icon: GitHubIcon },
                { name: 'Telegram', href: 'https://t.me/Dink_Sira', Icon: TelegramIcon },
              ].map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-soft transition-colors hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
