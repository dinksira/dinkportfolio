'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/kairo/SplitText';
import { ArrowUpRight } from '@/components/kairo/Icons';
import {
  BehanceIcon,
  DribbbleIcon,
  GitHubIcon,
  LinkedInIcon,
  TelegramIcon,
  UpworkIcon,
} from '@/components/sections/ToolIcons';
import { identity, socials, whatsappQr } from '@/data/profile';

const TABS = ['Enquire', 'Direct', 'Elsewhere'] as const;
type Tab = (typeof TABS)[number];

const SOCIAL_ICONS: Record<string, (p: { className?: string }) => JSX.Element> = {
  Behance: BehanceIcon,
  Dribbble: DribbbleIcon,
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Upwork: UpworkIcon,
  Telegram: TelegramIcon,
};

const DETAILS = [
  { label: 'Email', value: identity.email, href: `mailto:${identity.email}` },
  { label: 'Phone', value: identity.phone, href: identity.phoneHref },
  { label: 'Based in', value: identity.location, href: undefined },
];

const WA_HREF = `https://wa.me/${identity.phone.replace(/[^0-9]/g, '')}`;

const empty = { name: '', email: '', subject: '', message: '' };

const inputClass =
  'mt-2 w-full rounded-xl border border-line/80 bg-surface/30 px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-soft/40 focus:border-accent focus:bg-surface/60 focus:ring-1 focus:ring-accent/30';

