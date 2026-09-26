'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/kairo/SplitText';
import {
  AdobeXdIcon,
  FigmaIcon,
  GitIcon,
  NodeJsIcon,
  ReactIcon,
  TurborepoIcon,
  VercelIcon,
  VsCodeIcon,
} from '@/components/sections/ToolIcons';
import { skillCategories, toolbox, type ToolboxName } from '@/data/profile';

const TOOL_ICONS: Record<ToolboxName, (p: { className?: string }) => JSX.Element> = {
  Figma: FigmaIcon,
  'Adobe XD': AdobeXdIcon,
  'VS Code': VsCodeIcon,
  'Git & GitHub': GitIcon,
  React: ReactIcon,
  'Node.js': NodeJsIcon,
  Vercel: VercelIcon,
  Turborepo: TurborepoIcon,
};

// Give each category a gentle color accent
const CATEGORY_ACCENTS: Record<string, { dot: string; count: string }> = {
  Languages:  { dot: 'bg-violet-400',  count: 'text-violet-400' },
  Frontend:   { dot: 'bg-cyan-400',    count: 'text-cyan-400'   },
  Backend:    { dot: 'bg-emerald-400', count: 'text-emerald-400' },
  Design:     { dot: 'bg-amber-400',   count: 'text-amber-400'  },
};

const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-cat]').forEach((col, i) => {
        gsap.fromTo(
          col,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: 'expo.out', delay: i * 0.07,
            scrollTrigger: { trigger: el, start: 'top 78%', once: true },
          }
        );
      });

      gsap.fromTo('[data-tool]', { opacity: 0, scale: 0.88 }, {
        opacity: 1, scale: 1, duration: 0.65, ease: 'expo.out', stagger: 0.04,
        scrollTrigger: { trigger: '[data-toolbox]', start: 'top 88%', once: true },
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section id="capabilities" ref={root} className="sect sect--top relative">
      <div className="shell">

        {/* Header */}
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-4">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow eyebrow--accent">04 — Capabilities</p>
            <h2 className="mt-4 display-md text-ink">
              <SplitText text="Skills & tools" mode="line" />
            </h2>
          </div>
          <p className="col-span-12 text-sm sm:text-base text-soft lg:col-span-5 lg:text-right leading-relaxed">
            {total} core capabilities across {skillCategories.length} disciplines.
          </p>
        </div>

        {/* Skills Grid — open cards with color-coded categories */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat) => {
            const accent = CATEGORY_ACCENTS[cat.title] ?? { dot: 'bg-accent', count: 'text-accent' };
            return (
              <div
                key={cat.title}
                data-cat
                className="flex flex-col"
              >
                {/* Category header */}
                <div className="flex items-center justify-between pb-4 border-b border-line/70">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2 w-2 rounded-full shrink-0 ${accent.dot}`} />
                    <h3 className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink font-semibold">
                      {cat.title}
                    </h3>
                  </div>
                  <span className={`text-xs font-medium tabular-nums ${accent.count}`}>
                    {String(cat.skills.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Skills list */}
                <ul className="mt-5 flex-1 space-y-2.5">
                  {cat.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5 text-sm text-soft hover:text-ink transition-colors cursor-default">
                      <span className="h-px w-3 shrink-0 bg-line/80" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Toolbox Section */}
        <div data-toolbox className="mt-16 sm:mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-line">
            <div>
              <p className="eyebrow eyebrow--accent">Everyday Workflow</p>
              <h3 className="mt-1.5 font-display text-2xl sm:text-3xl text-ink font-normal">Active Toolbox</h3>
            </div>
            <p className="text-xs text-soft uppercase tracking-wider">
              Battle-tested tools for shipping high-quality software
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {toolbox.map((name) => {
              const Icon = TOOL_ICONS[name];
              return (
                <li
                  key={name}
                  data-tool
                  className="group rounded-2xl border border-line/70 bg-surface/30 p-4 flex flex-col items-center gap-3 text-center transition-all duration-300 hover:border-line-strong hover:bg-surface hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 cursor-pointer relative overflow-hidden"
                >
                  {/* Ambient glow on hover */}
                  <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 60%, rgba(184,112,47,0.12), transparent 70%)' }}
                    aria-hidden="true"
                  />
                  <span className="relative flex h-11 w-11 items-center justify-center text-soft/70 transition-all duration-300 group-hover:text-ink group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-[0.6875rem] font-medium text-soft transition-colors duration-300 group-hover:text-ink line-clamp-1 relative z-10">
                    {name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
