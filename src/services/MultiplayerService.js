import { createClient } from '@supabase/supabase-js';
import { store } from '../store';
import { syncUnitPosition, setPlayerId, spawnUnit } from '../store/rtsSlice';

// Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

class MultiplayerService {
    constructor() {
        this.channel = null;
        this.playerId = `commander-${Math.floor(Math.random() * 100000)}`;
        // Dispatch local player ID immediately
        store.dispatch(setPlayerId(this.playerId));
    }

    connect() {
        if (this.channel) return;

        console.log(`[MultiplayerService] Connecting as ${this.playerId}...`);
        
        // 1. Create a Presence and Broadcast channel
        this.channel = supabase.channel('rts-battlefield', {
            config: {
                presence: { key: this.playerId },
                broadcast: { ack: false } // fast fire-and-forget for movement
            }
        });

        // 2. Listen to unit movements from other players
        this.channel.on(
            'broadcast',
            { event: 'unit-move' },
            (payload) => {
                if (payload.payload.ownerId !== this.playerId) {
                    store.dispatch(syncUnitPosition(payload.payload));
                }
            }
        );

        // 3. Listen to unit spawns from other players
        this.channel.on(
            'broadcast',
            { event: 'unit-spawn' },
            (payload) => {
                if (payload.payload.ownerId !== this.playerId) {
                    store.dispatch(spawnUnit(payload.payload));
                }
            }
        );

        // Subscribe to the channel
        this.channel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                console.log(`[MultiplayerService] Joined battlefield channel.`);
                await this.channel.track({ online_at: new Date().toISOString() });
            }
        });
    }

    // Broadcast when local player moves a unit
    broadcastMove(unitId, currentX, currentY, targetX, targetY) {
        if (!this.channel) return;
        
        this.channel.send({
            type: 'broadcast',
            event: 'unit-move',
            payload: {
                id: unitId,
                ownerId: this.playerId,
                x: currentX,
                y: currentY,
                targetX: targetX,
                targetY: targetY
            }
        });
    }

    // Broadcast when local player spawns a unit
    broadcastSpawn(unitPayload) {
        if (!this.channel) return;

        this.channel.send({
            type: 'broadcast',
            event: 'unit-spawn',
            payload: unitPayload
        });
    }

    disconnect() {
        if (this.channel) {
            supabase.removeChannel(this.channel);
            this.channel = null;
        }
    }
}

export const multiplayerService = new MultiplayerService();
