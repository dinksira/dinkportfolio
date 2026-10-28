<div align="center">

  # ✦ DINKSIRA ELSA ✦
  ### Full Stack Developer & UI/UX Designer
  **Addis Ababa, Ethiopia · 9°N 38°E**

  <p align="center">
    <i>Bridging Figma design systems directly into production code with zero fidelity loss.</i>
  </p>

  <p align="center">
    <a href="https://github.com/dinksira/dinkportfolio/releases/tag/v1.1.0"><img src="https://img.shields.io/badge/Release-v1.1.0-amber?style=for-the-badge&logo=github&logoColor=white" alt="Release" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://greensock.com/gsap/"><img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" /></a>
  </p>

  <p align="center">
    <a href="#-interactive-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-projects-showcase">Projects</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-connect">Connect</a>
  </p>

  <hr width="80%" />

</div>

---

## ✨ Overview

This repository houses the personal portfolio and digital atelier of **Dinksira Elsa**. Built as an editorial experience, it blends high-fidelity architectural 3D graphics, fluid physics-based kinetic motion, and responsive web performance into a unified single-page platform.

### 🌟 Key Highlights

* **Procedural 3D Studio Workstation** — An interactive, photorealistic Three.js room and developer workstation featuring natural materials, Yamaha HS studio monitors, custom PC tower with RGB cooling, and dual displays.
* **Editorial Floating Cutout** — Precision boundary-seeded background matting with a baked smoothstep transparent alpha gradient, floating seamlessly over the webpage background.
* **Dual-Discipline Viewport ("Two Faces")** — A dynamic toggle between **Design Mode** (architectural 3D workstation & room) and **Code Mode** (pulsing engineering wireframe core).
* **Kinetic Typography & Staggered Motion** — GSAP context timelines, character-split entrance animations, and Lenis smooth momentum scrolling.
* **Curated Material Aesthetics** — Dark/Light palette featuring European Blonde Oak, warm architectural greige, and terracotta accents.

---

## 🖥️ Interactive Features

### 1. Architectural 3D Workstation Viewport (`Three.js`)
Located in the *Philosophy & Craft* section, the interactive viewport allows visitors to inspect a fully-realized studio environment:
- **Natural PBR Textures**: Procedural white oak parquet flooring with individual plank tones, bevel seams, and a Scandinavian bouclé wool rug.
- **Realistic Lighting**: Exterior window aperture framing a blue sky with lush treetops, casting directional daylight and soft ambient occlusion shadows.
- **Interactive Controls**: Full mouse/touch drag-to-rotate orbital navigation, real-time CAD wireframe mode toggle, and one-click camera reset.
- **Optimized Memory**: Complete GPU geometry, material, and texture garbage collection on component unmount.

### 2. Seamless Transparent Portrait (`Hero Section`)
- **Clean Background Removal**: Cutout isolating the subject from city night bokeh while preserving delicate details (cap silhouette, jacket texture, white sweater, and embroidered logo).
- **Smoothstep Transparent Dissolve**: Mathematical alpha gradient feathering baked directly into the PNG file, ensuring zero harsh cutoff lines or edge artifacts on any screen size.
- **Atmospheric Backglow**: Dynamic radial accent illumination that pulses smoothly on hover.

### 3. Dual-Discipline Philosophy ("Two Faces")
An interactive module reflecting the dual nature of modern engineering:
- **The Architect (Design Mode)**: Spatial thinking, human ergonomics, color harmony, and design systems.
- **The Engineer (Code Mode)**: Low-level geometry, data structures, type safety, and runtime performance.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework & Core** | Next.js 14 (App Router), React 18, TypeScript (Strict Mode) |
| **3D & WebGL** | Three.js, Procedural Canvas Shaders & Textures, PBR Materials |
| **Styling & Design System** | Tailwind CSS 3.4, Vanilla CSS Custom Properties, Editorial Typography |
| **Motion & Interaction** | GSAP 3 (Context, Timelines), Lenis Smooth Scroll, SplitText |
| **Image Processing** | Sharp (Alpha Masking, Anti-Aliased Matting, Defringing) |
| **Icons & Media** | Lucide React, Custom SVG Toolmarks, Supabase Video Streams |

