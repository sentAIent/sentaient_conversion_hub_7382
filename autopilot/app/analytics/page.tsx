'use client';
import React from 'react';

export default function AnalyticsDashboard() {
  const macroStats = [
    { label: 'Total Impressions', value: '4.2M', trend: '+12.5%', isUp: true },
    { label: 'Engagement Rate', value: '8.4%', trend: '+1.2%', isUp: true },
    { label: 'Audience Growth', value: '12,403', trend: '+24.8%', isUp: true },
    { label: 'Conversion Clicks', value: '8,901', trend: '-2.1%', isUp: false },
  ];

  const recentPosts = [
    { id: '1', platform: 'Instagram', account: '@CloveH2O_Main', caption: '🌊 Dive into pure hydration...', impressions: '125K', engagement: '11.2%' },
    { id: '2', platform: 'TikTok', account: '@CloveH2O_Main', caption: 'The secret to glowing skin? 💧', impressions: '840K', engagement: '15.4%' },
    { id: '3', platform: 'Twitter/X', account: '@Founder_Personal', caption: 'Just launched our new product line!', impressions: '45K', engagement: '4.8%' },
    { id: '4', platform: 'LinkedIn', account: '@Mindwave_Official', caption: 'Excited to announce our Q3 results.', impressions: '12K', engagement: '6.1%' },
  ];

  return (
    <div className="min-h-screen p-8 md:p-12 bg-transparent text-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#60a9ff] drop-shadow-sm mb-2">
            Performance Analytics
          </h1>
          <p className="text-gray-300 font-medium tracking-wide">Macro & Micro data tracking across all connected accounts.</p>
        </header>

        {/* Macro Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {macroStats.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/10 transition-all shadow-lg">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <div className={`flex items-center gap-1 text-sm font-bold ${stat.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                  <span>{stat.isUp ? '▲' : '▼'}</span>
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Micro Data Table */}
        <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/10">
            <h2 className="text-xl font-bold tracking-wide">Recent Post Performance</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-xs uppercase tracking-wider text-gray-400 border-b border-white/10">
                  <th className="px-8 py-4 font-bold">Platform / Account</th>
                  <th className="px-8 py-4 font-bold">Content Snippet</th>
                  <th className="px-8 py-4 font-bold text-right">Impressions</th>
                  <th className="px-8 py-4 font-bold text-right">Engagement</th>
                  <th className="px-8 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentPosts.map(post => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[#60a9ff] font-bold text-sm mb-1">{post.platform}</span>
                        <span className="text-xs text-gray-400 font-mono bg-black/20 px-2 py-1 rounded inline-block w-fit">{post.account}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-300 font-mono truncate max-w-xs">
                      {post.caption}
                    </td>
                    <td className="px-8 py-6 text-right font-bold text-white">
                      {post.impressions}
                    </td>
                    <td className="px-8 py-6 text-right font-bold text-emerald-400">
                      {post.engagement}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-xs font-bold text-[#60a9ff] hover:text-white transition-colors bg-[#60a9ff]/10 hover:bg-[#60a9ff]/30 px-3 py-1.5 rounded-lg border border-[#60a9ff]/20">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
