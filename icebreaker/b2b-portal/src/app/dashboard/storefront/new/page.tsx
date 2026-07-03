import Link from 'next/link';

export default function NewProductPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard/storefront" className="text-white/60 hover:text-white flex items-center gap-2 mb-4">
          &larr; Back to Storefront
        </Link>
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <div className="space-y-8">
        {/* Product Details */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold mb-4">Product Details</h2>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Product Name</label>
            <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3b82f6]" placeholder="e.g. Venue Logo Hoodie" />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Description</label>
            <textarea className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3b82f6] h-32" placeholder="Describe the product..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Price ($)</label>
              <input type="number" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3b82f6]" placeholder="65.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Inventory Count</label>
              <input type="number" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#3b82f6]" placeholder="100" />
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold mb-4">Product Image</h2>
          <div className="border-2 border-dashed border-white/10 rounded-lg p-12 text-center hover:border-[#3b82f6] hover:bg-[#3b82f6]/5 transition-colors cursor-pointer flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white/40 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="text-sm text-white/60">Click or drag image to upload</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/storefront" className="px-6 py-3 rounded-lg font-bold text-white hover:bg-white/5 transition-colors">
            Cancel
          </Link>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#00ffcc] to-[#3b82f6] text-black font-bold hover:opacity-90 transition-opacity">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
