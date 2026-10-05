import http from 'http';

/**
 * Node.js fallback GraphRAG Indexer
 * Uses simple heuristic NLP parsing instead of the advanced Python LangChain logic.
 */

const PORT = 8002;

function extractEntitiesAndRelationsNode(text) {
    if (!text || typeof text !== 'string') return [];
    
    const words = text.split(' ');
    if (words.length < 3) return [];
    
    // Naive fallback extraction
    return [{
        subject: words[0],
        relation: "node_fallback_link",
        object: words[words.length - 1]
    }];
}

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/api/extract_graph') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const payload = JSON.parse(body);
                const triplets = extractEntitiesAndRelationsNode(payload.text);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'success',
                    engine: 'node-fallback',
                    triplets: triplets
                }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(\`[Node GraphRAG] Fallback Indexer running on port \${PORT}...\`);
});
