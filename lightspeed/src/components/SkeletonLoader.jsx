import React from 'react';

export default function SkeletonLoader({ count = 1, height = '20px', width = '100%', style = {} }) {
  const loaders = Array.from({ length: count });
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
      {loaders.map((_, i) => (
        <div 
          key={i}
          style={{
            height,
            width,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '4px',
            ...style
          }}
        />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
