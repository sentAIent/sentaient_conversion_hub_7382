const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

async function run() {
  console.log("Removing background...");
  try {
    const in_path = "/Users/ute/.gemini/antigravity/brain/1a9251b7-b38b-4cb5-a62d-38d61fba34f7/media__1783837403450.jpg";
    const blob = await removeBackground(in_path);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync("/Users/ute/Dev/sentaient_conversion_hub_7382-Website/lim_clone/frontend/public/contango_logo_v9.png", buffer);
    console.log("Done!");
  } catch(e) {
    console.error(e);
  }
}
run();
