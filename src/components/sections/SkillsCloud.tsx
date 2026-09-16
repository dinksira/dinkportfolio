'use client';

import Reveal from '@/components/ui/Reveal';
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

const categories = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend',
    skills: [
      'React & Next.js',
      'Flutter',
      'React Native',
      'Tailwind CSS',
      'Vite',
      'Electron',
    ],
  },
  {
    title: 'Backend',
    skills: [
      'Node.js & Express',
      'FastAPI',
      'MongoDB',
      'Supabase',
      'PostgreSQL',
      'REST APIs, OAuth & RBAC',
      'Claude & OpenAI APIs',
    ],
  },
  {
    title: 'Design',
    skills: ['UI/UX design', 'Wireframing', 'Interactive prototyping', 'Design systems', 'Accessibility'],
  },
];

const tools = [
  { name: 'Figma', Icon: FigmaIcon },
  { name: 'Adobe XD', Icon: AdobeXdIcon },
  { name: 'VS Code', Icon: VsCodeIcon },
  { name: 'Git & GitHub', Icon: GitIcon },
  { name: 'React', Icon: ReactIcon },
  { name: 'Node.js', Icon: NodeJsIcon },
  { name: 'Vercel', Icon: VercelIcon },
  { name: 'Turborepo', Icon: TurborepoIcon },
];

export default function SkillsCloud() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">02 — Skills</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Skills &amp; tools
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.08}>
              <h3 className="text-sm uppercase tracking-[0.2em] text-soft">{category.title}</h3>
              <ul className="mt-6 space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-ink">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-16 border-t border-line pt-10">
          <h3 className="text-sm uppercase tracking-[0.2em] text-soft">Toolbox</h3>
          <div className="mt-8 grid grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-4 md:grid-cols-8 md:gap-x-6">
            {tools.map(({ name, Icon }) => (
              <div key={name} className="group flex flex-col items-center gap-3 text-center">
                <div className="flex h-10 w-10 items-center justify-center text-ink/70 transition-colors group-hover:text-accent">
                  <Icon className="h-8 w-8" />
                </div>
                <span className="text-xs text-soft transition-colors group-hover:text-ink">{name}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}