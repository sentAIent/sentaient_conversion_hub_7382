import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const app = express();
const PORT = 3005;

// TikTok API v2 Endpoints
const TIKTOK_AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize/';
const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';

const CLIENT_KEY = process.env.TIKTOK_CLIENT_ID;
const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

if (!CLIENT_KEY || !CLIENT_SECRET) {
    console.error("❌ Error: TIKTOK_CLIENT_ID and TIKTOK_CLIENT_SECRET must be in your .env file.");
    process.exit(1);
}

// Store verifier temporarily in memory for the callback
let globalCodeVerifier = '';

function generateCodeVerifier() {
    // Exactly 43 characters of alphanumeric standard base64url
    return crypto.randomBytes(32).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function generateCodeChallenge(verifier) {
    // SHA256 hash, then base64url encode
    return crypto.createHash('sha256').update(verifier).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

app.get('/login', (req, res) => {
    globalCodeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(globalCodeVerifier);

    const scopes = 'video.publish,video.upload,user.info.basic';
    const state = Math.random().toString(36).substring(7);
    
    const authUrl = `${TIKTOK_AUTH_URL}?client_key=${CLIENT_KEY}&response_type=code&scope=${scopes}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    
    res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
    const { code, state, error } = req.query;

    if (error) {
        return res.status(400).send(`Auth failed: ${error}`);
    }

    if (!code) {
        return res.status(400).send('No authorization code provided.');
    }

    try {
        console.log("🔄 Exchanging authorization code for access token...");
        const params = new URLSearchParams();
        params.append('client_key', CLIENT_KEY);
        params.append('client_secret', CLIENT_SECRET);
        params.append('code', code);
        params.append('grant_type', 'authorization_code');
        params.append('redirect_uri', REDIRECT_URI);
        params.append('code_verifier', globalCodeVerifier);

        const response = await fetch(TIKTOK_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: params
        });

        const data = await response.json();

        if (data.error) {
            console.error("❌ Token exchange failed:", data);
            return res.status(400).send(`Failed to exchange token: ${JSON.stringify(data)}`);
        }

        const accessToken = data.access_token;
        const openId = data.open_id;

        console.log("✅ Success! Retrieved Access Token and Open ID.");

        // Append to .env
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Remove old tokens if they exist
        envContent = envContent.replace(/^TIKTOK_ACCESS_TOKEN=.*$/m, '');
        envContent = envContent.replace(/^TIKTOK_OPEN_ID=.*$/m, '');
        
        // Append new tokens
        envContent += `\nTIKTOK_ACCESS_TOKEN="${accessToken}"\n`;
        envContent += `TIKTOK_OPEN_ID="${openId}"\n`;
        
        // Clean up empty lines
        envContent = envContent.replace(/^\s*[\r\n]/gm, '');

        fs.writeFileSync(envPath, envContent);
        
        console.log("📝 Successfully wrote tokens to autopilot/.env");

        res.send('<h1>Authentication Successful! 🎉</h1><p>Your access token and Open ID have been saved to your .env file. You can close this window and stop the terminal script.</p>');
        
        // Gracefully shutdown
        setTimeout(() => process.exit(0), 1000);

    } catch (err) {
        console.error("❌ Error during token exchange:", err);
        res.status(500).send("Internal server error during token exchange.");
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 TikTok OAuth server is running!`);
    console.log(`\n👉 CLICK HERE TO LOGIN: http://localhost:${PORT}/login\n`);
    console.log(`Waiting for you to authorize the app...`);
});
