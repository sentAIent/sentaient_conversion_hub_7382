import Link from 'next/link';

export default function DashboardOverview() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white/60 font-medium mb-2">Total Impressions</h3>
          <p className="text-4xl font-bold">124.5K</p>
          <div className="mt-4 flex items-center text-sm text-[#00ffcc]">
            <span className="font-bold">+12%</span>
            <span className="text-white/40 ml-2">from last week</span>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white/60 font-medium mb-2">Active Bounties</h3>
          <p className="text-4xl font-bold">3</p>
          <div className="mt-4 flex items-center text-sm text-[#3b82f6]">
            <span className="font-bold">24</span>
            <span className="text-white/40 ml-2">claims pending review</span>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white/60 font-medium mb-2">Storefront Sales</h3>
          <p className="text-4xl font-bold">$4,250</p>
          <div className="mt-4 flex items-center text-sm text-[#00ffcc]">
            <span className="font-bold">+5%</span>
            <span className="text-white/40 ml-2">from last week</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Hyper-Local Demand Radar</h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
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
          <Link href="/dashboard/campaigns/new" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:opacity-90 transition-opacity">
            Launch Swarm Campaign
          </Link>
        </div>
      </div>
    </div>
  );
}
