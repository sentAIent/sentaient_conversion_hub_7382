/**
 * graphRAG.js
 * Implements a local Graph-based Retrieval-Augmented Generation (GraphRAG) index.
 * Extracts entity-relationship triples and searches the resulting knowledge graph.
 */
export class GraphRAG {
    constructor() {
        this.nodes = {}; // Map of entityName -> { id, label, type }
        this.edges = []; // List of { source, target, relation }
    }

    /**
     * Parse raw unstructured text items to extract entities and connections.
     * In a production environment, this queries the ModelRouter/LLM with a triple extraction prompt.
     * Locally, it uses an optimized NLP heuristic parsing rule.
     * @param {Array<Object>} items Harmonized GDPR database items
     */
    async buildGraphIndex(items = []) {
        this.nodes = {};
        this.edges = [];

        for (const item of items) {
            const text = item.content || '';
            const llmSuccess = await this.extractTriplesLLM(text);
            
            if (!llmSuccess) {
                const sentences = text.split(/[.!?]/).map(s => s.trim()).filter(Boolean);

                sentences.forEach(sentence => {
                    // Rule-based Triple Extraction (Heuristic Parser)
                    // Looks for: Subject (Noun Phrase) -> Verb/Relation -> Object (Noun Phrase)
                    const verbs = ['uses', 'builds', 'needs', 'contains', 'supports', 'integrates', 'wants', 'recommends', 'refactors'];
                    const sentenceLower = sentence.toLowerCase();

                    for (const verb of verbs) {
                        if (sentenceLower.includes(` ${verb} `)) {
                            const parts = sentence.split(new RegExp(`\\s${verb}\\s`, 'i'));
                            if (parts.length === 2) {
                                const subject = parts[0].trim();
                                const object = parts[1].trim();

                                // Clean subject/object labels
                                const cleanSub = this.cleanEntityName(subject);
                                const cleanObj = this.cleanEntityName(object);

                                if (cleanSub && cleanObj) {
                                    this.addTriple(cleanSub, verb, cleanObj);
                                }
                            }
                        }
                    }
                });
            }
        }

        console.log(`[GraphRAG] Compiled Knowledge Graph: ${Object.keys(this.nodes).length} nodes, ${this.edges.length} edges.`);
    }

    async extractTriplesLLM(text) {
        if (!text || text.trim().length === 0) return false;
        try {
            const prompt = `Extract entity-relationship triples from the following text. Output ONLY valid JSON array of objects with { "subject": "string", "predicate": "string", "object": "string" }.\\n\\nText: "${text}"`;
            
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'llama3',
                    prompt: prompt,
                    stream: false,
                    format: 'json'
                })
            });
            
            if (!response.ok) throw new Error('Ollama endpoint offline');
            
            const data = await response.json();
            const triples = JSON.parse(data.response);
            
            triples.forEach(t => {
                const cleanSub = this.cleanEntityName(t.subject);
                const cleanObj = this.cleanEntityName(t.object);
                if (cleanSub && cleanObj) {
                    this.addTriple(cleanSub, t.predicate, cleanObj);
                }
            });
            return true;
        } catch (e) {
            console.warn('[GraphRAG] LLM Extraction failed or offline, falling back to heuristic parser.', e.message);
            return false;
        }
    }

    cleanEntityName(name) {
        // Strip common articles and truncate long phrases
        return name
            .replace(/^(the|a|an|our|their|my)\s+/i, '')
            .split(',')[0]
            .split(' because ')[0]
            .trim()
            .substring(0, 40);
    }

    /**
     * Add a Subject-Predicate-Object triple relation to the graph structure.
     */
    addTriple(subject, relation, object) {
        const subKey = subject.toLowerCase().replace(/\s+/g, '_');
        const objKey = object.toLowerCase().replace(/\s+/g, '_');

        // Add nodes if missing
        if (!this.nodes[subKey]) {
            this.nodes[subKey] = { id: subKey, label: subject, type: this.inferEntityType(subject) };
        }
        if (!this.nodes[objKey]) {
            this.nodes[objKey] = { id: objKey, label: object, type: this.inferEntityType(object) };
        }

        // Add edge
        const edgeExists = this.edges.some(e => e.source === subKey && e.target === objKey && e.relation === relation);
        if (!edgeExists) {
            this.edges.push({
                source: subKey,
                target: objKey,
                relation: relation
            });
        }
    }

    inferEntityType(entityName) {
        const lower = entityName.toLowerCase();
        if (['react', 'vite', 'tauri', 'rust', 'docker', 'sqlite', 'api', 'stripe', 'ollama'].some(t => lower.includes(t))) {
            return 'technology';
        }
        if (['alex', 'user', 'people', 'client', 'subscriber'].some(t => lower.includes(t))) {
            return 'person';
        }
        return 'concept';
    }

    /**
     * Search the Knowledge Graph and return relevant entities and connections (subgraph).
     * @param {string} queryString Search query term
     * @returns {Object} { nodes: Array, edges: Array } Subgraph matching query
     */
    queryGraph(queryString) {
        const queryTerm = queryString.toLowerCase().trim();
        const matchingNodeKeys = Object.keys(this.nodes).filter(k => 
            k.includes(queryTerm) || this.nodes[k].label.toLowerCase().includes(queryTerm)
        );

        if (matchingNodeKeys.length === 0) {
            return { nodes: [], edges: [] };
        }

        const subgraphNodes = {};
        const subgraphEdges = [];

        // Grab matching nodes and all their 1-hop connected neighbors
        matchingNodeKeys.forEach(key => {
            subgraphNodes[key] = this.nodes[key];

            this.edges.forEach(edge => {
                if (edge.source === key) {
                    subgraphNodes[edge.target] = this.nodes[edge.target];
                    subgraphEdges.push(edge);
                } else if (edge.target === key) {
                    subgraphNodes[edge.source] = this.nodes[edge.source];
                    subgraphEdges.push(edge);
                }
            });
        });

        return {
            nodes: Object.values(subgraphNodes),
            edges: subgraphEdges
        };
    }
}

export default GraphRAG;
