import sharp from 'sharp';

const sourceImg = '/Users/ute/.gemini/antigravity/brain/b2c5aa67-6d52-45c2-9480-218639ebaca0/media__1783211177481.jpg';

async function removeBlackBackground() {
  console.log('Removing black background...');
  const image = sharp(sourceImg);
  const metadata = await image.metadata();
  
  // Get raw RGBA pixels
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  // Iterate through pixels and make black (or near black) transparent
  // Since there is a glow, making it a hard threshold might leave a hard edge, 
  // but let's do a smooth alpha blend for very dark pixels
  const threshold = 30;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    const maxVal = Math.max(r, g, b);
    if (maxVal < threshold) {
      // Scale alpha down to 0 as it gets closer to 0
      data[i + 3] = Math.floor((maxVal / threshold) * 255);
    }
  }
  
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .png()
  .toFile('assets/transparent_base.png');
  
  console.log('Background removed. Saved to assets/transparent_base.png');
}

removeBlackBackground().catch(console.error);
