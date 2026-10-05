import { useEffect, useRef, useState } from 'react';
import { supabase } from '../config/supabase';

export const useMultiplayer = (roomId = 'global-space', onPlayerUpdate, onPlayerLeave, onChatMessage, onEnemySync) => {
    const channelRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

    const userIdRef = useRef('player_' + Math.random().toString(36).substr(2, 9));

    useEffect(() => {
        const userId = userIdRef.current;
        
        // Initialize the channel
        const channel = supabase.channel(`room:${roomId}`, {
            config: {
                presence: { key: userId },
            }
        });

        // Listen for presence changes (join/leave)
        channel.on('presence', { event: 'sync' }, () => {
            const newState = channel.presenceState();
        });

        channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
            console.log('Player joined:', key);
        });

        channel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
            console.log('Player left:', key);
            if (onPlayerLeave) onPlayerLeave(key);
        });

        // Listen for broadcast messages (high frequency position updates)
        channel.on('broadcast', { event: 'pos' }, ({ payload }) => {
            if (payload.userId !== userId && onPlayerUpdate) {
                onPlayerUpdate(payload.userId, payload.data);
            }
        });

        // Listen for chat messages
        channel.on('broadcast', { event: 'chat' }, ({ payload }) => {
            if (payload.userId !== userId && onChatMessage) {
                onChatMessage(payload.userId, payload.message);
            }
        });

        // Listen for server enemy state sync
        channel.on('broadcast', { event: 'enemy_sync' }, ({ payload }) => {
            if (onEnemySync) {
                onEnemySync(payload);
            }
        });

        channel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                setIsConnected(true);
                // Track our presence
                await channel.track({ online_at: new Date().toISOString() });
            } else {
                setIsConnected(false);
            }
        });

        channelRef.current = channel;

        return () => {
            if (channelRef.current) {
                supabase.removeChannel(channelRef.current);
            }
        };
    }, [roomId, onPlayerUpdate, onPlayerLeave, onChatMessage, onEnemySync]);

    const broadcastPosition = (data) => {
        if (isConnected && channelRef.current) {
            channelRef.current.send({
                type: 'broadcast',
                event: 'pos',
                payload: { userId: userIdRef.current, data }
            });
        }
    };

    const broadcastChat = (message) => {
        if (isConnected && channelRef.current) {
            channelRef.current.send({
                type: 'broadcast',
                event: 'chat',
                payload: { userId: userIdRef.current, message }
            });
        }
    };

    return { isConnected, broadcastPosition, broadcastChat };
};
