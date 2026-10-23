const sharp = require('sharp');
const path = require('path');

// Composite the transparent logo on a dark green background to verify
async function verify() {
  const logo = await sharp(path.join(__dirname, 'public', 'kuveras-logo-transparent.png'))
    .resize(500)
    .toBuffer();

  const { width, height } = await sharp(logo).metadata();

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 10, g: 94, b: 56 } // #0a5e38 - footer color
    }
  })
    .composite([{ input: logo, blend: 'over' }])
    .png()
    .toFile(path.join(__dirname, 'logo-preview-on-green.png'));

  console.log('Preview saved!');
}

verify().catch(console.error);
