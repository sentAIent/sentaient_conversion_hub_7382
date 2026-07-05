export const saveAnalysisHistory = async (_userId: string, _data: any) => { console.log('Mock save history'); };
export const loadAnalysisHistory = async (_userId: string): Promise<any[]> => { return []; };
export const uploadDocument = async (_userId: string, _file: File) => { return { path: 'mock-path' }; };
