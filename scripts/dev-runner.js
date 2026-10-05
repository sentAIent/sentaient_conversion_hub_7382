import net from 'net';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Probes the local network to find the next available port starting from a base port.
 */
function findFreePort(startPort) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(startPort, () => {
            const { port } = server.address();
            server.close(() => resolve(port));
        });
        server.on('error', () => {
            resolve(findFreePort(startPort + 1));
        });
    });
}

async function start() {
    const basePort = 3333;
    const freePort = await findFreePort(basePort);
    console.log(`[PortFinder] Found available frontend port: ${freePort}`);

    process.env.TAURI_CONFIG = JSON.stringify({
        build: {
            devPath: `http://localhost:${freePort}`,
            beforeDevCommand: "" // Disable redundant Vite boot by Tauri CLI
        }
    });

    // Start Vite dev server in a child process
    const viteProcess = spawn('npx', ['vite', '--port', freePort.toString()], {
        stdio: 'inherit',
        shell: true,
        env: { ...process.env }
    });

    viteProcess.on('error', (err) => {
        console.error('[PortFinder] Failed to start Vite process:', err);
    });

    // Optionally launch Tauri CLI if requested via args
    if (process.argv.includes('--tauri')) {
        console.log(`[PortFinder] Launching Tauri referencing port: ${freePort}`);
        const tauriProcess = spawn('npx', ['-y', '@tauri-apps/cli', 'dev'], {
            stdio: 'inherit',
            shell: true,
            env: { ...process.env }
        });

        tauriProcess.on('error', (err) => {
            console.error('[PortFinder] Failed to start Tauri process:', err);
        });

        tauriProcess.on('close', (code) => {
            viteProcess.kill();
            process.exit(code);
        });
    }
}

start();
