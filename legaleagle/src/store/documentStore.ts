import { create } from 'zustand';
import { INITIAL_TEXT } from '@/constants';
import type { Party } from '@/types';

export interface DocObj {
    id: string;
    name: string;
    text: string;
}

interface DocumentState {
    documents: DocObj[];
    activeDocumentId: string | null;
    documentText: string;
    documentName: string;
    activeCaseId: string | null;
    activeHistoryId: string | null;
    activeDemoId: string | null;
    parties: Party[];
    contractType: any;
    perspective: string;
    
    // Actions
    setDocumentText: (text: string) => void;
    setDocumentName: (name: string) => void;
    setActiveCaseId: (id: string | null) => void;
    setActiveHistoryId: (id: string | null) => void;
    setActiveDemoId: (id: string | null) => void;
    setParties: (parties: Party[]) => void;
    setContractType: (type: any) => void;
    setPerspective: (perspective: string) => void;
    clearDocument: () => void;
    addDocument: (name: string, text: string) => void;
    removeDocument: (id: string) => void;
    setActiveDocumentId: (id: string) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
    documents: [{ id: 'default', name: 'Draft_Agreement.txt', text: INITIAL_TEXT }],
    activeDocumentId: 'default',
    documentText: INITIAL_TEXT,
    documentName: "Draft_Agreement.txt",
    activeCaseId: null,
    activeHistoryId: null,
    activeDemoId: null,
    contractType: 'nda',
    perspective: 'User',
    parties: [
        { id: 1, name: 'Company A', role: 'Provider', domicile: 'Wyoming' },
        { id: 2, name: 'Client B', role: 'Client', domicile: 'Texas' }
    ],

    setDocumentText: (text) => set((state) => {
        const newDocs = state.documents.map(d => 
            d.id === state.activeDocumentId ? { ...d, text } : d
        );
        return { documentText: text, documents: newDocs };
    }),
    setDocumentName: (name) => set((state) => {
        const newDocs = state.documents.map(d => 
            d.id === state.activeDocumentId ? { ...d, name } : d
        );
        return { documentName: name, documents: newDocs };
    }),
    setActiveCaseId: (id) => set({ activeCaseId: id }),
    setActiveHistoryId: (id) => set({ activeHistoryId: id }),
    setActiveDemoId: (id) => set({ activeDemoId: id }),
    setParties: (parties) => set({ parties }),
    setContractType: (type) => set({ contractType: type }),
    setPerspective: (perspective) => set({ perspective }),
    
    clearDocument: () => set({
        documents: [{ id: 'default', name: 'Draft_Agreement.txt', text: INITIAL_TEXT }],
        activeDocumentId: 'default',
        documentText: INITIAL_TEXT,
        documentName: 'Draft_Agreement.txt'
    }),
    
    addDocument: (name, text) => set((state) => {
        const id = Math.random().toString(36).substring(7);
        const newDoc = { id, name, text };
        return { 
            documents: [...state.documents, newDoc],
            activeDocumentId: id,
            documentName: name,
            documentText: text
        };
    }),

    removeDocument: (id) => set((state) => {
        const newDocs = state.documents.filter(d => d.id !== id);
        if (newDocs.length === 0) {
            return {
                documents: [{ id: 'default', name: 'Draft_Agreement.txt', text: INITIAL_TEXT }],
                activeDocumentId: 'default',
                documentName: 'Draft_Agreement.txt',
                documentText: INITIAL_TEXT
            };
        }
        
        if (state.activeDocumentId === id) {
            const nextDoc = newDocs[newDocs.length - 1];
            return {
                documents: newDocs,
                activeDocumentId: nextDoc.id,
                documentName: nextDoc.name,
                documentText: nextDoc.text
            };
        }

        return { documents: newDocs };
    }),

    setActiveDocumentId: (id) => set((state) => {
        const doc = state.documents.find(d => d.id === id);
        if (doc) {
            return {
                activeDocumentId: id,
                documentName: doc.name,
                documentText: doc.text
            };
        }
        return state;
    })
}));
