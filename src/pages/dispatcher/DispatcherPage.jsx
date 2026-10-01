import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { ConvexProvider, ConvexReactClient, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import LobbyWorld from './LobbyWorld';
import GuideDashboard from '../../components/ui/GuideDashboard';

// Hardcoded for the prototype to avoid needing full authentication setup
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL || "https://happy-animal-123.convex.cloud";
const convex = new ConvexReactClient(CONVEX_URL);

// Inner component that actually uses Convex hooks
function DispatcherPrototype() {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null); // 'visitor' or 'guide'
  
  const registerUser = useMutation(api.users.registerUser);

  const loginAs = async (selectedRole) => {
    const id = await registerUser({
      name: `Test ${selectedRole}`,
      role: selectedRole
    });
    setUserId(id);
    setRole(selectedRole);
  };

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white font-mono space-y-6">
        <h1 className="text-3xl font-bold text-cyan-400">3D Matchmaker Prototype</h1>
        <p className="text-gray-400">Select a role to enter the 3D environment.</p>
        <div className="flex space-x-4">
          <button onClick={() => loginAs('visitor')} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded font-bold">
            Enter as Visitor
          </button>
          <button onClick={() => loginAs('guide')} className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded font-bold">
            Enter as Guide
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-8 max-w-md text-center">
          For testing, open this page in two different browser windows. Join one as a Guide and go Online. Join the other as a Visitor and click the AI.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative bg-black">
      {/* 2D Dashboard for Guides */}
      {role === 'guide' && <GuideDashboard currentUserId={userId} />}
      
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 20, 100], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 50, 10]} intensity={2} color="#00ffff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <LobbyWorld position={[0, 0, 0]} currentUserId={userId} />
        
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.05} />
      </Canvas>
    </div>
  );
}

// Wrapper to provide the Convex client
export default function DispatcherPage() {
  return (
    <ConvexProvider client={convex}>
      <DispatcherPrototype />
    </ConvexProvider>
  );
}
