import { CreateMLCEngine } from "@mlc-ai/web-llm";

export interface ScenarioResult {
  insight_summary: string;
  dataset: any[];
}

export class InBrowserLLM {
  private engine: any = null;
  private isLoaded = false;
  private onProgressCallback: (progress: string) => void = () => {};

  public setOnProgress(callback: (progress: string) => void) {
    this.onProgressCallback = callback;
  }

  public async init() {
    if (this.isLoaded) return;
    
    // We will use a small LLM model suitable for text-to-SQL logic, e.g. Llama-3-8B-Instruct-q4f32_1-MLC
    const selectedModel = "Llama-3-8B-Instruct-q4f32_1-MLC";
    
    this.engine = await CreateMLCEngine(selectedModel, {
      initProgressCallback: (info: any) => {
        this.onProgressCallback(`Loading Model: ${info.text}`);
      },
    });
    
    this.isLoaded = true;
    this.onProgressCallback("Model Loaded");
  }

  public async generateSQL(scenario: string, schema: string): Promise<string> {
    if (!this.isLoaded) await this.init();
    
    const messages = [
      {
        role: "system",
        content: `You are a strict Text-to-SQL engine for Fantasy Quant.
You translate natural language queries into valid PostgreSQL queries.
Use this database schema:
${schema}

Return ONLY the raw SQL query. Do not wrap in markdown or backticks.
The query must be read-only (SELECT).
For probabilities, return the calculation inside the SQL if possible, or return the raw data needed.`
      },
      {
        role: "user",
        content: scenario
      }
    ];

    const reply = await this.engine.chat.completions.create({
      messages,
      temperature: 0.1,
    });

    let sql = reply.choices[0].message.content.trim();
    // Strip markdown formatting if any
    if (sql.startsWith("\`\`\`sql")) {
      sql = sql.replace(/^\`\`\`sql/, "").replace(/\`\`\`$/, "").trim();
    } else if (sql.startsWith("\`\`\`")) {
      sql = sql.replace(/^\`\`\`/, "").replace(/\`\`\`$/, "").trim();
    }
    
    return sql;
  }
}

export const llmService = new InBrowserLLM();
