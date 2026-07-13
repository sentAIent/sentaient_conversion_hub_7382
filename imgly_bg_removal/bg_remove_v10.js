const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

async function run() {
  console.log("Removing background...");
  try {
    const in_path = "cropped_v10.jpg";
    const blob = await removeBackground(in_path);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync("/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_v10.png", buffer);
    console.log("Done!");
  } catch(e) {
    console.error(e);
  }
}
run();
