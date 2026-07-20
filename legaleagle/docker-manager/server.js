const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 11236;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'super-secret-local-key';

app.use(cors());
app.use(express.json());

// Basic Security Middleware
const requireApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    if (apiKey !== ADMIN_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing API Key' });
    }
    next();
};

const CRAWL4AI_CONTAINER_NAME = 'crawl4ai';

// GET /status - Check if crawl4ai is running
app.get('/status', requireApiKey, (req, res) => {
    // We format the output to get just the container ID if it exists and is running
    exec(`docker ps -q -f name=${CRAWL4AI_CONTAINER_NAME}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error checking status:', error);
            return res.status(500).json({ status: 'error', message: error.message });
        }
        
        const isRunning = stdout.trim().length > 0;
        res.json({ 
            status: 'success', 
            data: {
                container: CRAWL4AI_CONTAINER_NAME,
                isRunning: isRunning
            }
        });
    });
});

// POST /start - Start the crawl4ai container
app.post('/start', requireApiKey, (req, res) => {
    // Run the shell script located in the parent directory
    const scriptPath = path.join(__dirname, '..', 'start_crawl4ai.sh');
    
    exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error starting container:', error);
            return res.status(500).json({ status: 'error', message: error.message, stderr });
        }
        
        res.json({ 
            status: 'success', 
            message: 'Container started successfully',
            output: stdout
        });
    });
});

// POST /stop - Stop the crawl4ai container
app.post('/stop', requireApiKey, (req, res) => {
    exec(`docker stop ${CRAWL4AI_CONTAINER_NAME} && docker rm ${CRAWL4AI_CONTAINER_NAME}`, (error, stdout, stderr) => {
        if (error) {
            // It might fail if the container is already stopped/removed, which is fine
            if (stderr.includes('No such container')) {
                 return res.json({ status: 'success', message: 'Container was not running.' });
            }
            console.error('Error stopping container:', error);
            return res.status(500).json({ status: 'error', message: error.message, stderr });
        }
        
        res.json({ 
            status: 'success', 
            message: 'Container stopped and removed successfully',
            output: stdout
        });
    });
});

app.listen(PORT, () => {
    console.log(`Local Docker Manager running on http://localhost:${PORT}`);
    console.log(`Using Admin API Key: ${ADMIN_API_KEY}`);
});
