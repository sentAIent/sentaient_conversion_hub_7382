import { pipeline, env } from '@xenova/transformers';

// Skip local model check since we are running in a browser
env.allowLocalModels = false;

// We use a singleton pattern for the pipeline to avoid re-initializing
class PipelineSingleton {
  static task = 'token-classification';
  static model = 'Xenova/bert-base-NER';
  static instance: any = null;

  static async getInstance(progress_callback?: Function) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task as any, this.model, {
        progress_callback,
      });
    }
    return this.instance;
  }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
  const { id, text } = event.data;

  try {
    // Get the pipeline instance, passing a callback to track download progress
    const redactor = await PipelineSingleton.getInstance((progress: any) => {
      self.postMessage({
        id,
        status: 'progress',
        progress
      });
    });

    // Run the text through the model
    // The NER model returns entities like B-PER, I-PER, B-ORG, I-ORG, B-LOC, I-LOC
    const output = await redactor(text, { ignore_labels: ['O'] });
    
    // Group sub-words into full entities based on B- and I- tags
    const entities = output.reduce((acc: any[], curr: any) => {
        // If it starts with B-, it's a new entity
        if (curr.entity.startsWith('B-')) {
            acc.push({
                word: curr.word.replace('##', ''),
                type: curr.entity.substring(2),
                score: curr.score,
                start: curr.start,
                end: curr.end
            });
        } 
        // If it starts with I- and we have a previous entity of same type, append to it
        else if (curr.entity.startsWith('I-') && acc.length > 0) {
            const lastEntity = acc[acc.length - 1];
            if (lastEntity.type === curr.entity.substring(2)) {
                // Determine if we need a space (simple heuristic: if it was a ## word, no space)
                const word = curr.word.startsWith('##') ? curr.word.substring(2) : ` ${curr.word}`;
                lastEntity.word += word;
                lastEntity.end = curr.end;
                // Average the score
                lastEntity.score = (lastEntity.score + curr.score) / 2;
            }
        }
        return acc;
    }, []);

    // Filter out low confidence scores to prevent over-redaction
    const highConfidenceEntities = entities.filter((e: any) => e.score > 0.85);

    // Send the extracted entities back
    self.postMessage({
      id,
      status: 'complete',
      entities: highConfidenceEntities
    });

  } catch (error: any) {
    self.postMessage({
      id,
      status: 'error',
      error: error.message
    });
  }
});
