import fetch from 'node-fetch';

async function test() {
  console.log("Fetching /api/osint/overpass...");
  const res = await fetch("http://127.0.0.1:3117/api/osint/overpass?bbox=-122.5,37.5,-122.0,38.0");
  const json = await res.json();
  console.log("Springs:", json.springs ? json.springs.features.length : "undefined");
  console.log("Power:", json.power ? json.power.features.length : "undefined");
  console.log("Error?", json.error);
}

test();
