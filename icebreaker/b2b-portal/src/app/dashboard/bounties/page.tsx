"use client";

import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

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
      claims {
        id
        status
        user {
          id
          name
          profilePhotoUrl
        }
        content {
          id
          textBody
          mediaUrl
        }
      }
    }
  }
`;

const REVIEW_CLAIM_MUTATION = gql`
  mutation ReviewBountyClaim($claimId: ID!, $status: String!) {
    reviewBountyClaim(claimId: $claimId, status: $status)
  }
`;

export default function BountiesPage() {
  const { data, loading, error, refetch } = useQuery<any>(MY_BOUNTIES_QUERY);
  const [expandedBountyId, setExpandedBountyId] = useState<string | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [reviewClaim, { loading: reviewing }] = useMutation(REVIEW_CLAIM_MUTATION, {
    refetchQueries: [{ query: MY_BOUNTIES_QUERY }]
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('success') === 'true') {
      setShowSuccessBanner(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ffcc', '#3b82f6', '#9333ea']
      });
    }
  }, []);

  const handleFundBounty = async () => {
    const query = `
      mutation {
        createBountyCheckout(
          venueId: "123", // Use a hardcoded mock string if you don't have the real context
          title: "Test Bounty",
          description: "Post a video!",
          reward: 500,
          totalBudget: 5000,
          latitude: 37.7749,
          longitude: -122.4194
        )
      }
    `;
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    if (json.data?.createBountyCheckout) {
      window.location.href = json.data.createBountyCheckout;
    }
  };

  const handleReview = async (claimId: string, status: string) => {
    try {
      await reviewClaim({ variables: { claimId, status } });
      refetch();
    } catch (err) {
      console.error(err);
      alert('Error reviewing claim');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {showSuccessBanner && (
        <div className="bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500 p-8 rounded-xl text-center glass mb-6 success-glow neon-shadow">
          <h2 className="text-3xl font-bold text-teal-400 mb-2">Bounty Funded! 🎉</h2>
          <p className="text-gray-300">Your bounty is now live on the map.</p>
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Bounties</h1>
          <p className="text-white/60">Create and manage your rewards to attract users to your venue.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleFundBounty}
            className="px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
          >
            Fund Test Bounty
          </button>
          <Link 
            href="/dashboard/bounties/new"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,204,0.5)] transition-all duration-300"
          >
            + Create Bounty
          </Link>
        </div>
      </div>

      {loading && (
        <div className="space-y-4 w-full max-w-4xl mx-auto mt-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 w-full bg-gray-800/50 rounded-lg animate-pulse glass border-white/5" />
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
            <div className="glass rounded-2xl p-12 text-center">
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
              <div key={bounty.id} className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
                    <button 
                      onClick={() => setExpandedBountyId(expandedBountyId === bounty.id ? null : bounty.id)}
                      className="mt-2 text-xs text-[#00ffcc] hover:underline w-full"
                    >
                      {expandedBountyId === bounty.id ? 'Hide Claims ↑' : 'View Claims ↓'}
                    </button>
                  </div>
                </div>

                {expandedBountyId === bounty.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 w-full">
                    <h4 className="text-lg font-bold mb-4">Review Claims</h4>
                    {bounty.claims && bounty.claims.length > 0 ? (
                      <div className="space-y-4">
                        {bounty.claims.map((claim: any) => (
                          <div key={claim.id} className="bg-black/30 p-4 rounded-xl flex items-center justify-between border border-white/5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden flex-shrink-0">
                                {claim.user.profilePhotoUrl ? (
                                  <img src={claim.user.profilePhotoUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-white/50 text-xl">👤</div>
                                )}
                              </div>
                              <div>
                                <p className="font-bold">{claim.user.name}</p>
                                <p className="text-sm text-white/60">{claim.content.textBody}</p>
                                {claim.content.mediaUrl && (
                                  <a href={claim.content.mediaUrl} target="_blank" rel="noreferrer" className="text-xs text-[#3b82f6] hover:underline mt-1 inline-block">View Media</a>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {claim.status === 'PENDING' ? (
                                <>
                                  <button 
                                    onClick={() => handleReview(claim.id, 'REJECTED')}
                                    disabled={reviewing}
                                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors disabled:opacity-50"
                                  >
                                    Reject
                                  </button>
                                  <button 
                                    onClick={() => handleReview(claim.id, 'APPROVED')}
                                    disabled={reviewing}
                                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors disabled:opacity-50"
                                  >
                                    Approve
                                  </button>
                                </>
                              ) : (
                                <span className={`text-sm font-bold ${claim.status === 'APPROVED' ? 'text-green-400' : 'text-red-400'}`}>
                                  {claim.status}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/40 text-sm">No claims yet.</p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
