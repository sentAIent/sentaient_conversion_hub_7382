import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function GuideDashboard({ currentUserId }) {
  const updatePresence = useMutation(api.users.updatePresence);
  const endMeeting = useMutation(api.matchmaker.endMeeting);
  const activeMeeting = useQuery(api.matchmaker.getActiveMeetingForGuide, { guideId: currentUserId });
  
  const [isAvailable, setIsAvailable] = useState(false);

  // Heartbeat ping every 10 seconds to keep Guide available in matchmaker pool
  useEffect(() => {
    if (!currentUserId || !isAvailable || activeMeeting) return;
    
    const interval = setInterval(() => {
      updatePresence({ userId: currentUserId, status: "available" });
    }, 10000);
    
    return () => clearInterval(interval);
  }, [currentUserId, isAvailable, activeMeeting, updatePresence]);

  const toggleAvailability = () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus);
    updatePresence({ userId: currentUserId, status: newStatus ? "available" : "offline" });
  };

  return (
    <div className="absolute top-4 right-4 bg-black bg-opacity-80 border border-gray-700 p-4 rounded-lg text-white font-mono pointer-events-auto z-50 w-64">
      <h2 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Guide Console</h2>
      
      {!activeMeeting ? (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Status:</span>
            <span className={`text-xs px-2 py-1 rounded-full ${isAvailable ? 'bg-green-500/20 text-green-400 border border-green-500' : 'bg-red-500/20 text-red-400 border border-red-500'}`}>
              {isAvailable ? 'STANDING BY' : 'OFFLINE'}
            </span>
          </div>
          
          <button 
            onClick={toggleAvailability}
            className={`w-full py-2 font-bold transition-all ${isAvailable ? 'bg-gray-700 hover:bg-gray-600' : 'bg-cyan-600 hover:bg-cyan-500 text-black'}`}
          >
            {isAvailable ? 'GO OFFLINE' : 'GO ONLINE'}
          </button>
          
          {isAvailable && (
            <p className="text-xs text-gray-400 text-center animate-pulse">
              Waiting for AI dispatch...
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 text-center rounded animate-pulse">
            ACTIVE DEPLOYMENT
          </div>
          <p className="text-xs text-gray-300">You have been dispatched to assist a visitor.</p>
          
          <button 
            onClick={() => endMeeting({ meetingId: activeMeeting._id })}
            className="w-full py-2 bg-red-600 hover:bg-red-500 font-bold text-white transition-all mt-4"
          >
            END SESSION
          </button>
        </div>
      )}
    </div>
  );
}
