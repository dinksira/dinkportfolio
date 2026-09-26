'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearAlpha(0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 80);

    // Particle constellation
    const particleCount = 70;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const maxDist = 26;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 110;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      velocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    // Colors according to theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const accentColor = new THREE.Color(isDark ? '#d47a32' : '#b8702f');
    const dotColor = new THREE.Color(isDark ? '#e6dfd5' : '#4a4237');

    const particleMat = new THREE.PointsMaterial({
      color: dotColor,
      size: 1.8,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
      blending: THREE.NormalBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Connecting lines
    const lineGeo = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: isDark ? 0.12 : 0.08,
      blending: THREE.NormalBlending,
    });
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    // Floating icosahedron wireframes
    const icoGeo1 = new THREE.IcosahedronGeometry(12, 1);
    const icoMat1 = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.06 : 0.04,
    });
    const ico1 = new THREE.Mesh(icoGeo1, icoMat1);
    ico1.position.set(38, 12, -20);
    scene.add(ico1);

    const icoGeo2 = new THREE.IcosahedronGeometry(8, 1);
    const ico2 = new THREE.Mesh(icoGeo2, icoMat1);
    ico2.position.set(-42, -18, -15);
    scene.add(ico2);

    // Mouse drift
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 12;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 8;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Watch theme change
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      particleMat.color.set(dark ? '#e6dfd5' : '#4a4237');
      particleMat.opacity = dark ? 0.35 : 0.25;
      lineMat.color.set(dark ? '#d47a32' : '#b8702f');
      lineMat.opacity = dark ? 0.12 : 0.08;
      icoMat1.color.set(dark ? '#d47a32' : '#b8702f');
      icoMat1.opacity = dark ? 0.06 : 0.04;
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;
        camera.position.x = targetX;
        camera.position.y = targetY;
        camera.lookAt(0, 0, 0);

        ico1.rotation.x += 0.0015;
        ico1.rotation.y += 0.002;
        ico2.rotation.x -= 0.002;
        ico2.rotation.z += 0.0015;

        // Update particle positions
        const pos = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3] += velocities[i].x;
          pos[i * 3 + 1] += velocities[i].y;
          pos[i * 3 + 2] += velocities[i].z;

          // Bounce off boundaries
          if (pos[i * 3] < -55 || pos[i * 3] > 55) velocities[i].x *= -1;
          if (pos[i * 3 + 1] < -45 || pos[i * 3 + 1] > 45) velocities[i].y *= -1;
          if (pos[i * 3 + 2] < -30 || pos[i * 3 + 2] > 30) velocities[i].z *= -1;
        }
        particleGeo.attributes.position.needsUpdate = true;

        // Dynamic lines between close particles
        const linePositions: number[] = [];
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < maxDist) {
              linePositions.push(
                pos[i * 3],
                pos[i * 3 + 1],
                pos[i * 3 + 2],
                pos[j * 3],
                pos[j * 3 + 1],
                pos[j * 3 + 2]
              );
            }
          }
        }
        lineGeo.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(linePositions, 3)
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      icoGeo1.dispose();
      icoGeo2.dispose();
      icoMat1.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div id="scene" ref={host} aria-hidden="true" />;
}
