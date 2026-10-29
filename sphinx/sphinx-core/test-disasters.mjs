import { DisastersService } from './lib/disasters.mjs';
const d = new DisastersService();
d.fetchSevereWeather('live').then(console.log).catch(console.error);
