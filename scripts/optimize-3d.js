import fs from 'fs/promises';
import path from 'path';
import { NodeIO } from '@gltf-transform/core';
import { KHRONOS_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, resample, weld } from '@gltf-transform/functions';

async function optimizeModels() {
  console.log('Starting 3D Asset Optimization pipeline...');
  const modelsDir = path.join(process.cwd(), 'public', 'models');
  
  try {
    const files = await fs.readdir(modelsDir);
    const glbFiles = files.filter(f => f.endsWith('.glb') || f.endsWith('.gltf'));
    
    if (glbFiles.length === 0) {
      console.log('No 3D models found in public/models to optimize.');
      return;
    }

    const io = new NodeIO().registerExtensions(KHRONOS_EXTENSIONS);

    for (const file of glbFiles) {
      const filePath = path.join(modelsDir, file);
      console.log(`Optimizing ${file}...`);
      
      const document = await io.read(filePath);
      
      // Apply standard compression algorithms
      await document.transform(
        weld(),
        dedup(),
        resample(),
        prune()
      );
      
      await io.write(filePath, document);
      console.log(`Optimized: ${file}`);
    }
    
    console.log('3D Asset Optimization complete!');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No public/models directory found. Skipping 3D optimization.');
    } else {
      console.error('Failed to optimize 3D models:', err);
    }
  }
}

optimizeModels();
