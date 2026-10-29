import React, { useEffect, useState } from 'react';
import { socket } from './socket';
import { RemotePlayer } from './RemotePlayer';

export function MultiplayerManager() {
  const [remotePlayers, setRemotePlayers] = useState({});

  useEffect(() => {
    const handleGameState = (state) => {
      // Exclude ourselves from the remote players rendering
      const others = { ...state.players };
      delete others[socket.id];
      setRemotePlayers(others);
    };

    socket.on('game_state', handleGameState);

    return () => {
      socket.off('game_state', handleGameState);
    };
  }, []);

  return (
    <group>
      {Object.values(remotePlayers).map(player => (
        <RemotePlayer key={player.id} data={player} />
      ))}
    </group>
  );
}
