'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/kairo/SplitText';
import { ArrowUpRight } from '@/components/kairo/Icons';
import { projects, type Project } from '@/data/profile';

const CATEGORIES = ['All', 'Full Stack', 'AI Product', 'Mobile'] as const;

const CATEGORY_COLORS: Record<string, string> = {
  'Full Stack': 'text-violet-400 border-violet-500/30 bg-violet-500/10',
  'AI Product': 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  'Mobile':     'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
};

function ProjectCard({ project }: { project: Project }) {
  const colorClass = CATEGORY_COLORS[project.category] ?? 'text-accent border-accent/30 bg-accent/10';

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface/30 transition-all duration-500 hover:border-line-strong hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/15">

      {/* Image Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-alt">
        {project.logo && (
          <div className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface/90 p-2 shadow-sm backdrop-blur transition-transform duration-300 group-hover:scale-110">
            <Image src={project.logo} alt={`${project.title} logo`} width={24} height={24} className="h-full w-full object-contain" />
          </div>
        )}
        <div className={`absolute right-4 top-4 z-10 rounded-full border px-2.5 py-0.5 text-[0.6875rem] uppercase tracking-wider font-medium backdrop-blur ${colorClass}`}>
          {project.category}
        </div>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-4xl text-soft/20">{project.title}</span>
          </div>
        )}
        {/* Warm vignette on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div>
          <h3 className="font-display text-xl sm:text-2xl text-ink font-normal tracking-tight transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-0.5 text-[0.6875rem] uppercase tracking-[0.16em] text-soft font-medium">
            {project.subtitle}
          </p>
          <p className="mt-3.5 text-sm leading-relaxed text-soft">
            {project.description}
          </p>
        </div>

        <div className="mt-auto pt-5 border-t border-line/60">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-line/80 px-2.5 py-0.5 text-[0.625rem] tracking-wider text-soft/80 hover:text-ink hover:border-line-strong transition-all cursor-default">
                {tag}
              </span>
            ))}
          </div>

          {project.links && project.links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-accent uppercase tracking-wider hover:gap-2.5 transition-all duration-300"
                >
                  {link.label.toLowerCase().includes('live') && (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                  )}
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Stay() {
  const [filter, setFilter] = useState<string>('All');
  const root = useRef<HTMLElement>(null);
  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  const countFor = (cat: string) => cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-project-card]', { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.85, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: '[data-projects-grid]', start: 'top 82%', once: true },
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section id="stay" ref={root} className="sect sect--top relative">
      <div className="shell">

        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow eyebrow--accent">03 — Selected Work</p>
            <h2 className="mt-4 display-md text-ink">
              <SplitText text="Shipped projects" mode="line" />
            </h2>
          </div>
          <p className="max-w-[42ch] text-sm sm:text-base text-soft md:text-right leading-relaxed">
            Real products, real users, real institutions — designed and built end to end.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-line pb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-ink text-bg'
                  : 'border border-line text-soft hover:text-ink hover:border-line-strong'
              }`}
            >
              {cat}
              <span className={`inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[0.6rem] font-bold tabular-nums transition-colors ${
                filter === cat ? 'bg-white/20 text-white' : 'bg-line text-soft'
              }`}>
                {countFor(cat)}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div data-projects-grid className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9">
            {filteredProjects.map((project) => (
              <div key={project.id} data-project-card>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center py-20 text-center">
            <span className="font-display text-5xl text-soft/20">—</span>
            <p className="mt-4 text-sm text-soft">No projects in this category yet.</p>
            <button onClick={() => setFilter('All')} className="mt-4 btn btn--ghost text-xs">
              View all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
