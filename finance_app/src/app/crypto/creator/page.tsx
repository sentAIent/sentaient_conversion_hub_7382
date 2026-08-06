'use client';

import React, { useState } from 'react';

export default function CryptoCreatorPage() {
  const [network, setNetwork] = useState('Ethereum');
  const [mode, setMode] = useState('Basic');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [supply, setSupply] = useState('1000000');
  
  const handleDeploy = () => {
    alert(`Deploying ${tokenName} (${tokenSymbol}) to ${network} in ${mode} mode...`);
    // Will integrate with web3 providers here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Cryptocurrency Creator</h1>
        <p className="text-gray-400 mb-10">Deploy your own custom token to the blockchain in seconds.</p>
        
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Network</label>
              <select 
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Ethereum">Ethereum Mainnet</option>
                <option value="Base">Base</option>
                <option value="Polygon">Polygon</option>
                <option value="BSC">Binance Smart Chain</option>
                <option value="Solana">Solana</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Token Mode</label>
              <select 
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Basic">Basic Token (Standard ERC-20)</option>
                <option value="Advanced">Advanced Token (Custom features in AdvancedERC20.sol)</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Token Name</label>
              <input 
                type="text" 
                placeholder="e.g. Liquid Coin"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Token Symbol</label>
              <input 
                type="text" 
                placeholder="e.g. LQD"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Initial Supply</label>
              <input 
                type="number" 
                value={supply}
                onChange={(e) => setSupply(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-10 p-6 bg-blue-900/20 border border-blue-900/50 rounded-xl">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Platform Fee</h3>
            <p className="text-gray-300">
              A standard platform fee of <strong>0.01 {network === 'Solana' ? 'SOL' : 'ETH'}</strong> applies for non-subscribers. 
              Subscribers can deploy for free (network gas fees still apply).
            </p>
          </div>
          
          <button 
            onClick={handleDeploy}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-500/30"
          >
            Deploy Token to {network}
          </button>
        </div>
      </div>
    </div>
  );
}
