import re

with open('lim_clone/backend_python/main.py', 'r') as f:
    content = f.read()

# Add import if missing
if 'from ai_research_agent import build_research_graph' not in content:
    content = content.replace('from audit_engine import AuditEngine', 'from audit_engine import AuditEngine\nfrom ai_research_agent import build_research_graph\nfrom langchain_core.messages import HumanMessage')

endpoint_code = """
@app.get("/api/research/alpha")
async def get_alpha_streams(symbol: str = "AAPL"):
    try:
        app_graph = build_research_graph()
        initial_state = {"messages": [HumanMessage(content=f"Analyze {symbol} momentum strategy.")]}
        result = app_graph.invoke(initial_state)
        
        return {
            "symbol": symbol,
            "final_report": result.get("final_report", "No report generated"),
            "sentiment": result.get("research_data", {}).get("sentiment_score", 0.5),
            "status": "success"
        }
    except Exception as e:
        logger.error(f"Research agent error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
"""

if '/api/research/alpha' not in content:
    content += endpoint_code

with open('lim_clone/backend_python/main.py', 'w') as f:
    f.write(content)
