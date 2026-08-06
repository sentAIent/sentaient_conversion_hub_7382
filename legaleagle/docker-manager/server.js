const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { exec, spawn } = require('child_process');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function getActivePrompt(agentType, tier = 'standard') {
    const { data, error } = await supabase
        .from('prompt_versions')
        .select('id, prompt_text')
        .eq('agent_type', agentType)
        .eq('tier', tier)
        .eq('status', 'active')
        .order('version_number', { ascending: false })
        .limit(1);
    
    if (error || !data || data.length === 0) {
        console.warn(`Could not fetch active prompt for ${agentType}, falling back to default.`);
        return null;
    }
    return data[0];
}

async function logGenerationWithEval(agentType, promptVersionId, userTier, inputData, outputData, evalData) {
    const { data, error } = await supabase
        .from('agent_generations')
        .insert([{
            agent_type: agentType,
            prompt_version_id: promptVersionId,
            user_tier: userTier,
            input_data: inputData,
            output_data: outputData,
            confidence_score: evalData ? evalData.confidence_score : null,
            hallucinations: evalData ? evalData.hallucinations : null,
            verification_notes: evalData ? evalData.verification_notes : null
        }])
        .select('id')
        .single();
    
    if (error) console.error('Error logging generation:', error);
    return data ? data.id : null;
}

function runPythonScript(scriptName, payload) {
    return new Promise((resolve, reject) => {
        const pythonExecutable = path.join(__dirname, 'venv', 'bin', 'python3');
        const scriptPath = path.join(__dirname, scriptName);
        
        const child = spawn(pythonExecutable, [scriptPath], { env: process.env });
        
        let stdout = '';
        let stderr = '';
        
        child.stdout.on('data', data => stdout += data);
        child.stderr.on('data', data => stderr += data);
        
        child.on('close', code => {
            if (code !== 0) {
                console.error(`${scriptName} Error:`, stderr);
                return reject(new Error(`${scriptName} failed: ` + stderr));
            }
            try {
                let output = stdout.trim();
                const jsonStr = output.substring(output.indexOf('{'), output.lastIndexOf('}') + 1);
                const data = JSON.parse(jsonStr);
                
                if (data.error) {
                    return reject(new Error(data.error));
                }
                
                resolve(data);
            } catch (e) {
                console.error(`Failed to parse ${scriptName} output:`, e, 'Raw Output:', stdout);
                reject(new Error(`Invalid output from ${scriptName}`));
            }
        });
        
        child.stdin.write(JSON.stringify(payload));
        child.stdin.end();
    });
}

