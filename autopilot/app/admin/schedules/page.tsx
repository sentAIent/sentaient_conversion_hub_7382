"use client";

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ShieldAlert, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

type Schedule = {
  brand: string;
  cron: string;
  url: string;
  assassination_mode: boolean;
  competitor_url?: string;
  goal: string;
};

export default function SchedulesAdmin() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      // Fetching from orchestrator API
      const res = await fetch('http://localhost:8080/admin/schedules');
      if (!res.ok) throw new Error('Failed to fetch schedules');
      const data = await res.json();
      setSchedules(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('http://localhost:8080/admin/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schedules)
      });
      if (!res.ok) throw new Error('Failed to save schedules');
      
      toast.success('Schedules saved! The Engine has hot-reloaded.');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateSchedule = (index: number, field: keyof Schedule, value: any) => {
    const newSchedules = [...schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setSchedules(newSchedules);
  };

  const removeSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const addSchedule = () => {
    setSchedules([
      ...schedules,
      {
        brand: 'New App',
        cron: '0 * * * *',
        url: 'https://example.com',
        assassination_mode: false,
        goal: 'marketing'
      }
    ]);
  };

  if (loading) return <div className="p-8 text-white">Loading Master Settings...</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
              <Activity className="w-8 h-8 text-emerald-400" />
              Autonomous Engine Settings
            </h1>
            <p className="text-neutral-400 mt-2">Manage execution schedules across all platforms. Changes hot-reload instantly.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Deploying...' : 'Deploy Changes'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <button 
                onClick={() => removeSchedule(i)}
                className="absolute top-4 right-4 text-neutral-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Brand Name</label>
                  <input 
                    type="text" 
                    value={schedule.brand}
                    onChange={e => updateSchedule(i, 'brand', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                    CRON Schedule (PT)
                  </label>
                  <input 
                    type="text" 
                    value={schedule.cron}
                    onChange={e => updateSchedule(i, 'cron', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-emerald-400 font-mono text-sm mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Target URL</label>
                  <input 
                    type="text" 
                    value={schedule.url}
                    onChange={e => updateSchedule(i, 'url', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white mt-1 focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-800">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                      <ShieldAlert className={`w-4 h-4 ${schedule.assassination_mode ? 'text-rose-500' : 'text-neutral-600'}`} />
                      Assassination Mode
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={schedule.assassination_mode}
                        onChange={e => updateSchedule(i, 'assassination_mode', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500"></div>
                    </label>
                  </div>
                  
                  {schedule.assassination_mode && (
                    <input 
                      type="text" 
                      placeholder="Competitor URL (e.g. stripe.com)"
                      value={schedule.competitor_url || ''}
                      onChange={e => updateSchedule(i, 'competitor_url', e.target.value)}
                      className="w-full bg-neutral-950 border border-rose-500/30 rounded p-2 text-rose-200 mt-1 focus:outline-none focus:border-rose-500 text-sm"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={addSchedule}
            className="border-2 border-dashed border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center text-neutral-500 hover:text-emerald-400 hover:border-emerald-500/50 transition-all h-[400px]"
          >
            <Plus className="w-12 h-12 mb-2" />
            <span className="font-semibold">Add New Application</span>
          </button>
        </div>
      </div>
    </div>
  );
}
