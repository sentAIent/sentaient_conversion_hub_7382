const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const oldAvatar = `export function SnowboarderAvatar({ animState, goggleColor }) {
  const { carving, inAir, grabbing, wipeout } = animState;`;

const newAvatar = `export function SnowboarderAvatar({ animState, goggleColor }) {
  const { carving, inAir, grabbing, grabType, wipeout } = animState;`;

code = code.replace(oldAvatar, newAvatar);

const oldPose = `  const bodyLeanX = inAir ? (grabbing ? 0.6 : 0) : 0;
  
  const leftArmRotZ = inAir && grabbing ? -1.5 : (inAir ? -1.0 : -0.3);
  const leftArmRotX = inAir && grabbing ? 0.5 : 0;
  
  const rightArmRotZ = inAir && grabbing ? 1.5 : (inAir ? 1.0 : 0.3);
  const rightArmRotX = inAir && grabbing ? 0.5 : 0;`;

const newPose = `  const bodyLeanX = inAir ? (grabbing ? 0.6 : 0) : 0;
  
  let leftArmRotZ = inAir ? -1.0 : -0.3;
  let leftArmRotX = 0;
  let rightArmRotZ = inAir ? 1.0 : 0.3;
  let rightArmRotX = 0;

  if (inAir && (grabbing || grabType)) {
    if (grabType === 'method') {
      leftArmRotZ = -1.8; leftArmRotX = 1.0;
      rightArmRotZ = 0.5; rightArmRotX = -0.5;
    } else if (grabType === 'indy') {
      rightArmRotZ = 1.8; rightArmRotX = 1.0;
      leftArmRotZ = -0.5; leftArmRotX = -0.5;
    } else if (grabType === 'stiffy') {
      leftArmRotZ = -1.5; leftArmRotX = -0.8;
      rightArmRotZ = 1.5; rightArmRotX = -0.8;
    } else {
      leftArmRotZ = -1.5; leftArmRotX = 0.5;
      rightArmRotZ = 1.5; rightArmRotX = 0.5;
    }
  }`;

code = code.replace(oldPose, newPose);
fs.writeFileSync('components/Player.js', code);
console.log("Avatar updated.");
