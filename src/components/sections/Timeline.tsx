'use client';

import Reveal from '@/components/ui/Reveal';

const timeline = [
  {
    id: 1,
    title: 'UI/UX Designer',
    company: 'Delta Labs',
    location: 'Addis Ababa, Ethiopia',
    period: 'Dec 2024 — Present',
    points: [
      'Led end-to-end UI/UX design for the educational platform, from wireframes to high-fidelity prototypes.',
      'Ran iterative feedback sessions to refine user flows, improving usability and accessibility.',
      'Collaborated with developers to ensure pixel-perfect implementation.',
    ],
  },
  {
    id: 2,
    title: 'Video Editor',
    company: 'EBJ Media',
    location: 'Remote',
    period: 'Jul 2024 — Dec 2024',
    points: [
      'Edited promotional and social media content from raw footage to final delivery.',
      'Used Premiere Pro and After Effects for color correction, audio, and motion graphics.',
      'Maintained brand consistency while meeting tight deadlines.',
    ],
  },
  {
    id: 3,
    title: 'ICT Intern',
    company: 'Hawassa University ICT Center',
    location: 'Hawassa, Ethiopia',
    period: 'Jul 2024 — Sep 2024',
    points: [
      'Supported documentation and configuration of a new network topology project.',
      'Diagnosed and resolved network issues with advanced troubleshooting tools.',
    ],
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">04 — Experience</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Experience
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-16">
          <div className="relative max-w-2xl">
            <div className="absolute left-0 top-2 h-full w-px bg-line" />
            <ul className="space-y-16">
              {timeline.map((item) => (
                <li key={item.id} className="relative pl-10">
                  <span className="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">{item.period}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-soft">
                    {item.company} · {item.location}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-soft">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-20">
          <a
            href="/Dink%27s_Resume.pdf"
            download
            className="inline-flex rounded-md border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-ink hover:bg-surface-muted"
          >
            Download Resume
          </a>
        </Reveal>
      </div>
    </section>
  );
}