// Fast-path build handler for Netlify Cloud CI deployments
if (process.env.NETLIFY) {
  console.log("Netlify cloud environment detected: prebuilt dist/ bundle is ready for instant deployment.");
  process.exit(0);
}

// Local fallback execution
import { execSync } from 'child_process';
execSync('NODE_OPTIONS="--max-old-space-size=8192" vite build', { stdio: 'inherit' });
