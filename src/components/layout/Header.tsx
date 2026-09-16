'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const RESUME_URL =
  'https://drive.google.com/file/d/1woQVgpWxist-an5YBJ0L2wv6yOYxPPqj/view?usp=drive_link';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [progress, setProgress] = useState(0);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <button
          onClick={() => scrollTo('home')}
          aria-label="Dinksira Elsa — back to top"
          className="font-display text-lg font-semibold tracking-tight"
        >
          <span className="sr-only">Dinksira</span>
          <span aria-hidden="true" className="relative inline-block">
            <motion.span
              className="pointer-events-none absolute -top-2 bottom-0 left-0 w-1/3 blur-md"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--accent), transparent)',
                opacity: 0.45,
              }}
              animate={reduceMotion ? {} : { x: ['-120%', '420%'] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2.6,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
            {'Dinksira'.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={reduceMotion ? { opacity: 0 } : { y: -14, opacity: 0, rotate: -8 }}
                animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="inline-block will-change-transform"
                  animate={reduceMotion ? {} : { y: [0, -3.5, 0], rotate: [0, 2.5, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.08,
                  }}
                >
                  {char}
                </motion.span>
              </motion.span>
            ))}
            <motion.span
              className="relative inline-block text-accent"
              initial={reduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
              animate={reduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 + 8 * 0.045, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="absolute h-4 w-4 rounded-full border border-accent"
                style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
                animate={reduceMotion ? {} : { scale: [0.3, 1.6], opacity: [0.7, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.4 }}
              />
              <motion.span
                className="inline-block"
                animate={reduceMotion ? {} : { scale: [1, 1.25, 1] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 8 * 0.08,
                }}
              >
                .
              </motion.span>
            </motion.span>
          </span>
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm transition-colors ${
                active === item.id ? 'text-ink' : 'text-soft hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-ink hover:bg-surface-muted sm:inline-flex"
          >
            Resume
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line transition-colors hover:bg-surface-muted"
          >
            {theme === 'dark' ? (
              <Sun size={15} className="text-soft" />
            ) : (
              <Moon size={15} className="text-soft" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line md:hidden"
          >
            <div className="relative h-4 w-4">
              <span
                className={`absolute left-0 top-1/2 block h-px w-4 bg-ink transition-all duration-200 ${
                  menuOpen ? 'rotate-45' : '-translate-y-1'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-px w-4 bg-ink transition-all duration-200 ${
                  menuOpen ? '-rotate-45' : 'translate-y-1'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-background md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full py-2 text-left text-sm transition-colors ${
                    active === item.id ? 'text-ink' : 'text-soft hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block rounded-md border border-line px-4 py-2 text-center text-sm font-medium transition-colors hover:bg-surface-muted"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-0 left-0 h-px bg-accent"
        style={{ width: `${progress}%` }}
      />
    </motion.header>
  );
}