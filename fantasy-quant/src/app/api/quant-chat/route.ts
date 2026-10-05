import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { StateGraph, END } from '@langchain/langgraph';
import { Redis } from 'ioredis';
import { CallbackHandler } from 'langfuse-langchain';
import { Langfuse } from 'langfuse';

export const dynamic = 'force-dynamic';

// Initialize Redis for Edge Caching (Graceful fallback if URL missing)
const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

// Initialize Langfuse for LLM Observability
const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY || 'dummy_pk',
  secretKey: process.env.LANGFUSE_SECRET_KEY || 'dummy_sk',
  baseUrl: process.env.LANGFUSE_HOST || 'https://cloud.langfuse.com'
});

interface AgentState {
  message: string;
  methodologiesContext: string;
  queryConfig: any;
  dbData: any[] | null;
  dbError: string | null;
  finalResponse: string;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message) return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });

    // Edge Caching Layer: Check if identical query exists
    const cacheKey = `chat_cache_${message.trim().toLowerCase()}`;
    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        console.log("Serving from Edge Cache (Valkey/Redis)");
        return NextResponse.json(JSON.parse(cached));
      }
    }

    const trace = langfuse.trace({
      name: "QuantChat-MultiAgent",
      input: message,
      metadata: { environment: "production" }
    });
    
    // Using Langfuse Callback Handler for LangChain/LangGraph
    const langfuseHandler = new CallbackHandler({ root: trace });

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Step 1: Supervisor Node
    const supervisorNode = async (state: AgentState): Promise<Partial<AgentState>> => {
      trace.span({ name: "SupervisorNode" });
      const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
      const embedResult = await embeddingModel.embedContent(state.message);
      
      const { data: methodologies } = await supabase.rpc('match_methodologies', {
        query_embedding: embedResult.embedding.values,
        match_threshold: 0.5,
        match_count: 3
      });

      let methodologyContext = "";
      if (methodologies && methodologies.length > 0) {
        methodologyContext = methodologies.map((m: any) => `--- ${m.title} ---\n${m.content}\n`).join('\n');
      }

      const systemPrompt = `You are J.A.R.V.I.S., the ultimate Quant-as-a-Service AI. 
Methodologies: ${methodologyContext}
Return ONLY a JSON object for SQL: { "query": { "table": "players", "select": "*", "filters": [] } } or { "conversationalResponse": "answer" }`;
      
      const res = await chatModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\nUser Request: ${state.message}` }] }]
      });
      const aiText = res.response.text() || '{}';
      
      let queryConfig = {};
      try { queryConfig = JSON.parse(aiText.replace(/```json/g, '').replace(/```/g, '').trim()); } 
      catch (e) { queryConfig = { conversationalResponse: aiText }; }

      return { methodologiesContext: methodologyContext, queryConfig };
    };

    // Step 2: Quant Data Fetcher Node
    const quantNode = async (state: AgentState): Promise<Partial<AgentState>> => {
      trace.span({ name: "QuantDatabaseNode" });
      if (!state.queryConfig?.query?.table) return { dbData: null };
      
      try {
        let q: any = supabase.from(state.queryConfig.query.table).select(state.queryConfig.query.select);
        const { data, error } = await q.limit(50);
        return { dbData: data, dbError: error?.message || null };
      } catch (err: any) {
        return { dbError: err.message };
      }
    };

    // Step 3: Synthesizer Node
    const synthesizerNode = async (state: AgentState): Promise<Partial<AgentState>> => {
      trace.span({ name: "SynthesizerNode" });
      if (state.dbError) return { finalResponse: `DB Error: ${state.dbError}` };
      if (!state.dbData || state.dbData.length === 0) return { finalResponse: state.queryConfig.conversationalResponse || "No data." };

      const prompt = `J.A.R.V.I.S. Quant Synthesis.\nMethodologies: ${state.methodologiesContext}\nData: ${JSON.stringify(state.dbData)}\nFormat as highly sophisticated Markdown tables. 
CRITICAL RULE: When offering advice or answering open-ended questions, probe the user for their priorities (e.g., risk tolerance, lineup quality, record) if not provided. Provide balanced analysis catering to various situations, explicitly delineating perspectives (e.g., "If your objective is a safe floor..." vs. "If your objective is pure upside...").`;
      const res = await chatModel.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }] }] });
      return { finalResponse: res.response.text() };
    };

    const graphState = {
      message: null,
      methodologiesContext: null,
      queryConfig: null,
      dbData: null,
      dbError: null,
      finalResponse: null
    };

    const workflow = new StateGraph({ channels: graphState })
      .addNode("supervisor", supervisorNode)
      .addNode("quant", quantNode)
      .addNode("synthesizer", synthesizerNode)
      .addEdge("supervisor", "quant")
      .addEdge("quant", "synthesizer")
      .addEdge("synthesizer", END);

    workflow.setEntryPoint("supervisor");
    const app = workflow.compile();

    const finalState = await app.invoke({ message }, { callbacks: [langfuseHandler] });
    trace.update({ output: finalState.finalResponse });
    await langfuse.shutdownAsync();

    const responsePayload = {
      success: true,
      text: finalState.finalResponse,
      tool: finalState.queryConfig?.query ? `fetch_${finalState.queryConfig.query.table}` : null,
      widget: finalState.dbData ? { type: finalState.queryConfig?.query?.table, data: finalState.dbData } : null
    };

    if (redis) {
      await redis.set(cacheKey, JSON.stringify(responsePayload), 'EX', 3600); // 1 hour TTL
    }

    return NextResponse.json(responsePayload);

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
