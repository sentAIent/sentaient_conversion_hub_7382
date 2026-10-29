import { NextResponse } from "next/server";
import { pipeline, env } from "@huggingface/transformers";

// Configure transformers to not use local cache in Edge environments
// Ensure WASM is used correctly
env.allowLocalModels = false;
env.useBrowserCache = false;

// Singleton to avoid reloading the model on every request
class PipelineSingleton {
  static task: "text-classification" = "text-classification";
  static model = "Xenova/distilbert-base-uncased-finetuned-sst-2-english";
  static instance: any = null;

  static async getInstance(progress_callback?: any) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, { progress_callback });
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
