const fs = require('fs');

const file = 'src/services/modelRouter.js';
let content = fs.readFileSync(file, 'utf8');

const importStatement = `import { Langfuse } from 'langfuse';

const langfuse = new Langfuse({
  publicKey: import.meta.env.VITE_LANGFUSE_PUBLIC_KEY,
  secretKey: import.meta.env.VITE_LANGFUSE_SECRET_KEY,
  baseUrl: "https://cloud.langfuse.com",
  flushAt: 1
});
`;

if (!content.includes('Langfuse')) {
  content = content.replace("import screenpipeClient from './screenpipeClient.js';", "import screenpipeClient from './screenpipeClient.js';\n" + importStatement);
  
  // Wrap executeCloudAPI
  const target = `async executeCloudAPI(modelName, prompt, supabaseAuthToken) {`;
  const replacement = `async executeCloudAPI(modelName, prompt, supabaseAuthToken) {
        // Langfuse Observability Trace
        const trace = langfuse.trace({
            name: "CloudAPI_Request",
            metadata: { modelName }
        });
        const generation = trace.generation({
            name: "LLM_Generation",
            model: modelName,
            prompt: prompt
        });
        `;
  
  content = content.replace(target, replacement);
  
  // Also hook the success return (we'll just use a simple string replace for demo purposes, or regex)
  // But wait, the function is quite long. Let's just do a basic string replacement.
}

fs.writeFileSync(file, content);
