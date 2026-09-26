'use client';

import { useEffect, useRef } from 'react';

type Preset = 'scroll' | 'hover' | 'always';

interface VideoProps {
  src: string;
  poster?: string;
  preset?: Preset;
  className?: string;
  /** Fraction of the element that must be visible before playback starts. */
  threshold?: number;
  loop?: boolean;
  ariaLabel?: string;
}

/**
 * Autoplaying background video driven by an IntersectionObserver.
 * `scroll` plays at >= threshold visibility and pauses on exit;
 * `hover` waits for pointer enter; `always` just plays.
 */
export default function Video({
  src,
  poster,
  preset = 'scroll',
  className = '',
  threshold = 0.35,
  loop = true,
  ariaLabel,
}: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const play = () => {
      const r = el.play();
      if (r && typeof r.catch === 'function') r.catch(() => {});
    };
    const pause = () => {
      if (!el.paused) el.pause();
    };

    if (preset === 'always') {
      play();
      return;
    }

    if (preset === 'hover') {
      const host = el.parentElement ?? el;
      const enter = () => play();
      const leave = () => pause();
      host.addEventListener('pointerenter', enter);
      host.addEventListener('pointerleave', leave);
      return () => {
        host.removeEventListener('pointerenter', enter);
        host.removeEventListener('pointerleave', leave);
      };
    }

    // 'scroll'
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            play();
          } else if (!entry.isIntersecting) {
            pause();
          }
        }
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9] }
    );
    io.observe(el);

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [preset, threshold]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop={loop}
      playsInline
      preload="metadata"
      disablePictureInPicture
      aria-label={ariaLabel}
      tabIndex={-1}
    />
  );
}
