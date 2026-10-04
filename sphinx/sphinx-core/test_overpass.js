fetch('http://127.0.0.1:3117/api/osint/power?bbox=-120,38,-119,39')
  .then(r => r.json())
  .then(data => {
    console.log(`Success! Features: ${data.features.length}`);
  })
  .catch(err => console.error(err));
