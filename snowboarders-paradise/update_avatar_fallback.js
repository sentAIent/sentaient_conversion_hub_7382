const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const oldAvatar = `export function SnowboarderAvatar({ animState, colors = {}, goggleColor, ghost }) {
  const { carving, inAir, grabbing, grabType, wipeout } = animState;`;

const newAvatar = `export function SnowboarderAvatar({ animState, colors = {}, goggleColor, ghost }) {
  const { carving, inAir, grabbing, grabType, wipeout } = animState || { carving: 0, inAir: false, grabbing: false, wipeout: false };`;

code = code.replace(oldAvatar, newAvatar);

fs.writeFileSync('components/Player.js', code);
console.log("Avatar updated.");
