import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
async function run() {
  const { GET } = await import('./src/app/api/verification/route.ts');
  const res = await GET();
  const json = await res.json();
  console.log("Error?", json.error);
  console.log("Data length:", json.data?.length);
}
run();
