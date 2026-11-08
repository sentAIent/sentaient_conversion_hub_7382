// resilientDataClient.ts
// Robust, zero-latency failover client for offline & distributed data ingestion.
// Prevents network hangs, handles Chrome Private Network Access blocks, and ensures
// the dashboard is 100% resilient with immediate fallback to bundled baseline datasets.

export interface ResilientFetchOptions {
  timeoutMs?: number;
  headers?: Record<string, string>;
  preferCache?: boolean;
}

export class ResilientDataClient {
  private static localServerDownUntil = 0;
  private static cachedBaseline: any = null;
  private static inflightBaselinePromise: Promise<any> | null = null;

  /**
   * Check if running in a local browser environment and local server is not known to be down.
   */
  public static isLocalServerViable(): boolean {
    if (typeof window === 'undefined') return false;
    if (Date.now() < this.localServerDownUntil) return false;
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }

  /**
   * Circuit breaker: trip the local server for 60 seconds on any connection refusal or timeout
   */
  public static tripCircuitBreaker(durationMs = 300000): void {
    this.localServerDownUntil = Date.now() + durationMs;
  }

  /**
   * Normalize data filepaths between /sphinx/data/ and /data/
   */
  public static resolveDataPath(relPath: string): string {
    const clean = relPath.startsWith('/') ? relPath.slice(1) : relPath;
    if (clean.startsWith('sphinx/data/')) {
      return `/${clean}`;
    }
    if (clean.startsWith('data/')) {
      return `/sphinx/${clean}`;
    }
    return `/sphinx/data/${clean}`;
  }

  /**
   * Resilient fetch: Tries primary relative or direct endpoint with a tight timeout,
   * failing fast over to fallback bundled static data without locking UI thread.
   */
  public static async fetchWithFallback<T>(
    primaryUrl: string,
    fallbackUrl?: string,
    options: ResilientFetchOptions = {}
  ): Promise<T | null> {
    const timeoutMs = options.timeoutMs ?? (primaryUrl.includes('3117') ? 300 : 1500);

    // Try primary if not tripped
    if (this.isLocalServerViable() || !primaryUrl.includes('3117')) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);

        // Normalize 127.0.0.1:3117 to relative /api when running on port 3000 to leverage Next.js rewrites and avoid PNA preflight
        let targetUrl = primaryUrl;
        if (typeof window !== 'undefined' && (targetUrl.includes('127.0.0.1:3117/api/') || targetUrl.includes('localhost:3117/api/'))) {
          targetUrl = targetUrl.replace(/^https?:\/\/(127\.0\.0\.1|localhost):3117/, '');
        }

        const res = await fetch(targetUrl, {
          signal: controller.signal,
          headers: options.headers
        });
        clearTimeout(timer);

        if (res.ok) {
          return (await res.json()) as T;
        } else {
          if (primaryUrl.includes('3117')) this.tripCircuitBreaker();
        }
      } catch (err) {
        if (primaryUrl.includes('3117')) this.tripCircuitBreaker();
      }
    }

    // Secondary fallback
    if (fallbackUrl) {
      try {
        const primaryFallback = this.resolveDataPath(fallbackUrl);
        let res = await fetch(primaryFallback);
        if (!res.ok) {
          // Try alternative root /data/
          const altFallback = fallbackUrl.startsWith('/') ? fallbackUrl : `/${fallbackUrl}`;
          res = await fetch(altFallback);
        }
        if (res.ok) {
          return (await res.json()) as T;
        }
      } catch (err) {
        // Fallback failed
      }
    }

    return null;
  }

  /**
   * Retrieve the watchtower baseline dataset containing 1,500+ authentic features
   */
  public static async getWatchtowerBaseline(): Promise<any> {
    if (this.cachedBaseline) return this.cachedBaseline;
    if (this.inflightBaselinePromise) return this.inflightBaselinePromise;

    this.inflightBaselinePromise = (async () => {
      try {
        const paths = ['/sphinx/data/watchtower_baseline.json', '/data/watchtower_baseline.json'];
        for (const p of paths) {
          try {
            const res = await fetch(p);
            if (res.ok) {
              const data = await res.json();
              if (data && Object.keys(data).length > 0) {
                this.cachedBaseline = data;
                return data;
              }
            }
          } catch (e) {}
        }
      } finally {
        this.inflightBaselinePromise = null;
      }
      return null;
    })();

    return this.inflightBaselinePromise;
  }

  /**
   * Retrieve baseline aircraft features for instant offline hydration
   */
  public static async getAircraftBaseline(): Promise<any> {
    const data = await this.getWatchtowerBaseline();
    return { features: data?.aircraft || [] };
  }
}
