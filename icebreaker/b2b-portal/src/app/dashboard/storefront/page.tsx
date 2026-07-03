import Link from 'next/link';

export default function StorefrontPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Physical Storefront</h1>
          <p className="text-white/60 mt-1">Manage physical products and ship to users directly via Stripe.</p>
        </div>
        <Link href="/dashboard/storefront/new" className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:opacity-90 transition-opacity">
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="h-48 bg-zinc-800 relative">
            <div className="absolute inset-0 flex items-center justify-center text-white/40">
              [Image: Classic Roast Coffee]
            </div>
            <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs font-bold">
              $18.00
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-bold text-lg mb-1">Classic Roast Beans (12oz)</h3>
            <p className="text-sm text-white/60 mb-4 flex-1">
              Our signature medium roast whole bean coffee. Ships nationwide.
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-sm text-white/40">Inventory: 142</span>
              <button className="text-sm text-[#3b82f6] hover:text-white transition-colors">
                Edit Product
              </button>
            </div>
          </div>
        </div>

        {/* Product Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="h-48 bg-zinc-800 relative">
            <div className="absolute inset-0 flex items-center justify-center text-white/40">
              [Image: Venue Hoodie]
            </div>
            <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs font-bold">
              $65.00
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-bold text-lg mb-1">Heavyweight Venue Hoodie</h3>
            <p className="text-sm text-white/60 mb-4 flex-1">
              Premium 400gsm cotton hoodie with embroidered logo.
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-sm text-white/40">Inventory: 34</span>
              <button className="text-sm text-[#3b82f6] hover:text-white transition-colors">
                Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
