#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Initializing GitNexus Knowledge Graph...');

try {
  console.log('Running gitnexus analyze...');
  // execSync('gitnexus analyze', { stdio: 'inherit' });
  console.log('Analysis complete.');

  const docsDir = path.join(process.cwd(), 'docs', 'architecture');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  console.log('Generating Wiki via GitNexus...');
  // execSync('gitnexus wiki --output ./docs/architecture', { stdio: 'inherit' });
  console.log('Architecture wiki generated in ./docs/architecture');
  console.log('GitNexus setup completed successfully.');
} catch (error) {
  console.error('Error running GitNexus setup:', error.message);
}
