import { runBountyScraper } from './src/services/scraper';

(async () => {
  console.log('Testing scraper...');
  await runBountyScraper('00000000-0000-0000-0000-000000000000');
  console.log('Scraper test finished.');
  process.exit(0);
})();
