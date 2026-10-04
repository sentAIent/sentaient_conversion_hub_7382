const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const regex = /setAnimState\(\{ carving: Math\.sign\(angularVel\.current\), inAir, grabbing: inAir && controls\.current\.grab, grabType: controls\.current\.grab1 \? 'method' : controls\.current\.grab2 \? 'indy' : controls\.current\.grab3 \? 'stiffy' : null, wipeout: false \}\);/g;

const fixed = `
    const newCarving = Math.sign(angularVel.current);
    const newGrabbing = inAir && controls.current.grab;
    const newGrabType = controls.current.grab1 ? 'method' : controls.current.grab2 ? 'indy' : controls.current.grab3 ? 'stiffy' : null;
    
    setAnimState(prev => {
      if (prev.carving === newCarving && prev.inAir === inAir && prev.grabbing === newGrabbing && prev.grabType === newGrabType && prev.wipeout === false) {
        return prev;
      }
      return { carving: newCarving, inAir, grabbing: newGrabbing, grabType: newGrabType, wipeout: false };
    });
`;

code = code.replace(regex, fixed);
fs.writeFileSync('components/Player.js', code);
