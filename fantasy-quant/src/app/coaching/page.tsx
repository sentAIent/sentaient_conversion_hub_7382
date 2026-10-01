'use client';

import { useState, useEffect } from 'react';
import { Title, Card, Text, Flex, Grid, Badge } from '@tremor/react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

export default function CoachingDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/coaching-tendencies?season=2026')
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data);
        setLoading(false);
      });
  }, []);

  const chartData = data.map(d => ({
    team: d.team,
    pace: d.pace_seconds_per_play,
    proe: d.proe,
    play_action: d.play_action_rate,
    coach: d.head_coach,
    oc: d.offensive_coordinator
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-[#0f1115]/95 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-2xl text-sm min-w-[200px]">
          <div className="text-white font-bold mb-1 pb-2 border-b border-white/10 flex justify-between items-center">
            <span>{d.team}</span>
            <span className="text-xs font-normal text-gray-400">PROE: {d.proe > 0 ? '+' : ''}{d.proe}%</span>
          </div>
          <div className="space-y-1.5 mt-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Head Coach:</span>
              <span className="text-gray-200">{d.coach}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pace (sec/play):</span>
              <span className="text-indigo-400 font-semibold">{d.pace}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Play Action Rate:</span>
              <span className="text-emerald-400 font-semibold">{d.play_action}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-6 pt-24 lg:p-12 font-mono">
      <main className="max-w-7xl mx-auto space-y-8">
        <header className="border-b border-white/10 pb-6">
          <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
            <span className="text-amber-500">⚡</span> Coaching Tendencies
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl text-sm">
            Pace vs Pass Rate Over Expectation (PROE). Lower seconds = Faster pace. Top Left quadrant is optimal for fantasy volume.
          </p>
        </header>

        {loading ? (
          <Text className="animate-pulse text-amber-500">Aggregating play-by-play data...</Text>
        ) : (
          <Grid numItems={1} className="gap-6">
            <Card className="bg-[#111] border border-white/10 rounded-2xl p-6 relative">
              <Title className="text-white mb-2">Pace vs PROE Matrix (2026)</Title>
              <Text className="text-gray-400 mb-8 text-sm">Y-Axis: PROE % | X-Axis: Pace (Sec/Play)</Text>
              
              <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    
                    <XAxis 
                      type="number" 
                      dataKey="pace" 
                      name="Pace" 
                      domain={[24, 32]}
                      stroke="rgba(255,255,255,0.4)"
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                      reversed={true} // Reverse so faster pace (lower number) is on the left
                    >
                    </XAxis>
                    
                    <YAxis 
                      type="number" 
                      dataKey="proe" 
                      name="PROE"
                      domain={[-10, 10]}
                      stroke="rgba(255,255,255,0.4)"
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                    >
                    </YAxis>
                    
                    <ZAxis type="number" dataKey="play_action" range={[40, 200]} name="Play Action %" />
                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                    
                    <Scatter name="Teams" data={chartData}>
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.proe > 0 && entry.pace < 28 ? '#10b981' : '#3b82f6'} 
                          fillOpacity={0.8}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute top-20 left-12 text-xs text-emerald-500/50 font-bold uppercase pointer-events-none">
                ↖ Elite Quadrant (Fast & Pass Heavy)
              </div>
            </Card>

            <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mt-8">
              {data.map((team) => (
                <Card key={team.id || team.team} className="bg-[#111] border border-white/10 rounded-2xl p-5 hover:border-amber-500/50 transition-colors">
                  <Flex className="mb-4">
                    <Title className="text-white text-xl font-black">{team.team}</Title>
                    <Badge color={team.proe > 0 ? "emerald" : "rose"} className="bg-white/5 border-white/10">
                      {team.proe > 0 ? '+' : ''}{team.proe.toFixed(1)}% PROE
                    </Badge>
                  </Flex>
                  <div className="space-y-2 text-sm">
                    <Flex>
                      <Text className="text-gray-500">HC</Text>
                      <Text className="text-gray-300 font-medium truncate max-w-[150px]" title={team.head_coach}>{team.head_coach}</Text>
                    </Flex>
                    <Flex>
                      <Text className="text-gray-500">OC</Text>
                      <Text className="text-gray-300 font-medium truncate max-w-[150px]" title={team.offensive_coordinator}>{team.offensive_coordinator}</Text>
                    </Flex>
                    <Flex className="pt-3 mt-3 border-t border-white/5">
                      <Text className="text-gray-500">Pace</Text>
                      <Text className="text-indigo-400 font-bold">{team.pace_seconds_per_play}s</Text>
                    </Flex>
                  </div>
                </Card>
              ))}
            </Grid>
          </Grid>
        )}
      </main>
    </div>
  );
}
