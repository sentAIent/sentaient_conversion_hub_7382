const assert = require('assert');

function runLayout(W, H, type) {
    const widthScale = W / 1800;
    const heightScale = H / 1100;
    const scale = Math.min(1.0, Math.max(0.40, Math.min(widthScale, heightScale))); 
    
    const elements = {};
    const setCoords = (id, cssMap, origin = 'top left') => {
        elements[id] = { ...cssMap, scale };
    };

    const topY = 72;
    const bottomY = 72; 
    const gemsH = 180;
    const gap = 10 * scale; 

    if (type === 'wide') {
        let currentX = 15;
        setCoords('sectionVitals', { top: `${topY}px`, left: `${currentX}px` });
        currentX += (220 * scale) + gap;

        setCoords('sectionMap', { top: `${topY}px`, left: `${currentX}px` });
        currentX += (220 * scale) + gap;

        setCoords('sectionRadar', { top: `${topY}px`, left: `${currentX}px` });
        currentX += (170 * scale) + gap;

        setCoords('sectionVelocity', { top: `${topY}px`, left: `${currentX}px` });
        currentX += (210 * scale) + gap;

        setCoords('sectionShipStatus', { top: `${topY}px`, left: `${currentX}px` });
        currentX += (220 * scale) + gap;
        
        setCoords('sectionControls', { top: `${topY}px`, left: `${currentX}px` });
        currentX += (220 * scale) + gap;

        setCoords('sectionShipDesign', { top: `${topY}px`, left: `${currentX}px` });
        currentX += (220 * scale) + gap;
        
        setCoords('floatingLeaders', { top: `${topY}px`, left: `${currentX}px` });
        currentX += (260 * scale) + gap;

        setCoords('sectionMission', { top: `${topY + (200 * scale) + gap}px`, left: '15px' });
        setCoords('sectionFactions', { top: `${topY + (200 * scale) + gap}px`, left: `${15 + (220 * scale) + gap}px` });
        setCoords('sectionGems', { bottom: `${bottomY}px`, left: '15px', right: '15px', height: `${gemsH}px` }, 'bottom center');
        
        console.log(`WIDE: Max width reached: ${currentX} (Screen width: ${W})`);
    } else if (type === 'tall') {
        let leftY = topY;
        setCoords('sectionVitals', { top: `${leftY}px`, left: '15px' });
        leftY += (120 * scale) + gap;

        setCoords('sectionMap', { top: `${leftY}px`, left: '15px' });
        leftY += (200 * scale) + gap;

        setCoords('sectionRadar', { top: `${leftY}px`, left: '15px' });
        leftY += (200 * scale) + gap;

        setCoords('sectionVelocity', { top: `${leftY}px`, left: '15px' });
        leftY += (200 * scale) + gap;

        setCoords('sectionControls', { top: `${leftY}px`, left: '15px' });
        leftY += (200 * scale) + gap;
        
        console.log(`TALL Left: Max height reached: ${leftY} (Screen height: ${H})`);

        let rightY = topY;
        setCoords('floatingLeaders', { top: `${rightY}px`, right: '15px' }, 'top right');
        rightY += (260 * scale) + gap;

        setCoords('sectionShipStatus', { top: `${rightY}px`, right: '15px' }, 'top right');
        rightY += (160 * scale) + gap;

        setCoords('sectionShipDesign', { top: `${rightY}px`, right: '15px' }, 'top right');
        rightY += (230 * scale) + gap; 
        
        setCoords('sectionMission', { top: `${rightY}px`, right: '15px' }, 'top right');
        rightY += (100 * scale) + gap;
        
        setCoords('sectionFactions', { top: `${rightY}px`, right: '15px' }, 'top right');
        rightY += (100 * scale) + gap;
        
        console.log(`TALL Right: Max height reached: ${rightY} (Screen height: ${H})`);
        
        setCoords('sectionGems', { bottom: `${bottomY}px`, left: '15px', right: '15px', height: `${gemsH}px` }, 'bottom center');
    }
    return elements;
}

runLayout(1920, 1080, 'wide');
runLayout(1920, 1080, 'tall');
runLayout(1280, 720, 'wide');
runLayout(1280, 720, 'tall');
runLayout(800, 600, 'tall');

