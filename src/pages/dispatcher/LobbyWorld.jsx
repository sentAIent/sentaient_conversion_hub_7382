import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import AIGreeter from './AIGreeter';
import HumanGuide from './HumanGuide';
import { Html } from '@react-three/drei';
import MatchmakingOverlay from '../../components/ui/MatchmakingOverlay';

export default function LobbyWorld({ position, currentUserId }) {
  const requestGuide = useMutation(api.matchmaker.requestGuide);
  const activeMeeting = useQuery(api.matchmaker.getActiveMeetingForVisitor, { visitorId: currentUserId });
  
  const [meetingRequested, setMeetingRequested] = useState(false);
  const [guideName, setGuideName] = useState("Agent");

  // Determine if we need to show the Guide avatar
  const showGuide = activeMeeting && activeMeeting.status === "active" && activeMeeting.guideId;

  const handleEngage = async () => {
    if (!currentUserId || meetingRequested) return;
    
    setMeetingRequested(true);
    try {
      await requestGuide({
        visitorId: currentUserId,
        worldPosition: { x: position[0], y: position[1], z: position[2] }
      });
    } catch (e) {
      console.error("Matchmaking failed:", e);
      setMeetingRequested(false);
    }
  };

  return (
    <group position={position}>
      {/* Platform */}
      <mesh position={[0, -20, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[100, 32]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        <gridHelper args={[200, 20, 0x00ffff, 0x004444]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>

      {/* The AI Maître d' always stands at the center */}
      <AIGreeter position={[0, 0, -30]} onEngage={handleEngage} />

      {/* The Human Guide teleports in slightly to the side when matched */}
      {showGuide && (
        <HumanGuide position={[20, 0, -20]} isLocal={false} name="Expert Guide" />
      )}

      {/* 2D UI Overlays */}
      <Html position={[0, 0, 0]} center style={{ pointerEvents: 'none', width: '100vw', height: '100vh' }}>
        {meetingRequested && (
          <MatchmakingOverlay meetingStatus={activeMeeting?.status || "waiting"} />
        )}
      </Html>
    </group>
  );
}
