import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LocalCase {
    id: string;
    team_id: string;
    name: string;
    description: string | null;
    access_level: string;
    created_at: string;
    isDemo?: boolean;
}

interface CaseStore {
    cases: LocalCase[];
    setCases: (cases: LocalCase[]) => void;
    addCase: (newCase: LocalCase) => void;
    removeCase: (id: string) => void;
}

export const useCaseStore = create<CaseStore>()(
    persist(
        (set) => ({
            cases: [],
            setCases: (cases) => set({ cases }),
            addCase: (newCase) => set((state) => ({ cases: [newCase, ...state.cases] })),
            removeCase: (id) => set((state) => ({ cases: state.cases.filter(c => c.id !== id) }))
        }),
        {
            name: 'legaleagle-case-storage', // key in localStorage
        }
    )
);
