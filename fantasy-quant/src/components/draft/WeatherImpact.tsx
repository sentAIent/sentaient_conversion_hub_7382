'use client';

import React from 'react';
import { CloudRain, Search } from 'lucide-react';

export default function WeatherImpact() {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Weather Impact</h2>
          <p className="text-sm text-gray-400">View games affected by extreme weather conditions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Mock Weather Card */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <CloudRain size={32} className="text-blue-400 mb-3" />
          <div className="text-sm font-semibold text-white">BUF @ NE</div>
          <div className="text-xs text-gray-400 mt-1">High winds, heavy rain</div>
          <div className="mt-3 px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-full border border-red-500/20">
            Pass game downgrade
          </div>
        </div>
        
        {/* Empty state filler */}
        <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center h-32">
          <p className="text-xs text-gray-500">More games loading...</p>
        </div>
      </div>
    </div>
  );
}