export default function Expedition() {
  const [tab, setTab] = useState<Tab>('Enquire');
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<'idle' | 'opened'>('idle');
  const root = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const panel = root.current?.querySelector<HTMLElement>('[data-panel]');
    if (!panel) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(panel, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(panel, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out' });
  }, [tab]);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-tab]', { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05,
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const href =
      `mailto:${identity.email}` +
      `?subject=${encodeURIComponent(form.subject)}` +
      `&body=${encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)}`;
    window.location.href = href;
    setForm(empty);
    setStatus('opened');
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = TABS.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
    if (e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setTab(TABS[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="expedition" ref={root} className="sect sect--top relative">
      <div className="shell">

        {/* Header */}
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-4">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow eyebrow--accent">05 — Contact</p>
            <h2 className="mt-4 display-md text-ink">
              <SplitText text="Start something" mode="line" />
            </h2>
          </div>
          <p className="col-span-12 text-sm sm:text-base text-soft lg:col-span-5 lg:text-right leading-relaxed">
            Currently {identity.availability.toLowerCase()} in {identity.location}. Let&apos;s build something together.
          </p>
        </div>

        {/* Tab selector — inline pill */}
        <div
          role="tablist"
          aria-label="Contact methods"
          className="mt-12 inline-flex items-center gap-1 rounded-full border border-line bg-surface/40 p-1 backdrop-blur"
        >
          {TABS.map((t, i) => (
            <button
              key={t}
              ref={(n) => { tabRefs.current[i] = n; }}
              data-tab
              role="tab"
              id={`tab-${t}`}
              aria-selected={tab === t}
              aria-controls={`panel-${t}`}
              tabIndex={tab === t ? 0 : -1}
              onClick={() => setTab(t)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 ${
                tab === t
                  ? 'bg-ink text-bg shadow-sm'
                  : 'text-soft hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Panels */}
        <div
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          tabIndex={0}
          data-panel
          className="pt-10"
        >

          {/* ── ENQUIRE FORM ────────────────────────────────────── */}
          {tab === 'Enquire' && (
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* Form */}
              <form
                onSubmit={submit}
                className="col-span-12 lg:col-span-7 rounded-3xl border border-line/80 bg-surface/20 p-6 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-[0.6875rem] uppercase tracking-wider text-soft font-medium">
                      Full name
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-[0.6875rem] uppercase tracking-wider text-soft font-medium">
                      Email address
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="subject" className="text-[0.6875rem] uppercase tracking-wider text-soft font-medium">
                    Subject / Project type
                  </label>
                  <input
                    id="subject" name="subject" type="text" required
                    value={form.subject}
                    onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                    placeholder="New Platform, MVP, or Redesign"
                    className={inputClass}
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="text-[0.6875rem] uppercase tracking-wider text-soft font-medium">
                    Project details
                  </label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell me about what you are planning to build, timeline, and any technical requirements…"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button type="submit" className="btn btn--solid w-full sm:w-auto">
                    Send via Email
                  </button>
                  {status === 'opened' && (
                    <p className="text-xs text-accent font-medium">
                      ✓ Mail client opened. Looking forward to connecting!
                    </p>
                  )}
                </div>
              </form>

              {/* Sidebar — WA + note */}
              <aside className="col-span-12 lg:col-span-5 space-y-5">

                {/* WhatsApp card */}
                <div className="rounded-3xl border border-line/80 bg-surface/20 p-5 sm:p-6 flex items-start gap-4 sm:gap-5">
                  <div className="relative h-18 w-18 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-2xl border border-line bg-white p-1 shadow-sm">
                    <Image src={whatsappQr} alt="WhatsApp QR code" fill className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="eyebrow eyebrow--accent">Direct WhatsApp</p>
                    <p className="mt-1 font-display text-lg text-ink font-normal">Scan or tap to chat</p>
                    <p className="mt-1 text-xs text-soft leading-snug">Fastest response for urgent project discussions.</p>
                    <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs text-accent font-medium hover:underline">
                      {identity.phone} <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Response note */}
                <div className="rounded-3xl border border-line/80 bg-surface/20 p-5 sm:p-6">
                  <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-soft font-medium">Response Time</p>
                  <p className="mt-2.5 text-sm text-soft leading-relaxed">
                    All enquiries are read personally and typically answered within 24 hours. Confidentiality assured.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-medium text-ink">{identity.availability}</span>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {/* ── DIRECT CONTACT ──────────────────────────────────── */}
          {tab === 'Direct' && (
            <div className="grid grid-cols-12 gap-8 items-start">
              <div className="col-span-12 lg:col-span-7 rounded-3xl border border-line/80 bg-surface/20 p-6 sm:p-8">
                <ul className="divide-y divide-line/60">
                  {DETAILS.map((d) => (
                    <li key={d.label} className="py-5 first:pt-0 last:pb-0">
                      <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-soft font-medium">{d.label}</span>
                      {d.href ? (
                        <a href={d.href} target="_blank" rel="noopener noreferrer"
                          className="group mt-2 flex items-center justify-between gap-3 font-display text-xl sm:text-2xl text-ink transition-colors hover:text-accent">
                          <span className="break-all sm:break-normal">{d.value}</span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-soft transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <span className="mt-2 block font-display text-xl sm:text-2xl text-ink">{d.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-12 lg:col-span-5 rounded-3xl border border-line/80 bg-surface/20 p-6 sm:p-8">
                <p className="eyebrow eyebrow--accent">Documentation</p>
                <h3 className="mt-2 font-display text-xl sm:text-2xl text-ink font-normal">Official Résumé</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">
                  Download a PDF summary of technical experience, projects, achievements, and credentials.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a href={identity.resumeFile} download className="btn btn--solid w-full text-center">Download PDF</a>
                  <a href={identity.resumeDrive} target="_blank" rel="noopener noreferrer" className="btn btn--ghost w-full text-center">Google Drive</a>
                </div>
              </div>
            </div>
          )}

          {/* ── ELSEWHERE / SOCIALS ──────────────────────────────── */}
          {tab === 'Elsewhere' && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.name];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-line/80 bg-surface/20 p-5 flex items-center justify-between transition-all duration-300 hover:border-accent/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5"
                  >
                    <span className="flex items-center gap-3.5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line/80 bg-surface/60 text-soft transition-colors duration-300 group-hover:text-accent group-hover:border-accent/50">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-lg text-ink transition-colors duration-300 group-hover:text-accent">
                        {s.name}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-soft/60 transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
