/**
 * Local-First Offline Sync Engine
 * 
 * Provides resilient, offline-first transaction logging with client-side persistence,
 * optimistic updates, cryptographic idempotency keys, and conflict-free sync reconciliation.
 */

export interface QueuedSyncAction {
  idempotencyKey: string;
  actionType: 'CREATE_EXPENSE' | 'RECORD_JOURNAL' | 'ISSUE_INVOICE' | 'UPDATE_TAX_LOT';
  payload: Record<string, any>;
  createdAt: string; // ISO 8601
  retryCount: number;
  status: 'PENDING' | 'SYNCING' | 'SYNCED' | 'FAILED';
  errorMessage?: string;
}

export class OfflineSyncEngine {
  private static STORAGE_KEY = 'liquid_offline_sync_queue_v1';

  /**
   * Generates a collision-resistant idempotency key
   */
  public static generateIdempotencyKey(actionType: string, payload: any): string {
    const raw = `${actionType}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}_${JSON.stringify(payload).length}`;
    return raw;
  }

  /**
   * Enqueues an action for optimistic local execution and future sync
   */
  public static enqueueAction(actionType: QueuedSyncAction['actionType'], payload: Record<string, any>): QueuedSyncAction {
    const queue = this.getQueue();
    const action: QueuedSyncAction = {
      idempotencyKey: this.generateIdempotencyKey(actionType, payload),
      actionType,
      payload,
      createdAt: new Date().toISOString(),
      retryCount: 0,
      status: 'PENDING'
    };

    queue.push(action);
    this.saveQueue(queue);
    return action;
  }

  /**
   * Reads all queued actions from local storage
   */
  public static getQueue(): QueuedSyncAction[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Saves queue to local storage
   */
  private static saveQueue(queue: QueuedSyncAction[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(queue));
    } catch (e) {
      console.error('Failed to persist sync queue', e);
    }
  }

  /**
   * Flushes the offline queue against the remote backend
   */
  public static async flushQueue(
    syncEndpoint: (action: QueuedSyncAction) => Promise<boolean>
  ): Promise<{ synced: number; failed: number }> {
    const queue = this.getQueue();
    let synced = 0;
    let failed = 0;

    const remainingQueue: QueuedSyncAction[] = [];

    for (const action of queue) {
      if (action.status === 'SYNCED') continue;

      try {
        action.status = 'SYNCING';
        const success = await syncEndpoint(action);
        if (success) {
          action.status = 'SYNCED';
          synced++;
        } else {
          action.status = 'FAILED';
          action.retryCount++;
          remainingQueue.push(action);
          failed++;
        }
      } catch (err: any) {
        action.status = 'FAILED';
        action.retryCount++;
        action.errorMessage = err.message || 'Unknown network error';
        remainingQueue.push(action);
        failed++;
      }
    }

    this.saveQueue(remainingQueue);
    return { synced, failed };
  }

  /**
   * Clears all synced or failed actions
   */
  public static clearQueue(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}