async function runEvaluator(taskType, inputData, generatedOutput, tier) {
    const promptObj = await getActivePrompt('evaluator_agent', tier);
    const promptTemplate = promptObj ? promptObj.prompt_text : "You are a Senior Reviewer and Quality Assurance Expert for a top-tier law firm. Your task is to rigorously evaluate the provided AI-generated legal research or due diligence output. Check for hallucinations, false information, missing crucial context, and relevance of caselaw/data. You must return a strict JSON object with a \"confidence_score\" (0-100), \"hallucinations\" (an array of strings detailing false info, empty if none), and \"verification_notes\" (your detailed critique).";
    
    const payload = {
        task_type: taskType,
        input_data: JSON.stringify(inputData),
        generated_output: JSON.stringify(generatedOutput),
        api_key: process.env.VITE_GEMINI_API_KEY,
        prompt: promptTemplate
    };

    return runPythonScript('evaluator_agent.py', payload);
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 11236;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'super-secret-local-key';

app.use(cors());
app.use(express.json());

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('Client connected for Copilot:', socket.id);
    
    socket.on('copilot_response', (data) => {
        // Find the active script and send the response back
        console.log('Received Copilot user response:', data);
        // We will wire this up to the python script's stdin later
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Basic Security Middleware
const requireApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    if (apiKey !== ADMIN_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing API Key' });
    }
    next();
};

const CRAWL4AI_CONTAINER_NAME = 'crawl4ai';

// GET /status - Check if crawl4ai is running
app.get('/status', requireApiKey, (req, res) => {
    exec(`docker ps -q -f name=${CRAWL4AI_CONTAINER_NAME}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error checking status:', error);
            return res.status(500).json({ status: 'error', message: error.message });
        }
        
        const isRunning = stdout.trim().length > 0;
        res.json({ 
            status: 'success', 
            data: {
                container: CRAWL4AI_CONTAINER_NAME,
                isRunning: isRunning
            }
        });
    });
});

// POST /start - Start the crawl4ai container
app.post('/start', requireApiKey, (req, res) => {
    const scriptPath = path.join(__dirname, '..', 'start_crawl4ai.sh');
    
    exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error starting container:', error);
            return res.status(500).json({ status: 'error', message: error.message, stderr });
        }
        
        res.json({ 
            status: 'success', 
            message: 'Container started successfully',
            output: stdout
        });
    });
});

// POST /stop - Stop the crawl4ai container
app.post('/stop', requireApiKey, (req, res) => {
    exec(`docker stop ${CRAWL4AI_CONTAINER_NAME} && docker rm ${CRAWL4AI_CONTAINER_NAME}`, (error, stdout, stderr) => {
        if (error) {
            if (stderr.includes('No such container')) {
                 return res.json({ status: 'success', message: 'Container was not running.' });
            }
            console.error('Error stopping container:', error);
            return res.status(500).json({ status: 'error', message: error.message, stderr });
        }
        
        res.json({ 
            status: 'success', 
            message: 'Container stopped and removed successfully',
            output: stdout
        });
    });
});

// POST /api/generate-graph - Extract graph using Gemini
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.post('/api/generate-graph', requireApiKey, async (req, res) => {
    try {
        const { files, text } = req.body;
        let contentToProcess = text || '';
        
        if (!contentToProcess && files && files.length > 0) {
            contentToProcess = `Analyzing files: ${files.join(', ')}. This is a sample legal text containing mentions of Acme Corp and the Master Services Agreement.`;
        }
        
        if (!contentToProcess) {
             return res.status(400).json({ error: 'No text or files provided' });
        }

        const tmpFilePath = path.join(__dirname, `tmp_${uuidv4()}.txt`);
        fs.writeFileSync(tmpFilePath, contentToProcess);

        const pythonExecutable = path.join(__dirname, 'venv', 'bin', 'python3');
        const scriptPath = path.join(__dirname, 'extract_graph.py');
        
        exec(`${pythonExecutable} ${scriptPath} "${tmpFilePath}"`, { env: process.env }, (error, stdout, stderr) => {
            if (fs.existsSync(tmpFilePath)) {
                fs.unlinkSync(tmpFilePath);
            }
            
            if (error) {
                console.error('Extraction Error:', error);
                return res.status(500).json({ error: 'Extraction failed', details: stderr || error.message });
            }
            
            try {
                let output = stdout.trim();
                if (output.startsWith('```json')) {
                    output = output.replace(/^```json\n/, '').replace(/\n```$/, '');
                }
                const graphData = JSON.parse(output);
                
                if (graphData.error) {
                    return res.status(500).json({ error: graphData.error });
                }
                
                res.json({ success: true, graph: graphData });
            } catch (e) {
                console.error('Failed to parse Python output:', e, 'Raw Output:', stdout);
                res.status(500).json({ error: 'Invalid output from extraction model', raw: stdout });
            }
        });
    } catch (err) {
        console.error('Error generating graph:', err);
        res.status(500).json({ error: 'Failed to generate graph' });
    }
});

function getThresholdForTier(tier) {
    if (tier === 'enterprise') return 95;
    if (tier === 'premium' || tier === 'pro') return 85;
    return 70;
}

// POST /api/deep-research - Execute the Deep Research script
app.post('/api/deep-research', requireApiKey, async (req, res) => {
    try {
        const { topic, tier = 'standard' } = req.body;
        
        if (!topic) {
             return res.status(400).json({ error: 'No research topic provided' });
        }

        const promptObj = await getActivePrompt('deep_research', tier);
        const promptTemplate = promptObj ? promptObj.prompt_text : "You are an expert Legal Due Diligence & Research Agent. Please synthesize a comprehensive, highly professional legal research report.";

        const threshold = getThresholdForTier(tier);
        const MAX_ATTEMPTS = 3;
        let attempt = 0;
        let researchData = null;
        let evalData = null;

        while (attempt < MAX_ATTEMPTS) {
            attempt++;
            researchData = await runPythonScript('deep_research.py', { query: topic, prompt: promptTemplate });
            evalData = await runEvaluator('deep_research', { topic }, researchData, tier);
            
            if (evalData.confidence_score >= threshold) {
                break;
            }
        }
        
        const generationId = await logGenerationWithEval('deep_research', promptObj?.id, tier, { topic }, researchData, evalData);
        
        if (evalData.confidence_score < threshold) {
            return res.json({ 
                success: false, 
                requires_additional_research: true,
                message: "This project requires additional research. We will provide the analysis once thoroughly completed.",
                generation_id: generationId 
            });
        }
        
        res.json({ 
            success: true, 
            report: researchData.report, 
            sources: researchData.sources, 
            generation_id: generationId,
            evaluator: evalData
        });

    } catch (err) {
        console.error('Error during deep research:', err);
        res.status(500).json({ error: err.message || 'Failed to execute deep research' });
    }
});

// POST /api/web-scraper - Execute the Web Scraping Agent
app.post('/api/web-scraper', requireApiKey, async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: 'No URL provided' });

        const pythonExecutable = path.join(__dirname, 'venv', 'bin', 'python3');
        const scriptPath = path.join(__dirname, 'web_scraper.py');
        
        exec(`${pythonExecutable} ${scriptPath} "${url}"`, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                console.error('Web Scraper Error:', error);
                return res.status(500).json({ error: 'Scraping failed', details: stderr || error.message });
            }
            try {
                let output = stdout.trim();
                const jsonStr = output.substring(output.indexOf('{'), output.lastIndexOf('}') + 1);
                res.json(JSON.parse(jsonStr));
            } catch (e) {
                res.status(500).json({ error: 'Invalid output from scraper', raw: stdout });
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to execute web scraper' });
    }
});

