#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

const SECRET_PATTERNS = [
  /AIza[0-9A-Za-z-_]{35}/, // Firebase API Key
  /sk_live_[0-9a-zA-Z]{24}/, // Stripe Secret Key
  /eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/, // JWTs (often used for Supabase anon/service roles)
  /BEGIN (RSA|OPENSSH) PRIVATE KEY/, // Private Keys
];

// Get staged files
let stagedFiles;
try {
  stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf-8' })
    .split('\n')
    .filter(f => f.trim() && !f.endsWith('check-secrets.js')); // exclude this script
} catch (e) {
  console.log("No staged files found or git error.");
  process.exit(0);
}

let hasSecrets = false;

for (const file of stagedFiles) {
  if (!fs.existsSync(file)) continue;

  const content = fs.readFileSync(file, 'utf-8');
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.test(content)) {
      console.error(`\x1b[31m🚨 SECURITY ALERT: Potential secret found in staged file: ${file}\x1b[0m`);
      console.error(`Please remove the secret and commit again. If this is a false positive, you can bypass this hook with --no-verify.\n`);
      hasSecrets = true;
      break;
    }
  }
}

if (hasSecrets) {
  process.exit(1);
} else {
  console.log('✅ Secret scan passed.');
}
