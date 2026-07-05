import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceImg = 'assets/transparent_base.png';

async function generate() {
  console.log('Starting icon generation...');
  
  // 1. Capacitor Assets (icon & splash)
  await sharp(sourceImg)
    .resize(1024, 1024, { fit: 'cover' })
    .png()
    .toFile('assets/icon.png');
    
  await sharp(sourceImg)
    .resize(1024, 1024, { fit: 'cover' })
    .png()
    .toFile('assets/icon-only.png');
    
  await sharp(sourceImg)
    .resize(1024, 1024, { fit: 'cover' })
    .png()
    .toFile('assets/logo.png');

  await sharp(sourceImg)
    .resize(2732, 2732, { 
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 1 }
    })
    .png()
    .toFile('assets/splash.png');

  // 2. Web Assets (React public folder)
  await sharp(sourceImg)
    .resize(192, 192, { fit: 'cover' })
    .png()
    .toFile('public/logo192.png');
    
  await sharp(sourceImg)
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toFile('public/logo512.png');
    
  await sharp(sourceImg)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile('public/favicon.ico');
    
  await sharp(sourceImg)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile('public/favicon.png');

  // Interstellar game specifically
  if (fs.existsSync('public/interstellar-game')) {
    await sharp(sourceImg)
      .resize(32, 32, { fit: 'cover' })
      .png()
      .toFile('public/interstellar-game/favicon.ico');
  }

  console.log('Base images generated. Ready for capacitor-assets.');
}

generate().catch(console.error);
