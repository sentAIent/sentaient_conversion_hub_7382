#!/bin/bash
sed -i '' 's/RealisticSnow/Snowfall/g' components/App.js || true
sed -i '' 's/<RealisticSnow count={qualitySettings.particles} \/>/<Sparkles count={qualitySettings.particles} scale={400} size={2} speed={0.4} opacity={0.3} color="#ffffff" \/>/g' App.js
