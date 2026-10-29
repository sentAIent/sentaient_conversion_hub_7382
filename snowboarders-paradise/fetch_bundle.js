const http = require('http');

http.get({
  hostname: 'localhost',
  port: 8081,
  path: '/index.bundle?platform=web&dev=true',
  agent: false
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data.substring(0, 5000));
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});
