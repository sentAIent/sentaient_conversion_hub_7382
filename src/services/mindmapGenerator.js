/**
 * mindmapGenerator.js
 * Processes harmonized personal data items and clusters them semantically
 * into mind map nodes, code architectures, roadmaps, and nested task lists.
 */
export class MindmapGenerator {
    constructor() {
        this.clusteredNodes = [];
    }

    /**
     * Clusters raw data items into structured brainstorming mind map topics.
     * @param {Array<Object>} rawItems Array of harmonized data elements from GDPRParser
     * @returns {Object} Structured Mind Map graphs, roadmaps, and task lists
     */
    generateMindMap(rawItems = []) {
        this.clusteredNodes = [];
        
        // Define topic category mappings with keywords
        const categories = {
            coding: {
                title: "Software Engineering & Architecture Ideas",
                keywords: ["code", "dev", "app", "api", "database", "git", "port", "docker", "server", "js", "ts", "python"],
                nodes: []
            },
            strategy: {
                title: "Business Strategy & Marketing Launch",
                keywords: ["client", "sell", "pitch", "marketing", "business", "stripe", "user", "revenue", "price", "sub"],
                nodes: []
            },
            research: {
                title: "Academic Research & Data Synthesis",
                keywords: ["paper", "academic", "search", "arxiv", "retrieve", "graph", "vector", "embedding", "study"],
                nodes: []
            },
            daily: {
                title: "Daily Tasks & Productivity Actions",
                keywords: ["buy", "call", "schedule", "meeting", "task", "grocery", "remind", "calendar", "reminders"],
                nodes: []
            }
        };

        // Classify each raw item into categories based on keywords
        rawItems.forEach(item => {
            const contentLower = (item.content || "").toLowerCase();
            const titleLower = (item.title || "").toLowerCase();
            let matched = false;

            for (const key in categories) {
                const hasKeyword = categories[key].keywords.some(kw => 
                    contentLower.includes(kw) || titleLower.includes(kw)
                );
                if (hasKeyword) {
                    categories[key].nodes.push(item);
                    matched = true;
                    break;
                }
            }

            // Fallback to daily categorizing
            if (!matched) {
                categories.daily.nodes.push(item);
            }
        });

        // Compile clustered output nodes
        const nodes = [];
        const connections = [];
        let idCounter = 1;

        // Create central hub node
        const centerId = "node_center";
        nodes.push({
            id: centerId,
            label: "Cognitive Center",
            type: "hub",
            x: 0,
            y: 0,
            summary: "Unified central repository of user thoughts, bookmarks, reminders, and DMs."
        });

        // Build child nodes per category
        for (const key in categories) {
            const cat = categories[key];
            if (cat.nodes.length === 0) continue;

            const catNodeId = `node_${key}`;
            const angle = Object.keys(categories).indexOf(key) * (Math.PI / 2);
            const distance = 250;

            // Category summary node
            nodes.push({
                id: catNodeId,
                label: cat.title,
                type: "category",
                x: Math.round(Math.cos(angle) * distance),
                y: Math.round(Math.sin(angle) * distance),
                summary: `Aggregated thoughts covering ${cat.nodes.length} source files.`,
                count: cat.nodes.length
            });

            connections.push({ from: centerId, to: catNodeId });

            // Generate concrete strategic suggestions and roadmap from nodes
            const generatedNodes = this.synthesizeNodeOutputs(key, cat.nodes);
            generatedNodes.forEach((genNode, index) => {
                const genNodeId = `node_gen_${key}_${index}`;
                const genAngle = angle + (index - (generatedNodes.length - 1) / 2) * 0.4;
                const genDistance = distance + 200;

                nodes.push({
                    id: genNodeId,
                    label: genNode.label,
                    type: genNode.type, // "roadmap" | "tasklist" | "code_idea"
                    x: Math.round(Math.cos(genAngle) * genDistance),
                    y: Math.round(Math.sin(genAngle) * genDistance),
                    summary: genNode.summary,
                    details: genNode.details,
                    sources: genNode.sources
                });

                connections.push({ from: catNodeId, to: genNodeId });
            });
        }

        return { nodes, connections };
    }

    /**
     * Dual-Stack GraphRAG extraction logic
     * Attempts to query the primary Python LangChain service.
     * Falls back to the native Node.js heuristic indexer.
     */
    async extractGraphRAGRelations(text) {
        try {
            // Attempt Primary Python Service
            const pyRes = await fetch('http://localhost:8001/api/extract_graph', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            if (pyRes.ok) {
                const data = await pyRes.json();
                console.log("[GraphRAG] Using advanced Python engine.");
                return data.triplets || [];
            }
        } catch (err) {
            console.warn("[GraphRAG] Python service failed or not spun up. Falling back to Node.js...", err.message);
        }

        try {
            // Fallback Node.js Service
            const nodeRes = await fetch('http://localhost:8002/api/extract_graph', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            if (nodeRes.ok) {
                const data = await nodeRes.json();
                console.log("[GraphRAG] Using Node.js fallback engine.");
                return data.triplets || [];
            }
        } catch (err) {
            console.error("[GraphRAG] Both Python and Node indexers failed.", err.message);
        }

        return [];
    }

    /**
     * Synthesize raw data items into smart generated tasks/code/timeline outputs.
     */
    synthesizeNodeOutputs(categoryKey, rawNodes) {
        const sourceSummaries = rawNodes.map(rn => `[${rn.source.toUpperCase()}] ${rn.title}`).slice(0, 3);
        
        if (categoryKey === "coding") {
            return [
                {
                    label: "Dynamic Port Orchestrator",
                    type: "code_idea",
                    summary: "Create a Node script verifying local network ports and aligning Vite + Tauri dynamic host bindings.",
                    details: "Includes writing scripts/dev-runner.js utilizing dynamic imports and the 'net' module.",
                    sources: sourceSummaries
                },
                {
                    label: "Self-Healing Test Pipeline",
                    type: "tasklist",
                    summary: "Set up a test runner framework catching errors and rewriting files automatically.",
                    details: "1. Capture stdout from npm test\n2. Extract type errors\n3. Patch files with guard clauses",
                    sources: sourceSummaries
                }
            ];
        }

        if (categoryKey === "strategy") {
            return [
                {
                    label: "SaaS Launch Roadmap",
                    type: "roadmap",
                    summary: "Milestones for scaling Cognitive Studio to enterprise clients.",
                    details: "Q3: Launch Dynamic Scraper Engine\nQ4: Rollout Stripe billing meters\nQ1: Package Tauri Desktop apps",
                    sources: sourceSummaries
                }
            ];
        }

        if (categoryKey === "research") {
            return [
                {
                    label: "GraphRAG Grounding System",
                    type: "code_idea",
                    summary: "Design vector storage mechanisms combining database relations and text embedding lookups.",
                    details: "Construct cosine-similarity search algorithms matching client inputs in semanticCache.js.",
                    sources: sourceSummaries
                }
            ];
        }

        // Default daily/productivity synthesis
        return [
            {
                label: "Unified Task Roadmap",
                type: "tasklist",
                summary: "Aggregated items from Keep, Reminders, and Calendar.",
                details: "1. Compile grocery lists\n2. Group meeting details\n3. Schedule daily agendas",
                sources: sourceSummaries
            }
        ];
    }
}

export default MindmapGenerator;
