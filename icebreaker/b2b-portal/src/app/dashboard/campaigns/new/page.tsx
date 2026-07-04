"use client";

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const CREATE_SWARM_CAMPAIGN = gql`
  mutation CreateSwarmCampaign($title: String!, $maxDiscount: String!, $latitude: Float!, $longitude: Float!, $radiusKm: Float!) {
    createSwarmCampaign(
      title: $title,
      maxDiscount: $maxDiscount,
      latitude: $latitude,
      longitude: $longitude,
      radiusKm: $radiusKm
    ) {
      id
      title
      maxDiscount
    }
  }
`;

export default function NewSwarmCampaignPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [radiusKm, setRadiusKm] = useState('1');
  
  const [createCampaign, { loading, error }] = useMutation(CREATE_SWARM_CAMPAIGN);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCampaign({
        variables: {
          title,
          maxDiscount,
          latitude: 37.7749, // Placeholder for Venue coordinates
          longitude: -122.4194,
          radiusKm: parseFloat(radiusKm)
        }
      });
      router.push('/dashboard/campaigns');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Create Swarm Campaign</h1>
      <p className="text-gray-400">Launch a flash mob and drive instant foot traffic by offering tiered discounts based on group size.</p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
        <div>
          <label className="block text-sm font-medium mb-2">Campaign Title</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="e.g. 50% off if 10 people show up!"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Maximum Discount Offered</label>
          <input 
            type="text" 
            required
            value={maxDiscount}
            onChange={(e) => setMaxDiscount(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="e.g. 50%"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Broadcast Radius (km)</label>
          <input 
            type="number" 
            required
            min="0.1"
            step="0.1"
            value={radiusKm}
            onChange={(e) => setRadiusKm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error.message}</div>}

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-xl transition-all"
          >
            {loading ? 'Launching...' : 'Launch Swarm'}
          </button>
        </div>
      </form>
    </div>
  );
}