---

## 📂 Projects Showcase

| Project | Role | Description | Tech Stack |
| :--- | :--- | :--- | :--- |
| **[Enderas](https://enderasbid.com/)** | Full Stack Lead | Sealed-bid digital auction platform for Ethiopian government institutions with KYC, RBAC, and CPO payment workflows. | `React` `TypeScript` `Node.js` `SQL` `Tailwind` |
| **[Relavo](https://relavo.xyz/)** | Full Stack & AI | AI client relationship intelligence platform using Claude API for automated relationship briefs and account health tracking. | `React` `Vite` `FastAPI` `Claude API` `Supabase` |
| **[Delta Labs](https://figma.com)** | Full Stack & UI/UX | Unified cross-platform educational platform spanning Web, Flutter mobile, and Electron desktop on a single MongoDB API. | `TypeScript` `Flutter` `Electron` `MongoDB` `Express` |
| **[Health Advisor](https://github.com/dinksira/Health_Advisor.git)** | Mobile Engineer | Android biometric health and habit recommendation assistant with personalized wellness telemetry. | `Android` `Java` `SQLite` `Material Design` |

---

## 🏗️ Project Architecture

```
dinkportfolio/
├── public/
│   ├── profile_transparent.png     # Optimized smoothstep transparent cutout
│   ├── Enderas.png                 # Case study visual assets
│   ├── Relavo.png
│   └── DeltaLabs.png
├── scripts/
│   └── transparent_gradient.js     # Image alpha matting & feathering pipeline
├── src/
│   ├── app/
│   │   ├── globals.css             # Design tokens, color system, and themes
│   │   ├── layout.tsx              # Root HTML wrapper and metadata
│   │   └── page.tsx                # Dynamic section composition
│   ├── components/
│   │   ├── kairo/
│   │   │   ├── createComputerSetup.ts  # Procedural 3D workstation & room
│   │   │   ├── Interactive3DModel.tsx  # WebGL canvas viewport & orbit controls
│   │   │   ├── ScrollProvider.tsx      # Lenis smooth scrolling orchestrator
│   │   │   └── SplitText.tsx           # Kinetic headline typography
│   │   └── sections/
│   │       ├── Hero.tsx                # Floating transparent portrait & bio
│   │       ├── TwoFaces.tsx            # Design vs Engineering dual viewport
│   │       ├── Works.tsx               # Production project showcases
│   │       ├── Passage.tsx             # Interactive career timeline
│   │       └── Stay.tsx                # Contact terminal & direct reach
│   └── data/
│       └── profile.ts              # Single source of truth for portfolio content
├── tailwind.config.js              # Theme palettes, typography tokens, and radii
└── tsconfig.json                   # Strict TypeScript compiler options
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js `18.17.0` or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dinksira/dinkportfolio.git
   cd dinkportfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Runs the development server on port 3000 |
| `build` | `npm run build` | Compiles the production build |
| `start` | `npm run start` | Runs the built production server |
| `typecheck` | `npm run typecheck` | Validates TypeScript types with `tsc --noEmit` |
| `lint` | `npm run lint` | Runs ESLint analysis |

---

## 📬 Connect & Inquiries

<div align="center">

  **Dinksira Elsa**  
  *Addis Ababa, Ethiopia*

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dinksira-elsa-13904b319/)
  [![Behance](https://img.shields.io/badge/Behance-1769FF?style=flat-square&logo=behance&logoColor=white)](https://www.behance.net/dinksiraelsa)
  [![Dribbble](https://img.shields.io/badge/Dribbble-EA4C89?style=flat-square&logo=dribbble&logoColor=white)](https://dribbble.com/dinksira-elsa)
  [![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://t.me/Dink_Sira)
  [![Upwork](https://img.shields.io/badge/Upwork-6FDA44?style=flat-square&logo=upwork&logoColor=white)](https://www.upwork.com/freelancers/~0169e7871bfcb02264?mp_source=share)
  [![Email](https://img.shields.io/badge/Email-dinksiraelisa@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:dinksiraelisa@gmail.com)

</div>

---

<div align="center">
  <sub>Designed and built with care by Dinksira Elsa. © 2026 All rights reserved.</sub>
</div>
