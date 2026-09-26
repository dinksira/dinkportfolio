'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Parallax depths, matching the source's 0.12 → 0.55 range. */
const CLOUDS = [
  { depth: 0.12, x: '6%', y: '18%', w: 46, h: 20, o: 0.5, blur: 46 },
  { depth: 0.2, x: '58%', y: '9%', w: 38, h: 16, o: 0.4, blur: 38 },
  { depth: 0.28, x: '18%', y: '34%', w: 62, h: 26, o: 0.34, blur: 58 },
  { depth: 0.36, x: '72%', y: '27%', w: 34, h: 15, o: 0.3, blur: 34 },
  { depth: 0.46, x: '34%', y: '52%', w: 74, h: 30, o: 0.24, blur: 72 },
  { depth: 0.55, x: '82%', y: '47%', w: 52, h: 22, o: 0.2, blur: 64 },
];

export default function Sky() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const depth = parseFloat(el.dataset.parallax || '0');
        gsap.to(el, {
          yPercent: -depth * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      });

      // The sun dims as the reader descends into the darker strata.
      gsap.to('[data-sun]', {
        opacity: 0.15,
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div id="sky" ref={root} aria-hidden="true">
      <div
        data-sun
        className="absolute left-1/2 top-[18%] h-[62vmax] w-[62vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--sun) 0%, transparent 62%)',
        }}
      />
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          data-parallax={c.depth}
          className="absolute rounded-[50%]"
          style={{
            left: c.x,
            top: c.y,
            width: `${c.w}vmax`,
            height: `${c.h}vmax`,
            opacity: c.o,
            filter: `blur(${c.blur}px)`,
            background:
              'radial-gradient(closest-side, var(--sky-1) 0%, transparent 100%)',
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, var(--sky-1) 0%, var(--sky-2) 46%, var(--sky-3) 100%)',
        }}
      />
    </div>
  );
}
