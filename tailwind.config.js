/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: 'var(--ivory)',
        charcoal: 'var(--charcoal)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        'ink-invert': 'var(--ink-invert)',
        soft: 'var(--soft)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        plate: 'var(--plate)',
        sky: 'var(--sky)',
      },
      fontFamily: {
        display: [
          'var(--font-display, "Bodoni Moda")',
          'Bodoni Moda',
          'Didot',
          'serif',
        ],
        body: [
          'var(--font-body, "Inter")',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        amharic: ['Noto Sans Ethiopic', 'Abyssinica SIL', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.3em',
      },
      transitionDuration: {
        dur: 'var(--dur)',
      },
      transitionTimingFunction: {
        kairo: 'var(--ease)',
      },
      maxWidth: {
        shell: '90rem',
      },
    },
  },
  plugins: [],
}
