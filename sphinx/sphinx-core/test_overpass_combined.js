const fs = require('fs');

const query = `[out:json][timeout:25];
(
  node["natural"="spring"](38.8,-120.1,39.0,-119.9);
  node["power"="substation"](38.8,-120.1,39.0,-119.9);
);
out center;`;

console.log(query);
