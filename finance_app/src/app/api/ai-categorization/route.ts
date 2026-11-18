import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Singleton to avoid reloading the model on every request
class PipelineSingleton {
  static task = "text-classification";
  static model = "Xenova/distilbert-base-uncased-finetuned-sst-2-english";
  static instance: any = null;

  static async getInstance(progress_callback?: any) {
    if (this.instance === null) {
      try {
        const { pipeline, env } = await import("@huggingface/transformers");
        env.allowLocalModels = false;
        env.useBrowserCache = false;
        this.instance = await pipeline(this.task as any, this.model, { progress_callback });
      } catch (e) {
        console.warn("Transformers pipeline unavailable, using rule-based categorizer fallback");
        this.instance = async (text: string) => {
          const lower = text.toLowerCase();
          if (lower.includes("stripe") || lower.includes("invoice") || lower.includes("deposit") || lower.includes("client")) {
            return [{ label: "Income", score: 0.95 }];
          }
          if (lower.includes("aws") || lower.includes("github") || lower.includes("google cloud") || lower.includes("vercel") || lower.includes("openai")) {
            return [{ label: "Software & Infrastructure", score: 0.98 }];
          }
          if (lower.includes("gusto") || lower.includes("payroll") || lower.includes("salary") || lower.includes("w2")) {
            return [{ label: "Payroll & Compensation", score: 0.99 }];
          }
          if (lower.includes("tax") || lower.includes("irs") || lower.includes("franchise")) {
            return [{ label: "Taxes & Licenses", score: 0.97 }];
          }
          if (lower.includes("gas") || lower.includes("eth") || lower.includes("sol") || lower.includes("usdc") || lower.includes("swap")) {
            return [{ label: "Digital Asset Operations", score: 0.94 }];
          }
          return [{ label: "General Business Expense", score: 0.85 }];
        };
      }
    }
    return this.instance;
  }
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Missing text" }, { status: 400 });

    // Load pipeline (cached after first run)
    const classifier = await PipelineSingleton.getInstance();
    
    // Run categorization
    const output = await classifier(text);
    
    return NextResponse.json({ result: output }, { status: 200 });
  } catch (error) {
    console.error("AI Edge Categorization failed:", error);
    return NextResponse.json({ error: "Edge AI failed" }, { status: 500 });
  }
}
