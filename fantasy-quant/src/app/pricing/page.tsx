'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSubscription, SubscriptionTier } from '@/components/SubscriptionContext'

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started with basic analytics.',
    features: [
      'Basic Player Stats',
      'Standard Projections',
      'Single-Lineup Optimizer',
    ],
    priceId: null,
    buttonText: 'Current Plan',
  },
  {
    name: 'Pro',
    price: '$19.99',
    period: '/mo',
    description: 'Advanced tools for the serious DFS player.',
    features: [
      'Everything in Free',
      'Up to 20 Optimizer Lineups',
      'Basic Late-Swap',
      'Advanced Matchup Stats',
    ],
    priceId: 'price_pro_placeholder', // User will replace with actual Stripe Price ID
    buttonText: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Max',
    price: '$49.99',
    period: '/mo',
    description: 'The ultimate MME engine for professionals.',
    features: [
      'Everything in Pro',
      '150 Lineups (Full MME)',
      'Ensemble Projections',
      'Live Data Hub Integrations',
      'Advanced Vegas Props',
    ],
    priceId: 'price_max_placeholder', // User will replace with actual Stripe Price ID
    buttonText: 'Upgrade to Max',
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { setTier } = useSubscription()

  const handleCheckout = async (tierName: string, priceId: string | null) => {
    if (!priceId) {
      setTier('Free')
      router.push('/')
      return
    }
    
    setLoading(priceId)
    setError(null)

    try {
      // Import dynamically to avoid SSR issues with Capacitor
      const { Capacitor } = await import('@capacitor/core');
      
      if (Capacitor.isNativePlatform()) {
        // We are inside an iOS or Android WebView
        const { Purchases } = await import('@revenuecat/purchases-capacitor');
        
        // Match the tier to a RevenueCat package identifier
        const rcPackageIdentifier = tierName.toLowerCase(); 
        
        try {
          const offerings = await Purchases.getOfferings();
          if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
            const packageToBuy = offerings.current.availablePackages.find(p => p.identifier.includes(rcPackageIdentifier));
            
            if (packageToBuy) {
              const { customerInfo } = await Purchases.purchasePackage({ aPackage: packageToBuy });
              
              if (customerInfo.entitlements.active[rcPackageIdentifier] !== undefined) {
                setTier(tierName as SubscriptionTier);
                router.push('/?payment_success=true');
              }
            } else {
              throw new Error("Package not found");
            }
          }
        } catch (e: any) {
          if (!e.userCancelled) {
            setError(e.message || "Native purchase failed");
          }
        }
      } else {
        // We are on the Web, use Stripe
        const res = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: tierName.toLowerCase() })
        });
        
        const data = await res.json();
        if (data.url) {
          router.push(data.url);
        } else {
          throw new Error(data.error || 'Checkout failed');
        }
      }
    } catch (e: any) {
      setError(e.message || "An error occurred");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-black text-slate-200 py-20 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Pricing that scales with your play
          </h1>
          <p className="mt-4 text-xl text-slate-400">
            Choose the tier that fits your bankroll and strategy. Upgrade anytime.
          </p>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mb-8 bg-red-950/50 border border-red-900/50 p-4 rounded-lg text-center text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-slate-900/50 backdrop-blur-xl border ${
                tier.popular ? 'border-blue-500 shadow-blue-900/20 shadow-xl' : 'border-slate-800/60'
              } rounded-2xl p-8 flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <span className="bg-blue-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">{tier.name}</h2>
                <p className="mt-2 text-sm text-slate-400">{tier.description}</p>
              </div>
              
              <div className="mb-8 flex items-baseline text-white">
                <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                {tier.period && <span className="ml-1 text-xl font-medium text-slate-400">{tier.period}</span>}
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="flex-shrink-0 w-5 h-5 text-emerald-400 mt-0.5" />
                    <span className="ml-3 text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(tier.name, tier.priceId)}
                disabled={loading !== null}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-colors flex justify-center items-center ${
                  tier.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/50'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                } ${!tier.priceId && 'opacity-50 cursor-not-allowed'}`}
              >
                {loading === tier.priceId ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  tier.buttonText
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
