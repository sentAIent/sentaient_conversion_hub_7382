import { SphinxMemory } from './memory.mjs';

export class ThreatEvaluator {
  constructor(llmProvider) {
    this.llm = llmProvider;
    this.memory = new SphinxMemory();
    
    this.systemPrompt = `You are Sphinx, a highly advanced, local artificial intelligence and personal security system.
Your primary directive is to evaluate sensory and intelligence data from global OSINT sources, local physical sensors, and cameras to assess threats to the user.

When presented with raw intelligence data, you must classify the situation into one of three tiers:
1. [ROUTINE]: Normal operational data, minor global news, no immediate threat to the user's location or assets.
2. [PRIORITY]: Elevated risk, suspicious local activity, severe weather, or significant geopolitical events requiring the user's awareness.
3. [FLASH]: Imminent physical danger, perimeter breach, detected weapons, or immediate localized crisis.

Always respond in a concise, clinical, and authoritative tone. If a threat is PRIORITY or FLASH, immediately recommend a defensive action (e.g., locking doors, arming alarms).`;
  }

  async evaluateData(source, data) {
    const pastEvents = await this.memory.recallRecentEvents(3);
    const contextString = pastEvents.length > 0 
      ? `\n\nRecent Memory Context:\n${JSON.stringify(pastEvents, null, 2)}` 
      : '';

    const userPrompt = `New incoming data from [${source}]:\n${JSON.stringify(data, null, 2)}${contextString}\n\nClassify and evaluate this new data based on the context.`;
    
    console.log(`[Sphinx Threat Evaluator] Analyzing data from ${source}...`);
    try {
      const response = await this.llm.complete(this.systemPrompt, userPrompt);
      const assessment = response.text;
      
      // Store this event and its assessment into long-term memory
      await this.memory.storeEvent(source, data, assessment);
      
      return assessment;
    } catch (err) {
      console.error(`[Sphinx Threat Evaluator] Error:`, err.message);
      return "[ERROR] Unable to evaluate threat data.";
    }
  }
}
