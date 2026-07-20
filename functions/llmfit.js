const { onRequest } = require("firebase-functions/v2/https");
const { execFile } = require("child_process");
const path = require("path");

exports.llmfitRecommend = onRequest({ cors: true }, (req, res) => {
    // Only allow POST
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }

    const { ram, vram, cores } = req.body;
    
    // Build arguments
    const args = ["recommend", "--json"];
    
    if (ram) {
        args.push("--ram", `${ram}G`);
    }
    if (vram) {
        args.push("--memory", `${vram}G`);
    }
    if (cores) {
        args.push("--cpu-cores", `${cores}`);
    }

    const binaryPath = path.join(__dirname, "bin", "llmfit");

    execFile(binaryPath, args, (error, stdout, stderr) => {
        if (error) {
            console.error("llmfit execution error:", error);
            console.error("stderr:", stderr);
            // Ignore error code 1 if there's valid JSON output (sometimes llmfit exits 1 on partial failures)
            if (!stdout.trim().startsWith("{")) {
                res.status(500).json({ error: "Failed to get hardware recommendations", details: stderr });
                return;
            }
        }
        
        try {
            const data = JSON.parse(stdout);
            res.status(200).json(data);
        } catch (parseError) {
            console.error("Failed to parse JSON:", parseError);
            res.status(500).json({ error: "Invalid JSON response from llmfit" });
        }
    });
});
