import React from 'react';

export const AvatarCore = ({ src, alt, className = '' }) => {
  return (
    <div 
      className={`relative inline-block rounded-full overflow-hidden bg-gray-200 ${className}`}
      role="img"
      aria-label={alt || "User Avatar"}
      tabIndex={0}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt || "User Avatar"} 
          className="w-full h-full object-cover" 
          aria-hidden="true"
        />
      ) : (
        <svg 
          className="w-full h-full text-gray-400" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </div>
  );
};
