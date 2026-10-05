import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  const { GET } = await import('./src/app/api/optimize/route.ts');
  const req = new Request('http://localhost:3000/api/optimize?week=1&season=2026&platform=dk');
  const res = await GET(req);
  const json = await res.json();
  console.log("Data length:", json.data?.length);
  if (json.data && json.data.length > 0) {
    console.log("First item:", json.data[0]);
  } else {
    console.log("No data");
  }
}
run();
