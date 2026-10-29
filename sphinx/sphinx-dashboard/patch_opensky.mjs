import fs from 'fs';

let content = fs.readFileSync('../sphinx-core/lib/opensky.mjs', 'utf8');

// Add auth support
const authReplace = `
    const headers = { 'User-Agent': 'SphinxOSINT/2.0' };
    if (process.env.OPENSKY_USERNAME && process.env.OPENSKY_PASSWORD) {
      const auth = Buffer.from(\`\${process.env.OPENSKY_USERNAME}:\${process.env.OPENSKY_PASSWORD}\`).toString('base64');
      headers['Authorization'] = \`Basic \${auth}\`;
      console.log('[Sphinx OSINT] Using authenticated OpenSky request.');
    }

    console.log(\`[Sphinx OSINT] Fetching live aircraft data for area: \${query}...\`);
    this.fetchPromise = (async () => {
      try {
        const response = await fetch(\`\${this.baseUrl}/states/all?\${query}\`, { headers });
`;

content = content.replace(
  /console\.log\(\`\[Sphinx OSINT\] Fetching live aircraft data for area: \$\{query\}\.\.\.\`\);\s*this\.fetchPromise = \(async \(\) => \{\s*try \{\s*const response = await fetch\(\`\$\{this\.baseUrl\}\/states\/all\?\$\{query\}\`\);/,
  authReplace
);

// Increase cache time if 429 hit
const catchReplace = `
      } catch (error) {
        console.error('[Sphinx OSINT] Failed to fetch aircraft:', error.message);
        if (error.message.includes('429')) {
           console.log('[Sphinx OSINT] Rate limit hit. Backing off for 60 seconds.');
           this.lastFetchTime = Date.now() + 45000; // Fake the fetch time so it waits 60s total
        } else {
           this.lastFetchTime = Date.now();
        }
        if (!this.cachedAircraft) {
`;

content = content.replace(
  /\} catch \(error\) \{\s*console\.error\('\[Sphinx OSINT\] Failed to fetch aircraft:', error\.message\);\s*if \(\!this\.cachedAircraft\) \{/,
  catchReplace
);

fs.writeFileSync('../sphinx-core/lib/opensky.mjs', content);

