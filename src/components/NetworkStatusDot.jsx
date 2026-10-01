import React from 'react';
import { useLatencyMonitor } from '../hooks/useLatencyMonitor';

/**
 * A small visual indicator (dot) showing network health.
 */
export function NetworkStatusDot() {
  const { status, latency, isOnline } = useLatencyMonitor(15000); // Check every 15s

  let colorClass = 'bg-gray-400';
  let pulseClass = '';

  if (!isOnline || status === 'offline') {
    colorClass = 'bg-red-500';
  } else if (status === 'good') {
    colorClass = 'bg-green-500';
  } else if (status === 'fair') {
    colorClass = 'bg-yellow-400';
  } else if (status === 'poor') {
    colorClass = 'bg-orange-500';
    pulseClass = 'animate-pulse';
  }

  return (
    <div className="flex items-center space-x-2 text-xs text-gray-500" title={`Latency: ${latency}ms`}>
      <span className="relative flex h-3 w-3">
        {status === 'poor' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${colorClass} ${pulseClass}`}></span>
      </span>
      <span className="hidden sm:inline">
        {!isOnline ? 'Offline' : `${latency}ms`}
      </span>
    </div>
  );
}
