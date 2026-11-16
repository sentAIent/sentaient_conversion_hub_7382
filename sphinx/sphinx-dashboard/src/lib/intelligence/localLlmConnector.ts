// src/lib/intelligence/localLlmConnector.ts
// Local Ollama & Project NOMAD AI Connector with Telemetry RAG

export interface LocalLlmConfig {
  endpoint: string; // e.g. 'http://localhost:11434' or 'http://nomad.local:11434'
  model: string;    // e.g. 'llama3.2', 'mistral', 'phi-3'
  timeoutMs: number;
  apiType: 'ollama' | 'openai';
}

export const DEFAULT_LLM_CONFIG: LocalLlmConfig = {
  endpoint: 'http://localhost:11434',
  model: 'llama3.2:latest',
  timeoutMs: 8000,
  apiType: 'ollama'
};

export class LocalLlmConnector {
  private static STORAGE_KEY = 'sphinx_local_llm_config_v1';

  public static getConfig(): LocalLlmConfig {
    if (typeof window === 'undefined') return DEFAULT_LLM_CONFIG;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) return { ...DEFAULT_LLM_CONFIG, ...JSON.parse(raw) };
    } catch {}
    return DEFAULT_LLM_CONFIG;
  }

  public static saveConfig(cfg: Partial<LocalLlmConfig>): void {
    if (typeof window === 'undefined') return;
    try {
      const current = this.getConfig();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ ...current, ...cfg }));
    } catch {}
  }

  // Ping endpoint and get available models
  public static async checkConnection(endpoint: string = this.getConfig().endpoint): Promise<{
    connected: boolean;
    models: string[];
    latencyMs: number;
    error?: string;
  }> {
    const start = Date.now();
    try {
      // Try Ollama native endpoint first
      const res = await fetch(`${endpoint.replace(/\/+$/, '')}/api/tags`, {
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const data = await res.json();
        const models = (data.models || []).map((m: any) => m.name || m.model);
        return {
          connected: true,
          models,
          latencyMs: Date.now() - start
        };
      }
    } catch (e: any) {
      // Fallback check OpenAI-compatible /v1/models
      try {
        const res2 = await fetch(`${endpoint.replace(/\/+$/, '')}/v1/models`, {
          signal: AbortSignal.timeout(3000)
        });
        if (res2.ok) {
          const data2 = await res2.json();
          const models = (data2.data || []).map((m: any) => m.id);
          return {
            connected: true,
            models,
            latencyMs: Date.now() - start
          };
        }
      } catch (err: any) {
        return {
          connected: false,
          models: [],
          latencyMs: Date.now() - start,
          error: err.message || 'Connection refused'
        };
      }
    }

    return {
      connected: false,
      models: [],
      latencyMs: Date.now() - start,
      error: 'Unreachable'
    };
  }

  // Query local Ollama model with Telemetry RAG injection
  public static async queryLocalLlm(
    prompt: string,
    telemetryContext: Record<string, any>
  ): Promise<string | null> {
    const cfg = this.getConfig();
    const endpoint = cfg.endpoint.replace(/\/+$/, '');

    const systemPrompt = `You are the Sphinx Tactical AI Assistant operating on an off-grid hardware appliance (Project NOMAD / Sphinx Tactical Core).
Current Operator Telemetry:
${JSON.stringify(telemetryContext, null, 2)}
Respond with concise, authoritative, and tactically grounded intelligence.`;

    try {
      if (cfg.apiType === 'ollama') {
        const res = await fetch(`${endpoint}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: cfg.model,
            system: systemPrompt,
            prompt,
            stream: false
          }),
          signal: AbortSignal.timeout(cfg.timeoutMs)
        });
        if (res.ok) {
          const data = await res.json();
          return data.response || null;
        }
      } else {
        // OpenAI-compatible format
        const res = await fetch(`${endpoint}/v1/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: cfg.model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: prompt }
            ]
          }),
          signal: AbortSignal.timeout(cfg.timeoutMs)
        });
        if (res.ok) {
          const data = await res.json();
          return data.choices?.[0]?.message?.content || null;
        }
      }
    } catch {
      return null;
    }

    return null;
  }
}
