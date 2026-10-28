import * as THREE from 'three';

export interface ComputerSetupResult {
  group: THREE.Group;
  materials: THREE.Material[];
  geometries: THREE.BufferGeometry[];
  textures: THREE.Texture[];
  lights: THREE.Light[];
  update: (time: number) => void;
  pcFans: THREE.Group[];
}

/**
 * Procedurally generates a warm European White Oak / Natural Blonde Wood floor
 * with distinct planks, realistic wood grain variations, and bevel seams.
 */
function createFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Warm honey/blonde base
  ctx.fillStyle = '#c5aa82';
  ctx.fillRect(0, 0, 1024, 1024);

  const plankHeight = 64;
  const numPlanks = 1024 / plankHeight;

  // Realistic natural oak variations across planks
  const plankTones = [
    '#cbb18d', '#d3b994', '#be9f76', '#caa983', '#d6be9c',
    '#c2a27b', '#ccb08c', '#bfa079', '#d1b691', '#c7a781',
    '#d5bc98', '#c09f78', '#cbaf8a', '#d8c09d', '#baa27a', '#cdae87'
  ];

  for (let i = 0; i < numPlanks; i++) {
    const y = i * plankHeight;
    ctx.fillStyle = plankTones[i % plankTones.length];
    ctx.fillRect(0, y, 1024, plankHeight - 2);

    // Subtle natural wood grain lines
    ctx.fillStyle = 'rgba(100, 70, 40, 0.07)';
    for (let g = 0; g < 4; g++) {
      ctx.fillRect(0, y + 10 + g * 12, 1024, 2);
    }

    // Bevel plank seam shadow
    ctx.fillStyle = '#6e5033';
    ctx.fillRect(0, y + plankHeight - 2, 1024, 2);

    // Staggered vertical end joints
    const shift = (i * 260) % 1024;
    for (let x = shift; x < 1024; x += 420) {
      ctx.fillStyle = '#6e5033';
      ctx.fillRect(x, y, 2, plankHeight - 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedurally generates a Scandinavian woven oatmeal / cream wool area rug
 */
function createRugTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Soft warm oat wool base
  ctx.fillStyle = '#e8e2d5';
  ctx.fillRect(0, 0, 512, 512);

  // Cross-weave boucle fabric texture
  ctx.fillStyle = 'rgba(180, 170, 155, 0.25)';
  for (let x = 0; x < 512; x += 8) {
    ctx.fillRect(x, 0, 4, 512);
  }
  ctx.fillStyle = 'rgba(150, 140, 125, 0.18)';
  for (let y = 0; y < 512; y += 8) {
    ctx.fillRect(0, y, 512, 4);
  }

  // Woven fringe border detail
  ctx.strokeStyle = '#c8bfb0';
  ctx.lineWidth = 12;
  ctx.strokeRect(10, 10, 492, 492);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedurally generates a realistic exterior window view (clear blue sky with soft clouds and lush treetops)
 */
function createWindowViewTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Soft natural daylight sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 512);
  skyGrad.addColorStop(0, '#60a5fa');  // bright daylight blue
  skyGrad.addColorStop(0.55, '#bae6fd'); // soft atmospheric haze
  skyGrad.addColorStop(1, '#f0fdf4');   // horizon glow
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Soft distant white clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.beginPath();
  ctx.arc(140, 120, 60, 0, Math.PI * 2);
  ctx.arc(200, 110, 80, 0, Math.PI * 2);
  ctx.arc(270, 125, 65, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(380, 180, 70, 0, Math.PI * 2);
  ctx.arc(430, 175, 50, 0, Math.PI * 2);
  ctx.fill();

  // Distant green treetops through lower window
  ctx.fillStyle = '#15803d';
  for (let t = 0; t < 12; t++) {
    ctx.beginPath();
    ctx.arc(30 + t * 45, 460 + (t % 3) * 15, 45, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#166534';
  for (let t = 0; t < 10; t++) {
    ctx.beginPath();
    ctx.arc(50 + t * 50, 480, 40, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedurally generates a modern Bauhaus exhibition poster in authentic primary/secondary colors
 */
function createArtPosterTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Gallery warm cream archival paper
  ctx.fillStyle = '#f8f6f0';
  ctx.fillRect(0, 0, 512, 720);

  // Bold geometric composition in classic Bauhaus primary colors
  // Ultramarine Blue arch
  ctx.fillStyle = '#1d4ed8';
  ctx.beginPath();
  ctx.arc(256, 270, 160, Math.PI, 0);
  ctx.fill();

  // Vermilion Red circle
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(310, 310, 95, 0, Math.PI * 2);
  ctx.fill();

  // Ochre Yellow accent wedge
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(140, 270);
  ctx.lineTo(260, 420);
  ctx.lineTo(140, 420);
  ctx.closePath();
  ctx.fill();

  // Matte Black graphic grid line
  ctx.fillStyle = '#18181b';
  ctx.fillRect(80, 450, 352, 4);

  // Museum typography
  ctx.fillStyle = '#18181b';
  ctx.font = '700 32px Helvetica, Arial, sans-serif';
  ctx.fillText('BAUHAUS', 80, 510);

  ctx.fillStyle = '#4b5563';
  ctx.font = '600 16px Helvetica, Arial, sans-serif';
  ctx.fillText('WEIMAR · 1923 — 2026', 80, 545);

  ctx.font = '400 13px Helvetica, Arial, sans-serif';
  ctx.fillText('Staatliches Bauhaus · Ausstellungsplakat', 80, 575);
  ctx.fillText('Kunst und Technik – eine neue Einheit', 80, 595);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedurally generates a high-resolution, realistic Figma design screen texture
 */
function createDesignScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Figma dark workspace
  ctx.fillStyle = '#1e1e22';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle dotted canvas grid
  ctx.fillStyle = '#2c2d33';
  for (let x = 240; x < 1040; x += 32) {
    for (let y = 56; y < 720; y += 32) {
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  }

  // Top Navigation & Toolbar
  ctx.fillStyle = '#27282e';
  ctx.fillRect(0, 0, canvas.width, 50);
  ctx.fillStyle = '#373840';
  ctx.fillRect(0, 49, canvas.width, 1);

  // macOS window control dots
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(24, 25, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(44, 25, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(64, 25, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f3f4f6';
  ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('❖  Dinksira Portfolio · Design System & Architecture', 96, 31);

  // Center Toolbar Tools
  const tools = ['✦ Select', '◫ Frame', '▢ Shape', '✎ Pen', 'T Text', '💬 Comment'];
  let toolX = 490;
  tools.forEach((t, i) => {
    if (i === 1) {
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.roundRect(toolX - 8, 11, 74, 28, 6);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.fillStyle = '#9ca3af';
    }
    ctx.font = '500 12px sans-serif';
    ctx.fillText(t, toolX, 29);
    toolX += 80;
  });

  // Right Top Actions
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.roundRect(1150, 11, 105, 28, 6);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 12px sans-serif';
  ctx.fillText('Share  ▶', 1178, 29);

  // Left Sidebar: Layers Panel
  ctx.fillStyle = '#222329';
  ctx.fillRect(0, 50, 230, 670);
  ctx.fillStyle = '#373840';
  ctx.fillRect(229, 50, 1, 670);

  ctx.fillStyle = '#9ca3af';
  ctx.font = '600 11px sans-serif';
  ctx.fillText('PAGES', 18, 76);
  ctx.fillStyle = '#f3f4f6';
  ctx.fillText('•  Mobile & Web App', 18, 98);
  ctx.fillStyle = '#9ca3af';
  ctx.fillText('•  Component Library', 18, 120);
  ctx.fillText('•  Color Tokens & Type', 18, 142);

  ctx.fillStyle = '#373840';
  ctx.fillRect(16, 160, 196, 1);

  ctx.fillStyle = '#9ca3af';
  ctx.fillText('LAYERS', 18, 184);

  const layers = [
    { icon: '◫', name: 'Mobile / Hero Screen', active: true },
    { icon: '◫', name: 'Balance Card Gradient', active: false },
    { icon: '◇', name: 'Interactive Graph', active: false },
    { icon: '◫', name: 'Quick Actions Row', active: false },
    { icon: '◫', name: 'Transaction History', active: false },
    { icon: '◇', name: 'Bottom Navigation Dock', active: false },
    { icon: '◫', name: 'Web Analytics Dashboard', active: false },
  ];

  layers.forEach((layer, i) => {
    const ly = 210 + i * 28;
    if (layer.active) {
      ctx.fillStyle = '#1e3a8a';
      ctx.beginPath();
      ctx.roundRect(8, ly - 16, 212, 24, 4);
      ctx.fill();
      ctx.fillStyle = '#93c5fd';
    } else {
      ctx.fillStyle = '#9ca3af';
    }
    ctx.font = '500 12px sans-serif';
    ctx.fillText(`${layer.icon}  ${layer.name}`, 18, ly);
  });

  // Center Artboard 1: Mobile UI Frame
  const artX = 330;
  const artY = 96;
  const artW = 280;
  const artH = 550;

  ctx.fillStyle = '#60a5fa';
  ctx.font = '600 12px sans-serif';
  ctx.fillText('📱 Mobile / Dashboard · 390 × 844', artX, artY - 14);

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(artX, artY, artW, artH, 36);
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Dynamic Island
  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.roundRect(artX + artW / 2 - 40, artY + 12, 80, 20, 10);
  ctx.fill();

  // Status Bar
  ctx.fillStyle = '#f8fafc';
  ctx.font = '600 10px sans-serif';
  ctx.fillText('9:41', artX + 24, artY + 26);
  ctx.fillText('5G ᯤ ■', artX + artW - 48, artY + 26);

  // Greeting
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 11px sans-serif';
  ctx.fillText('Welcome back,', artX + 22, artY + 68);
  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 18px sans-serif';
  ctx.fillText('Dinksira Elsa', artX + 22, artY + 92);

  // Colorful Hero Balance Card
  const cardGrad = ctx.createLinearGradient(artX + 18, artY + 116, artX + artW - 18, artY + 242);
  cardGrad.addColorStop(0, '#2563eb');  // Royal Blue
  cardGrad.addColorStop(0.5, '#7c3aed'); // Vivid Violet
  cardGrad.addColorStop(1, '#06b6d4');  // Bright Cyan
  ctx.fillStyle = cardGrad;
  ctx.beginPath();
  ctx.roundRect(artX + 18, artY + 116, artW - 36, 126, 18);
  ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = '500 11px sans-serif';
  ctx.fillText('Total Value Designed', artX + 34, artY + 144);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 24px sans-serif';
  ctx.fillText('$84,920.00', artX + 34, artY + 176);

  // White sparkline
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(artX + 34, artY + 216);
  ctx.bezierCurveTo(artX + 80, artY + 195, artX + 130, artY + 226, artX + 180, artY + 198);
  ctx.bezierCurveTo(artX + 210, artY + 180, artX + 230, artY + 190, artX + artW - 40, artY + 184);
  ctx.stroke();

  // Cyan Selection Frame with handles
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(artX + 16, artY + 114, artW - 32, 130);
  const handles = [
    [artX + 16, artY + 114], [artX + artW - 16, artY + 114],
    [artX + 16, artY + 244], [artX + artW - 16, artY + 244],
  ];
  ctx.fillStyle = '#ffffff';
  handles.forEach(([hx, hy]) => {
    ctx.fillRect(hx - 3, hy - 3, 6, 6);
    ctx.strokeRect(hx - 3, hy - 3, 6, 6);
  });

  // Action Buttons
  const actions = [
    { label: 'Send', icon: '↗', col: '#10b981' },
    { label: 'Receive', icon: '↙', col: '#3b82f6' },
    { label: 'Swap', icon: '⇄', col: '#a855f7' },
    { label: 'Stats', icon: '▥', col: '#f59e0b' },
  ];
  actions.forEach((act, i) => {
    const ax = artX + 24 + i * 60;
    const ay = artY + 266;
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(ax + 18, ay + 18, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = act.col;
    ctx.font = '16px sans-serif';
    ctx.fillText(act.icon, ax + 11, ay + 24);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 10px sans-serif';
    ctx.fillText(act.label, ax + 5, ay + 50);
  });

  // Recent Deployments
  ctx.fillStyle = '#f8fafc';
  ctx.font = '600 13px sans-serif';
  ctx.fillText('Recent Deployments', artX + 22, artY + 346);

  const txs = [
    { name: 'Portfolio 3D Core', time: 'Just now', val: 'Deployed', color: '#10b981' },
    { name: 'Interactive UI System', time: '2 hrs ago', val: 'Active', color: '#38bdf8' },
    { name: 'Flutter Mobile App', time: 'Yesterday', val: 'Live v2.4', color: '#a855f7' },
  ];
  txs.forEach((tx, i) => {
    const ty = artY + 372 + i * 44;
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(artX + 18, ty - 12, artW - 36, 36, 10);
    ctx.fill();

    ctx.fillStyle = tx.color;
    ctx.beginPath();
    ctx.arc(artX + 34, ty + 6, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f8fafc';
    ctx.font = '600 11px sans-serif';
    ctx.fillText(tx.name, artX + 50, ty + 6);

    ctx.fillStyle = '#64748b';
    ctx.font = '400 9px sans-serif';
    ctx.fillText(tx.time, artX + 50, ty + 18);

    ctx.fillStyle = tx.color;
    ctx.font = '600 10px sans-serif';
    ctx.fillText(tx.val, artX + artW - 74, ty + 10);
  });

  // Center Artboard 2: Web Analytics Dashboard
  const webX = 660;
  const webY = 110;
  const webW = 340;
  const webH = 470;

  ctx.fillStyle = '#38bdf8';
  ctx.font = '600 12px sans-serif';
  ctx.fillText('💻 Web Dashboard · 1440 × 900', webX, webY - 14);

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(webX, webY, webW, webH, 16);
  ctx.fill();
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Web Browser Bar
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(webX, webY, webW, 28);
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.roundRect(webX + 40, webY + 5, webW - 80, 18, 9);
  ctx.fill();
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 9px sans-serif';
  ctx.fillText('https://dinksira.dev/dashboard', webX + 70, webY + 17);

  // Line chart in web preview
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(webX + 30, webY + 160);
  ctx.lineTo(webX + 80, webY + 130);
  ctx.lineTo(webX + 140, webY + 150);
  ctx.lineTo(webX + 200, webY + 95);
  ctx.lineTo(webX + 260, webY + 115);
  ctx.lineTo(webX + 310, webY + 80);
  ctx.stroke();

  // Vibrant chart bars
  const barColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
  for (let b = 0; b < 6; b++) {
    const bx = webX + 24 + b * 50;
    ctx.fillStyle = barColors[b];
    ctx.fillRect(bx, webY + 210, 36, 75 + (b * 14) % 45);
  }

  // Right Sidebar: Inspector Properties
  ctx.fillStyle = '#222329';
  ctx.fillRect(1040, 50, 240, 670);
  ctx.fillStyle = '#373840';
  ctx.fillRect(1040, 50, 1, 670);

  ctx.fillStyle = '#f3f4f6';
  ctx.font = '600 12px sans-serif';
  ctx.fillText('Design', 1060, 78);
  ctx.fillStyle = '#9ca3af';
  ctx.fillText('Prototype', 1130, 78);
  ctx.fillText('Inspect', 1210, 78);

  ctx.fillStyle = '#2563eb';
  ctx.fillRect(1058, 86, 44, 2);

  const props = [
    { title: 'FRAME', lines: ['W: 390', 'H: 844', 'X: 330', 'Y: 96'] },
    { title: 'CORNER RADIUS', lines: ['36px  (Smooth iOS Curve)'] },
    { title: 'FILL', lines: ['Linear #2563EB → #06B6D4', '100% Solid'] },
    { title: 'EFFECTS', lines: ['Elevation 3 (Soft Ambient Shadow)'] },
    { title: 'EXPORT', lines: ['SVG Vector · 2x Retina PNG'] },
  ];

  props.forEach((p, idx) => {
    const py = 116 + idx * 72;
    ctx.fillStyle = '#9ca3af';
    ctx.font = '600 10px sans-serif';
    ctx.fillText(p.title, 1060, py);

    p.lines.forEach((line, li) => {
      ctx.fillStyle = '#e5e7eb';
      ctx.font = '500 11px sans-serif';
      ctx.fillText(line, 1060, py + 18 + li * 16);
    });

    if (p.title === 'FILL') {
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.roundRect(1210, py + 6, 20, 20, 4);
      ctx.fill();
    }
    ctx.fillStyle = '#373840';
    ctx.fillRect(1060, py + 56, 200, 1);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

/**
 * Builds the complete realistic 3D Room & Workstation with authentic real-world materials:
 * - Natural blonde oak hardwood plank floor (warm honey tones)
 * - Cream Scandinavian wool woven area rug
 * - Architectural warm off-white / greige wall providing bright natural daylight bounce
 * - Authentic American Walnut acoustic wood slat accent wall with dark charcoal felt backing
 * - Large architectural loft window with real exterior sky, clouds, and lush green treetops
 * - Heavy solid walnut butcher-block desk with beveled chamfer & motorized black steel legs
 * - Saddle tan leather desk pad with perimeter saddle stitching
 * - Iconic Yamaha HS-style studio monitors (matte black cabinets with striking pure white cone woofers!)
 * - Custom mechanical keyboard in classic retro cream/slate with terracotta accent keycaps
 * - Herman Miller style ergonomic chair in breathable light silver-gray mesh with polished chrome base
 * - Floating walnut shelf with authentic Bauhaus poster, colorful books, and warm ambient light
 * - Ceramic speckled stoneware coffee mug with rich dark coffee
 * - Real terracotta succulent pot & lush variegated green Monstera plant
 * - Authentic daylight & warm task lighting (no muddy monotone purple wash!)
 */
export function createComputerSetup(): ComputerSetupResult {
  const group = new THREE.Group();
  const materials: THREE.Material[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const textures: THREE.Texture[] = [];
  const lights: THREE.Light[] = [];
  const pcFans: THREE.Group[] = [];

  const trackMat = <T extends THREE.Material>(m: T): T => {
    materials.push(m);
    return m;
  };
  const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    geometries.push(g);
    return g;
  };

  // ── 0. PROCEDURAL TEXTURES ─────────────────────────────────────────
  const floorTex = createFloorTexture();
  textures.push(floorTex);

  const rugTex = createRugTexture();
  textures.push(rugTex);

  const windowTex = createWindowViewTexture();
  textures.push(windowTex);

  const artTex = createArtPosterTexture();
  textures.push(artTex);

  const screenTex = createDesignScreenTexture();
  textures.push(screenTex);

  // ── 1. AUTHENTIC REALISTIC MATERIALS PALETTE ───────────────────────
  // Warm American Walnut Wood (rich golden-brown amber tones)
  const walnutWoodMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x5c3d24,
      roughness: 0.38,
      metalness: 0.05,
    })
  );

  // Architectural Warm Greige / Off-White Wall (reflects daylight beautifully)
  const wallPaintMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xe8e4dc,
      roughness: 0.88,
      metalness: 0.02,
    })
  );

  // Acoustic Charcoal Soundproof Felt Backing
  const feltBackingMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x222226,
      roughness: 0.95,
      metalness: 0.02,
    })
  );

  // Blonde Oak Floor
  const floorMat = trackMat(
    new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.32,
      metalness: 0.1,
    })
  );

  // Cream Wool Rug
  const rugMat = trackMat(
    new THREE.MeshStandardMaterial({
      map: rugTex,
      roughness: 0.92,
      metalness: 0.02,
    })
  );

  // Saddle Tan Luxury Leather Desk Pad
  const leatherMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x8a522d,
      roughness: 0.55,
      metalness: 0.08,
    })
  );

  // Architectural Matte Black Steel (Desk frame, window frame, chassis)
  const blackSteelMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x1f2024,
      roughness: 0.35,
      metalness: 0.75,
    })
  );

  // Polished Chrome / Cast Aluminum (Chair base, hardware, hinges)
  const chromeMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.12,
      metalness: 0.95,
    })
  );

  // Anodized Silver Aluminum (Monitor arm, ScreenBar)
  const silverAlumMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xcfd4dc,
      roughness: 0.25,
      metalness: 0.85,
    })
  );

  // Terracotta Ceramic (Succulent pot, warm decor)
  const terracottaMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xc86438,
      roughness: 0.65,
      metalness: 0.05,
    })
  );

  // Speckled Oatmeal Stoneware Ceramic (Coffee mug)
  const stonewareMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xf1ece1,
      roughness: 0.25,
      metalness: 0.05,
    })
  );

  // Pure White Polypropylene (Yamaha style studio monitor cones)
  const whiteConeMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.2,
      metalness: 0.1,
    })
  );

  // Lush Botanical Green (Plant leaves)
  const monsteraLeafMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.35,
      metalness: 0.05,
    })
  );

  // Ergonomic Chair Mesh (Light Slate / Mineral Gray)
  const chairMeshMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.6,
      metalness: 0.2,
    })
  );

  // ── 2. ROOM ARCHITECTURE (Floor, Walls, Window, Rug) ───────────────
  const roomFloorY = -4.8;

  // Hardwood Plank Floor
  const floorGeo = trackGeo(new THREE.BoxGeometry(34, 0.4, 30));
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.position.set(0, roomFloorY - 0.2, 0);
  group.add(floorMesh);

  // Cream Scandinavian Wool Rug
  const rugGeo = trackGeo(new THREE.BoxGeometry(23, 0.08, 19));
  const rugMesh = new THREE.Mesh(rugGeo, rugMat);
  rugMesh.position.set(0, roomFloorY + 0.04, 1.5);
  group.add(rugMesh);

  // Back Wall (Warm Greige)
  const backWallGeo = trackGeo(new THREE.BoxGeometry(34, 24, 0.8));
  const backWall = new THREE.Mesh(backWallGeo, wallPaintMat);
  backWall.position.set(0, roomFloorY + 12, -9.6);
  group.add(backWall);

  // Left Wall (Warm Greige with Window Opening)
  const leftWallGeo = trackGeo(new THREE.BoxGeometry(0.8, 24, 30));
  const leftWall = new THREE.Mesh(leftWallGeo, wallPaintMat);
  leftWall.position.set(-16.6, roomFloorY + 12, 0);
  group.add(leftWall);

  // Architectural Baseboards (Satin Warm Charcoal)
  const baseboardGeo = trackGeo(new THREE.BoxGeometry(34, 0.8, 0.2));
  const baseboard = new THREE.Mesh(baseboardGeo, blackSteelMat);
  baseboard.position.set(0, roomFloorY + 0.4, -9.1);
  group.add(baseboard);

  // ── Acoustic Walnut Slat Accent Wall (Behind Desk) ─────────────────
  const feltBackingGeo = trackGeo(new THREE.BoxGeometry(24, 18, 0.2));
  const feltBacking = new THREE.Mesh(feltBackingGeo, feltBackingMat);
  feltBacking.position.set(0, roomFloorY + 10, -9.1);
  group.add(feltBacking);

  // 32 3D American Walnut Slats
  const slatGeo = trackGeo(new THREE.BoxGeometry(0.38, 18, 0.25));
  for (let s = 0; s < 32; s++) {
    const slatMesh = new THREE.Mesh(slatGeo, walnutWoodMat);
    const slatX = -11.4 + s * 0.74;
    slatMesh.position.set(slatX, roomFloorY + 10, -8.9);
    group.add(slatMesh);
  }

  // ── Industrial Loft Window with Real Exterior Daylight View ────────
  const windowGroup = new THREE.Group();
  windowGroup.position.set(-16.1, roomFloorY + 10.5, -0.5);
  group.add(windowGroup);

  // Exterior view backdrop plane (blue sky, clouds, green trees)
  const windowViewGeo = trackGeo(new THREE.PlaneGeometry(13.4, 11.4));
  const windowViewMat = trackMat(
    new THREE.MeshBasicMaterial({ map: windowTex })
  );
  const windowView = new THREE.Mesh(windowViewGeo, windowViewMat);
  windowView.rotation.y = Math.PI / 2;
  windowView.position.set(-0.2, 0, 0);
  windowGroup.add(windowView);

  // Black Steel Outer Frame
  const winFrameGeo = trackGeo(new THREE.BoxGeometry(0.3, 14, 12));
  const winFrame = new THREE.Mesh(winFrameGeo, blackSteelMat);
  windowGroup.add(winFrame);

  // Clear Window Glass Pane
  const winGlassGeo = trackGeo(new THREE.BoxGeometry(0.06, 13.4, 11.4));
  const winGlassMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      roughness: 0.05,
      metalness: 0.1,
    })
  );
  const winGlass = new THREE.Mesh(winGlassGeo, winGlassMat);
  windowGroup.add(winGlass);

  // Window Steel Grid Mullions
  for (let g = -1; g <= 1; g++) {
    const mullionVGeo = trackGeo(new THREE.BoxGeometry(0.35, 13.4, 0.15));
    const mullionV = new THREE.Mesh(mullionVGeo, blackSteelMat);
    mullionV.position.set(0, 0, g * 3.5);
    windowGroup.add(mullionV);

    const mullionHGeo = trackGeo(new THREE.BoxGeometry(0.35, 0.15, 11.4));
    const mullionH = new THREE.Mesh(mullionHGeo, blackSteelMat);
    mullionH.position.set(0, g * 4.0, 0);
    windowGroup.add(mullionH);
  }

  // ── Floating Walnut Shelf & Curated Decor ──────────────────────────
  const shelfGroup = new THREE.Group();
  shelfGroup.position.set(0, 7.8, -8.5);
  group.add(shelfGroup);

  const shelfGeo = trackGeo(new THREE.BoxGeometry(18, 0.35, 2.2));
  const shelfMesh = new THREE.Mesh(shelfGeo, walnutWoodMat);
  shelfGroup.add(shelfMesh);

  // Warm LED Under-Shelf Task Strip (2800K warm incandescent glow)
  const shelfLightBarGeo = trackGeo(new THREE.BoxGeometry(17.4, 0.06, 0.1));
  const shelfLightBarMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xffe4b5,
      emissiveIntensity: 2.4,
    })
  );
  const shelfLightBar = new THREE.Mesh(shelfLightBarGeo, shelfLightBarMat);
  shelfLightBar.position.set(0, -0.2, 0.8);
  shelfGroup.add(shelfLightBar);

  // Framed Bauhaus Exhibition Print (Red, Blue, Yellow, Cream)
  const frameGeo = trackGeo(new THREE.BoxGeometry(3.8, 5.2, 0.2));
  const frameMesh = new THREE.Mesh(frameGeo, blackSteelMat);
  frameMesh.position.set(-5.4, 2.8, 0.2);
  frameMesh.rotation.y = 0.06;
  shelfGroup.add(frameMesh);

  const artPrintGeo = trackGeo(new THREE.PlaneGeometry(3.4, 4.8));
  const artPrintMat = trackMat(
    new THREE.MeshStandardMaterial({ map: artTex, roughness: 0.35 })
  );
  const artPrint = new THREE.Mesh(artPrintGeo, artPrintMat);
  artPrint.position.set(0, 0, 0.12);
  frameMesh.add(artPrint);

  // Curated Design Books on Shelf (Forest green, terracotta, navy, mustard)
  const bookColors = [0x15803d, 0xc2410c, 0x1d4ed8, 0xd97706];
  bookColors.forEach((col, idx) => {
    const bookGeo = trackGeo(new THREE.BoxGeometry(0.42, 1.8 + (idx % 2) * 0.4, 1.4));
    const bookMat = trackMat(
      new THREE.MeshStandardMaterial({ color: col, roughness: 0.55 })
    );
    const bookMesh = new THREE.Mesh(bookGeo, bookMat);
    bookMesh.position.set(2.4 + idx * 0.48, 1.1, 0.2);
    shelfGroup.add(bookMesh);
  });

  // Warm Ceramic Opal Globe Lamp on Shelf
  const globeGeo = trackGeo(new THREE.SphereGeometry(0.65, 20, 20));
  const globeMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      emissive: 0xfef3c7,
      emissiveIntensity: 2.2,
      roughness: 0.15,
    })
  );
  const globeMesh = new THREE.Mesh(globeGeo, globeMat);
  globeMesh.position.set(6.2, 0.85, 0.3);
  shelfGroup.add(globeMesh);

  // ── 3. THE DESK & SADDLE TAN LEATHER MAT ────────────────────────────
  const deskWidth = 22;
  const deskHeight = 0.9;
  const deskDepth = 11;
  const deskY = -0.4;

  // Solid American Walnut Butcher-Block Desk Top
  const deskGeo = trackGeo(new THREE.BoxGeometry(deskWidth, deskHeight, deskDepth));
  const deskMesh = new THREE.Mesh(deskGeo, walnutWoodMat);
  deskMesh.position.set(0, deskY, -1.0);
  group.add(deskMesh);

  // Front Chamfered Edge
  const deskBevelGeo = trackGeo(new THREE.BoxGeometry(deskWidth, 0.15, 0.08));
  const deskBevel = new THREE.Mesh(deskBevelGeo, blackSteelMat);
  deskBevel.position.set(0, deskY - 0.35, 4.54);
  group.add(deskBevel);

  // Motorized Dual-Stage Matte Black Steel Desk Legs
  const legGeo = trackGeo(new THREE.BoxGeometry(1.2, 4.0, 1.6));
  const footGeo = trackGeo(new THREE.BoxGeometry(1.4, 0.25, 8.5));

  const leftLeg = new THREE.Mesh(legGeo, blackSteelMat);
  leftLeg.position.set(-8.6, roomFloorY + 2.0, -1.0);
  group.add(leftLeg);

  const leftFoot = new THREE.Mesh(footGeo, blackSteelMat);
  leftFoot.position.set(-8.6, roomFloorY + 0.15, -1.0);
  group.add(leftFoot);

  const rightLeg = new THREE.Mesh(legGeo, blackSteelMat);
  rightLeg.position.set(8.6, roomFloorY + 2.0, -1.0);
  group.add(rightLeg);

  const rightFoot = new THREE.Mesh(footGeo, blackSteelMat);
  rightFoot.position.set(8.6, roomFloorY + 0.15, -1.0);
  group.add(rightFoot);

  // Saddle Tan Luxury Leather Desk Pad
  const padGeo = trackGeo(new THREE.BoxGeometry(15, 0.06, 7.2));
  const padMesh = new THREE.Mesh(padGeo, leatherMat);
  padMesh.position.set(0, deskY + deskHeight / 2 + 0.03, 0.2);
  group.add(padMesh);

  // White saddle-stitch perimeter border
  const stitchGeo = trackGeo(new THREE.BoxGeometry(15.08, 0.04, 0.06));
  const stitchMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.6 })
  );
  const stitchMesh = new THREE.Mesh(stitchGeo, stitchMat);
  stitchMesh.position.set(0, deskY + deskHeight / 2 + 0.04, 3.8);
  group.add(stitchMesh);

  // ── 4. ERGONOMIC CHAIR (Herman Miller Style Mineral Gray) ───────────
  const chairGroup = new THREE.Group();
  chairGroup.position.set(0, roomFloorY + 0.2, 5.4);
  chairGroup.rotation.y = 0.18;
  group.add(chairGroup);

  // 5-Star Polished Chrome Base
  for (let c = 0; c < 5; c++) {
    const cAngle = (c / 5) * Math.PI * 2;
    const legSpokeGeo = trackGeo(new THREE.BoxGeometry(0.25, 0.2, 1.8));
    const legSpoke = new THREE.Mesh(legSpokeGeo, chromeMat);
    legSpoke.rotation.y = cAngle;
    legSpoke.position.set(Math.sin(cAngle) * 0.9, 0.2, Math.cos(cAngle) * 0.9);
    chairGroup.add(legSpoke);

    const wheelGeo = trackGeo(new THREE.CylinderGeometry(0.18, 0.18, 0.16, 12));
    const wheelMesh = new THREE.Mesh(wheelGeo, blackSteelMat);
    wheelMesh.rotation.z = Math.PI / 2;
    wheelMesh.position.set(Math.sin(cAngle) * 1.8, 0.15, Math.cos(cAngle) * 1.8);
    chairGroup.add(wheelMesh);
  }

  // Chrome Hydraulic Piston
  const pistonGeo = trackGeo(new THREE.CylinderGeometry(0.3, 0.3, 1.6, 16));
  const pistonMesh = new THREE.Mesh(pistonGeo, chromeMat);
  pistonMesh.position.set(0, 1.0, 0);
  chairGroup.add(pistonMesh);

  // Mineral Gray Seat Cushion
  const seatGeo = trackGeo(new THREE.BoxGeometry(3.6, 0.45, 3.6));
  const seatMesh = new THREE.Mesh(seatGeo, chairMeshMat);
  seatMesh.position.set(0, 1.9, 0);
  chairGroup.add(seatMesh);

  // Breathable Ergonomic Mesh Backrest
  const backrestGeo = trackGeo(new THREE.BoxGeometry(3.4, 4.2, 0.35));
  const backrestMesh = new THREE.Mesh(backrestGeo, chairMeshMat);
  backrestMesh.position.set(0, 4.0, 1.7);
  backrestMesh.rotation.x = -0.12;
  chairGroup.add(backrestMesh);

  // Polished Chrome Lumbar Spine on Back
  const spineGeo = trackGeo(new THREE.BoxGeometry(0.4, 3.8, 0.4));
  const spineMesh = new THREE.Mesh(spineGeo, chromeMat);
  spineMesh.position.set(0, 3.8, 2.0);
  spineMesh.rotation.x = -0.12;
  chairGroup.add(spineMesh);

  // Adjustable Armrests with Matte Black Pads
  [-1.9, 1.9].forEach((armX) => {
    const armStemGeo = trackGeo(new THREE.BoxGeometry(0.2, 1.6, 0.3));
    const armStem = new THREE.Mesh(armStemGeo, chromeMat);
    armStem.position.set(armX, 2.7, 0.2);
    chairGroup.add(armStem);

    const armPadGeo = trackGeo(new THREE.BoxGeometry(0.55, 0.14, 1.8));
    const armPad = new THREE.Mesh(armPadGeo, blackSteelMat);
    armPad.position.set(armX, 3.5, 0.2);
    chairGroup.add(armPad);
  });

  // ── 5. ULTRAWIDE MONITOR & SCREENBAR LIGHT ─────────────────────────
  const monitorWidth = 12.8;
  const monitorHeight = 6.2;
  const monitorDepth = 0.42;

  // Thin Bezel Matte Black Frame
  const monitorBodyGeo = trackGeo(new THREE.BoxGeometry(monitorWidth, monitorHeight, monitorDepth));
  const monitorBody = new THREE.Mesh(monitorBodyGeo, blackSteelMat);
  monitorBody.position.set(0, deskY + deskHeight / 2 + 4.1, -2.4);
  monitorBody.rotation.x = -0.04;
  group.add(monitorBody);

  // Active Screen Panel with Dynamic Figma UI
  const screenFaceGeo = trackGeo(new THREE.PlaneGeometry(monitorWidth - 0.28, monitorHeight - 0.32));
  const screenFaceMat = trackMat(
    new THREE.MeshStandardMaterial({
      map: screenTex,
      emissiveMap: screenTex,
      emissive: 0xffffff,
      emissiveIntensity: 0.95,
      roughness: 0.1,
      metalness: 0.05,
    })
  );
  const screenFace = new THREE.Mesh(screenFaceGeo, screenFaceMat);
  screenFace.position.set(0, 0, monitorDepth / 2 + 0.01);
  monitorBody.add(screenFace);

  // Anodized Silver Monitor Stand & Heavy Base
  const standBaseGeo = trackGeo(new THREE.BoxGeometry(3.6, 0.16, 2.4));
  const standBase = new THREE.Mesh(standBaseGeo, silverAlumMat);
  standBase.position.set(0, deskY + deskHeight / 2 + 0.08, -2.4);
  group.add(standBase);

  const standArmGeo = trackGeo(new THREE.BoxGeometry(0.75, 4.2, 0.5));
  const standArm = new THREE.Mesh(standArmGeo, silverAlumMat);
  standArm.position.set(0, deskY + deskHeight / 2 + 2.1, -2.6);
  group.add(standArm);

  // Mounted ScreenBar Desk Light (Brushed Aluminum)
  const screenBarGeo = trackGeo(new THREE.CylinderGeometry(0.14, 0.14, 9.6, 24));
  const screenBar = new THREE.Mesh(screenBarGeo, silverAlumMat);
  screenBar.rotation.z = Math.PI / 2;
  screenBar.position.set(0, monitorHeight / 2 + 0.22, 0.2);
  monitorBody.add(screenBar);

  const barDiffuserGeo = trackGeo(new THREE.BoxGeometry(9.2, 0.04, 0.1));
  const barDiffuserMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xffedd5,
      emissiveIntensity: 2.0,
      roughness: 0.1,
    })
  );
  const barDiffuser = new THREE.Mesh(barDiffuserGeo, barDiffuserMat);
  barDiffuser.position.set(0, -0.12, 0);
  screenBar.add(barDiffuser);

  // ── 6. WORKSTATION PC TOWER (Right Desk) ───────────────────────────
  const pcGroup = new THREE.Group();
  pcGroup.position.set(8.2, deskY + deskHeight / 2 + 3.7, -1.2);
  group.add(pcGroup);

  const pcWidth = 3.6;
  const pcHeight = 7.4;
  const pcDepth = 6.8;

  // Modern Matte White & Titanium Chassis (provides stunning contrast!)
  const pcWhiteChassisGeo = trackGeo(new THREE.BoxGeometry(pcWidth, pcHeight, pcDepth));
  const pcWhiteChassisMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.35,
      metalness: 0.15,
    })
  );
  const pcChassis = new THREE.Mesh(pcWhiteChassisGeo, pcWhiteChassisMat);
  pcGroup.add(pcChassis);

  // Front Fine Intake Mesh (Satin Charcoal)
  const frontMeshGeo = trackGeo(new THREE.BoxGeometry(pcWidth - 0.2, pcHeight - 0.4, 0.08));
  const frontMesh = new THREE.Mesh(frontMeshGeo, blackSteelMat);
  frontMesh.position.set(0, 0, pcDepth / 2 + 0.05);
  pcGroup.add(frontMesh);

  // 3x Front Intake Fan Rings with clean ice-cyan glow
  for (let f = 0; f < 3; f++) {
    const fanRingGeo = trackGeo(new THREE.TorusGeometry(0.9, 0.06, 16, 32));
    const fanRingMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 1.8,
      })
    );
    const fanRing = new THREE.Mesh(fanRingGeo, fanRingMat);
    fanRing.position.set(0, -2.0 + f * 2.0, pcDepth / 2 - 0.1);
    pcGroup.add(fanRing);
  }

  // Tempered Clear Glass Left Side Panel
  const glassPanelGeo = trackGeo(new THREE.BoxGeometry(0.06, pcHeight - 0.3, pcDepth - 0.4));
  const glassPanelMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.35,
    })
  );
  const glassPanel = new THREE.Mesh(glassPanelGeo, glassPanelMat);
  glassPanel.position.set(-pcWidth / 2 - 0.02, 0, 0);
  pcGroup.add(glassPanel);

  // Dedicated Performance Graphics Card (Brushed Aluminum Shroud)
  const gpuGeo = trackGeo(new THREE.BoxGeometry(1.6, 0.9, 4.2));
  const gpuMesh = new THREE.Mesh(gpuGeo, silverAlumMat);
  gpuMesh.position.set(0.2, -0.4, 0.2);
  pcGroup.add(gpuMesh);

  const gpuLightGeo = trackGeo(new THREE.BoxGeometry(0.06, 0.15, 3.6));
  const gpuLightMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0ea5e9,
      emissiveIntensity: 2.2,
    })
  );
  const gpuLight = new THREE.Mesh(gpuLightGeo, gpuLightMat);
  gpuLight.position.set(-0.84, 0.1, 0.2);
  pcGroup.add(gpuLight);

  // GPU Dual Fans
  for (let gf = 0; gf < 2; gf++) {
    const fanGroup = new THREE.Group();
    fanGroup.position.set(0.1, -0.46, -0.9 + gf * 2.2);

    const gRingGeo = trackGeo(new THREE.TorusGeometry(0.65, 0.04, 12, 24));
    const gRingMesh = new THREE.Mesh(gRingGeo, blackSteelMat);
    gRingMesh.rotation.x = Math.PI / 2;
    fanGroup.add(gRingMesh);

    for (let b = 0; b < 7; b++) {
      const bladeGeo = trackGeo(new THREE.BoxGeometry(0.5, 0.02, 0.14));
      const bladeMesh = new THREE.Mesh(bladeGeo, blackSteelMat);
      bladeMesh.rotation.y = (b / 7) * Math.PI * 2;
      fanGroup.add(bladeMesh);
    }
    pcGroup.add(fanGroup);
    pcFans.push(fanGroup);
  }

  // CPU Liquid AIO Cooler with Pure White Infinity Mirror Ring
  const aioBlockGeo = trackGeo(new THREE.CylinderGeometry(0.6, 0.6, 0.5, 24));
  const aioBlock = new THREE.Mesh(aioBlockGeo, blackSteelMat);
  aioBlock.rotation.z = Math.PI / 2;
  aioBlock.position.set(pcWidth / 2 - 0.55, 1.2, -0.4);
  pcGroup.add(aioBlock);

  const aioRingGeo = trackGeo(new THREE.TorusGeometry(0.48, 0.05, 16, 32));
  const aioRingMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      emissive: 0xffffff,
      emissiveIntensity: 2.4,
    })
  );
  const aioRing = new THREE.Mesh(aioRingGeo, aioRingMat);
  aioRing.rotation.y = Math.PI / 2;
  aioRing.position.set(-0.28, 0, 0);
  aioBlock.add(aioRing);

  // RGB RAM Sticks (Dual Corsair Style with Amber/Gold & Cyan accents)
  for (let r = 0; r < 2; r++) {
    const ramGeo = trackGeo(new THREE.BoxGeometry(0.12, 1.1, 0.7));
    const ramMesh = new THREE.Mesh(ramGeo, silverAlumMat);
    ramMesh.position.set(pcWidth / 2 - 0.45, 1.3, 0.6 + r * 0.35);
    pcGroup.add(ramMesh);

    const ramLightGeo = trackGeo(new THREE.BoxGeometry(0.14, 0.15, 0.72));
    const ramLightMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: r === 0 ? 0xf59e0b : 0x06b6d4,
        emissive: r === 0 ? 0xd97706 : 0x0891b2,
        emissiveIntensity: 2.0,
      })
    );
    const ramLight = new THREE.Mesh(ramLightGeo, ramLightMat);
    ramLight.position.set(0, 0.58, 0);
    ramMesh.add(ramLight);
  }

  // ── 7. ENTHUSIAST CUSTOM KEYBOARD & ERGONOMIC MOUSE ────────────────
  const kbGroup = new THREE.Group();
  kbGroup.position.set(-0.6, deskY + deskHeight / 2 + 0.22, 1.4);
  kbGroup.rotation.x = 0.08;
  group.add(kbGroup);

  const kbWidth = 7.4;
  const kbHeight = 0.36;
  const kbDepth = 2.8;

  // Solid Anodized Charcoal Aluminum Case
  const kbCaseGeo = trackGeo(new THREE.BoxGeometry(kbWidth, kbHeight, kbDepth));
  const kbCase = new THREE.Mesh(kbCaseGeo, blackSteelMat);
  kbGroup.add(kbCase);

  // Soft Warm White Underglow Diffuser
  const kbGlowGeo = trackGeo(new THREE.BoxGeometry(kbWidth + 0.06, 0.06, kbDepth + 0.06));
  const kbGlowMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xfef3c7,
      emissiveIntensity: 1.2,
    })
  );
  const kbGlow = new THREE.Mesh(kbGlowGeo, kbGlowMat);
  kbGlow.position.set(0, -0.12, 0);
  kbGroup.add(kbGlow);

  // Keycap Materials (Classic GMK 9009 / Botanical Palette)
  // Alphas: Warm Retro Cream
  const keyMatCream = trackMat(
    new THREE.MeshStandardMaterial({ color: 0xe5e0d8, roughness: 0.45 })
  );
  // Modifiers: Dark Slate Charcoal
  const keyMatSlate = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45 })
  );
  // Accent Keycaps: Terracotta / Persimmon (Enter & Esc)
  const keyMatTerracotta = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xc2410c,
      roughness: 0.35,
      emissive: 0x9a3412,
      emissiveIntensity: 0.4,
    })
  );

  const rows = 5;
  const cols = 15;
  const keyW = (kbWidth - 0.7) / cols;
  const keyD = (kbDepth - 0.5) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Spacebar
      if (r === 4 && c >= 4 && c <= 9) {
        if (c === 4) {
          const spaceGeo = trackGeo(new THREE.BoxGeometry(keyW * 5.8, 0.16, keyD * 0.9));
          const spaceMesh = new THREE.Mesh(spaceGeo, keyMatCream);
          spaceMesh.position.set(
            -kbWidth / 2 + 0.4 + 6.5 * keyW,
            kbHeight / 2 + 0.08,
            -kbDepth / 2 + 0.3 + r * keyD
          );
          kbGroup.add(spaceMesh);
        }
        continue;
      }

      // Keycap colors
      let km = keyMatCream;
      if (r === 0 && c === 0) km = keyMatTerracotta; // ESC
      else if (r === 2 && c === cols - 1) km = keyMatTerracotta; // ENTER
      else if (c === 0 || c === cols - 1 || r === 4) km = keyMatSlate; // Modifiers

      const singleKeyGeo = trackGeo(new THREE.BoxGeometry(keyW * 0.88, 0.16, keyD * 0.88));
      const keyMesh = new THREE.Mesh(singleKeyGeo, km);
      keyMesh.position.set(
        -kbWidth / 2 + 0.38 + c * keyW,
        kbHeight / 2 + 0.08,
        -kbDepth / 2 + 0.28 + r * keyD
      );
      kbGroup.add(keyMesh);
    }
  }

  // Ergonomic Designer Mouse (Matte Slate with Chrome Scroll Wheel)
  const mouseGroup = new THREE.Group();
  mouseGroup.position.set(4.6, deskY + deskHeight / 2 + 0.2, 1.4);
  mouseGroup.rotation.y = -0.12;
  group.add(mouseGroup);

  const mouseBodyGeo = trackGeo(new THREE.BoxGeometry(1.6, 0.65, 2.8));
  const mouseBody = new THREE.Mesh(mouseBodyGeo, blackSteelMat);
  mouseGroup.add(mouseBody);

  const wheelGeo = trackGeo(new THREE.CylinderGeometry(0.2, 0.2, 0.16, 20));
  const wheelMesh = new THREE.Mesh(wheelGeo, chromeMat);
  wheelMesh.rotation.z = Math.PI / 2;
  wheelMesh.position.set(0, 0.32, -0.6);
  mouseGroup.add(wheelMesh);

  // ── 8. ICONIC YAMAHA HS-STYLE STUDIO MONITORS (Left & Right) ──────
  const createYamahaSpeaker = (x: number, z: number, rotY: number) => {
    const spkGroup = new THREE.Group();
    spkGroup.position.set(x, deskY + deskHeight / 2 + 2.1, z);
    spkGroup.rotation.y = rotY;

    // Matte Black MDF Acoustic Cabinet
    const spkBodyGeo = trackGeo(new THREE.BoxGeometry(2.4, 4.2, 2.4));
    const spkBody = new THREE.Mesh(spkBodyGeo, blackSteelMat);
    spkGroup.add(spkBody);

    // Front Baffle
    const baffleGeo = trackGeo(new THREE.BoxGeometry(2.2, 4.0, 0.1));
    const baffleMesh = new THREE.Mesh(baffleGeo, blackSteelMat);
    baffleMesh.position.set(0, 0, 1.25);
    spkGroup.add(baffleMesh);

    // Silk Dome Tweeter
    const tweeterGeo = trackGeo(new THREE.SphereGeometry(0.35, 16, 16));
    const tweeter = new THREE.Mesh(tweeterGeo, chromeMat);
    tweeter.position.set(0, 1.1, 1.25);
    spkGroup.add(tweeter);

    // Iconic Yamaha White Polypropylene Woofer Cone!
    const wooferGeo = trackGeo(new THREE.CylinderGeometry(0.85, 0.3, 0.35, 24));
    const woofer = new THREE.Mesh(wooferGeo, whiteConeMat);
    woofer.rotation.x = Math.PI / 2;
    woofer.position.set(0, -0.45, 1.2);
    spkGroup.add(woofer);

    // Black Center Dust Cap
    const capGeo = trackGeo(new THREE.SphereGeometry(0.32, 16, 16));
    const cap = new THREE.Mesh(capGeo, blackSteelMat);
    cap.position.set(0, -0.45, 1.35);
    spkGroup.add(cap);

    // White status LED indicator
    const ledGeo = trackGeo(new THREE.SphereGeometry(0.06, 12, 12));
    const ledMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 2.0,
      })
    );
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0, -1.6, 1.32);
    spkGroup.add(ledMesh);

    return spkGroup;
  };

  group.add(createYamahaSpeaker(-8.4, -2.0, 0.28));
  group.add(createYamahaSpeaker(5.2, -2.2, -0.24));

  // ── 9. ARTISAN STONEWARE MUG & REAL TERRACOTTA SUCCULENT ───────────
  // Speckled Stoneware Ceramic Coffee Mug
  const mugGroup = new THREE.Group();
  mugGroup.position.set(-5.6, deskY + deskHeight / 2 + 0.6, 1.2);
  group.add(mugGroup);

  const mugBodyGeo = trackGeo(new THREE.CylinderGeometry(0.65, 0.58, 1.2, 24));
  const mugBody = new THREE.Mesh(mugBodyGeo, stonewareMat);
  mugGroup.add(mugBody);

  // Dark Roast Coffee with Glossy Surface
  const coffeeGeo = trackGeo(new THREE.CircleGeometry(0.55, 20));
  const coffeeMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x221309,
      roughness: 0.08,
      metalness: 0.1,
    })
  );
  const coffeeMesh = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffeeMesh.rotation.x = -Math.PI / 2;
  coffeeMesh.position.set(0, 0.52, 0);
  mugGroup.add(coffeeMesh);

  // Ceramic Mug Handle
  const handleGeo = trackGeo(new THREE.TorusGeometry(0.38, 0.08, 12, 20, Math.PI));
  const mugHandle = new THREE.Mesh(handleGeo, stonewareMat);
  mugHandle.rotation.y = Math.PI / 2;
  mugHandle.position.set(-0.68, 0, 0);
  mugGroup.add(mugHandle);

  // Real Terracotta Succulent Planter on Desk
  const deskPlantGroup = new THREE.Group();
  deskPlantGroup.position.set(-8.2, deskY + deskHeight / 2 + 0.7, 1.0);
  group.add(deskPlantGroup);

  const potGeo = trackGeo(new THREE.CylinderGeometry(0.85, 0.6, 1.1, 6));
  const potMesh = new THREE.Mesh(potGeo, terracottaMat);
  deskPlantGroup.add(potMesh);

  // Rich Dark Soil
  const soilGeo = trackGeo(new THREE.CircleGeometry(0.75, 12));
  const soilMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x27190e, roughness: 0.9 })
  );
  const soilMesh = new THREE.Mesh(soilGeo, soilMat);
  soilMesh.rotation.x = -Math.PI / 2;
  soilMesh.position.set(0, 0.52, 0);
  deskPlantGroup.add(soilMesh);

  // Lush Green Succulent Leaves
  const succLeafMat = trackMat(
    new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.4 })
  );
  for (let l = 0; l < 8; l++) {
    const leafGeo = trackGeo(new THREE.ConeGeometry(0.3, 0.8, 5));
    const leafMesh = new THREE.Mesh(leafGeo, succLeafMat);
    const angle = (l / 8) * Math.PI * 2;
    leafMesh.position.set(Math.cos(angle) * 0.45, 0.7, Math.sin(angle) * 0.45);
    leafMesh.rotation.z = Math.cos(angle) * 0.45;
    leafMesh.rotation.x = Math.sin(angle) * 0.45;
    deskPlantGroup.add(leafMesh);
  }

  // ── 10. LARGE INDOOR MONSTERA FLOOR PLANT & CORNER AMBIENT LIGHT ───
  // Large Potted Monstera Floor Plant (Beside Left Window)
  const floorPlantGroup = new THREE.Group();
  floorPlantGroup.position.set(-13.0, roomFloorY + 1.6, -3.0);
  group.add(floorPlantGroup);

  // Terracotta Large Floor Planter Pot
  const bigPotGeo = trackGeo(new THREE.CylinderGeometry(1.6, 1.2, 2.8, 24));
  const bigPot = new THREE.Mesh(bigPotGeo, terracottaMat);
  floorPlantGroup.add(bigPot);

  // Walnut Cross Stand under floor pot
  const potStandGeo = trackGeo(new THREE.BoxGeometry(3.6, 0.3, 0.6));
  const potStand1 = new THREE.Mesh(potStandGeo, walnutWoodMat);
  potStand1.position.set(0, -1.3, 0);
  floorPlantGroup.add(potStand1);

  const potStand2 = new THREE.Mesh(potStandGeo, walnutWoodMat);
  potStand2.rotation.y = Math.PI / 2;
  potStand2.position.set(0, -1.3, 0);
  floorPlantGroup.add(potStand2);

  // Large Organic Variegated Monstera Leaves
  for (let lf = 0; lf < 7; lf++) {
    const lAngle = (lf / 7) * Math.PI * 2;
    const stemGeo = trackGeo(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8));
    const stemMesh = new THREE.Mesh(stemGeo, monsteraLeafMat);
    stemMesh.position.set(Math.sin(lAngle) * 0.8, 2.2, Math.cos(lAngle) * 0.8);
    stemMesh.rotation.z = Math.sin(lAngle) * 0.45;
    stemMesh.rotation.x = Math.cos(lAngle) * 0.45;
    floorPlantGroup.add(stemMesh);

    const fLeafGeo = trackGeo(new THREE.SphereGeometry(1.2, 8, 8));
    fLeafGeo.scale(1.2, 0.1, 2.0);
    const fLeaf = new THREE.Mesh(fLeafGeo, monsteraLeafMat);
    fLeaf.position.set(Math.sin(lAngle) * 2.2, 3.6, Math.cos(lAngle) * 2.2);
    fLeaf.rotation.y = lAngle;
    floorPlantGroup.add(fLeaf);
  }

  // Modern Minimalist Corner Floor Lightbar (Right Wall)
  const cornerLightGroup = new THREE.Group();
  cornerLightGroup.position.set(14.5, roomFloorY + 7.0, -8.0);
  group.add(cornerLightGroup);

  const lightbarStemGeo = trackGeo(new THREE.CylinderGeometry(0.12, 0.12, 14, 16));
  const lightbarStem = new THREE.Mesh(lightbarStemGeo, blackSteelMat);
  cornerLightGroup.add(lightbarStem);

  // Warm Amber & Soft Gold Lightbar (NOT harsh purple!)
  const lightbarGlowGeo = trackGeo(new THREE.CylinderGeometry(0.14, 0.14, 13.8, 16));
  const lightbarGlowMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfde047,
      emissiveIntensity: 2.2,
    })
  );
  const lightbarGlow = new THREE.Mesh(lightbarGlowGeo, lightbarGlowMat);
  cornerLightGroup.add(lightbarGlow);

  // ── 11. AUTHENTIC ARCHITECTURAL LIGHTING RIG ───────────────────────
  // Primary Natural Sun / Daylight Streaming Through Window (4500K natural daylight)
  const sunLight = new THREE.DirectionalLight(0xfff7ed, 2.6);
  sunLight.position.set(-22, 18, 4);
  group.add(sunLight);
  lights.push(sunLight);

  // Secondary Soft Sky Fill Light from window
  const skyFillLight = new THREE.DirectionalLight(0xbae6fd, 1.4);
  skyFillLight.position.set(-18, 8, 10);
  group.add(skyFillLight);
  lights.push(skyFillLight);

  // Warm Room Ambient Bounce (soft neutral bounce from greige walls and wood floor)
  const ambientLight = new THREE.AmbientLight(0xfefce8, 0.85);
  group.add(ambientLight);
  lights.push(ambientLight);

  // Screen Light Bounce on desk and keyboard (crisp soft white/cyan bounce)
  const screenBounce = new THREE.PointLight(0xe0f2fe, 2.2, 12);
  screenBounce.position.set(0, deskY + deskHeight / 2 + 4.0, 0.2);
  group.add(screenBounce);
  lights.push(screenBounce);

  // ScreenBar Warm Task Light (2800K warm incandescent glow downward on keyboard)
  const taskLight = new THREE.PointLight(0xffedd5, 2.8, 9);
  taskLight.position.set(0, deskY + deskHeight / 2 + 7.0, 0.4);
  group.add(taskLight);
  lights.push(taskLight);

  // Under-Shelf Warm Accent Wash (downward on walnut slats)
  const shelfWashLight = new THREE.PointLight(0xfde047, 2.0, 10);
  shelfWashLight.position.set(0, 7.2, -7.5);
  group.add(shelfWashLight);
  lights.push(shelfWashLight);

  // Corner Warm Floor Lightbar
  const cornerGlowLight = new THREE.PointLight(0xfbbf24, 2.2, 12);
  cornerGlowLight.position.set(14.0, 7.0, -7.5);
  group.add(cornerGlowLight);
  lights.push(cornerGlowLight);

  // PC Interior Subtle White & Ice Blue Glow
  const pcInternalLight = new THREE.PointLight(0x38bdf8, 2.0, 5);
  pcInternalLight.position.set(8.2, deskY + deskHeight / 2 + 3.6, -1.2);
  group.add(pcInternalLight);
  lights.push(pcInternalLight);

  // ── 12. UPDATE & ANIMATION LOOP ────────────────────────────────────
  const update = (time: number) => {
    // Subtle breathing pulse on screen task lighting
    const pulse = 1 + Math.sin(time * 1.5) * 0.05;
    screenBounce.intensity = 2.2 * pulse;

    // GPU fan rotation
    pcFans.forEach((fan, idx) => {
      fan.rotation.y += (idx % 2 === 0 ? 0.06 : -0.06);
    });

    // AIO cooler ring pulsing
    aioRing.rotation.z += 0.02;

    // Corner light gentle warmth breathing
    cornerGlowLight.intensity = 2.2 + Math.sin(time * 1.8) * 0.2;
  };

  return {
    group,
    materials,
    geometries,
    textures,
    lights,
    update,
    pcFans,
  };
}
