'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createComputerSetup, ComputerSetupResult } from './createComputerSetup';

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
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
    } catch {
      return;
    }

    const width = container.clientWidth || 360;
    const height = mode === 'design' ? 420 : 320;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearAlpha(0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    const group = new THREE.Group();
    scene.add(group);

    // Track resources for clean disposal
    let computerSetup: ComputerSetupResult | null = null;
    let codeMeshes: THREE.Mesh[] = [];
    let codeInnerMesh: THREE.Mesh | null = null;
    let codeParticles: THREE.Points | null = null;
    let codeParticles2: THREE.Points | null = null;

    // Optimal isometric viewing angles
    const designBaseRot = { x: 0.16, y: -0.38, z: 0 };
    const codeBaseRot   = { x: 0, y: 0, z: 0 };

    if (mode === 'design') {
      // ── DESIGN MODE: Realistic 3D Room & Workstation Setup ───────────────
      const aspect = width / height;
      const camZ = aspect < 1.1 ? 35 : 29.5;
      camera.position.set(0, 6.2, camZ);
      camera.lookAt(0, 2.2, 0);

      computerSetup = createComputerSetup();
      group.add(computerSetup.group);
      group.position.set(0, -1.0, 0);
      group.rotation.set(designBaseRot.x, designBaseRot.y, designBaseRot.z);

    } else {
      // ── CODE MODE: Engineering Octahedron Core ─────────────────────────
      camera.position.set(0, 0, 16);

      const fillLight = new THREE.PointLight(0x06b6d4, 5.0, 60);
      fillLight.position.set(8, 10, 10);
      scene.add(fillLight);

      const rimLight = new THREE.PointLight(0x10b981, 3.5, 50);
      rimLight.position.set(-10, -8, -5);
      scene.add(rimLight);

      const accentLight = new THREE.PointLight(0xf59e0b, 2.5, 40);
      accentLight.position.set(5, -5, 10);
      scene.add(accentLight);

      const ambient = new THREE.AmbientLight(0x99f6e4, 0.7);
      scene.add(ambient);

      // Core Octahedron
      const geo = new THREE.OctahedronGeometry(4.0, 2);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x0891b2,
        roughness: 0.1,
        metalness: 0.85,
        emissive: 0x164e63,
        emissiveIntensity: 0.35,
      });
      const codeMesh = new THREE.Mesh(geo, mat);
      group.add(codeMesh);
      codeMeshes.push(codeMesh);

      // Inner wireframe icosahedron
      const innerGeo = new THREE.IcosahedronGeometry(2.4, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      });
      codeInnerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(codeInnerMesh);

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
      codeParticles = new THREE.Points(pGeo, pMat);
      group.add(codeParticles);

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
      codeParticles2 = new THREE.Points(p2Geo, p2Mat);
      group.add(codeParticles2);
    }

    // ── Drag-to-Rotate Interaction ────────────────────────────────────
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
      rotVelY = dx * 0.007;
      rotVelX = dy * 0.007;
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
      const w = container.clientWidth || 360;
      const h = mode === 'design' ? 420 : 320;
      camera.aspect = w / h;
      if (mode === 'design') {
        camera.position.z = camera.aspect < 1.1 ? 35 : 29.5;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Wireframe & Reset Handler
    sceneRef.current = {
      setWireframe: (wf: boolean) => {
        if (computerSetup) {
          computerSetup.materials.forEach((m) => {
            if ('wireframe' in m) {
              (m as THREE.MeshStandardMaterial).wireframe = wf;
            }
          });
        }
        codeMeshes.forEach((cm) => {
          (cm.material as THREE.MeshStandardMaterial).wireframe = wf;
        });
      },
      resetRotation: () => {
        if (mode === 'design') {
          group.rotation.set(designBaseRot.x, designBaseRot.y, designBaseRot.z);
        } else {
          group.rotation.set(codeBaseRot.x, codeBaseRot.y, codeBaseRot.z);
        }
        rotVelX = 0;
        rotVelY = 0;
      },
    };

    // ── Render loop ───────────────────────────────────────────────────
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!isDragging) {
        rotVelX *= 0.92;
        rotVelY *= 0.92;
        group.rotation.x += rotVelX;
        group.rotation.y += rotVelY;

        if (mode === 'design') {
          // Subtle natural idle room breathing
          const idleDrift = Math.sin(t * 0.8) * 0.0005;
          group.rotation.y += idleDrift;
          group.position.y = -1.0 + Math.sin(t * 1.2) * 0.05;
        } else {
          group.rotation.y += 0.008;
          group.rotation.x += 0.003;
        }
      }

      if (computerSetup) {
        computerSetup.update(t);
      }

      if (codeMeshes.length > 0) {
        const pulse = 1 + Math.sin(t * 1.4) * 0.018;
        codeMeshes[0].scale.setScalar(pulse);
      }
      if (codeInnerMesh) {
        codeInnerMesh.rotation.y -= 0.005;
        codeInnerMesh.rotation.z += 0.003;
      }
      if (codeParticles) {
        codeParticles.rotation.y += 0.005;
      }
      if (codeParticles2) {
        codeParticles2.rotation.y -= 0.009;
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

      if (computerSetup) {
        computerSetup.geometries.forEach((g) => g.dispose());
        computerSetup.materials.forEach((m) => m.dispose());
        computerSetup.textures.forEach((t) => t.dispose());
      }
      codeMeshes.forEach((cm) => {
        cm.geometry.dispose();
        (cm.material as THREE.Material).dispose();
      });
      if (codeInnerMesh) {
        codeInnerMesh.geometry.dispose();
        (codeInnerMesh.material as THREE.Material).dispose();
      }
      if (codeParticles) {
        codeParticles.geometry.dispose();
        (codeParticles.material as THREE.Material).dispose();
      }
      if (codeParticles2) {
        codeParticles2.geometry.dispose();
        (codeParticles2.material as THREE.Material).dispose();
      }
      renderer.dispose();
    };
  }, [mode]);

  const toggleWireframe = () => {
    const next = !wireframe;
    setWireframe(next);
    sceneRef.current?.setWireframe(next);
  };

  const handleReset = () => sceneRef.current?.resetRotation();

  const modeColor = mode === 'design' ? 'text-amber-300' : 'text-cyan-400';
  const modeLabel = mode === 'design' ? 'Studio Room & Workstation' : 'Engineering Core';
  const modeBg    = mode === 'design'
    ? 'from-amber-950/20 via-stone-900/10 to-transparent'
    : 'from-cyan-950/40 via-transparent to-transparent';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-line bg-bg-alt select-none">
      {/* Ambient gradient */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${modeBg}`} aria-hidden="true" />

      {/* 3D WebGL canvas container */}
      <div
        ref={containerRef}
        className="w-full h-[360px] sm:h-[430px] flex items-center justify-center active:cursor-grabbing"
      />

      {/* Top status bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <span className={`flex h-2 w-2 rounded-full animate-pulse ${mode === 'design' ? 'bg-amber-400' : 'bg-cyan-400'}`} />
          <span className={`text-[0.6875rem] uppercase tracking-wider ${modeColor} bg-bg/85 px-2.5 py-0.5 rounded-full border border-line/60 backdrop-blur`}>
            {modeLabel}
          </span>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="text-[0.6875rem] text-soft bg-bg/85 px-2.5 py-1 rounded-full border border-line/60 backdrop-blur flex items-center gap-1.5">
          <svg viewBox="0 0 16 16" className="h-3 w-3 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="5" />
            <path d="M8 3 L8 5 M8 11 L8 13 M3 8 L5 8 M11 8 L13 8" />
          </svg>
          <span>{isInteracting ? 'Exploring 3D Room…' : 'Drag to rotate room'}</span>
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleWireframe}
            className={`px-3 py-1 rounded-full text-[0.6875rem] font-medium transition-colors border ${
              wireframe
                ? (mode === 'design' ? 'bg-amber-600 text-white border-amber-600' : 'bg-cyan-600 text-white border-cyan-600')
                : 'bg-bg/85 text-soft hover:text-ink border-line/60'
            }`}
          >
            {wireframe ? 'Solid' : 'Architectural Wireframe'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1 rounded-full text-[0.6875rem] font-medium bg-bg/85 text-soft hover:text-ink border border-line/60 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
