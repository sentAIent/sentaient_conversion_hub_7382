import re

with open('src/components/chat/JarvisChat.tsx', 'r') as f:
    content = f.read()

# Render methodologiesApplied in the UI
ui_patch = """
                <div className="flex flex-col gap-2 max-w-[85%]">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-900 text-gray-100 rounded-bl-none border border-gray-800 shadow-xl'}`}>
                    {msg.text}
                  </div>
                  
                  {!isUser && msg.methodologiesApplied && msg.methodologiesApplied.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {msg.methodologiesApplied.map((m, i) => (
                        <span key={i} className="bg-indigo-900/40 text-indigo-300 border border-indigo-800 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Database size={8} /> {m}
                        </span>
                      ))}
                    </div>
                  )}
"""

content = content.replace("""
                <div className="flex flex-col gap-2 max-w-[85%]">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-900 text-gray-100 rounded-bl-none border border-gray-800 shadow-xl'}`}>
                    {msg.text}
                  </div>
""", ui_patch)

# Also use ReactMarkdown since we asked AI to output markdown tables!
import_patch = """import { 
  Bot, Send, X, MessageSquare, Terminal, RefreshCw, Sparkles, User, Play, Database
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
"""

content = re.sub(r"import \{[^}]+\} from 'lucide-react';", import_patch, content, count=1)

# And render msg.text with ReactMarkdown instead of raw string if not user
markdown_render = """
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-900 text-gray-100 rounded-bl-none border border-gray-800 shadow-xl'}`}>
                    {isUser ? msg.text : (
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        className="prose prose-invert prose-xs max-w-none prose-tables:border-collapse prose-th:border prose-th:border-gray-700 prose-th:bg-gray-800 prose-td:border prose-td:border-gray-800"
                      >
                        {msg.text}
                      </ReactMarkdown>
                    )}
                  </div>
"""

content = content.replace("""
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-900 text-gray-100 rounded-bl-none border border-gray-800 shadow-xl'}`}>
                    {msg.text}
                  </div>
""", markdown_render)

with open('src/components/chat/JarvisChat.tsx', 'w') as f:
    f.write(content)
