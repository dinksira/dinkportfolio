import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dinksira.dev'),
  title: 'Dinksira Elsa — Full Stack Developer & UI/UX Designer',
  description:
    'Portfolio of Dinksira Elsa, a Full Stack Developer & UI/UX Designer based in Addis Ababa. I design in Figma, then build it — React, Next.js, React Native, Node.js and FastAPI.',
  keywords:
    'Full Stack Development, UI/UX Design, React, Next.js, TypeScript, Node.js, FastAPI, Figma, Addis Ababa, Ethiopia',
  authors: [{ name: 'Dinksira Elsa' }],
  creator: 'Dinksira Elsa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dinksira.dev',
    siteName: 'Dinksira Elsa Portfolio',
    title: 'Dinksira Elsa — Full Stack Developer & UI/UX Designer',
    description:
      'I design in Figma and build what I designed. React, Next.js, React Native, Node.js, FastAPI — from sealed-bid auction platforms to cross-platform education products.',
    images: [
      {
        url: '/profile.png',
        width: 1200,
        height: 630,
        alt: 'Dinksira Elsa — Full Stack Developer & UI/UX Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dinksira Elsa — Full Stack Developer & UI/UX Designer',
    description: 'I design in Figma and build what I designed — React, Next.js, Node.js, FastAPI.',
    images: ['/profile.png'],
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo.svg',
    shortcut: '/logo.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Resolve the theme before first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`,
          }}
        />

        {/*
          Fonts are loaded at runtime rather than through next/font.
          next/font/google fetches during the build, and when that fetch times
          out it silently substitutes a fallback face — which flattens the whole
          typographic identity without failing the build. Requesting the CSS
          from the browser keeps the real faces and fails visibly if offline.
        */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/*
          High-performance editorial font subset:
          • Cormorant Garamond — display serif for hero names & accent quotes
          • Bodoni Moda        — editorial serif for section headings
          • DM Sans            — clean geometric sans-serif for body & UI
          • JetBrains Mono     — monospace for code accents
          • Noto Sans Ethiopic — Amharic greeting
        */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+Ethiopic:wght@400;500&display=swap"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
