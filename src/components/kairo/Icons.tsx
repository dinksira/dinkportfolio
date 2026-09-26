'use client';

interface IconProps {
  className?: string;
}

/**
 * Official Brand Logo: Dinksira Elsa monogram mark.
 * Derived from /logo.svg geometry with responsive viewBox and currentColor styling.
 */
export function KairoMark({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 122 193"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M52.7176 191.654H0.5V108.519L3.51255 112.729L6.02301 115.36L9.03557 117.99L12.5502 119.569H16.5669L20.5837 117.99L23.5962 115.36L25.6046 112.729L29.1192 105.888V149.561L52.7176 151.139L73.8054 135.88L86.3577 99.0482L73.8054 71.6874L52.7176 51.1667L37.1527 45.3788L27.5 42.1543L28 74.3182H0.5V0.654297L52.7176 14.8609L75.8138 27.489L89.3703 41.1694L103.429 54.3237L113.973 71.6874L120.5 99.0482L113.973 135.88L104.935 151.139L89.3703 167.977L75.3117 181.657L52.7176 191.654Z"
        fill="currentColor"
      />
      <circle cx="15" cy="100.154" r="11.5" fill="currentColor" />
    </svg>
  );
}

export const LogoMark = KairoMark;

/** Compass rose: dashed ring with opposed diamond needles. */
export function Compass({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle
        cx="32"
        cy="32"
        r="27"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1 3"
      />
      <circle cx="32" cy="32" r="21" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M32 9 L37 32 L32 55 L27 32 Z" fill="currentColor" />
      <path
        d="M32 9 L37 32 L32 32 Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
      <path
        d="M9 32 L32 27 L55 32 L32 37 Z"
        fill="currentColor"
        fillOpacity="0.28"
      />
      <circle cx="32" cy="32" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function ArrowUpRight({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M4 12 L12 4" />
      <path d="M6 4 H12 V10" />
    </svg>
  );
}

export function Plus({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M8 2 V14 M2 8 H14" />
    </svg>
  );
}

/** Downward cue for the hero scroll line. */
export function ChevronDown({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M3 6 L8 11 L13 6" />
    </svg>
  );
}
