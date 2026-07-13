'use client';
import { useState } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';

export default function BillingPortalButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePortal = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to open portal');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handlePortal}
        disabled={loading}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 text-white"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <ExternalLink size={18} />}
        Manage Subscription (Stripe Portal)
      </button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}