// POST /api/due-diligence - Execute Due Diligence Agent
app.post('/api/due-diligence', requireApiKey, async (req, res) => {
    try {
        const { companyName, tier = 'standard' } = req.body;
        if (!companyName) return res.status(400).json({ error: 'No company name provided' });

        const promptObj = await getActivePrompt('due_diligence', tier);
        const promptTemplate = promptObj ? promptObj.prompt_text : "You are an expert corporate investigator and risk analyst. Analyze this information and provide a comprehensive due diligence report.";

        const threshold = getThresholdForTier(tier);
        const MAX_ATTEMPTS = 3;
        let attempt = 0;
        let diligenceData = null;
        let evalData = null;
        
        const apiKey = process.env.VITE_GEMINI_API_KEY;

        while (attempt < MAX_ATTEMPTS) {
            attempt++;
            diligenceData = await runPythonScript('due_diligence.py', { company_name: companyName, api_key: apiKey, prompt: promptTemplate });
            evalData = await runEvaluator('due_diligence', { companyName }, diligenceData, tier);
            
            if (evalData.confidence_score >= threshold) {
                break;
            }
        }
        
        const generationId = await logGenerationWithEval('due_diligence', promptObj?.id, tier, { companyName }, diligenceData, evalData);
        
        if (evalData.confidence_score < threshold) {
            return res.json({ 
                success: false, 
                requires_additional_research: true,
                message: "This project requires additional research. We will provide the analysis once thoroughly completed.",
                generation_id: generationId 
            });
        }
        
        res.json({ ...diligenceData, generation_id: generationId, evaluator: evalData });

    } catch (err) {
        console.error('Error during due diligence:', err);
        res.status(500).json({ error: err.message || 'Failed to execute due diligence' });
    }
});

// POST /api/contract-team - Execute Multi-Agent Contract Team
app.post('/api/contract-team', requireApiKey, async (req, res) => {
    try {
        const { contractText, tier = 'standard' } = req.body;
        if (!contractText) return res.status(400).json({ error: 'No contract text provided' });

        const [financialPrompt, legalPrompt, ipPrompt, synthesizerPrompt] = await Promise.all([
            getActivePrompt('financial_analyst', tier),
            getActivePrompt('legal_counsel', tier),
            getActivePrompt('ip_specialist', tier),
            getActivePrompt('synthesizer', tier)
        ]);

        const prompts = {
            financial_prompt: financialPrompt?.prompt_text,
            legal_prompt: legalPrompt?.prompt_text,
            ip_prompt: ipPrompt?.prompt_text,
            synthesizer_prompt: synthesizerPrompt?.prompt_text
        };

        const threshold = getThresholdForTier(tier);
        const MAX_ATTEMPTS = 3;
        let attempt = 0;
        let reviewData = null;
        let evalData = null;
        
        const apiKey = process.env.VITE_GEMINI_API_KEY;

        while (attempt < MAX_ATTEMPTS) {
            attempt++;
            reviewData = await runPythonScript('contract_review_team.py', { contract_text: contractText, api_key: apiKey, prompts });
            evalData = await runEvaluator('contract_review_team', { contractLength: contractText.length }, reviewData, tier);
            
            if (evalData.confidence_score >= threshold) {
                break;
            }
        }
        
        const generationId = await logGenerationWithEval('contract_review_team', synthesizerPrompt?.id, tier, { contractLength: contractText.length }, reviewData, evalData);
        
        if (evalData.confidence_score < threshold) {
            return res.json({ 
                success: false, 
                requires_additional_research: true,
                message: "This project requires additional research. We will provide the analysis once thoroughly completed.",
                generation_id: generationId 
            });
        }
        
        res.json({ ...reviewData, generation_id: generationId, evaluator: evalData });

    } catch (err) {
        console.error('Error during contract team execution:', err);
        res.status(500).json({ error: err.message || 'Failed to execute contract team' });
    }
});

// POST /api/submit-feedback - Save user feedback on a generation
app.post('/api/submit-feedback', requireApiKey, async (req, res) => {
    try {
        const { generationId, rating, comments, feedbackData } = req.body;
        if (!generationId || rating === undefined) {
            return res.status(400).json({ error: 'Missing generationId or rating' });
        }
        
        const { error } = await supabase
            .from('user_feedback')
            .insert([{
                generation_id: generationId,
                rating,
                comments,
                feedback_data: feedbackData
            }]);
            
        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        console.error('Error submitting feedback:', err);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
});

// POST /api/trigger-learning - Trigger the prompt learning script
app.post('/api/trigger-learning', requireApiKey, async (req, res) => {
    res.json({ success: true, message: 'Learning trigger acknowledged (Placeholder)' });
});

server.listen(PORT, () => {
    console.log(`Local Docker Manager running on http://localhost:${PORT}`);
    console.log(`Using Admin API Key: ${ADMIN_API_KEY}`);
});
