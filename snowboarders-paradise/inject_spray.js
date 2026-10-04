const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const importStr = "import { PowderSpray } from './PowderSpray';\n";
code = code.replace("import { IncredibleSnowboarder", importStr + "import { IncredibleSnowboarder");

// Find where IncredibleSnowboarder is rendered and add PowderSpray next to it
const renderStr = "{introState !== 'heli' && <IncredibleSnowboarder animState={animState} colors={colors} />}";
const newRenderStr = "{introState !== 'heli' && <IncredibleSnowboarder animState={animState} colors={colors} />}\n        {introState === 'playing' && !animState.inAir && animState.carving !== 0 && <PowderSpray active={true} />}";

code = code.replace(renderStr, newRenderStr);

fs.writeFileSync('components/Player.js', code);
