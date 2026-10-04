const { Document, NodeIO } = require('@gltf-transform/core');
const { prune, dedup, draco, textureCompress } = require('@gltf-transform/functions');
const fs = require('fs');
const path = require('path');

async function optimizeModels() {
  console.log("🚀 Starting glTF-Transform Asset Optimization Pipeline...");

  const io = new NodeIO();
  const modelsDir = path.join(__dirname, '..', 'assets', 'models');
  const outDir = path.join(__dirname, '..', 'assets', 'models', 'optimized');

  if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true });
      // Create a dummy model just for the script to run without crashing if empty
      fs.writeFileSync(path.join(modelsDir, 'dummy.txt'), 'mock model data');
      console.log(`Created mock directory at ${modelsDir}`);
  }

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.glb'));
  
  if (files.length === 0) {
      console.log("No .glb files found to optimize. Place your raw 3D models in assets/models/");
      return;
  }

  for (const file of files) {
    try {
      console.log(`Processing: ${file}`);
      const document = await io.read(path.join(modelsDir, file));

      // 1. Remove unused nodes/materials
      await document.transform(prune());
      
      // 2. Merge duplicate accessors/materials
      await document.transform(dedup());

      // 3. Draco compression (would require draco3d package, mocked here)
      // await document.transform(draco());

      const outPath = path.join(outDir, file.replace('.glb', '_opt.glb'));
      await io.write(outPath, document);
      
      const originalSize = fs.statSync(path.join(modelsDir, file)).size / 1024;
      const newSize = fs.statSync(outPath).size / 1024;
      
      console.log(`✅ Optimized ${file}: ${originalSize.toFixed(2)}kb -> ${newSize.toFixed(2)}kb`);
    } catch (err) {
      console.error(`Failed to process ${file}:`, err.message);
    }
  }
  console.log("🎉 Asset pipeline complete!");
}

optimizeModels();
