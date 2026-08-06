import { Bot, UserCog } from 'lucide-react';

interface CopilotToggleProps {
  isCopilot: boolean;
  setIsCopilot: (value: boolean) => void;
}

export const CopilotToggle: React.FC<CopilotToggleProps> = ({ isCopilot, setIsCopilot }) => {
  return (
    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg border border-gray-200 mb-6 w-fit mx-auto">
      <button
        onClick={() => setIsCopilot(false)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
          !isCopilot 
            ? 'bg-white shadow-sm text-gray-900 border border-gray-200' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <Bot className="w-4 h-4" />
        Autopilot
      </button>
      <button
        onClick={() => setIsCopilot(true)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
          isCopilot 
            ? 'bg-indigo-50 shadow-sm text-indigo-700 border border-indigo-200' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <UserCog className="w-4 h-4" />
        Copilot
      </button>
    </div>
  );
};
