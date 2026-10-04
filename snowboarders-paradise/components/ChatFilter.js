import { pipeline, env } from '@xenova/transformers';

env.allowLocalModels = false;
env.backends.onnx.logLevel = "fatal";

class ChatFilter {
  static instance = null;

  static async getInstance() {
    if (!this.instance) {
      console.log('Initializing Chat Filter (toxic-bert)...');
      this.instance = await pipeline('text-classification', 'Xenova/toxic-bert');
      console.log('Chat Filter ready!');
    }
    return this.instance;
  }

  static async isToxic(text) {
    try {
      const classifier = await this.getInstance();
      const results = await classifier(text);
      
      const toxicScore = results.find(r => r.label === 'toxic')?.score || 0;
      return toxicScore > 0.8;
    } catch (e) {
      console.error('Chat Filter Error:', e);
      return false; // Fail open
    }
  }
}

export default ChatFilter;
