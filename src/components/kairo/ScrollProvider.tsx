'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollApi {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  stop: () => void;
  start: () => void;
}

const ScrollContext = createContext<ScrollApi>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useScrollApi = () => useContext(ScrollContext);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [, force] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: reduce ? 0 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    force((n) => n + 1);

    // Drive Lenis from the GSAP ticker so ScrollTrigger and smooth scroll
    // share a single clock — otherwise they drift and pinned sections jitter.
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: ScrollApi['scrollTo'] = (target, offset = 0) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.2 });
      return;
    }
    const el =
      typeof target === 'string' ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY + offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <ScrollContext.Provider
      value={{
        lenis: lenisRef.current,
        scrollTo,
        stop: () => lenisRef.current?.stop(),
        start: () => lenisRef.current?.start(),
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
