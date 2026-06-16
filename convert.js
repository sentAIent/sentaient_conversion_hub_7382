const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/binaural-assets/images/cymatics';

async function convertImages(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            await convertImages(fullPath);
        } else if (fullPath.endsWith('.png') || fullPath.endsWith('.jpg')) {
            const ext = path.extname(fullPath);
            const newPath = fullPath.replace(ext, '.webp');
            try {
                console.log(`Converting: ${fullPath} -> ${newPath}`);
                await sharp(fullPath)
                    .webp({ quality: 80 })
                    .toFile(newPath);
                
                // Optionally delete the old file after successful conversion
                fs.unlinkSync(fullPath);
                console.log(`Deleted original: ${fullPath}`);
            } catch (err) {
                console.error(`Error converting ${fullPath}:`, err);
            }
        }
    }
}

convertImages(targetDir).then(() => {
    console.log("Finished converting all images to WebP.");
});
