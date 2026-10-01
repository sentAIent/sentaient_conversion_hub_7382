with open('lim_clone/frontend/src/components/GitNexusAuditor.jsx', 'r') as f:
    content = f.read()

# Replace handleSend
old_handleSend = """  const handleSend = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: 'user', content: input }];
    setMessages(newMsgs);
    setInput('');
    
    // Simulate RAG response
    setTimeout(() => {
      let reply = "Based on the knowledge graph, this algorithm contains standard quantitative logic.";
      if (input.toLowerCase().includes("stop-loss") || input.toLowerCase().includes("stop loss")) {
        reply = "The graph indicates a trailing stop-loss mechanism is implemented in the `execute_trade` node, using a 2.5% drawdown threshold.";
      } else if (input.toLowerCase().includes("leverage") || input.toLowerCase().includes("margin")) {
        reply = "This strategy restricts leverage to 1x (no margin). See the `risk_limits` subgraph for enforcement.";
      } else if (input.toLowerCase().includes("security") || input.toLowerCase().includes("vault")) {
        reply = "All API keys are securely routed through the Broker Vault AES-256 system. No plain-text keys are present in the subgraph.";
      } else if (input.toLowerCase().includes("data") || input.toLowerCase().includes("alternative")) {
        reply = "This algorithm subscribes to the Crawlee Alt-Data Sentiment pipeline (SEC & Reddit integration) to weight its entry signals.";
      }
      setMessages([...newMsgs, { role: 'assistant', content: reply }]);
    }, 1000);
  };"""

new_handleSend = """  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: 'user', content: input }];
    setMessages(newMsgs);
    const query = input;
    setInput('');
    
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/api/copilot`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, algorithmId: algorithmId || 'default' })
        });
        const data = await res.json();
        if (data.reply) {
            setMessages([...newMsgs, { role: 'assistant', content: data.reply }]);
        } else {
            setMessages([...newMsgs, { role: 'assistant', content: "Error: No response from copilot." }]);
        }
    } catch (err) {
        console.error(err);
        setMessages([...newMsgs, { role: 'assistant', content: "Network error connecting to copilot." }]);
    }
  };"""

content = content.replace(old_handleSend, new_handleSend)

with open('lim_clone/frontend/src/components/GitNexusAuditor.jsx', 'w') as f:
    f.write(content)
