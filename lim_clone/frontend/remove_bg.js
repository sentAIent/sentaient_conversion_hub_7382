import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

const inputPath = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/assets/images/contango_logo.png';
const outputPath = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_transparent.png';

async function processImage() {
    console.log("Processing image...");
    try {
        const imageBuffer = fs.readFileSync(inputPath);
        const blob = new Blob([imageBuffer]);
        const resultBlob = await removeBackground(blob);
        const arrayBuffer = await resultBlob.arrayBuffer();
        const resultBuffer = Buffer.from(arrayBuffer);
        
        fs.writeFileSync(outputPath, resultBuffer);
        console.log("Background removed successfully!");
    } catch (e) {
        console.error("Error removing background:", e);
    }
}

processImage();
