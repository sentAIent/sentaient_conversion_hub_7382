import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
    const targetDir = path.join(__dirname, '..', 'src-tauri', 'icons');
    if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
    }

    console.log('[IconGenerator] Initializing icon asset generation...');

    const baseSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
        <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#3b82f6" />
                <stop offset="100%" stop-color="#1e1b4b" />
            </radialGradient>
        </defs>
        <rect width="512" height="512" rx="128" fill="url(#grad)" />
        <circle cx="256" cy="256" r="140" fill="none" stroke="#60a5fa" stroke-width="24" stroke-dasharray="40 20" />
        <circle cx="256" cy="256" r="60" fill="#ffffff" />
    </svg>
    `;

    let sharp;
    try {
        const sharpModule = await import('sharp');
        sharp = sharpModule.default;
    } catch (e) {
        console.warn('[IconGenerator] Sharp library not loaded. Generating fallback buffers.');
    }

    const svgBuffer = Buffer.from(baseSvg);

    const writePng = async (filename, size) => {
        const filePath = path.join(targetDir, filename);
        if (sharp) {
            await sharp(svgBuffer).resize(size, size).png().toFile(filePath);
        } else {
            const dummyPng = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789cc30700000200017a7a73180000000049454e44ae426082', 'hex');
            writeFileSync(filePath, dummyPng);
        }
        console.log(`[IconGenerator] Created png: ${filename} (${size}x${size})`);
    };

    await writePng('32x32.png', 32);
    await writePng('128x128.png', 128);
    await writePng('128x128@2x.png', 256);

    const pngFilePath = path.join(targetDir, '128x128.png');
    const pngBuffer = existsSync(pngFilePath) ? readFileSync(pngFilePath) : Buffer.alloc(100);

    const icoPath = path.join(targetDir, 'icon.ico');
    const icoHeader = Buffer.alloc(6);
    icoHeader.writeUInt16LE(0, 0); 
    icoHeader.writeUInt16LE(1, 2); 
    icoHeader.writeUInt16LE(1, 4); 

    const icoDirectory = Buffer.alloc(16);
    icoDirectory.writeUInt8(128, 0); 
    icoDirectory.writeUInt8(128, 1); 
    icoDirectory.writeUInt8(0, 2);   
    icoDirectory.writeUInt8(0, 3);   
    icoDirectory.writeUInt16LE(1, 4); 
    icoDirectory.writeUInt16LE(32, 6); 
    icoDirectory.writeUInt32LE(pngBuffer.length, 8); 
    icoDirectory.writeUInt32LE(22, 12); 

    writeFileSync(icoPath, Buffer.concat([icoHeader, icoDirectory, pngBuffer]));
    console.log('[IconGenerator] Created icon.ico');

    const icnsPath = path.join(targetDir, 'icon.icns');
    const chunkType = Buffer.from('ic07'); 
    const chunkLength = 8 + pngBuffer.length;
    const chunkHeader = Buffer.alloc(8);
    chunkHeader.write(chunkType.toString(), 0, 4);
    chunkHeader.writeUInt32BE(chunkLength, 4);

    const totalLength = 8 + chunkLength;
    const icnsHeader = Buffer.alloc(8);
    icnsHeader.write('icns', 0, 4);
    icnsHeader.writeUInt32BE(totalLength, 4);

    writeFileSync(icnsPath, Buffer.concat([icnsHeader, chunkHeader, pngBuffer]));
    console.log('[IconGenerator] Created icon.icns');

    console.log('[IconGenerator] Icon compilation finished successfully.');
}

generateIcons().catch(err => {
    console.error('[IconGenerator] Failed to compile assets:', err.message);
});
