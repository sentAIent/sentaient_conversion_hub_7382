const https = require('https');

// Expects an environment variable 'SUPABASE_PROJECTS' containing a JSON array
// Example: [{"url": "https://xxx.supabase.co", "key": "yyy"}, ...]

const projectsJson = process.env.SUPABASE_PROJECTS;

if (!projectsJson) {
  console.error('No SUPABASE_PROJECTS environment variable found.');
  process.exit(1);
}

let projects = [];
try {
  projects = JSON.parse(projectsJson);
} catch (e) {
  console.error('Failed to parse SUPABASE_PROJECTS as JSON.', e);
  process.exit(1);
}

console.log(`Loaded ${projects.length} databases to ping.`);

async function pingProject(project, index) {
  return new Promise((resolve) => {
    // We ping the /rest/v1/ endpoint (even if we get a 400 or empty array, it counts as activity)
    // You can also ping /rest/v1/?limit=1 or similar.
    const targetUrl = new URL('/rest/v1/', project.url);
    
    console.log(`[${index + 1}/${projects.length}] Pinging ${project.url}...`);
    
    const options = {
      hostname: targetUrl.hostname,
      path: targetUrl.pathname + targetUrl.search,
      method: 'GET',
      headers: {
        'apikey': project.key,
        'Authorization': `Bearer ${project.key}`
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      console.log(`[${index + 1}/${projects.length}] Status: ${res.statusCode} OK`);
      res.on('data', () => {}); // Consume data
      res.on('end', resolve);
    });

    req.on('error', (e) => {
      console.error(`[${index + 1}/${projects.length}] Error pinging ${project.url}:`, e.message);
      resolve();
    });
    
    req.on('timeout', () => {
      console.error(`[${index + 1}/${projects.length}] Timeout pinging ${project.url}`);
      req.destroy();
      resolve();
    });

    req.end();
  });
}

async function run() {
  for (let i = 0; i < projects.length; i++) {
    await pingProject(projects[i], i);
  }
  console.log('All databases pinged successfully.');
}

run();
