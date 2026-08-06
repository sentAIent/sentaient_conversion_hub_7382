import { useEffect, useRef } from 'react';
import { PageAgent } from 'page-agent';

export default function PageAgentCopilot() {
  const agentRef = useRef<any>(null);

  useEffect(() => {
    // Only initialize once
    if (!agentRef.current) {
      agentRef.current = new PageAgent({
        // Gemini has an OpenAI compatible endpoint
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
        apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
        model: 'gemini-2.5-flash',
        language: 'en-US'
      });
      
      // Automatically show the UI panel in the corner
      if (agentRef.current.panel) {
        agentRef.current.panel.show();
      }
    }

    return () => {
      // Optional cleanup if needed by PageAgent
      if (agentRef.current?.panel?.hide) {
        agentRef.current.panel.hide();
      }
    };
  }, []);

  return null; // The agent renders its own DOM UI
}
