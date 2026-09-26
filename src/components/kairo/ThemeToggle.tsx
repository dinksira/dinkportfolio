'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { gsap } from 'gsap';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      data-theme-toggle
      data-state={theme}
      className={`relative flex h-8 w-9 shrink-0 items-center rounded-full border border-line px-[3px] transition-colors duration-[var(--dur)] ease-[var(--ease)] hover:border-line-strong ${className}`}
    >
      <span
        data-knob
        aria-hidden="true"
        className="flex h-[22px] w-4 items-center justify-center rounded-full bg-ink text-bg"
        style={{
          transform: dark ? 'translateX(16px)' : 'translateX(0)',
          transition: 'transform var(--dur) var(--ease)',
        }}
      >
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.1">
          {dark ? (
            <path d="M6 1.4 A4.6 4.6 0 1 0 6 10.6 A3.6 3.6 0 0 1 6 1.4 Z" fill="currentColor" stroke="none" />
          ) : (
            <>
              <circle cx="6" cy="6" r="2.6" />
              <path d="M6 0.8 V2.2 M6 9.8 V11.2 M0.8 6 H2.2 M9.8 6 H11.2 M2.4 2.4 L3.4 3.4 M8.6 8.6 L9.6 9.6 M9.6 2.4 L8.6 3.4 M3.4 8.6 L2.4 9.6" />
            </>
          )}
        </svg>
      </span>
    </button>
  );
}

/** Small helper other components can use to re-run theme-dependent tweens. */
export function syncThemeTweens() {
  gsap.set('[data-theme-toggle] [data-knob]', { clearProps: 'all' });
}
