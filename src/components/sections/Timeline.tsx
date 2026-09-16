'use client';

import Reveal from '@/components/ui/Reveal';

const timeline = [
  {
    id: 1,
    title: 'Full Stack Developer & UI/UX Designer',
    company: 'Delta Rabbits',
    location: 'Addis Ababa, Ethiopia',
    period: 'Dec 2024 — Present',
    points: [
      'Build and maintain the education platform across the TypeScript web app, Flutter mobile app, Electron desktop build, and MongoDB-backed API all three sit on.',
      'Own the design as well as the code — wireframes and prototypes in Figma, then built out in TypeScript, so nothing gets lost in the handover.',
      'Turn direct user feedback into something specific enough to build, and fix real-device layout and state issues across screen sizes.',
      'Write the documentation — both the technical kind and the plain-language kind that clients read.',
    ],
  },
  {
    id: 2,
    title: 'Full Stack Web & Mobile App Developer',
    company: 'Mager Software PLC',
    location: 'Addis Ababa, Ethiopia',
    period: 'Aug 2026 — Sep 2026',
    points: [
      'Built the Enderas sealed-bid auction platform for Ethiopian government institutions, from API to iOS and Android.',
      'Split the frontend into public bidder and admin console apps on one backend, with role-based access control between institution staff, bidders, and administrators.',
      'Handled KYC, the auction lifecycle, bid submission and invalidation, winner selection, and CPO payment flows.',
    ],
  },
  {
    id: 3,
    title: 'Video Editor',
    company: 'EBJ Media',
    location: 'Remote',
    period: 'Jul 2024 — Dec 2024',
    points: [
      'Cut promotional and social video from raw footage in Premiere Pro and After Effects, usually on a same-week turnaround.',
      'Ran the full pipeline from rough cut through color, sound, and final export.',
    ],
  },
  {
    id: 4,
    title: 'ICT Intern',
    company: 'Hawassa University ICT Center',
    location: 'Hawassa, Ethiopia',
    period: 'Jul 2024 — Sep 2024',
    points: [
      'Configured and documented a new network topology and spent most of the internship troubleshooting connectivity problems.',
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

        <Reveal delay={0.12} className="mt-20 max-w-2xl border-t border-line pt-10">
          <h3 className="text-sm uppercase tracking-[0.2em] text-soft">Education</h3>
          <p className="mt-5 font-display text-lg font-semibold tracking-tight">
            BSc, Computer Science
          </p>
          <p className="mt-1 text-sm text-soft">
            Dilla University · Oct 2020 — Jul 2024 · CGPA 3.44 / 4.0
          </p>
          <p className="mt-3 text-sm leading-relaxed text-soft">
            Final projects: Health Advisor (an Android app giving personalised
            health recommendations), an online voting system, and a desktop
            student information system.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-soft">
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Google UX Design Certificate — Coursera
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Introduction to AI Certificate
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Languages: English and Amharic, both fluent
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.16} className="mt-12">
          <a
            href="/Dinksira_Elsa_Resume.pdf"
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