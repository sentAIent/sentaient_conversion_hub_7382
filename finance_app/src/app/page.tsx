import PlaidLinkButton from '@/components/PlaidLinkButton';
import CashFlowWidget from '@/components/CashFlowWidget';
import ComingSoonOverlay from '@/components/ComingSoonOverlay';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <PlaidLinkButton />
      </div>
      
      <ComingSoonOverlay>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Net Worth</h3>
          <p className="text-3xl font-bold text-gray-900">$124,500.00</p>
          <p className="text-sm text-green-600 mt-2">+2.4% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Tax Liability</h3>
          <p className="text-3xl font-bold text-gray-900">$12,450.00</p>
          <p className="text-sm text-red-600 mt-2">Due in 45 days</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Crypto Portfolio</h3>
          <p className="text-3xl font-bold text-gray-900">$45,200.00</p>
          <p className="text-sm text-green-600 mt-2">+5.1% this week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <CashFlowWidget />
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {[
              { desc: 'AWS Hosting', amount: '-$120.00', date: 'Today' },
              { desc: 'Coinbase Deposit', amount: '-$1,000.00', date: 'Yesterday' },
              { desc: 'Client Payment', amount: '+$4,500.00', date: 'Oct 24' },
            ].map((tx, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{tx.desc}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
                <p className={`font-semibold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Recent Crypto Trades</h2>
          <div className="space-y-4">
            {[
              { pair: 'BTC/USD', type: 'BUY', amount: '0.05 BTC', price: '$64,200', date: 'Today' },
              { pair: 'ETH/USD', type: 'SELL', amount: '1.2 ETH', price: '$3,400', date: 'Oct 22' },
              { pair: 'SOL/USD', type: 'BUY', amount: '20 SOL', price: '$140', date: 'Oct 20' },
            ].map((trade, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${trade.type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {trade.type}
                    </span>
                    <p className="font-medium text-gray-900">{trade.pair}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{trade.date} • {trade.price}</p>
                </div>
                <p className="font-semibold text-gray-900">{trade.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </ComingSoonOverlay>
    </div>
  );
}
