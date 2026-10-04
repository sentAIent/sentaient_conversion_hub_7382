import fs from 'fs';

// Mock import.meta.env by replacing it in the file contents
const source = fs.readFileSync('src/services/promptParser.js', 'utf-8');
const mockedSource = source.replace('import.meta.env.VITE_GEMINI_API_KEY', 'undefined');
fs.writeFileSync('src/services/promptParser.temp.mjs', mockedSource);

import { parseScenePrompt } from './src/services/promptParser.temp.mjs';

async function run() {
  console.log("Testing Fallback Logic (No API Key):");
  const result1 = await parseScenePrompt("A rainy night reading 1984");
  console.log(result1);
  
  fs.unlinkSync('src/services/promptParser.temp.mjs');
}

run();
