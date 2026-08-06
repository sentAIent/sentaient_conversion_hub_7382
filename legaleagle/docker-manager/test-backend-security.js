const http = require('http');

const testCases = [
    { name: 'Missing API Key', path: '/api/due-diligence', headers: {}, expectSuccess: false },
    { name: 'Invalid API Key', path: '/api/due-diligence', headers: { 'x-api-key': 'wrong-key' }, expectSuccess: false },
    { name: 'Valid API Key', path: '/api/due-diligence', headers: { 'x-api-key': process.env.API_KEY || 'super-secret-local-key' }, expectSuccess: true },
];

async function runTests() {
    for (const test of testCases) {
        console.log(`Running test: ${test.name}`);
        const options = {
            hostname: 'localhost',
            port: 11236,
            path: test.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...test.headers
            }
        };

        const result = await new Promise((resolve) => {
            const req = http.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    resolve({ statusCode: res.statusCode, body: data });
                });
            });
            req.on('error', (err) => {
                resolve({ error: err.message });
            });
            req.write(JSON.stringify({ companyName: 'Test Corp' }));
            req.end();
        });

        if (result.error) {
            console.log(`❌ Error: ${result.error}`);
            continue;
        }

        const success = result.statusCode === 200 || result.statusCode === 400 || result.statusCode === 500; 
        
        if (test.expectSuccess) {
            if (result.statusCode === 401 || result.statusCode === 403) {
                console.log(`❌ Failed. Expected success, got: ${result.statusCode} ${result.body}`);
            } else {
                console.log(`✅ Passed. Accepted request (Status: ${result.statusCode})`);
            }
        } else {
            if (result.statusCode === 401) {
                console.log(`✅ Passed. Blocked request properly.`);
            } else {
                console.log(`❌ Failed. Expected 401, got: ${result.statusCode}`);
            }
        }
    }
}

runTests();
