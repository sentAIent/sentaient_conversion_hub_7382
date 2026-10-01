'use client';

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-white/[0.05] rounded-xl ${className}`} />
);

export const ChartSkeleton = () => (
  <div className="h-64 w-full flex items-end gap-2 px-4 pb-4 border-b border-l border-white/10 opacity-50 relative overflow-hidden backdrop-blur-3xl">
    {/* Shimmer effect */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
    
    {[...Array(12)].map((_, i) => (
      <div 
        key={i} 
        className="flex-1 bg-gradient-to-t from-blue-500/20 to-transparent rounded-t-sm" 
        style={{ height: `${Math.max(20, Math.random() * 100)}%` }} 
      />
    ))}
  </div>
);

export const TableSkeleton = () => (
  <div className="w-full space-y-3 relative overflow-hidden backdrop-blur-3xl p-4">
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
    <Skeleton className="h-8 w-full" />
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} className="h-10 w-full" />
    ))}
  </div>
);
