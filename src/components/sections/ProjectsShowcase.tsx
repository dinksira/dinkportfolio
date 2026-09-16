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
  image: string;
  links?: ProjectLink[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Delta Labs',
    subtitle: 'Educational Learning Platform',
    category: 'Product',
    description:
      'An interactive educational platform with AI-powered learning features, modular navigation, and progress tracking.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    image: '/DeltaLabs.png',
    links: [
      { label: 'Figma', href: 'https://www.figma.com/design/FKY5f0yd3fSsTmgjERfFHb/Education-UIUX?node-id=0-1&p=f&t=eVN64FtUWw0NKS1Z-0' },
      { label: 'GitHub', href: 'https://github.com/Delta-Rabbit/Delta_Labs' },
    ],
  },
  {
    id: 2,
    title: 'Bete Selam Hospital',
    subtitle: 'Bilingual Healthcare Platform',
    category: 'Product',
    description:
      'A healthcare platform built for the Ethiopian community with doctor discovery, appointment booking, and Amharic/English support.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/Beteselam.png',
    links: [
      { label: 'Figma', href: 'https://www.figma.com/design/2P18EPNQGrr5GeOVYZ0kMA/Bete-Selam-Hospital?node-id=1-3&p=f&t=JcsUNEfWmCuQG7jC-0' },
      { label: 'GitHub', href: 'https://github.com/dinksira/Bete-Selam' },
    ],
  },
  {
    id: 3,
    title: 'Memarya',
    subtitle: 'Amharic Learning Platform',
    category: 'Product',
    description:
      'A gamified web app for learning Amharic, featuring structured lessons, achievements, and progress analytics.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    image: '/Memarya.png',
  },
  {
    id: 4,
    title: 'Eventify',
    subtitle: 'Event Management App Design',
    category: 'UI/UX',
    description:
      'A mobile app design for event management with simple user flows, a scalable design system, and task-focused screens.',
    tags: ['Figma', 'Design System', 'Prototyping'],
    image: '/eventify-mobile-1.png',
    links: [
      { label: 'Figma', href: 'https://www.figma.com/design/Ur8u3Lqjjx8LZOQwJTYaxv/premium-event-management-app--Eventify-V2-?node-id=1-10&p=f&t=hLSl32cx0qQTs8pB-0' },
    ],
  },
  {
    id: 5,
    title: 'Nexus OS',
    subtitle: 'Personal Dashboard',
    category: 'Frontend',
    description:
      'A cyberpunk-inspired personal dashboard with glass-morphism UI, crypto tracking, and system monitoring widgets.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/Nexus.png',
  },
  {
    id: 6,
    title: 'Health Advisor',
    subtitle: 'Android Health App',
    category: 'Mobile',
    description:
      'An Android app delivering personalized health insights and daily recommendations based on user habits and goals.',
    tags: ['Android', 'Health', 'UI/UX'],
    image: '/assets/images/Ha1.jpg',
    links: [
      { label: 'GitHub', href: 'https://github.com/dinksira/Health_Advisor.git' },
    ],
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
              A focused selection of design and development projects.
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
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
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