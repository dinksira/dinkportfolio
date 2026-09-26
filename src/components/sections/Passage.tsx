'use client';

import { useState } from 'react';
import SplitText from '@/components/kairo/SplitText';
import { timeline, education, identity } from '@/data/profile';

export default function Passage() {
  const [activeRole, setActiveRole] = useState<number>(timeline[0].id);

  return (
    <section id="passage" className="sect sect--top relative">
      <div className="shell">

        {/* Section Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow eyebrow--accent">02 — Journey</p>
            <h2 className="mt-4 display-md text-ink">
              <SplitText text="The route so far" mode="line" />
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-5 text-sm sm:text-base text-soft leading-relaxed lg:text-right">
            From computer science foundations to shipping auction platforms, AI tools, and cross-platform education systems.
          </p>
        </div>

        {/* Content Layout */}
        <div className="mt-14 grid grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: Education Card — clean, restrained */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-line/80 bg-surface/20 p-6 sm:p-8">

              <p className="eyebrow eyebrow--accent">Foundations</p>

              <h3 className="mt-4 font-display text-xl sm:text-2xl text-ink font-normal leading-snug">
                {education.degree}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-accent">{education.school}</p>
              <p className="mt-0.5 text-xs text-soft tracking-wide">{education.period}</p>

              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-2.5 py-1 text-xs text-soft">
                GPA {education.grade}
              </div>

              <hr className="rule my-5" />

              <p className="text-xs sm:text-sm leading-relaxed text-soft">
                {education.finalProjects}
              </p>

              {/* Credentials — minimal list */}
              <div className="mt-6">
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-soft font-medium">
                  Certifications
                </p>
                <ul className="mt-3 space-y-2">
                  {education.credentials.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-xs text-soft">
                      <span className="mt-1.5 h-px w-3 bg-accent/60 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resume actions */}
              <div className="mt-8 pt-5 border-t border-line/60 flex flex-col gap-2.5">
                <a href={identity.resumeFile} download className="btn btn--solid w-full text-center">
                  Download Résumé
                </a>
                <a href={identity.resumeDrive} target="_blank" rel="noopener noreferrer" className="btn btn--ghost w-full text-center">
                  View on Google Drive
                </a>
              </div>
            </div>
          </div>

          {/* Right: Timeline — vertical spine with clean cards */}
          <div className="col-span-12 lg:col-span-8">
            <div className="relative">
              {/* Vertical timeline spine */}
              <div className="absolute left-0 top-0 bottom-0 hidden sm:block w-px bg-gradient-to-b from-accent/40 via-line/60 to-transparent" aria-hidden="true" />

              <div className="space-y-5 sm:pl-8">
                {timeline.map((role) => {
                  const isActive = activeRole === role.id;
                  return (
                    <article
                      key={role.id}
                      onClick={() => setActiveRole(role.id)}
                      className={`relative rounded-3xl border p-5 sm:p-7 cursor-pointer transition-all duration-300 ${
                        isActive
                          ? 'border-accent/50 bg-surface/40 shadow-lg shadow-accent/5'
                          : 'border-line/70 hover:border-line-strong bg-transparent hover:bg-surface/20'
                      }`}
                    >
                      {/* Timeline dot */}
                      <span
                        className={`hidden sm:flex absolute -left-[2.4rem] top-7 h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? 'border-accent bg-accent shadow-sm shadow-accent/50'
                            : 'border-line/80 bg-bg'
                        }`}
                        aria-hidden="true"
                      />

                      {/* Period + Location */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full border border-line/80 bg-surface/60 px-3 py-0.5 text-[0.6875rem] font-medium text-accent">
                          {role.period}
                        </span>
                        <span className="text-[0.6875rem] text-soft uppercase tracking-wider">
                          {role.location}
                        </span>
                      </div>

                      {/* Title + Company */}
                      <h3 className="mt-3.5 font-display text-lg sm:text-xl text-ink font-normal">
                        {role.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-accent">{role.company}</p>

                      {/* Expandable bullets */}
                      <div className={`overflow-hidden transition-all duration-500 ease-out ${
                        isActive ? 'max-h-[600px] opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'
                      }`}>
                        <ul className="space-y-2.5">
                          {role.points.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-soft">
                              <span className="mt-2 h-px w-4 shrink-0 bg-accent/60" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expand hint */}
                      <div className={`mt-3.5 flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-wider transition-colors ${
                        isActive ? 'text-accent' : 'text-soft/70'
                      }`}>
                        <span>{isActive ? 'Collapse' : 'Read more'}</span>
                        <svg viewBox="0 0 16 16" className={`h-3 w-3 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M3 6 L8 11 L13 6" />
                        </svg>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
