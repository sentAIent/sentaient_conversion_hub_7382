import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  units: {}, // Keyed by unitId
  buildings: {}, // Keyed by buildingId
  selectedUnitIds: [],
  playerId: null // Will be set on connect
};

export const rtsSlice = createSlice({
  name: 'rts',
  initialState,
  reducers: {
    setPlayerId: (state, action) => {
      state.playerId = action.payload;
    },
    spawnUnit: (state, action) => {
      const { id, type, x, y, ownerId } = action.payload;
      state.units[id] = { id, type, x, y, targetX: x, targetY: y, health: 100, ownerId };
    },
    moveUnit: (state, action) => {
      const { id, targetX, targetY } = action.payload;
      if (state.units[id]) {
        state.units[id].targetX = targetX;
        state.units[id].targetY = targetY;
      }
    },
    // Direct position update from multiplayer sync
    syncUnitPosition: (state, action) => {
      const { id, x, y, targetX, targetY } = action.payload;
      if (state.units[id]) {
        state.units[id].x = x;
        state.units[id].y = y;
        state.units[id].targetX = targetX;
        state.units[id].targetY = targetY;
      } else {
        // If unit doesn't exist locally, it might be an opponent's new unit
        state.units[id] = { id, type: 'fighter', x, y, targetX, targetY, health: 100, ownerId: 'opponent' };
      }
    },
    damageUnit: (state, action) => {
      const { id, damage } = action.payload;
      if (state.units[id]) {
        state.units[id].health -= damage;
        if (state.units[id].health <= 0) {
          delete state.units[id];
        }
      }
    },
    buildBase: (state, action) => {
      const { id, type, x, y, ownerId } = action.payload;
      state.buildings[id] = { id, type, x, y, health: 500, ownerId };
    },
    selectUnits: (state, action) => {
      state.selectedUnitIds = action.payload;
    },
    // Full sync from RxDB / Server
    syncGameState: (state, action) => {
      state.units = action.payload.units || {};
      state.buildings = action.payload.buildings || {};
    }
  }
});

export const { 
  setPlayerId, spawnUnit, moveUnit, syncUnitPosition, 
  damageUnit, buildBase, selectUnits, syncGameState 
} = rtsSlice.actions;

export default rtsSlice.reducer;
