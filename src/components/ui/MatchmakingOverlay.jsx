import React from 'react';

export default function MatchmakingOverlay({ meetingStatus }) {
  if (!meetingStatus) return null;
  
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-90 border border-cyan-500 rounded-lg p-6 max-w-md w-full shadow-[0_0_30px_rgba(0,255,255,0.2)] text-white pointer-events-auto font-mono z-50">
      <div className="flex flex-col items-center text-center space-y-4">
        {meetingStatus === "waiting" && (
          <>
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <h3 className="text-xl font-bold text-cyan-400">Locating Available Guide...</h3>
            <p className="text-sm text-gray-400">The AI Maître d' is scanning the network for an expert to assist you.</p>
          </>
        )}
        
        {meetingStatus === "active" && (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-400">Match Found</h3>
            <p className="text-sm text-gray-400">A guide has been dispatched to your location. Opening secure comms channel.</p>
          </>
        )}
      </div>
    </div>
  );
}
