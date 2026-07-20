"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Entity } from '@/lib/supabaseClient';

const MOCK_ENTITIES: Entity[] = [
  { id: '1', user_id: 'user_1', name: 'Personal Finances', type: 'PERSONAL', created_at: new Date().toISOString() },
  { id: '2', user_id: 'user_1', name: 'Alpha Consulting LLC', type: 'LLC', created_at: new Date().toISOString() },
];

interface EntityContextType {
  entities: Entity[];
  activeEntity: Entity | null;
  setActiveEntity: (entity: Entity) => void;
}

const EntityContext = createContext<EntityContextType | undefined>(undefined);

export function EntityProvider({ children }: { children: ReactNode }) {
  const [entities] = useState<Entity[]>(MOCK_ENTITIES);
  const [activeEntity, setActiveEntity] = useState<Entity | null>(entities[0]);

  return (
    <EntityContext.Provider value={{ entities, activeEntity, setActiveEntity }}>
      {children}
    </EntityContext.Provider>
  );
}

export function useEntity() {
  const context = useContext(EntityContext);
  if (context === undefined) {
    throw new Error('useEntity must be used within an EntityProvider');
  }
  return context;
}
