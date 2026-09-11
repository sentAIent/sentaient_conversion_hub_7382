"use client";

import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';

const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      maxCapacity
      aiAutoApproveThreshold
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUserDetails($maxCapacity: Int, $aiAutoApproveThreshold: Float) {
    updateUserDetails(maxCapacity: $maxCapacity, aiAutoApproveThreshold: $aiAutoApproveThreshold) {
      id
      maxCapacity
      aiAutoApproveThreshold
    }
  }
`;

export default function SettingsPage() {
  const { data, loading: queryLoading } = useQuery<any>(GET_ME);
  
  const [maxCapacity, setMaxCapacity] = useState('');
  const [aiThreshold, setAiThreshold] = useState('');

  useEffect(() => {
    if (data?.me) {
      if (data.me.maxCapacity) {
        setMaxCapacity(data.me.maxCapacity.toString());
      }
      if (data.me.aiAutoApproveThreshold !== null && data.me.aiAutoApproveThreshold !== undefined) {
        setAiThreshold(data.me.aiAutoApproveThreshold.toString());
      }
    }
  }, [data]);
  const [updateUser, { loading: saving }] = useMutation(UPDATE_USER);
  const [success, setSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    
    try {
      await updateUser({
        variables: {
          maxCapacity: maxCapacity ? parseInt(maxCapacity) : null,
          aiAutoApproveThreshold: aiThreshold ? parseFloat(aiThreshold) : null
        }
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      alert('Failed to save settings');
    }
  };

  if (queryLoading) return <div className="p-8 text-white/60">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Venue Settings</h1>
        <p className="text-white/60">Manage your venue profile and capacities.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">Maximum Capacity</label>
          <input 
            type="number" 
            min="1"
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-all" 
            placeholder="e.g. 200"
          />
          <p className="text-xs text-white/40 mt-2">
            This is used for Surge Pricing (📈 SURGE) calculations. E.g. if you set a target of 80% on a bounty, and your max capacity is 200, the reward will drop to base when 160 people have checked in.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">AI Verification Threshold (0-100)</label>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="0"
              max="100"
              step="1"
              value={aiThreshold || '85'}
              onChange={(e) => setAiThreshold(e.target.value)}
              className="w-full accent-[#3b82f6]"
            />
            <span className="text-white/80 font-mono w-12 text-right">{aiThreshold || '85'}%</span>
          </div>
          <p className="text-xs text-white/40 mt-2">
            If set, bounty claims will be auto-approved if the AI Vision confidence score exceeds this percentage. Otherwise, they require manual approval in the Bounties tab. Leave empty to disable auto-approval.
          </p>
        </div>

        {success && (
          <div className="text-[#00E676] text-sm font-medium">Settings saved successfully!</div>
        )}

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] hover:opacity-90 text-black font-bold py-3 px-8 rounded-full transition-opacity disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
