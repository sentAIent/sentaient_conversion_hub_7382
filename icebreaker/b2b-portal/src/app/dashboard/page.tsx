"use client";

import Link from 'next/link';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const MY_BOUNTIES_QUERY = gql`
  query MyBounties {
    myBounties {
      id
      isActive
      claimsCount
    }
    venueAnalytics(venueId: "1") {
      totalImpressions
      storefrontSales
    }
  }
`;

export default function DashboardOverview() {
  const { data, loading, error } = useQuery<any>(MY_BOUNTIES_QUERY);

  const activeBounties = data?.myBounties?.filter((b: any) => b.isActive).length || 0;
  const totalClaims = data?.myBounties?.reduce((acc: number, b: any) => acc + b.claimsCount, 0) || 0;
  
  const totalImpressions = data?.venueAnalytics?.totalImpressions || 0;
  const storefrontSales = data?.venueAnalytics?.storefrontSales || 0;

  const formattedImpressions = totalImpressions >= 1000 ? `${(totalImpressions / 1000).toFixed(1)}K` : totalImpressions.toString();
  const formattedSales = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(storefrontSales / 100);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white/60 font-medium mb-2">Total Impressions</h3>
          {loading ? (
            <p className="text-4xl font-bold animate-pulse text-white/50">...</p>
          ) : error ? (
            <p className="text-lg text-red-400">Failed to load</p>
          ) : (
            <p className="text-4xl font-bold">{formattedImpressions}</p>
          )}
          <div className="mt-4 flex items-center text-sm text-[#00ffcc]">
            <span className="font-bold">+12%</span>
            <span className="text-white/40 ml-2">from last week</span>
          </div>
        </div>
        
        <div className="glass rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-white/60 font-medium mb-2">Active Bounties</h3>
            {loading ? (
              <p className="text-4xl font-bold animate-pulse text-white/50">...</p>
            ) : error ? (
              <p className="text-lg text-red-400">Failed to load</p>
            ) : (
              <p className="text-4xl font-bold">{activeBounties}</p>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center text-sm text-[#3b82f6]">
              <span className="font-bold">{totalClaims}</span>
              <span className="text-white/40 ml-2">total claims</span>
            </div>
            <Link href="/dashboard/bounties" className="text-sm text-[#00ffcc] hover:underline">
              Manage Bounties &rarr;
            </Link>
          </div>
        </div>
        
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white/60 font-medium mb-2">Storefront Sales</h3>
          {loading ? (
            <p className="text-4xl font-bold animate-pulse text-white/50">...</p>
          ) : error ? (
            <p className="text-lg text-red-400">Failed to load</p>
          ) : (
            <p className="text-4xl font-bold">{formattedSales}</p>
          )}
          <div className="mt-4 flex items-center text-sm text-[#00ffcc]">
            <span className="font-bold">+5%</span>
            <span className="text-white/40 ml-2">from last week</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Hyper-Local Demand Radar</h2>
      <div className="glass rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3b82f6]/20 text-[#3b82f6] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">452 Users Nearby</h3>
          <p className="text-white/60 max-w-sm mx-auto mb-6">
            There is a high concentration of tech workers within 1 mile of your venue. 
          </p>
          <Link href="/dashboard/campaigns/new" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,204,0.5)] transition-all duration-300">
            Launch Swarm Campaign
          </Link>
        </div>
      </div>
    </div>
  );
}
