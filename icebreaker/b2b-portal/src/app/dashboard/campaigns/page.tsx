import Link from 'next/link';

export default function CampaignsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Campaign Manager</h1>
        <Link href="/dashboard/campaigns/new" className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:opacity-90 transition-opacity">
          + New Campaign
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-white/60">
              <th className="p-4 font-medium">Campaign Name</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Budget Spent</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="p-4 font-medium">Summer Promo Video</td>
              <td className="p-4">
                <span className="inline-block px-2 py-1 bg-[#3b82f6]/20 text-[#3b82f6] text-xs rounded-full">Bounty</span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00ffcc]" />
                  <span>Active</span>
                </div>
              </td>
              <td className="p-4">$150 / $500</td>
              <td className="p-4 text-right">
                <button className="text-white/60 hover:text-white">Manage</button>
              </td>
            </tr>
            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="p-4 font-medium">Friday Night Rush</td>
              <td className="p-4">
                <span className="inline-block px-2 py-1 bg-[#00ffcc]/20 text-[#00ffcc] text-xs rounded-full">Swarm</span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="text-white/60">Completed</span>
                </div>
              </td>
              <td className="p-4">$0 / $0 (Discount)</td>
              <td className="p-4 text-right">
                <button className="text-white/60 hover:text-white">Report</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
