import { WatchtowerService } from './lib/watchtower.mjs';

async function test() {
  const watch = new WatchtowerService();
  const data = await watch.fetchAllOverpass('-122.5,37.7,-122.4,37.8');
  console.log(JSON.stringify(data, null, 2).slice(0, 500));
}

test();
