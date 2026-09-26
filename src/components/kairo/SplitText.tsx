'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Mode = 'line' | 'word' | 'char';

interface SplitProps {
  text: string;
  mode?: Mode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  /** Element that ScrollTrigger watches. Defaults to the split itself. */
  start?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

/**
 * Wraps text in <i> tags inside an overflow-hidden clip so lines can be
 * revealed from the bottom. Line mode moves the whole run; word and char
 * modes give every unit its own clip and stagger it.
 */
export default function SplitText({
  text,
  mode = 'line',
  className = '',
  delay = 0,
  duration = 1.1,
  stagger,
  start = 'top 88%',
  as: Tag = 'span',
}: SplitProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(el.querySelectorAll('i'), { yPercent: 0, opacity: 1 });
      return;
    }

    const targets = el.querySelectorAll<HTMLElement>(mode === 'line' ? '[data-inner]' : 'i');
    const gap = stagger ?? (mode === 'char' ? 0.022 : mode === 'word' ? 0.05 : 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'expo.out',
          stagger: gap,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [text, mode, delay, duration, stagger, start]);

  if (mode === 'line') {
    return (
      <Tag ref={root as never} className={`split split--line ${className}`}>
        <span data-inner className="split__inner">
          {text}
        </span>
      </Tag>
    );
  }

  const units = mode === 'char' ? Array.from(text) : text.split(' ');

  return (
    <Tag ref={root as never} className={className}>
      {units.map((unit, i) => (
        // Spaces need to survive as real spaces between the inline-block clips.
        <span className="split" key={`${unit}-${i}`}>
          <i>{unit === ' ' ? '\u00A0' : unit}</i>
          {mode === 'word' && i < units.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
