'use client';

import React, { useState, useEffect } from 'react';
import { Title, Card, Text, Select, SelectItem, Flex, Grid, Badge } from '@tremor/react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { Settings, BarChart2, MousePointer2 } from '@/components/icons';

const AVAILABLE_METRICS = [
  { value: 'yards_per_route_run', label: 'Yards Per Route Run (YPRR)' },
  { value: 'targeted_passer_rating', label: 'Targeted Passer Rating' },
  { value: 'targets_per_route_run', label: 'Targets Per Route Run' },
  { value: 'target_share', label: 'Target Share %' },
  { value: 'air_yards_share', label: 'Air Yards Share %' },
  { value: 'wopr', label: 'WOPR (Weighted Opportunity)' },
  { value: 'expected_fantasy_points', label: 'Expected Fantasy Points' },
  { value: 'fantasy_points_over_expected', label: 'Fantasy Points Over Expected (FPOE)' },
  { value: 'adot', label: 'Average Depth of Target (aDOT)' },
  { value: 'racr', label: 'RACR (Receiver Air Conversion)' },
  { value: 'epa_per_play', label: 'EPA Per Play' }
];

export default function DataExplorerPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [xAxis, setXAxis] = useState('targeted_passer_rating');
  const [yAxis, setYAxis] = useState('yards_per_route_run');
  const [positionFilter, setPositionFilter] = useState('WR');

  useEffect(() => {
    fetch('/api/data-explorer?season=2026')
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter(d => 
    d.position === positionFilter && 
    d[xAxis] !== null && 
    d[yAxis] !== null &&
    d[xAxis] !== undefined && 
    d[yAxis] !== undefined
  );

  const getDomain = (key: string) => {
    if (!filteredData.length) return [0, 100];
    const vals = filteredData.map(d => d[key]);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const padding = (max - min) * 0.1;
    return [
      key.includes('share') || key === 'rec_pct' ? 0 : Number((min - padding).toFixed(2)), 
      Number((max + padding).toFixed(2))
    ];
  };

  const getMetricLabel = (val: string) => AVAILABLE_METRICS.find(m => m.value === val)?.label || val;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#0f1115]/95 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-2xl text-sm min-w-[200px]">
          <div className="text-white font-bold mb-1 pb-2 border-b border-white/10 flex justify-between items-center">
            <span>{data.name}</span>
            <span className="text-xs font-normal text-gray-400">{data.team} • {data.position}</span>
          </div>
          <div className="space-y-1.5 mt-2">
            <div className="flex justify-between">
              <span className="text-gray-400">{getMetricLabel(xAxis)}:</span>
              <span className="text-blue-400 font-semibold">{data[xAxis]?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{getMetricLabel(yAxis)}:</span>
              <span className="text-emerald-400 font-semibold">{data[yAxis]?.toFixed(2)}</span>
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
            <BarChart2 className="w-8 h-8 text-blue-500" /> 
            Dynamic Data Explorer
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl text-sm">
            Plot custom advanced metrics against each other to discover hidden alpha and efficiency outliers.
          </p>
        </header>

        <Grid numItemsLg={4} className="gap-6">
          <Card className="bg-[#111] border-white/10 col-span-1 h-fit">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
              <Settings className="w-4 h-4 text-gray-400" />
              <Title className="text-white text-sm">Chart Configuration</Title>
            </div>
            
            <div className="space-y-6">
              <div>
                <Text className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-widest">X-Axis Metric</Text>
                <Select value={xAxis} onValueChange={setXAxis} className="w-full">
                  {AVAILABLE_METRICS.map(m => (
                    <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                  ))}
                </Select>
              </div>
              
              <div>
                <Text className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-widest">Y-Axis Metric</Text>
                <Select value={yAxis} onValueChange={setYAxis} className="w-full">
                  {AVAILABLE_METRICS.map(m => (
                    <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <Text className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-widest">Position Filter</Text>
                <Select value={positionFilter} onValueChange={setPositionFilter} className="w-full">
                  <SelectItem value="WR">Wide Receivers (WR)</SelectItem>
                  <SelectItem value="TE">Tight Ends (TE)</SelectItem>
                  <SelectItem value="RB">Running Backs (RB)</SelectItem>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="bg-[#111] border-white/10 col-span-3 min-h-[600px] flex flex-col relative">
            <Title className="text-white text-lg flex items-center gap-2">
              <MousePointer2 className="w-4 h-4 text-gray-500" />
              {getMetricLabel(xAxis)} vs {getMetricLabel(yAxis)}
            </Title>
            
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <Text className="animate-pulse text-blue-500">Executing distributed SQL query...</Text>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <Text className="text-gray-500">No data found for this combination.</Text>
              </div>
            ) : (
              <div className="flex-1 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    
                    <XAxis 
                      type="number" 
                      dataKey={xAxis} 
                      name={getMetricLabel(xAxis)} 
                      domain={getDomain(xAxis)}
                      stroke="rgba(255,255,255,0.4)"
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                    >
                    </XAxis>
                    
                    <YAxis 
                      type="number" 
                      dataKey={yAxis} 
                      name={getMetricLabel(yAxis)}
                      domain={getDomain(yAxis)}
                      stroke="rgba(255,255,255,0.4)"
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                    >
                    </YAxis>
                    
                    <ZAxis type="number" range={[60, 60]} />
                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                    
                    <Scatter name="Players" data={filteredData}>
                      {filteredData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry[yAxis] > (getDomain(yAxis)[1] + getDomain(yAxis)[0]) / 2 && entry[xAxis] > (getDomain(xAxis)[1] + getDomain(xAxis)[0]) / 2 ? '#10b981' : '#3b82f6'} 
                          fillOpacity={0.7}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>

                <div className="absolute top-16 right-8 text-xs text-emerald-500/50 font-bold uppercase pointer-events-none">
                  Elite Quadrant ↗
                </div>
              </div>
            )}
          </Card>
        </Grid>
      </main>
    </div>
  );
}
