import instagram from './instagram.json';
import facebook from './facebook.json';
import tiktok from './tiktok.json';
import x from './x.json';
import snapchat from './snapchat.json';

export const DEMOS = [
  instagram,
  facebook,
  tiktok,
  x,
  snapchat
];

export const getDemoById = (id: string) => DEMOS.find(demo => demo.id === id);
