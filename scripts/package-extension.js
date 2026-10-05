import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const extensionDir = path.join(projectRoot, 'extension');
const outputFilePath = path.join(projectRoot, 'chrome-extension-v1.zip');

if (!fs.existsSync(extensionDir)) {
    console.error('❌ Extension directory not found:', extensionDir);
    process.exit(1);
}

const output = fs.createWriteStream(outputFilePath);
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
    console.log(`✅ Chrome Extension packaged successfully: ${outputFilePath}`);
    console.log(`📦 Size: ${(archive.pointer() / 1024).toFixed(2)} KB`);
    console.log('Ready for Chrome Web Store Developer Dashboard upload.');
});

archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
        console.warn('Archive warning:', err);
    } else {
        throw err;
    }
});

archive.on('error', function(err) {
    throw err;
});

archive.pipe(output);

// append files from the extension directory
archive.directory(extensionDir, false);

archive.finalize();
