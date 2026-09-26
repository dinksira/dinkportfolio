'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SplitText from '@/components/kairo/SplitText';
import { identity } from '@/data/profile';

const Interactive3DModel = dynamic(
  () => import('@/components/kairo/Interactive3DModel'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[360px] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border border-line border-t-accent animate-spin" />
      </div>
    ),
  }
);


interface Discipline {
  id: 'design' | 'code';
  number: string;
  tab: string;
  tagline: string;
  title: string;
  description: string;
  skills: string[];
  metrics: { label: string; value: string }[];
}

const DISCIPLINES: Discipline[] = [
  {
    id: 'design',
    number: '01',
    tab: 'Design',
    tagline: 'Where vision becomes form',
    title: 'Designed with Precision & Intent',
    description:
      'Thoughtful visual systems, harmonious hierarchy, and fluid interaction patterns crafted to be intuitive, accessible, and beautiful on every screen.',
    skills: [
      'UI/UX Architecture',
      'Interactive Prototyping',
      'Design Systems',
      'Wireframing & User Journeys',
      'Visual Accessibility',
      'Multi-Device Layouts',
    ],
    metrics: [
      { label: 'Prototypes', value: '30+' },
      { label: 'Platforms', value: '3' },
      { label: 'Precision', value: '100%' },
    ],
  },
  {
    id: 'code',
    number: '02',
    tab: 'Engineering',
    tagline: 'Where form becomes function',
    title: 'Engineered with Care & Craft',
    description:
      'Robust, responsive, and maintainable systems — React and Next.js for the web, Flutter and React Native for mobile, FastAPI and Node.js for the backend.',
    skills: [
      'React & Next.js',
      'TypeScript & JavaScript',
      'Flutter & React Native',
      'Node.js & FastAPI',
      'PostgreSQL & Cloud DBs',
      'RESTful APIs & Auth',
    ],
    metrics: [
      { label: 'Live Apps', value: '10+' },
      { label: 'Reliability', value: '99.9%' },
      { label: 'Clients Served', value: '3+' },
    ],
  },
];

export default function TwoFaces() {
  const [activeTab, setActiveTab] = useState<'design' | 'code'>('design');
  const current = DISCIPLINES.find((d) => d.id === activeTab) || DISCIPLINES[0];

  return (
    <section id="faces" className="sect sect--top relative">
      <div className="shell">

        {/* Section Header — open, editorial */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow eyebrow--accent">01 — Philosophy</p>
            <h2 className="mt-4 display-md text-ink">
              <SplitText text="Two hands, one habit" mode="line" />
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-5 text-sm sm:text-base text-soft leading-relaxed lg:text-right">
            {identity.name.split(' ')[0]} designs in Figma and ships what was drawn — no handover loss, no fidelity gap.
          </p>
        </div>

        {/* Tab Switcher — minimal, editorial pill selector */}
        <div className="mt-12 inline-flex items-center gap-1 rounded-full border border-line bg-surface/40 p-1 backdrop-blur">
          {DISCIPLINES.map((d) => {
            const isActive = activeTab === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setActiveTab(d.id)}
                className={`relative px-5 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-ink text-bg shadow-sm'
                    : 'text-soft hover:text-ink'
                }`}
              >
                <span className="mr-2 opacity-40">{d.number}</span>
                {d.tab}
              </button>
            );
          })}
        </div>

        {/* Content: Two-Column — Info + 3D Model */}
        <div className="mt-10 grid grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left: Discipline Details — open, no heavy boxing */}
          <div className="col-span-12 lg:col-span-6">
            <div className="pt-2">
              {/* Tagline */}
              <p className="editorial text-base sm:text-lg text-accent">
                {current.tagline}
              </p>

              {/* Title */}
              <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl text-ink font-normal leading-tight">
                {current.title}
              </h3>

              {/* Description */}
              <p className="mt-5 text-base leading-relaxed text-soft max-w-[46ch]">
                {current.description}
              </p>

              {/* Skills — clean grid, no heavy borders */}
              <div className="mt-8">
                <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-soft font-medium">
                  Core Capabilities
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                  {current.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5 text-sm text-soft">
                      <span className="h-px w-4 bg-accent/60 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics — hairline grid, no plates */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-7">
                {current.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-2xl sm:text-3xl text-ink font-normal">{m.value}</p>
                    <p className="mt-1 text-[0.6875rem] uppercase tracking-wider text-soft">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Interactive 3D Viewport */}
          <div className="col-span-12 lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-line/80 bg-bg-alt">
              {/* Viewport Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-line/60">
                <div className="flex items-center gap-2">
                  <span className={`flex h-2 w-2 rounded-full animate-pulse ${activeTab === 'design' ? 'bg-violet-400' : 'bg-cyan-400'}`} />
                  <span className="text-[0.6875rem] uppercase tracking-wider text-soft">Interactive Viewport</span>
                </div>
                <span className="text-[0.6875rem] text-soft/60 uppercase tracking-wider">
                  {activeTab === 'design' ? 'Design Mode' : 'Code Mode'}
                </span>
              </div>

              {/* 3D Model */}
              <div className="p-4">
                <Interactive3DModel mode={activeTab} />
              </div>

              {/* Viewport Footer */}
              <div className="px-5 py-3 border-t border-line/60 flex items-center gap-2">
                <span className="h-px flex-1 bg-line/60" />
                <span className="text-[0.6875rem] uppercase tracking-wider text-soft/60">
                  Drag · Rotate · Explore
                </span>
                <span className="h-px flex-1 bg-line/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
