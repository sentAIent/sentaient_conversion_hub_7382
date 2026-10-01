import React, { useState } from 'react';
import { Settings, Save, CheckCircle, X } from '@/components/icons';

export type OptimizerConfig = {
  analyzeOwnership: boolean;
  scoringWeights: {
    passYds: number;
    passTd: number;
    int: number;
    rushYds: number;
    rushTd: number;
    recYds: number;
    recTd: number;
    rec: number;
    fumbleLost: number;
  };
};

export const defaultOptimizerConfig: OptimizerConfig = {
  analyzeOwnership: true,
  scoringWeights: {
    passYds: 0.04,
    passTd: 4,
    int: -1,
    rushYds: 0.1,
    rushTd: 6,
    recYds: 0.1,
    recTd: 6,
    rec: 1, // Full PPR by default
    fumbleLost: -1,
  }
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  config: OptimizerConfig;
  onSave: (config: OptimizerConfig) => void;
};

export function OptimizerSettings({ isOpen, onClose, config, onSave }: Props) {
  const [localConfig, setLocalConfig] = useState<OptimizerConfig>(config);

  if (!isOpen) return null;

  const handleWeightChange = (key: keyof OptimizerConfig['scoringWeights'], value: string) => {
    const num = parseFloat(value);
    setLocalConfig(prev => ({
      ...prev,
      scoringWeights: {
        ...prev.scoringWeights,
        [key]: isNaN(num) ? 0 : num
      }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
      <div className="bg-[#0f1115] border border-white/[0.08] w-full max-w-2xl rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Settings size={16} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Optimizer Settings</h2>
              <p className="text-xs text-gray-500">Customize proprietary scoring and ownership handling.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-8">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Core Settings</h3>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${localConfig.analyzeOwnership ? 'bg-indigo-500 border-indigo-400' : 'bg-white/[0.04] border-white/[0.1] group-hover:border-white/[0.2]'}`}>
                {localConfig.analyzeOwnership && <CheckCircle size={12} className="text-white" />}
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-300 font-semibold">Ownership Penalty</div>
                <div className="text-[10px] text-gray-500">Automatically deduct points based on expected ownership to favor contrarian plays.</div>
              </div>
              <input type="checkbox" className="hidden" checked={localConfig.analyzeOwnership} onChange={e => setLocalConfig({...localConfig, analyzeOwnership: e.target.checked})} />
            </label>
          </div>

          <div>
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Custom Scoring Weights</h3>
             <div className="grid grid-cols-3 gap-4">
               {Object.entries(localConfig.scoringWeights).map(([key, val]) => (
                 <div key={key} className="bg-white/[0.02] border border-white/[0.06] p-3 rounded-lg">
                   <label className="block text-xs font-semibold text-gray-400 mb-1 capitalize">
                     {key.replace(/([A-Z])/g, ' $1').trim()}
                   </label>
                   <input 
                     type="number" 
                     step="0.01"
                     value={val} 
                     onChange={e => handleWeightChange(key as any, e.target.value)}
                     className="w-full bg-black/50 border border-white/[0.1] rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-indigo-500/50"
                   />
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/[0.06] flex justify-end gap-3 bg-white/[0.02]">
          <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button onClick={() => { onSave(localConfig); onClose(); }} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-all">
            <Save size={14} /> Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
