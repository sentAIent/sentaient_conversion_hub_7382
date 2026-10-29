import { streamText, Message } from 'ai';
import { openai } from '@ai-sdk/openai';
import MemoryClient from 'mem0ai';

const memory = new MemoryClient();

export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json();
    const latestMessage = messages[messages.length - 1];

    // 1. Retrieve relevant memories for the user based on the current prompt
    let memoryContext = '';
    if (userId) {
      try {
        const memories = await memory.search(latestMessage.content, {
          user_id: userId,
        });
        if (memories && memories.length > 0) {
          memoryContext = `\n\nRelevant user memory/context: ${memories
            .map((m: any) => m.memory)
            .join(' ')}`;
        }
      } catch (e) {
        console.warn('Mem0 search failed, continuing without memory.', e);
      }
    }

    // 2. Add memories to the system prompt
    const systemPrompt = `You are Liquid, a highly intelligent financial AI assistant. 
    You are helpful, concise, and focused on maximizing the user's financial health.
    ${memoryContext}`;

    // 3. Stream the response using Vercel AI SDK
    const result = await streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages,
    });

    // 4. In the background, asynchronously save the new interaction to memory
    if (userId) {
      result.text().then((finalResponse) => {
         memory.add([
           { role: 'user', content: latestMessage.content },
           { role: 'assistant', content: finalResponse }
         ], { user_id: userId }).catch(console.error);
      });
    }

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
