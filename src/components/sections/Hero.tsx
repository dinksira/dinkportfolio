'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const socials = [
  { name: 'Behance', href: 'https://www.behance.net/dinksiraelsa' },
  { name: 'Dribbble', href: 'https://dribbble.com/dinksira-elsa' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dinksira-elsa-13904b319/' },
  { name: 'GitHub', href: 'https://github.com/dinksira' },
  { name: 'Upwork', href: 'https://www.upwork.com/freelancers/~0169e7871bfcb02264?mp_source=share' },
  { name: 'Telegram', href: 'https://t.me/Dink_Sira' },
];

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section id="home" className="flex min-h-screen items-center pt-16">
      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-24 lg:grid-cols-12 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-7"
        >
          <p className="font-amharic text-sm text-soft">እንኳን ደህና መጡ</p>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Dinksira Elsa<span className="text-accent">.</span>
          </h1>

          <p className="mt-6 text-xl text-soft md:text-2xl">
            Full Stack Developer &amp; UI/UX Designer
          </p>

          <p className="mt-3 text-sm text-soft">Addis Ababa, Ethiopia</p>

          <p className="mt-6 max-w-xl leading-relaxed text-soft">
            I design in Figma and then build what I designed, so what ships
            usually looks like what was drawn. Most of my work is React and
            Next.js on the web, React Native on mobile, and Node.js or FastAPI
            behind both — from sealed-bid auction platforms to an education
            product that runs on web, mobile, and desktop off one backend.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo('projects')}
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="rounded-md border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-ink hover:bg-surface-muted"
            >
              Get in Touch
            </button>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-soft transition-colors hover:text-ink"
                >
                  {social.name}
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto aspect-square w-full max-w-[280px] md:max-w-[340px] lg:ml-auto lg:max-w-[400px]">
            <Image
              src="/profile.png"
              alt="Portrait of Dinksira Elsa"
              fill
              priority
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 340px, 280px"
              className="rounded-2xl border border-line object-cover"
            />
            <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-line bg-background/90 px-3 py-1.5 text-xs text-ink backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Available for work
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}