import { Lock } from 'lucide-react';

interface ComingSoonOverlayProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function ComingSoonOverlay({ 
  title = "Coming Soon", 
  description = "We are wiring up the backend to bring this feature to life with real data.", 
  children 
}: ComingSoonOverlayProps) {
  return (
    <div className="relative group overflow-hidden rounded-xl">
      {/* The underlying content - blurred out */}
      <div className="select-none pointer-events-none blur-sm opacity-60 transition-all duration-500">
        {children}
      </div>

      {/* The beautiful overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-white/40 to-white/80 backdrop-blur-[2px] border border-white/20">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-sm text-center transform transition-transform duration-500 scale-100 group-hover:scale-105 border border-gray-100">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {description}
          </p>
          <div className="mt-6 flex justify-center space-x-1.5">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
