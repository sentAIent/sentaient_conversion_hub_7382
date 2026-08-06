import api from '@actual-app/api';

export async function initActualBudget() {
  const actualServerUrl = process.env.ACTUAL_SERVER_URL || 'http://localhost:5006';
  const actualPassword = process.env.ACTUAL_PASSWORD;

  console.log(`[Ledger] Initializing connection to Actual Budget at ${actualServerUrl}`);
  
  if (!actualPassword) {
    console.warn('[Ledger] ACTUAL_PASSWORD not set. Local mode only.');
    return null;
  }

  try {
    await api.init({
      dataDir: './actual-data-local',
      serverURL: actualServerUrl,
      password: actualPassword,
    });
    console.log('[Ledger] Connection to Actual Budget established.');
    
    // The budget ID would ideally be configured in environment variable too
    const budgetId = process.env.ACTUAL_BUDGET_ID;
    if (budgetId) {
      await api.downloadBudget(budgetId);
      console.log(`[Ledger] Budget ${budgetId} downloaded.`);
    }
    
    return api;
  } catch (error) {
    console.error('[Ledger] Failed to initialize Actual Budget API:', error);
    return null;
  }
}
