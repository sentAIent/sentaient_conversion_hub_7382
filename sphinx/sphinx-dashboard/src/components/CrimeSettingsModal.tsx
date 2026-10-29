import React, { useState } from 'react';
import { X, Plus, Trash2, Database } from 'lucide-react';

const SUPPORTED_ODP_REGIONS = [
  { name: 'Seattle, WA (SPD)', zip: '98104' },
  { name: 'San Francisco, CA (SFPD)', zip: '94103' },
  { name: 'Los Angeles, CA (LAPD)', zip: '90012' },
  { name: 'Chicago, IL (CPD)', zip: '60602' },
  { name: 'New York City, NY (NYPD)', zip: '10038' },
  { name: 'Dallas, TX (DPD)', zip: '75201' },
  { name: 'Austin, TX (APD)', zip: '78701' },
  { name: 'Denver, CO (DPD)', zip: '80202' },
];

export const CrimeSettingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [locations, setLocations] = useState([
    { id: 1, name: 'Home (Fallback)', zip: '96150', type: 'home', source: 'Generic RSS' },
    { id: 2, name: 'Office (Fallback)', zip: '89460', type: 'office', source: 'Generic RSS' },
    { id: 3, name: 'School', zip: '', type: 'school', source: 'None' }
  ]);
  const [newZip, setNewZip] = useState('');
  const [newName, setNewName] = useState('');
  const [selectedOdp, setSelectedOdp] = useState('');

  const addLocation = (isOdp = false) => {
    if (isOdp && selectedOdp) {
      const region = SUPPORTED_ODP_REGIONS.find(r => r.zip === selectedOdp);
      if (region) {
        setLocations([...locations, { id: Date.now(), name: region.name, zip: region.zip, type: 'custom', source: 'Direct ODP' }]);
      }
      setSelectedOdp('');
    } else if (newZip && newName) {
      setLocations([...locations, { id: Date.now(), name: newName, zip: newZip, type: 'custom', source: 'Generic RSS' }]);
      setNewZip('');
      setNewName('');
    }
  };

  const removeLocation = (id: number) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-red-900/50 rounded-xl p-6 w-[450px] shadow-[0_0_30px_rgba(220,38,38,0.15)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-red-500 font-mono text-xl tracking-wider flex items-center gap-2">
            <span className="animate-pulse">◈</span> THREAT INTEL LOCATIONS
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {locations.map(loc => (
            <div key={loc.id} className="flex justify-between items-center bg-black/50 border border-gray-800 p-3 rounded">
              <div>
                <div className="text-gray-300 font-mono text-sm">{loc.name.toUpperCase()}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-red-400 font-mono text-xs">{loc.zip || 'UNSET'}</div>
                  <div className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${loc.source === 'Direct ODP' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-500'}`}>
                    {loc.source}
                  </div>
                </div>
              </div>
              {loc.type === 'custom' && (
                <button onClick={() => removeLocation(loc.id)} className="text-red-900 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-4 mt-4">
          <h3 className="text-gray-500 font-mono text-xs mb-3 flex items-center gap-2">
            <Database size={14} /> HIGH-FIDELITY REGIONS (DIRECT ODP)
          </h3>
          <div className="flex gap-2 mb-4">
            <select 
              value={selectedOdp}
              onChange={(e) => setSelectedOdp(e.target.value)}
              className="bg-black border border-gray-700 rounded px-3 py-2 w-full text-white font-mono text-xs focus:border-red-500 focus:outline-none"
            >
              <option value="">-- SELECT SUPPORTED CITY --</option>
              {SUPPORTED_ODP_REGIONS.map(region => (
                <option key={region.zip} value={region.zip}>{region.name}</option>
              ))}
            </select>
            <button 
              onClick={() => addLocation(true)}
              disabled={!selectedOdp}
              className="bg-green-900/20 hover:bg-green-900/40 text-green-400 border border-green-900/50 rounded px-4 py-2 font-mono text-xs disabled:opacity-50 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          <h3 className="text-gray-500 font-mono text-xs mb-3">ADD CUSTOM FALLBACK REGION</h3>
          <div className="flex gap-2 mb-2">
            <input 
              type="text" 
              placeholder="NAME (e.g. CABIN)" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-black border border-gray-700 rounded px-3 py-2 w-1/2 text-white font-mono text-xs focus:border-red-500 focus:outline-none"
            />
            <input 
              type="text" 
              placeholder="ZIP CODE" 
              value={newZip}
              onChange={(e) => setNewZip(e.target.value)}
              className="bg-black border border-gray-700 rounded px-3 py-2 w-1/2 text-white font-mono text-xs focus:border-red-500 focus:outline-none"
            />
          </div>
          <button 
            onClick={() => addLocation(false)}
            disabled={!newZip || !newName}
            className="w-full bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 rounded py-2 font-mono text-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
          >
            <Plus size={14} /> ADD FALLBACK LOCATION
          </button>
        </div>
      </div>
    </div>
  );
};
