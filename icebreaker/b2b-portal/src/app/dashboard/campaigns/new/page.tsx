import Link from 'next/link';

export default function NewCampaignPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard/campaigns" className="text-white/60 hover:text-white flex items-center gap-2 mb-4">
          &larr; Back to Campaigns
        </Link>
        <h1 className="text-3xl font-bold">Create New Campaign</h1>
      </div>

      <div className="space-y-8">
        {/* Campaign Type */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Select Campaign Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="relative flex cursor-pointer rounded-lg border bg-white/5 p-4 border-[#3b82f6] shadow-sm focus:outline-none">
              <input type="radio" name="campaign_type" value="bounty" className="sr-only" defaultChecked />
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#3b82f6]">Bounty</span>
                  <div className="h-4 w-4 rounded-full border border-[#3b82f6] flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[#3b82f6]" />
                  </div>
                </div>
                <span className="mt-1 text-sm text-white/60">Pay users for checking in or generating content at your venue.</span>
              </div>
            </label>
            <label className="relative flex cursor-pointer rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors focus:outline-none">
              <input type="radio" name="campaign_type" value="swarm" className="sr-only" />
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#00ffcc]">Swarm</span>
                  <div className="h-4 w-4 rounded-full border border-white/40" />
                </div>
                <span className="mt-1 text-sm text-white/60">Dynamic, time-limited discounts to drive immediate foot traffic.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold mb-4">Campaign Details</h2>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Campaign Name</label>
            <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3b82f6]" placeholder="e.g. Summer Friday Rush" />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Budget ($)</label>
            <input type="number" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3b82f6]" placeholder="500" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/campaigns" className="px-6 py-3 rounded-lg font-bold text-white hover:bg-white/5 transition-colors">
            Cancel
          </Link>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:opacity-90 transition-opacity">
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
