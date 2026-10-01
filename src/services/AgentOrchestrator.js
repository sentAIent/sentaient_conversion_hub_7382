import { StateGraph, END } from "@langchain/langgraph";
import { Langfuse } from "langfuse";

/**
 * Enterprise Agent Orchestration Service
 * Utilizes LangGraph for state-machine workflows, Langfuse for tracing/observability,
 * and n8n for webhook automations.
 */
class AgentOrchestrator {
    constructor() {
        // Initialize Langfuse for observability
        this.langfuse = new Langfuse({
            publicKey: process.env.VITE_LANGFUSE_PUBLIC_KEY || "pk-lf-mock-key",
            secretKey: process.env.VITE_LANGFUSE_SECRET_KEY || "sk-lf-mock-key",
            baseUrl: "https://cloud.langfuse.com"
        });
        
        // Define local n8n instance base URL
        this.n8nBaseUrl = process.env.VITE_N8N_WEBHOOK_URL || "http://localhost:5678/webhook";
    }

    /**
     * Trigger an external automation via local n8n webhook
     */
    async triggerN8NAutomation(workflowId, payload) {
        try {
            const trace = this.langfuse.trace({ name: "n8n-automation-trigger" });
            
            const url = `${this.n8nBaseUrl}/${workflowId}`;
            console.log(`[AgentOrchestrator] Triggering n8n workflow at ${url}`);
            
            // In a real environment, we'd do a fetch. For the browser demo, we'll mock it if it fails.
            let response;
            try {
                response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } catch (err) {
                console.warn(`[AgentOrchestrator] n8n fetch failed (expected if local n8n is offline). Returning mock success.`);
                trace.update({ statusMessage: "Fallback to mock due to offline n8n" });
                return { success: true, mocked: true, message: "Triggered offline fallback" };
            }

            const data = await response.json();
            trace.update({ output: data });
            return data;
        } catch (error) {
            console.error(`[AgentOrchestrator] n8n Error:`, error);
            return { error: error.message };
        }
    }

    /**
     * Trigger Game Events (Cross-Reality Webhooks)
     * e.g. User discovers a rare galaxy -> n8n mints NFT or sends Discord message
     */
    async triggerGameEvent(eventType, playerState) {
        console.log(`[AgentOrchestrator] Interstellar Game Event Detected: ${eventType}`);
        
        const payload = {
            event: eventType,
            player: playerState.username || 'Space Explorer',
            shipStatus: playerState.shipStatus,
            coordinates: playerState.coordinates,
            timestamp: new Date().toISOString()
        };

        // Trigger the specific n8n webhook for game events
        return await this.triggerN8NAutomation("interstellar-game-event", payload);
    }

    /**
     * Build and run the Agent Swarm State Machine (LangGraph)
     */
    async runResearchWorkflow(initialPrompt) {
        console.log(`[AgentOrchestrator] Initializing LangGraph Workflow...`);
        const trace = this.langfuse.trace({
            name: "ResearchWorkflow",
            metadata: { userPrompt: initialPrompt }
        });

        // 1. Define Graph State structure
        const graphState = {
            input: { value: (current, next) => next, default: () => "" },
            researchData: { value: (current, next) => next, default: () => null },
            validationScore: { value: (current, next) => next, default: () => 0 },
            finalOutput: { value: (current, next) => next, default: () => "" }
        };

        // 2. Define Node Functions
        const researcherNode = async (state) => {
            const span = trace.span({ name: "ResearcherAgent" });
            console.log(`[LangGraph] Researcher Agent running on: ${state.input}`);
            // Mock LLM research call
            await new Promise(r => setTimeout(r, 1000));
            span.end();
            return { researchData: `Compiled research regarding: ${state.input}` };
        };

        const verifierNode = async (state) => {
            const span = trace.span({ name: "VerifierAgent" });
            console.log(`[LangGraph] Verifier Agent evaluating data...`);
            await new Promise(r => setTimeout(r, 800));
            span.end();
            // Score the research (mock)
            return { validationScore: 0.95 };
        };

        const compilerNode = async (state) => {
            const span = trace.span({ name: "CompilerAgent" });
            console.log(`[LangGraph] Compiler Agent generating final report...`);
            
            // Trigger an n8n webhook (e.g. to save report to Google Drive or Slack)
            await this.triggerN8NAutomation("save-report-webhook", { 
                report: state.researchData, 
                score: state.validationScore 
            });

            span.end();
            return { finalOutput: `FINAL REPORT: ${state.researchData} (Confidence: ${state.validationScore})` };
        };

        // 3. Define Conditional Routing
        const shouldReEvaluate = (state) => {
            if (state.validationScore < 0.8) {
                console.log(`[LangGraph] Quality too low (${state.validationScore}). Routing back to researcher.`);
                return "researcher";
            }
            console.log(`[LangGraph] Quality sufficient (${state.validationScore}). Routing to compiler.`);
            return "compiler";
        };

        // 4. Construct the Graph
        const workflow = new StateGraph({ channels: graphState })
            .addNode("researcher", researcherNode)
            .addNode("verifier", verifierNode)
            .addNode("compiler", compilerNode)
            .addEdge("__start__", "researcher")
            .addEdge("researcher", "verifier")
            .addConditionalEdges("verifier", shouldReEvaluate)
            .addEdge("compiler", END);

        // Compile and Run
        const app = workflow.compile();
        
        try {
            const finalState = await app.invoke({ input: initialPrompt });
            console.log(`[LangGraph] Workflow Complete!`, finalState);
            
            // Ensure trace is flushed
            await this.langfuse.flushAsync();
            
            return finalState.finalOutput;
        } catch (error) {
            console.error(`[LangGraph] Workflow Error:`, error);
            trace.update({ level: "ERROR", statusMessage: error.message });
            await this.langfuse.flushAsync();
            throw error;
        }
    }
}

export const agentOrchestrator = new AgentOrchestrator();
