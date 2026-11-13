import React from 'react';
import { useChat } from 'ai/react';
import { QuantDataGrid } from '../components/QuantDataGrid';
import { ConversionHeatmap } from '../components/ConversionHeatmap';
import { CompetitorIntelPanel } from '../components/CompetitorIntelPanel';

/**
 * GenerativeAgent
 * Leverages Vercel AI SDK to stream React components as tool calls
 * instead of just text responses.
 */
export const GenerativeAgent = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat', // Your backend endpoint using streamText with tools
  });

  // Render specific UI components based on tool invocations from the LLM
  const renderToolCall = (toolCall) => {
    switch (toolCall.toolName) {
      case 'showPortfolio':
        return (
          <div className="my-4 border border-gray-800 rounded-xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
            <div className="bg-gray-900 px-4 py-2 text-xs font-semibold text-emerald-400 border-b border-gray-800">
              Interactive Component Rendered
            </div>
            <QuantDataGrid initialData={toolCall.args.data} />
          </div>
        );
      case 'showHeatmap':
        return (
          <div className="my-4 border border-gray-800 rounded-xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
             <ConversionHeatmap config={toolCall.args} />
          </div>
        );
      case 'showCompetitors':
        return (
          <div className="my-4 border border-gray-800 rounded-xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
             <CompetitorIntelPanel query={toolCall.args.query} />
          </div>
        );
      default:
        return <div className="text-gray-500 italic">Unknown tool call: {toolCall.toolName}</div>;
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto bg-[#121212] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
      <div className="bg-black/50 backdrop-blur-md px-6 py-4 border-b border-gray-800 flex justify-between items-center z-10">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
          Sentaient Generative AI
        </h2>
        <span className="flex items-center text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          Live Sync
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-800/80 text-gray-200 border border-gray-700 rounded-bl-none'
            }`}>
              {m.content && <div className="prose prose-invert max-w-none">{m.content}</div>}
              
              {/* Render Generative UI Tool Calls */}
              {m.toolInvocations?.map(toolCall => (
                <div key={toolCall.toolCallId}>
                  {renderToolCall(toolCall)}
                </div>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/80 border border-gray-700 rounded-2xl rounded-bl-none px-5 py-3 flex space-x-2 items-center h-10">
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-[#0a0a0a] border-t border-gray-800">
        <form onSubmit={handleSubmit} className="flex gap-3 relative">
          <input
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder-gray-500"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me to show your portfolio, heatmap, or competitor intel..."
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerativeAgent;
