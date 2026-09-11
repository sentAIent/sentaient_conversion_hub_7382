"use client";

import Link from 'next/link';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import CampaignsGrid from '../../../components/dashboard/CampaignsGrid';

const GET_MY_CAMPAIGNS = gql`
  query GetMySwarmCampaigns {
    mySwarmCampaigns {
      id
      title
      description
      maxDiscount
      totalBudget
      targetCheckIns
      isActive
      paymentStatus
    }
  }
`;

export default function CampaignsPage() {
  const { data, loading, error } = useQuery<any>(GET_MY_CAMPAIGNS);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Campaign Manager</h1>
        <Link href="/dashboard/campaigns/new" className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:opacity-90 transition-opacity">
          + New Campaign
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-white/60">Loading campaigns...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-400">Error loading campaigns</div>
        ) : data?.mySwarmCampaigns?.length === 0 ? (
          <div className="p-8 text-center text-white/60">No campaigns yet. Create one to get started!</div>
        ) : (
          <CampaignsGrid campaigns={data.mySwarmCampaigns} />
        )}
      </div>
    </div>
  );
}
