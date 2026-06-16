const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('/Users/infinitealpha/.gemini/antigravity/brain/8976171f-6472-45bb-92e8-3c494bbc86c5/.system_generated/logs/transcript.jsonl'),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            obj.tool_calls.forEach(call => {
                if (call.name === 'generate_image') {
                    console.log(call.arguments.Prompt);
                }
            });
        }
    } catch (e) {}
});
