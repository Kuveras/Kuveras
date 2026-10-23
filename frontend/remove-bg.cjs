const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'kuveras-logo-transparent.png');
const outputPath = path.join(__dirname, 'public', 'kuveras-logo-transparent.png');

async function removeWhiteBackground() {
  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Threshold: treat near-white pixels as transparent
    // White = 255,255,255 — allow some tolerance
    const brightness = (r + g + b) / 3;
    const isNearWhite = r > 220 && g > 220 && b > 220;

    if (isNearWhite) {
      // Make alpha proportional to how "non-white" the pixel is
      // Fully white -> alpha 0, slightly off-white -> partial alpha
      const maxChannel = Math.max(r, g, b);
      const alpha = Math.round(255 * (1 - (maxChannel - Math.min(r,g,b)) / 255));
      // For pure whites, alpha = 0; for off-whites with color, partial transparency
      const whiteness = Math.min(r, g, b) / 255; // how white it is (0=black,1=white)
      pixels[i + 3] = Math.round(255 * (1 - whiteness));
    }
  }

  await sharp(Buffer.from(pixels), {
    raw: { width, height, channels }
  })
    .png()
    .toFile(outputPath);

  console.log('Done! White background removed.');
}

removeWhiteBackground().catch(console.error);
