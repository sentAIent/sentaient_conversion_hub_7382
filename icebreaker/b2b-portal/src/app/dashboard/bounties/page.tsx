"use client";

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import Link from 'next/link';

const MY_BOUNTIES_QUERY = gql`
  query MyBounties {
    myBounties {
      id
      title
      description
      reward
      totalBudget
      isActive
      expiresAt
      claimsCount
    }
  }
`;

export default function BountiesPage() {
  const { data, loading, error } = useQuery<any>(MY_BOUNTIES_QUERY);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Bounties</h1>
          <p className="text-white/60">Create and manage your rewards to attract users to your venue.</p>
        </div>
        <Link 
          href="/dashboard/bounties/new"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:opacity-90 transition-opacity"
        >
          + Create Bounty
        </Link>
      </div>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 h-32 animate-pulse" />
          ))}
        </div>
      )}
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
          Failed to load bounties: {error.message}
        </div>
      )}

      {data?.myBounties && (
        <div className="grid gap-4">
          {data.myBounties.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white/40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No active bounties</h3>
              <p className="text-white/50 mb-6 max-w-md mx-auto">
                You haven't created any bounties yet. Bounties are the best way to incentivize users to visit your venue and complete tasks.
              </p>
              <Link 
                href="/dashboard/bounties/new"
                className="inline-block px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
              >
                Create your first bounty
              </Link>
            </div>
          ) : (
            data.myBounties.map((bounty: any) => (
              <div key={bounty.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/20 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{bounty.title}</h3>
                    {bounty.isActive ? (
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">Active</span>
                    ) : (
                      <span className="px-2 py-1 bg-white/10 text-white/40 text-xs font-medium rounded-full border border-white/10">Inactive</span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm line-clamp-2 mb-4">{bounty.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm bg-black/20 p-3 rounded-lg inline-flex">
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">Reward</span>
                      <span className="font-bold text-[#00ffcc]">${bounty.reward}</span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">Total Budget</span>
                      <span className="font-bold">${bounty.totalBudget}</span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">Expires</span>
                      <span className="font-medium text-white/80">
                        {isNaN(parseInt(bounty.expiresAt)) 
                          ? new Date(bounty.expiresAt).toLocaleDateString()
                          : new Date(parseInt(bounty.expiresAt)).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/30 border border-white/5 rounded-xl p-4 min-w-[120px] text-center">
                  <p className="text-sm text-white/40 mb-1">Claims</p>
                  <p className="text-3xl font-bold text-[#3b82f6]">{bounty.claimsCount}</p>
                  <button className="mt-2 text-xs text-[#00ffcc] hover:underline w-full">
                    View Claims &rarr;
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
