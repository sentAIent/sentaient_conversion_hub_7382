const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'server_detached.log');
const out = fs.openSync(logFile, 'a');

const p = spawn('npm', ['run', 'dev', '--', '--port', '3000', '--host'], {
    cwd: __dirname,
    detached: true,
    stdio: ['ignore', out, out]
});

p.unref();
fs.appendFileSync(logFile, `\n--- Spawned at ${new Date().toISOString()} (PID: ${p.pid}) ---\n`);
