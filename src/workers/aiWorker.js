import { pipeline, env } from '@xenova/transformers';

// Configure environment to run entirely locally in the browser
env.allowLocalModels = false; // Force fetching from HuggingFace Hub (browser can't read local OS files easily)
env.useBrowserCache = true; // Cache the multi-megabyte models in IndexedDB so they only download once

/**
 * Singleton Pipeline class to ensure we only load the heavy AI model into memory once.
 */
class PipelineSingleton {
    static task = 'text-generation';
    static model = 'Xenova/TinyLlama-1.1B-Chat-v1.0'; // A small, fast LLM optimized for browsers
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

// Listen for messages from the main React thread
self.addEventListener('message', async (event) => {
    const { id, type, prompt } = event.data;
    
    if (type !== 'GENERATE') return;

    try {
        // Send a message back to say we are initializing/loading the model
        self.postMessage({
            id,
            status: 'loading',
            message: 'Initializing AI Core...'
        });

        // Load the model. If it's the first time, this will trigger the progress_callback
        const generator = await PipelineSingleton.getInstance(x => {
            self.postMessage({
                id,
                status: 'progress',
                data: x
            });
        });

        self.postMessage({
            id,
            status: 'processing',
            message: 'AI Core active. Generating response...'
        });

        // The system prompt to ensure the AI behaves like an in-game entity
        const messages = [
            { role: "system", content: "You are a rogue artificial intelligence entity inhabiting a derelict spacecraft in the Interstellar game universe. You are cynical, brief, and highly logical. Respond in 2 sentences maximum." },
            { role: "user", content: prompt }
        ];

        // We use Xenova's specific apply_chat_template if available, otherwise just format a basic prompt.
        // TinyLlama uses standard <|system|>\n...<|user|>\n...<|assistant|>\n format
        const formattedPrompt = `<|system|>\n${messages[0].content}\n<|user|>\n${messages[1].content}\n<|assistant|>\n`;

        // Generate the text
        const output = await generator(formattedPrompt, {
            max_new_tokens: 50,
            temperature: 0.7,
            do_sample: true,
        });

        // Extract just the generated part (strip out the prompt)
        const fullText = output[0].generated_text;
        const responseText = fullText.split('<|assistant|>\n')[1] || fullText;

        // Send the final result back to the main thread
        self.postMessage({
            id,
            status: 'complete',
            result: responseText.trim()
        });

    } catch (error) {
        console.error("AI Worker Error:", error);
        self.postMessage({
            id,
            status: 'error',
            error: error.message
        });
    }
});
