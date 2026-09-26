'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Interactive3DModelProps {
  mode: 'design' | 'code';
}

export default function Interactive3DModel({ mode }: Interactive3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const sceneRef = useRef<{
    setWireframe: (wf: boolean) => void;
    resetRotation: () => void;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = container.clientWidth || 340;
    const height = 300;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearAlpha(0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, mode === 'design' ? 14 : 16);

    // ── DESIGN MODE: Purple / Violet / Rose sculptural palette ──────────
    // ── CODE   MODE: Teal / Cyan / Emerald technical palette  ──────────

    if (mode === 'design') {
      // Warm violet primary fill light
      const fillLight = new THREE.PointLight(0x8b5cf6, 5.0, 60);
      fillLight.position.set(8, 10, 10);
      scene.add(fillLight);

      // Rose rim light from behind
      const rimLight = new THREE.PointLight(0xf43f5e, 3.0, 50);
      rimLight.position.set(-10, -6, -5);
      scene.add(rimLight);

      // Soft gold ambient fill
      const fillLight2 = new THREE.PointLight(0xfbbf24, 2.0, 40);
      fillLight2.position.set(0, -10, 8);
      scene.add(fillLight2);

      const ambient = new THREE.AmbientLight(0xd8b4fe, 0.9);
      scene.add(ambient);
    } else {
      // Teal primary fill
      const fillLight = new THREE.PointLight(0x06b6d4, 5.0, 60);
      fillLight.position.set(8, 10, 10);
      scene.add(fillLight);

      // Emerald green rim from below
      const rimLight = new THREE.PointLight(0x10b981, 3.5, 50);
      rimLight.position.set(-10, -8, -5);
      scene.add(rimLight);

      // Gold accent point
      const accentLight = new THREE.PointLight(0xf59e0b, 2.5, 40);
      accentLight.position.set(5, -5, 10);
      scene.add(accentLight);

      const ambient = new THREE.AmbientLight(0x99f6e4, 0.7);
      scene.add(ambient);
    }

    const group = new THREE.Group();
    scene.add(group);

    let mesh: THREE.Mesh;
    let innerMesh: THREE.Mesh | null = null;
    let particleMesh: THREE.Points | null = null;
    let particleMesh2: THREE.Points | null = null;

    if (mode === 'design') {
      // ── DESIGN: Sculptural Torus Knot in violet/purple ──────────────
      const geo = new THREE.TorusKnotGeometry(3.4, 1.0, 140, 36, 2, 3);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,       // vivid violet
        roughness: 0.15,
        metalness: 0.75,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.3,
      });
      mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      // Outer gossamer icosahedron cage in rose
      const cageGeo = new THREE.IcosahedronGeometry(6.0, 1);
      const cageMat = new THREE.MeshBasicMaterial({
        color: 0xf9a8d4,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      innerMesh = new THREE.Mesh(cageGeo, cageMat);
      group.add(innerMesh);

      // Floating star particles — violet + rose mix
      const pCount = 80;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const r = 5.8 + Math.random() * 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;
        pPos[i * 3]     = r * Math.cos(theta) * Math.cos(phi);
        pPos[i * 3 + 1] = r * Math.sin(phi);
        pPos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xe879f9,
        size: 0.15,
        transparent: true,
        opacity: 0.85,
      });
      particleMesh = new THREE.Points(pGeo, pMat);
      group.add(particleMesh);

    } else {
      // ── CODE: Octahedron core in teal/cyan with emerald lattice ──────
      const geo = new THREE.OctahedronGeometry(4.0, 2);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x0891b2,       // vivid cyan-600
        roughness: 0.1,
        metalness: 0.85,
        emissive: 0x164e63,
        emissiveIntensity: 0.35,
      });
      mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);

      // Inner wireframe icosahedron in emerald
      const innerGeo = new THREE.IcosahedronGeometry(2.4, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      });
      innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      // Cyan orbit particles
      const pCount = 60;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const r = 5.5 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;
        pPos[i * 3]     = r * Math.cos(theta) * Math.cos(phi);
        pPos[i * 3 + 1] = r * Math.sin(phi);
        pPos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x22d3ee,
        size: 0.18,
        transparent: true,
        opacity: 0.8,
      });
      particleMesh = new THREE.Points(pGeo, pMat);
      group.add(particleMesh);

      // Gold accent ring particles
      const p2Count = 30;
      const p2Pos = new Float32Array(p2Count * 3);
      for (let i = 0; i < p2Count; i++) {
        const theta = (i / p2Count) * Math.PI * 2;
        const r = 6.5;
        p2Pos[i * 3]     = r * Math.cos(theta);
        p2Pos[i * 3 + 1] = (Math.random() - 0.5) * 1.2;
        p2Pos[i * 3 + 2] = r * Math.sin(theta);
      }
      const p2Geo = new THREE.BufferGeometry();
      p2Geo.setAttribute('position', new THREE.BufferAttribute(p2Pos, 3));
      const p2Mat = new THREE.PointsMaterial({
        color: 0xfbbf24,
        size: 0.22,
        transparent: true,
        opacity: 0.75,
      });
      particleMesh2 = new THREE.Points(p2Geo, p2Mat);
      group.add(particleMesh2);
    }

    // ── Drag-to-Rotate ─────────────────────────────────────────────────
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let rotVelX = 0;
    let rotVelY = 0;

    const dom = renderer.domElement;
    dom.style.cursor = 'grab';

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      dom.style.cursor = 'grabbing';
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMousePos.x;
      const dy = e.clientY - prevMousePos.y;
      rotVelY = dx * 0.008;
      rotVelX = dy * 0.008;
      group.rotation.y += rotVelY;
      group.rotation.x += rotVelX;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      dom.style.cursor = 'grab';
      setTimeout(() => setIsInteracting(false), 600);
    };

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 340;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', onResize);

    sceneRef.current = {
      setWireframe: (wf: boolean) => {
        (mesh.material as THREE.MeshStandardMaterial).wireframe = wf;
      },
      resetRotation: () => {
        group.rotation.set(0, 0, 0);
        rotVelX = 0;
        rotVelY = 0;
      },
    };

    // ── Render loop ─────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!isDragging) {
        rotVelX *= 0.92;
        rotVelY *= 0.92;
        group.rotation.x += rotVelX;
        group.rotation.y += rotVelY;
        group.rotation.y += mode === 'design' ? 0.006 : 0.008;
        group.rotation.x += 0.003;
      }

      // Subtle breathing pulse on the main mesh
      const pulse = 1 + Math.sin(t * 1.4) * 0.018;
      mesh.scale.setScalar(pulse);

      if (innerMesh) {
        innerMesh.rotation.y -= 0.005;
        innerMesh.rotation.z += 0.003;
      }
      if (particleMesh) {
        particleMesh.rotation.y += 0.005;
      }
      if (particleMesh2) {
        particleMesh2.rotation.y -= 0.009;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
      if (innerMesh) { innerMesh.geometry.dispose(); (innerMesh.material as THREE.Material).dispose(); }
      if (particleMesh) { particleMesh.geometry.dispose(); (particleMesh.material as THREE.Material).dispose(); }
      if (particleMesh2) { particleMesh2.geometry.dispose(); (particleMesh2.material as THREE.Material).dispose(); }
      renderer.dispose();
    };
  }, [mode]);

  const toggleWireframe = () => {
    const next = !wireframe;
    setWireframe(next);
    sceneRef.current?.setWireframe(next);
  };

  const handleReset = () => sceneRef.current?.resetRotation();

  const modeColor = mode === 'design' ? 'text-violet-400' : 'text-cyan-400';
  const modeLabel = mode === 'design' ? 'Design Sculpture' : 'Engineering Core';
  const modeBg    = mode === 'design'
    ? 'from-violet-950/40 via-transparent to-transparent'
    : 'from-cyan-950/40 via-transparent to-transparent';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-line bg-bg-alt select-none">

      {/* Subtle colored ambient gradient behind the canvas */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${modeBg}`} aria-hidden="true" />

      {/* 3D WebGL canvas */}
      <div
        ref={containerRef}
        className="w-full h-[280px] sm:h-[320px] flex items-center justify-center active:cursor-grabbing"
      />

      {/* Top status bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <span className={`flex h-2 w-2 rounded-full animate-pulse ${mode === 'design' ? 'bg-violet-400' : 'bg-cyan-400'}`} />
          <span className={`text-[0.6875rem] uppercase tracking-wider ${modeColor} bg-bg/70 px-2.5 py-0.5 rounded-full border border-line/60 backdrop-blur`}>
            {modeLabel}
          </span>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="text-[0.6875rem] text-soft bg-bg/80 px-2.5 py-1 rounded-full border border-line/60 backdrop-blur flex items-center gap-1.5">
          <svg viewBox="0 0 16 16" className="h-3 w-3 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="5" /><path d="M8 3 L8 5 M8 11 L8 13 M3 8 L5 8 M11 8 L13 8" />
          </svg>
          <span>{isInteracting ? 'Rotating…' : 'Drag to rotate'}</span>
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleWireframe}
            className={`px-3 py-1 rounded-full text-[0.6875rem] font-medium transition-colors border ${
              wireframe
                ? (mode === 'design' ? 'bg-violet-600 text-white border-violet-600' : 'bg-cyan-600 text-white border-cyan-600')
                : 'bg-bg/80 text-soft hover:text-ink border-line/60'
            }`}
          >
            {wireframe ? 'Solid' : 'Wireframe'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1 rounded-full text-[0.6875rem] font-medium bg-bg/80 text-soft hover:text-ink border border-line/60 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
