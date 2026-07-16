const http = require('http');

http.get('http://localhost:3000/api/optimize?week=14&season=2023&platform=dk', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data.substring(0, 500) + '...'));
});
