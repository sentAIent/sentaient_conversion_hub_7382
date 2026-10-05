import React, { useEffect, useState } from 'react';
import { useMemory } from '../context/MemoryContext';

let cachedFeedsData = null;
let feedsDataPromise = null;

const fallbackFeedsData = {
  releaseRadar: [
    { package: 'three', oldVersion: '0.150.0', newVersion: '0.160.0', risk: 'high', type: 'breaking' },
    { package: 'react-three-fiber', oldVersion: '8.15.0', newVersion: '8.17.10', risk: 'low', type: 'minor' }
  ],
  hnBriefing: [
    { title: 'New Multi-Agent Framework Released', upvotes: 450 },
    { title: 'DeepSeek R1 Open Sourced', upvotes: 1200 }
  ],
  skillOptimization: {
    currentConfidence: 94.5,
    scopeCreepAlerts: 0,
    recentCommitsAnalyzed: 12
  }
};

const fetchFeedsData = () => {
  if (cachedFeedsData) return Promise.resolve(cachedFeedsData);
  if (feedsDataPromise) return feedsDataPromise;

  feedsDataPromise = fetch('http://localhost:3001/api/internal-feeds')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    })
    .then(d => {
      cachedFeedsData = d;
      feedsDataPromise = null;
      return d;
    })
    .catch(e => {
      console.warn('[SentAIent HUD] Port 3001 feeds offline, loading simulation feeds.');
      cachedFeedsData = fallbackFeedsData;
      feedsDataPromise = null;
      return fallbackFeedsData;
    });

  return feedsDataPromise;
};

const HUDPanel = ({ title, children, side }) => {
  return (
    <div className={`
      w-[800px] h-[600px] 
      bg-black/90
      border-2 ${side === 'left' ? 'border-[#00ff44]' : 'border-[#0088ff]'} 
      rounded-3xl p-8 
      flex flex-col
    `}>
      <h2 className={`
        text-4xl font-bold mb-6 tracking-widest uppercase
        ${side === 'left' ? 'text-[#00ff44]' : 'text-[#0088ff]'}
      `}>
        {title}
      </h2>
      <div className="flex-1 overflow-y-auto text-white text-xl flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

export const LeftHUD = () => {
  const [data, setData] = useState(cachedFeedsData);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!data) {
      fetchFeedsData()
        .then(d => setData(d))
        .catch(() => setError(true));
    }
  }, [data]);

  if (error) {
    return <HUDPanel title="System Status" side="left"><div>FEED OFFLINE</div></HUDPanel>;
  }

  if (!data) {
    return <HUDPanel title="System Status" side="left"><div>INITIALIZING...</div></HUDPanel>;
  }

  return (
    <HUDPanel title="Release Radar & Briefings" side="left">
      <div className="bg-[#010302] p-4 rounded-xl border border-[#00ff44]/30">
        <h3 className="text-2xl text-[#00ff44] mb-2">Release Radar</h3>
        {data.releaseRadar.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center mb-2 text-lg">
            <span>{item.package}</span>
            <span className="text-gray-400">{item.oldVersion} &rarr; <span className={item.risk === 'high' ? 'text-red-500' : 'text-green-400'}>{item.newVersion}</span></span>
          </div>
        ))}
      </div>
      
      <div className="bg-[#010302] p-4 rounded-xl border border-[#00ff44]/30 mt-4">
        <h3 className="text-2xl text-[#00ff44] mb-2">HN Briefing</h3>
        {data.hnBriefing.map((item, idx) => (
          <div key={idx} className="mb-2">
            <div className="text-lg">{item.title}</div>
            <div className="text-sm text-gray-500">Upvotes: {item.upvotes}</div>
          </div>
        ))}
      </div>
    </HUDPanel>
  );
};

export const RightHUD = () => {
  const [data, setData] = useState(cachedFeedsData);
  const [error, setError] = useState(false);
  const memoryContext = useMemory();
  const memory = memoryContext?.memory || {
    userVisitedRooms: [],
    preferences: {
      theme: 'matrix',
      voiceEnabled: true
    },
    activeAgentTask: null
  };

  useEffect(() => {
    if (!data) {
      fetchFeedsData()
        .then(d => setData(d))
        .catch(() => setError(true));
    }
  }, [data]);

  if (error) {
    return <HUDPanel title="Agent Metrics" side="right"><div>FEED OFFLINE</div></HUDPanel>;
  }

  if (!data) {
    return <HUDPanel title="Agent Metrics" side="right"><div>INITIALIZING...</div></HUDPanel>;
  }

  return (
    <HUDPanel title="Skill Optimization" side="right">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="bg-[#010302] p-6 rounded-xl border border-[#0088ff]/30 flex flex-col justify-center items-center">
          <div className="text-5xl font-bold text-[#0088ff]">{data.skillOptimization.currentConfidence}%</div>
          <div className="text-gray-400 mt-2 text-center uppercase tracking-wider text-sm">Agent Confidence</div>
        </div>
        
        <div className="bg-[#010302] p-6 rounded-xl border border-[#0088ff]/30 flex flex-col justify-center items-center">
          <div className="text-5xl font-bold text-red-500">{data.skillOptimization.scopeCreepAlerts}</div>
          <div className="text-gray-400 mt-2 text-center uppercase tracking-wider text-sm">Scope Creep Alerts</div>
        </div>
        
        <div className="col-span-2 bg-[#010302] p-6 rounded-xl border border-[#0088ff]/30 flex flex-col justify-center items-center">
          <div className="text-3xl text-white mb-2">Memory State</div>
          <div className="text-sm text-gray-400 mb-2">Theme: {memory.preferences.theme}</div>
          <div className="text-sm text-gray-400 mb-4">Voice: {memory.preferences.voiceEnabled ? 'ON' : 'OFF'}</div>
          <div className="text-5xl font-bold text-white">{data.skillOptimization.recentCommitsAnalyzed}</div>
          <div className="text-gray-400 mt-2 text-center uppercase tracking-wider text-sm">Commits Analyzed Today</div>
        </div>
      </div>
    </HUDPanel>
  );
};
