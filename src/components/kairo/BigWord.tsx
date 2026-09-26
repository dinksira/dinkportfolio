'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { identity } from '@/data/profile';

/**
 * Oversized wordmark fixed behind the 3D island (z-1 vs #scene at z-2).
 * Its drift and opacity are driven by total scroll progress.
 */
export default function BigWord() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      tl.fromTo(
        '[data-word]',
        { yPercent: 4, scale: 0.98 },
        { yPercent: -10, scale: 1.04, ease: 'none' },
        0
      );

      gsap.fromTo(
        '[data-word]',
        { opacity: 0 },
        { opacity: 0.04, duration: 1.2, ease: 'power2.out', delay: 0.2 }
      );
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div
      id="bigWord"
      ref={root}
      aria-hidden="true"
      className="flex items-center justify-center overflow-hidden"
    >
      <span
        data-word
        className="display-xl select-none whitespace-nowrap text-center"
        style={{ color: 'var(--ink)' }}
      >
        {identity.wordmark}
      </span>
    </div>
  );
}
