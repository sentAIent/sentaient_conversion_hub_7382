'use client';

import { useState, useEffect } from 'react';
import { Title, Card, Text, AreaChart, BarChart, Flex, Grid, Badge, Switch } from '@tremor/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlayerDeepDive({ params }: { params: { id: string } }) {
  const [zoomLevel, setZoomLevel] = useState<'CAREER' | 'SEASON' | 'GAME'>('CAREER');
  const [data, setData] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<any | null>(null);
  const [selectedGame, setSelectedGame] = useState<any | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = (premium: boolean) => {
    setLoading(true);
    fetch(`/api/player-deep-dive?team=${params.id}&position=WR&premium=${premium}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data);
        setLoading(false);
        // If we are currently zoomed into a game, update the selected game data
        if (selectedGame) {
           for (let s of json.data) {
             const g = s.games.find((x:any) => x.gameId === selectedGame.gameId);
             if (g) setSelectedGame(g);
           }
        }
      });
  };

  useEffect(() => {
    fetchData(isPremium);
  }, [params.id, isPremium]);

  const handleSeasonClick = (season: any) => {
    setSelectedSeason(season);
    setZoomLevel('SEASON');
  };

  const handleGameClick = (game: any) => {
    setSelectedGame(game);
    setZoomLevel('GAME');
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'spring' } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <Flex className="mb-8 items-center">
          <Title className="text-white text-3xl font-mono uppercase tracking-widest">
            Player Deep Dive: {params.id}
          </Title>
          
          <Flex className="space-x-4 max-w-xs ml-auto items-center">
            <Text className={`font-mono text-xs ${!isPremium ? 'text-indigo-400' : 'text-gray-500'}`}>BASIC SOS</Text>
            <Switch 
               id="premium-switch" 
               name="premium-switch" 
               checked={isPremium} 
               onChange={(v) => setIsPremium(v)} 
               color="amber"
            />
            <Text className={`font-mono text-xs font-bold ${isPremium ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'text-gray-500'}`}>
              PREMIUM MATCHUPS
            </Text>
          </Flex>
        </Flex>
        
        <div className="space-x-2 font-mono text-sm mb-6">
          <button 
            onClick={() => setZoomLevel('CAREER')}
            className={`px-3 py-1 rounded ${zoomLevel === 'CAREER' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'}`}
          >
            MACRO (ALL SEASONS)
          </button>
          <button 
            disabled={!selectedSeason}
            onClick={() => setZoomLevel('SEASON')}
            className={`px-3 py-1 rounded ${zoomLevel === 'SEASON' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 disabled:opacity-50'}`}
          >
            MID (SEASON)
          </button>
        </div>

        {loading ? (
           <Text className="text-gray-500 animate-pulse font-mono">Loading Neural Matrices...</Text>
        ) : (
        <AnimatePresence mode="wait">
          {/* ZOOM LEVEL 1: CAREER MACRO */}
          {zoomLevel === 'CAREER' && (
            <motion.div key="career" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <Card className="bg-[#111] border-gray-800">
                <Title className="text-white">Career Trajectory vs Defensive Difficulty</Title>
                <Text className="text-gray-400 mb-6">Click on a season to zoom in.</Text>
                <AreaChart
                  className="h-72 mt-4"
                  data={data.map(d => ({
                    year: d.season.toString(),
                    "Avg Implied Total": parseFloat(d.avgImpliedTotal.toFixed(1)),
                    "Avg Opp FPA Rank (Higher = Easier)": parseFloat(d.avgOppFpaRank.toFixed(1))
                  }))}
                  index="year"
                  categories={["Avg Implied Total", "Avg Opp FPA Rank (Higher = Easier)"]}
                  colors={["indigo", "cyan"]}
                  yAxisWidth={40}
                  onValueChange={(v) => {
                    if (v && v.year) {
                      const s = data.find(x => x.season.toString() === v.year);
                      if (s) handleSeasonClick(s);
                    }
                  }}
                />
              </Card>
            </motion.div>
          )}

          {/* ZOOM LEVEL 2: SEASON TIMELINE */}
          {zoomLevel === 'SEASON' && selectedSeason && (
            <motion.div key="season" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
              <Card className="bg-[#111] border-gray-800">
                <Title className="text-white">{selectedSeason.season} Season Timeline</Title>
                <Text className="text-gray-400 mb-6">Game-by-game Vegas Totals vs Defensive SOS. Click a game to micro-zoom.</Text>
                
                <BarChart
                  className="h-72 mt-4"
                  data={selectedSeason.games.map((g:any) => ({
                    name: `Wk ${g.week} vs ${g.opponent}`,
                    "Implied Total": g.impliedTotal || 0,
                    "Opp SOS Rank": g.oppFpaRank || 0,
                    raw: g
                  }))}
                  index="name"
                  categories={["Implied Total", "Opp SOS Rank"]}
                  colors={["indigo", "rose"]}
                  yAxisWidth={40}
                  onValueChange={(v: any) => {
                    if (v && v.raw) handleGameClick(v.raw);
                  }}
                />
              </Card>
            </motion.div>
          )}

          {/* ZOOM LEVEL 3: MICRO GAME CARD */}
          {zoomLevel === 'GAME' && selectedGame && (
            <motion.div key="game" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
              <Grid numItems={1} numItemsSm={isPremium ? 3 : 2} className="gap-6">
                
                <Card className="bg-[#111] border-gray-800" decoration="left" decorationColor="indigo">
                  <Title className="text-white mb-2">Vegas Projections</Title>
                  <Flex className="mt-4 border-b border-gray-800 pb-2">
                    <Text className="text-gray-400">Spread</Text>
                    <Text className="text-white font-mono">{selectedGame.spread}</Text>
                  </Flex>
                  <Flex className="mt-4 border-b border-gray-800 pb-2">
                    <Text className="text-gray-400">Over/Under</Text>
                    <Text className="text-white font-mono">{selectedGame.total}</Text>
                  </Flex>
                  <Flex className="mt-4">
                    <Text className="text-gray-400">Team Implied Total</Text>
                    <Text className="text-indigo-400 font-mono text-xl">{selectedGame.impliedTotal}</Text>
                  </Flex>
                </Card>

                <Card className="bg-[#111] border-gray-800" decoration="left" decorationColor="rose">
                  <Title className="text-white mb-2">Defensive SOS</Title>
                  <Flex className="mt-4 border-b border-gray-800 pb-2">
                    <Text className="text-gray-400">Opponent</Text>
                    <Text className="text-white font-mono">{selectedGame.opponent} {selectedGame.isHome ? '(HOME)' : '(AWAY)'}</Text>
                  </Flex>
                  <Flex className="mt-4">
                    <Text className="text-gray-400">Positional FPA Rank</Text>
                    <Badge color={selectedGame.oppFpaRank <= 10 ? 'rose' : selectedGame.oppFpaRank >= 22 ? 'emerald' : 'yellow'}>
                      {selectedGame.oppFpaRank} / 32
                    </Badge>
                  </Flex>
                </Card>

                {/* PREMIUM MICRO-MATCHUP MATRIX CARD */}
                {isPremium && (
                  <Card className="bg-gradient-to-br from-[#1a1500] to-[#0a0a0a] border-amber-900 shadow-[0_0_15px_rgba(251,191,36,0.1)]" decoration="top" decorationColor="amber">
                    <Title className="text-amber-400 mb-2 font-mono flex items-center">
                      <span className="mr-2">⚡</span> MICRO-MATCHUP MATRIX
                    </Title>
                    {selectedGame.matchups && selectedGame.matchups.length > 0 ? (
                      <div className="space-y-4 mt-4">
                        {selectedGame.matchups.slice(0, 1).map((m: any, idx: number) => (
                           <div key={idx}>
                             <Flex className="border-b border-amber-900/50 pb-2">
                               <Text className="text-gray-400">Primary Defender</Text>
                               <Text className="text-white font-mono">{m.defensive_player}</Text>
                             </Flex>
                             <Flex className="mt-2 border-b border-amber-900/50 pb-2">
                               <Text className="text-gray-400">Shadow Rate</Text>
                               <Text className="text-rose-400 font-mono">{m.shadow_rate_percent}%</Text>
                             </Flex>
                             <Flex className="mt-2">
                               <Text className="text-gray-400">Route Win Rate</Text>
                               <Text className="text-emerald-400 font-mono">{m.route_win_rate}%</Text>
                             </Flex>
                           </div>
                        ))}
                      </div>
                    ) : (
                      <Flex className="mt-8 justify-center">
                        <Text className="text-amber-700 font-mono text-sm">NO PREMIUM NGS DATA FOR THIS GAME</Text>
                      </Flex>
                    )}
                  </Card>
                )}

              </Grid>
              <button 
                onClick={() => setZoomLevel('SEASON')}
                className="mt-6 text-gray-500 hover:text-white font-mono text-sm underline"
              >
                &larr; Back to {selectedSeason.season} Season View
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        )}
      </main>
    </div>
  );
}
