const http = require('http');

const data = JSON.stringify({
  week: 1,
  season: 2026,
  platform: 'dk',
  nLineups: 2,
  maxExposure: 100,
  stackQbWr: true,
  capTe: true
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/optimize',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    if(res.statusCode === 200) {
      console.log("Success! Lineups length:", JSON.parse(body).data.lineups.length);
    } else {
      console.log("Response:", body);
    }
  });
});

req.write(data);
req.end();
