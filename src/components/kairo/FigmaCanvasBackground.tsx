'use client';

import { useEffect, useRef, useState } from 'react';

interface FigmaCursor {
  id: string;
  name: string;
  color: string;
  badgeBg: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  action: string;
}

interface DrawnShape {
  id: number;
  type: 'frame' | 'vector' | 'pill';
  x: number;
  y: number;
  w: number;
  h: number;
  targetW: number;
  targetH: number;
  opacity: number;
  color: string;
  label: string;
  rotation: number;
}

export default function FigmaCanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    // Prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Two active multiplayer cursors
    const cursors: FigmaCursor[] = [
      {
        id: 'dink',
        name: 'Dink (UI/UX)',
        color: '#b8702f',
        badgeBg: '#b8702f',
        x: width * 0.25,
        y: height * 0.35,
        targetX: width * 0.3,
        targetY: height * 0.4,
        action: 'Creating Component',
      },
      {
        id: 'core',
        name: 'Three.js (Core)',
        color: '#0d99ff',
        badgeBg: '#0d99ff',
        x: width * 0.7,
        y: height * 0.6,
        targetX: width * 0.65,
        targetY: height * 0.55,
        action: 'Extruding 3D Mesh',
      },
    ];

    // Array of dynamic canvas shapes
    const shapes: DrawnShape[] = [
      {
        id: 1,
        type: 'frame',
        x: width * 0.12,
        y: height * 0.25,
        w: 120,
        h: 80,
        targetW: 240,
        targetH: 150,
        opacity: 0.7,
        color: '#b8702f',
        label: 'Frame: HeroContainer',
        rotation: -2,
      },
      {
        id: 2,
        type: 'pill',
        x: width * 0.68,
        y: height * 0.38,
        w: 60,
        h: 28,
        targetW: 160,
        targetH: 42,
        opacity: 0.65,
        color: '#0d99ff',
        label: 'AutoLayout: Badge',
        rotation: 3,
      },
      {
        id: 3,
        type: 'frame',
        x: width * 0.42,
        y: height * 0.65,
        w: 80,
        h: 80,
        targetW: 200,
        targetH: 180,
        opacity: 0.5,
        color: '#a259ff',
        label: 'Component: 3DViewport',
        rotation: 1.5,
      },
    ];

    // Real mouse position
    let realMouseX = width * 0.5;
    let realMouseY = height * 0.5;
    const onMouseMove = (e: MouseEvent) => {
      realMouseX = e.clientX;
      realMouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let time = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.016;

      // Cursor 1: organic spline path around shape 1 and 3
      const cx1 = width * 0.25 + Math.sin(time * 0.7) * (width * 0.18) + Math.cos(time * 0.3) * 60;
      const cy1 = height * 0.35 + Math.cos(time * 0.6) * (height * 0.16) + Math.sin(time * 0.4) * 40;
      cursors[0].targetX = cx1;
      cursors[0].targetY = cy1;

      // Cursor 2: orbits shape 2 and reacts slightly to real user mouse
      const mouseInfluenceX = (realMouseX - width * 0.5) * 0.08;
      const mouseInfluenceY = (realMouseY - height * 0.5) * 0.08;
      const cx2 = width * 0.7 + Math.cos(time * 0.8) * (width * 0.15) + mouseInfluenceX;
      const cy2 = height * 0.52 + Math.sin(time * 0.75) * (height * 0.18) + mouseInfluenceY;
      cursors[1].targetX = cx2;
      cursors[1].targetY = cy2;

      // Interpolate cursors
      cursors.forEach((c) => {
        c.x += (c.targetX - c.x) * 0.05;
        c.y += (c.targetY - c.y) * 0.05;
      });

      // Update shapes (subtle breathing / expansion)
      shapes.forEach((s, idx) => {
        const cycle = Math.sin(time * 0.8 + idx * 2);
        s.w = s.targetW + cycle * 12;
        s.h = s.targetH + Math.cos(time * 0.6 + idx * 2) * 8;
        s.rotation = Math.sin(time * 0.4 + idx) * 2;
      });

      // Render to DOM via direct element transforms for 60fps performance
      cursors.forEach((c) => {
        const el = document.getElementById(`figma-cursor-${c.id}`);
        if (el) {
          el.style.transform = `translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0)`;
        }
      });

      shapes.forEach((s) => {
        const el = document.getElementById(`figma-shape-${s.id}`);
        if (el) {
          el.style.width = `${s.w.toFixed(1)}px`;
          el.style.height = `${s.h.toFixed(1)}px`;
          el.style.transform = `rotate(${s.rotation.toFixed(2)}deg)`;
        }
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[3] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Subtle Figma Dot Grid Canvas */}
      <div
        className="absolute inset-0 opacity-[0.14] dark:opacity-[0.09]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 2. Dynamic Figma Designing Shapes */}
      {/* Shape 1: Main Component Frame */}
      <div
        id="figma-shape-1"
        className="absolute left-[10%] top-[20%] rounded-xl border border-[#b8702f]/50 dark:border-[#d47a32]/60 bg-[#b8702f]/[0.025] dark:bg-[#d47a32]/[0.035] backdrop-blur-[1px] transition-all duration-300 pointer-events-none"
        style={{ width: '240px', height: '150px' }}
      >
        {/* Resize Handles (8 classic Figma points) */}
        <span className="absolute -top-1 -left-1 w-2 h-2 rounded-[1px] bg-white border border-[#b8702f] shadow-sm" />
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-[1px] bg-white border border-[#b8702f] shadow-sm" />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-[1px] bg-white border border-[#b8702f] shadow-sm" />
        <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-[1px] bg-white border border-[#b8702f] shadow-sm" />
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-[1px] bg-white border border-[#b8702f] shadow-sm" />
        <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-[1px] bg-white border border-[#b8702f] shadow-sm" />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-[1px] bg-white border border-[#b8702f] shadow-sm" />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-[1px] bg-white border border-[#b8702f] shadow-sm" />

        {/* Dynamic Frame Label & Dimensions */}
        <div className="absolute -top-5 left-0 flex items-center gap-1.5 px-1.5 py-0.5 rounded-t text-[0.625rem] font-mono tracking-tight bg-[#b8702f] text-white font-medium shadow-sm">
          <span>❖ HeroFrame</span>
          <span className="opacity-70">· 240 × 150</span>
        </div>

        {/* Inner wireframe content lines simulating layout */}
        <div className="p-3 space-y-2 opacity-40">
          <div className="h-2 w-1/3 rounded bg-[#b8702f]/40" />
          <div className="h-1.5 w-2/3 rounded bg-[#b8702f]/20" />
          <div className="h-1.5 w-1/2 rounded bg-[#b8702f]/20" />
        </div>
      </div>

      {/* Shape 2: Pill / Button AutoLayout */}
      <div
        id="figma-shape-2"
        className="absolute left-[65%] top-[35%] rounded-full border border-[#0d99ff]/60 bg-[#0d99ff]/[0.03] backdrop-blur-[1px] pointer-events-none"
        style={{ width: '160px', height: '42px' }}
      >
        <span className="absolute -top-1 -left-1 w-2 h-2 rounded-[1px] bg-white border border-[#0d99ff] shadow-sm" />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-[1px] bg-white border border-[#0d99ff] shadow-sm" />
        <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-[1px] bg-white border border-[#0d99ff] shadow-sm" />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-[1px] bg-white border border-[#0d99ff] shadow-sm" />

        <div className="absolute -top-5 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-[0.5625rem] font-mono bg-[#0d99ff] text-white font-medium">
          <span>AutoLayout</span>
          <span className="opacity-75">160 × 42 · R: 999</span>
        </div>

        {/* Distance measurement badge */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[0.5625rem] font-mono text-[#0d99ff] opacity-75">
          <span className="h-px w-4 bg-[#0d99ff]" />
          <span>32px</span>
        </div>
      </div>

      {/* Shape 3: 3D Viewport Bounding Wireframe */}
      <div
        id="figma-shape-3"
        className="absolute left-[40%] top-[62%] rounded-2xl border border-dashed border-[#a259ff]/50 bg-[#a259ff]/[0.02] backdrop-blur-[1px] pointer-events-none"
        style={{ width: '200px', height: '180px' }}
      >
        <span className="absolute -top-1 -left-1 w-2 h-2 rounded-[1px] bg-white border border-[#a259ff] shadow-sm" />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-[1px] bg-white border border-[#a259ff] shadow-sm" />
        <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-[1px] bg-white border border-[#a259ff] shadow-sm" />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-[1px] bg-white border border-[#a259ff] shadow-sm" />

        <div className="absolute -top-5 left-1 flex items-center gap-1 px-1.5 py-0.5 rounded text-[0.5625rem] font-mono bg-[#a259ff] text-white font-medium">
          <span>◈ 3D Prism Mesh</span>
          <span className="opacity-75">R: 16px</span>
        </div>

        {/* Isometric 3D angle guide marker */}
        <div className="absolute inset-4 border border-[#a259ff]/20 rounded-xl flex items-center justify-center">
          <span className="text-[0.625rem] font-mono text-[#a259ff]/60">iso 45°</span>
        </div>
      </div>

      {/* 3. Smart Alignment Guides (subtle magenta lines) */}
      <div className="absolute left-[10%] top-[10%] bottom-[30%] w-px bg-pink-500/25 border-r border-dotted border-pink-500/40 opacity-40" />
      <div className="absolute left-[65%] top-[15%] bottom-[20%] w-px bg-pink-500/25 border-r border-dotted border-pink-500/40 opacity-40" />

      {/* 4. Active Figma Multiplayer Cursors */}
      {/* Cursor 1: Dink (UI/UX) */}
      <div
        id="figma-cursor-dink"
        className="absolute top-0 left-0 will-change-transform pointer-events-none transition-opacity duration-300"
        style={{ transform: 'translate3d(200px, 200px, 0)' }}
      >
        {/* Authentic Figma Cursor SVG */}
        <svg
          className="w-5 h-5 -rotate-[22deg] drop-shadow-md"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 3.2L18.8 12.3C19.7 12.9 19.3 14.3 18.2 14.3H12.7L9.5 21.2C9.1 22 7.9 22.1 7.4 21.3L5.1 17.5L1.8 19.6C0.9 20.2 0 19.4 0.2 18.4L3.8 4.2C4.1 3.2 5.1 2.9 5.5 3.2Z"
            fill="#b8702f"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </svg>

        {/* Designer Pill Tag */}
        <div className="ml-3.5 -mt-1 px-2 py-0.5 rounded-full text-[0.6875rem] font-medium text-white shadow-md flex items-center gap-1.5 whitespace-nowrap bg-[#b8702f]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
          <span>Dink (UI/UX)</span>
        </div>
      </div>

      {/* Cursor 2: Three.js (Core) */}
      <div
        id="figma-cursor-core"
        className="absolute top-0 left-0 will-change-transform pointer-events-none transition-opacity duration-300"
        style={{ transform: 'translate3d(600px, 400px, 0)' }}
      >
        <svg
          className="w-5 h-5 -rotate-[22deg] drop-shadow-md"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 3.2L18.8 12.3C19.7 12.9 19.3 14.3 18.2 14.3H12.7L9.5 21.2C9.1 22 7.9 22.1 7.4 21.3L5.1 17.5L1.8 19.6C0.9 20.2 0 19.4 0.2 18.4L3.8 4.2C4.1 3.2 5.1 2.9 5.5 3.2Z"
            fill="#0d99ff"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </svg>

        <div className="ml-3.5 -mt-1 px-2 py-0.5 rounded-full text-[0.6875rem] font-medium text-white shadow-md flex items-center gap-1.5 whitespace-nowrap bg-[#0d99ff]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-200 animate-pulse" />
          <span>Three.js (Code)</span>
        </div>
      </div>
    </div>
  );
}
