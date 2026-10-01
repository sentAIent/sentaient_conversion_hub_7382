import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const app = express();
const PORT = 3335;

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "http://localhost:11434"], // Allow ollama
            // Add other strict rules as necessary
        }
    }
}));
app.use(cors());

// Server-Sent Events (SSE) endpoint to run python training and stream output
app.get('/api/train', (req, res) => {
    // Standard SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush headers immediately

    console.log('[ML Bridge] Starting Python LoRA training pipeline...');
    
    // Send an initial connected message
    res.write(`data: ${JSON.stringify({ type: 'status', message: 'Connected to ML Pipeline Bridge.' })}\n\n`);

    const pyScript = path.join(projectRoot, 'scripts', 'train_lora.py');
    const child = spawn('python3', [pyScript], { cwd: projectRoot });

    child.stdout.on('data', (data) => {
        const text = data.toString();
        // Send data back as SSE
        res.write(`data: ${JSON.stringify({ type: 'log', message: text })}\n\n`);
        process.stdout.write(text);
    });

    child.stderr.on('data', (data) => {
        const text = data.toString();
        res.write(`data: ${JSON.stringify({ type: 'error', message: text })}\n\n`);
        process.stderr.write(text);
    });

    child.on('close', (code) => {
        console.log(`[ML Bridge] Python process exited with code ${code}`);
        res.write(`data: ${JSON.stringify({ type: 'done', code })}\n\n`);
        res.end();
    });
    
    // Clean up if client disconnects
    req.on('close', () => {
        console.log('[ML Bridge] Client disconnected, killing python process.');
        child.kill();
    });
});

app.listen(PORT, () => {
    console.log(`[ML Bridge] Server listening on http://localhost:${PORT}`);
    console.log(`[ML Bridge] Endpoint: http://localhost:${PORT}/api/train`);
});
