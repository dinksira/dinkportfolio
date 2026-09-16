'use client';

import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { ArrowUpRight } from 'lucide-react';

interface ProjectLink {
  label: string;
  href: string;
}

interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  links?: ProjectLink[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Enderas',
    subtitle: 'Digital Auction & Bidding Platform',
    category: 'Full Stack',
    description:
      'Sealed-bid auction platform used by Ethiopian government institutions — bidder KYC, the auction lifecycle, bid submission and invalidation, winner selection, and CPO payment flows. One npm-workspace codebase powers separate public bidder and admin console apps, with role-based access control between institution staff, bidders, and administrators.',
    tags: ['React', 'TypeScript', 'Node.js', 'Supabase', 'npm workspaces'],
  },
  {
    id: 2,
    title: 'Relavo',
    subtitle: 'AI Client Relationship Platform',
    category: 'AI Product',
    description:
      'Keeps client records and interaction history in one place for small businesses, using the Claude API to summarise relationships and surface accounts that have gone quiet. Built end to end, from database schema to interface.',
    tags: ['React', 'Vite', 'Express', 'FastAPI', 'Claude API', 'Supabase'],
  },
  {
    id: 3,
    title: 'Delta Labs',
    subtitle: 'Education Platform',
    category: 'Full Stack',
    description:
      'One education product across three clients — a TypeScript web app, a Flutter mobile app, and an Electron desktop build — all reading from the same MongoDB-backed API. Course enrollment, school management, competitions, and certification, with AI-assisted features built into the learning flow and one Figma design system carried through all three clients.',
    tags: ['TypeScript', 'MongoDB', 'Electron', 'Flutter'],
    image: '/DeltaLabs.png',
    links: [
      { label: 'Figma', href: 'https://www.figma.com/design/FKY5f0yd3fSsTmgjERfFHb/Education-UIUX?node-id=0-1&p=f&t=eVN64FtUWw0NKS1Z-0' },
      { label: 'GitHub', href: 'https://github.com/Delta-Rabbit/Delta_Labs' },
    ],
  },
  {
    id: 4,
    title: 'NoStock',
    subtitle: 'ERP & Business Management System',
    category: 'SaaS',
    description:
      'Pulls inventory, operations, and internal workflows into a single web system, structured so new modules can be added without pulling the core apart.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
];

export default function ProjectsShowcase() {
  return (
    <section id="projects" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">03 — Projects</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Selected work
              </h2>
            </div>
            <p className="max-w-sm text-sm text-soft md:text-right">
              Full stack products and platform builds.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={(i % 2) * 0.08}
              className={i % 2 === 1 ? 'md:mt-16' : ''}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-ink/40">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-muted">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-7xl font-semibold text-ink/10 transition-colors group-hover:text-ink/20">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <span className="shrink-0 text-xs uppercase tracking-[0.15em] text-soft">
                      {project.category}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-accent">{project.subtitle}</p>

                  <p className="mt-3 text-sm leading-relaxed text-soft">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-soft">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  {project.links && project.links.length > 0 && (
                    <div className="mt-5 flex gap-6 border-t border-line pt-4">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                        >
                          {link.label}
                          <ArrowUpRight
                            size={14}
                            className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}