const sharp = require('sharp');
const path = require('path');

const INPUT = path.join(__dirname, '..', 'public', 'profile_nobg.png');
const OUTPUT = path.join(__dirname, '..', 'public', 'profile_transparent.png');

async function createTransparentGradient() {
  console.log('Loading input:', INPUT);
  const { data, info } = await sharp(INPUT)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const buffer = Buffer.from(data);

  // Smoothstep ease function (Hermite interpolation)
  function smoothstep(edge0, edge1, x) {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  // Vertical gradient:
  // 100% opaque down to y = 700 (below white sweater and collar)
  // Starts fading at y = 700
  // Reaches 50% opacity around y = 920
  // Reaches 0% opacity at y = 1100 (bottom 100px are completely 100% transparent)
  const Y_START = 700;
  const Y_END = 1100;

  // Left edge horizontal dissolve (where left arm touches x = 0):
  // Fades out from x = 90 down to x = 0 for y > 400
  const X_LEFT = 90;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const originalAlpha = buffer[idx + 3];
      if (originalAlpha === 0) continue;

      // Vertical factor
      let vFactor = 1.0;
      if (y >= Y_END) {
        vFactor = 0.0;
      } else if (y > Y_START) {
        // As y goes from Y_START to Y_END, factor goes from 1.0 to 0.0
        vFactor = 1.0 - smoothstep(Y_START, Y_END, y);
      }

      // Horizontal factor for left side cut
      let hFactor = 1.0;
      if (y > 420 && x < X_LEFT) {
        hFactor = smoothstep(0, X_LEFT, x);
      }

      const finalAlpha = Math.round(originalAlpha * vFactor * hFactor);
      buffer[idx + 3] = finalAlpha;
    }
  }

  await sharp(buffer, {
    raw: { width: w, height: h, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(OUTPUT);

  console.log('✅ Successfully created profile_transparent.png with pure transparent gradient!');

  // Verify bottom 100 rows have 0 alpha
  let nonZeroCount = 0;
  for (let y = Y_END; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (buffer[(y * w + x) * 4 + 3] > 0) nonZeroCount++;
    }
  }
  console.log(`Verification: non-zero pixels below y=${Y_END}: ${nonZeroCount} (must be 0)`);
}

createTransparentGradient().catch(console.error);
