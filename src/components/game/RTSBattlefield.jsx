import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Environment, Plane } from '@react-three/drei';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from '../../store';
import { moveUnit, selectUnits, spawnUnit, syncGameState } from '../../store/rtsSlice';
import { multiplayerService } from '../../services/MultiplayerService';
import { rxdbService } from '../../services/RxDBService';
import { Unit } from './Unit';

// A sub-component that wraps the scene logic so it can use Redux hooks
function SceneContent() {
    const dispatch = useDispatch();
    const units = useSelector(state => state.rts.units);
    const buildings = useSelector(state => state.rts.buildings);
    const selectedUnitIds = useSelector(state => state.rts.selectedUnitIds);
    const playerId = useSelector(state => state.rts.playerId);

    const handlePointerDown = (e) => {
        // Simple selection: if clicking on empty terrain (the plane), and we have units selected, move them.
        if (e.object.name === 'terrain' && selectedUnitIds.length > 0) {
            const point = e.point;
            
            selectedUnitIds.forEach(id => {
                const u = units[id];
                if (u && u.ownerId === playerId) {
                    dispatch(moveUnit({ id, targetX: point.x, targetY: point.z }));
                    // Broadcast to other players
                    multiplayerService.broadcastMove(id, u.x, u.y, point.x, point.z);
                }
            });
            
            // Periodically save state to RxDB for persistence
            rxdbService.saveRTSState({ units, buildings });
        }
    };

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 10]} castShadow intensity={1.5} />
            <Sky sunPosition={[100, 20, 100]} />
            
            {/* Terrain */}
            <mesh 
                name="terrain" 
                rotation={[-Math.PI / 2, 0, 0]} 
                position={[0, 0, 0]} 
                receiveShadow
                onPointerDown={handlePointerDown}
            >
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#2d4c1e" />
            </mesh>

            {/* Render all Units */}
            {Object.values(units).map(unit => (
                <Unit 
                    key={unit.id}
                    {...unit}
                    isSelected={selectedUnitIds.includes(unit.id)}
                />
            ))}
            
            {/* Render Buildings */}
            {Object.values(buildings).map(b => (
                <mesh key={b.id} position={[b.x, 1, b.y]}>
                    <cylinderGeometry args={[2, 2, 2, 8]} />
                    <meshStandardMaterial color={b.ownerId === playerId ? 'blue' : 'red'} />
                </mesh>
            ))}
        </>
    );
}

export default function RTSBattlefield() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Connect to Supabase Realtime
        multiplayerService.connect();

        // Load persisted base/army state from RxDB
        rxdbService.getRTSState().then(savedState => {
            if (savedState) {
                store.dispatch(syncGameState(savedState));
            }
            setIsLoaded(true);
        });

        return () => multiplayerService.disconnect();
    }, []);

    const spawnMyUnit = () => {
        const playerId = store.getState().rts.playerId;
        const newUnit = {
            id: `unit_${Date.now()}`,
            type: 'fighter',
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
            ownerId: playerId
        };
        store.dispatch(spawnUnit(newUnit));
        store.dispatch(selectUnits([newUnit.id]));
        multiplayerService.broadcastSpawn(newUnit);
        
        rxdbService.saveRTSState({ 
            units: store.getState().rts.units, 
            buildings: store.getState().rts.buildings 
        });
    };

    if (!isLoaded) return <div className="text-white p-4">Loading Battlefield...</div>;

    return (
        <div className="w-full h-full relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            <div className="absolute top-4 left-4 z-10 bg-black/50 p-4 rounded-lg backdrop-blur-md">
                <h3 className="text-white font-bold mb-2">Command Center</h3>
                <button 
                    onClick={spawnMyUnit}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm font-semibold"
                >
                    Deploy Unit
                </button>
                <p className="text-xs text-gray-300 mt-2">1. Click "Deploy Unit"<br/>2. Right-click terrain to move</p>
            </div>
            
            <Canvas shadows camera={{ position: [0, 15, 20], fov: 45 }}>
                {/* 
                  React Three Fiber creates a new React context. 
                  We must wrap our scene with Provider so it can read Redux state.
                */}
                <Provider store={store}>
                    <SceneContent />
                </Provider>
                <OrbitControls makeDefault />
            </Canvas>
        </div>
    );
}
