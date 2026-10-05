const fs = require('fs');

const file = '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/fantasy-quant/src/components/dfs/DFSDashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = "const generateMME = async () => {";
const endStr = "  const exportMME = () => {";

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const replacement = `const generateMME = async () => {
    setIsGeneratingMME(true);
    setMmeProgress(10); // Start progress

    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          week,
          season: 2026,
          platform,
          nLineups: mmeConfig.numLineups,
          maxExposure: mmeConfig.maxExposure / 100,
          stackQbWr: mmeConfig.forceQBStack,
          capTe: mmeConfig.capTE,
          excludedPlayers,
          lockedPlayers
        })
      });

      if (!res.ok) throw new Error("Optimizer failed");
      const data = await res.json();
      
      if (data.success && data.data && data.data.lineups) {
        setMmeProgress(80);
        
        const generated: (DFSPlayer | null)[][] = [];
        
        for (const lu of data.data.lineups) {
          const newLineup: (DFSPlayer | null)[] = new Array(9).fill(null);
          const usedIds = new Set<string>();
          
          for (let j = 0; j < slots.length; j++) {
            const slot = slots[j];
            const matchingPlayer = lu.players.find((p: any) => {
              if (usedIds.has(p.player_id)) return false;
              if (slot === p.position) return true;
              if (slot === 'FLEX' && ['RB', 'WR', 'TE'].includes(p.position)) return true;
              return false;
            });
            
            if (matchingPlayer) {
              const fullPlayer = playerPool.find(p => p.player_id === matchingPlayer.player_id);
              if (fullPlayer) {
                newLineup[j] = fullPlayer;
                usedIds.add(matchingPlayer.player_id);
              }
            }
          }
          generated.push(newLineup);
        }
        
        setMmeLineups(generated);
        setMmeProgress(100);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingMME(false);
    }
  };

`;
    
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    fs.writeFileSync(file, content);
    console.log("Success");
} else {
    console.log("Not found");
}
