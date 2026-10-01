import re

with open('lim_clone/backend_python/main.py', 'r') as f:
    content = f.read()

copilot_code = """
class CopilotRequest(BaseModel):
    query: str
    algorithmId: str = "default"

@app.post("/api/copilot")
async def copilot_chat(req: CopilotRequest):
    try:
        # Simple RAG: Read quant_engine.py and answer questions
        with open("quant_lean_engine.py", "r") as f:
            codebase_context = f.read()
        
        prompt = f"You are GitNexus Copilot, an expert AI assistant for a quantitative trading codebase.\\n\\nCodebase:\\n{codebase_context}\\n\\nUser Query: {req.query}"
        
        # We will use Gemini if available, or just a dummy
        import google.generativeai as genai
        import os
        
        if os.getenv("GEMINI_API_KEY"):
            genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(prompt)
            return {"reply": response.text}
        else:
            return {"reply": "GEMINI_API_KEY not set. Cannot perform RAG."}
            
    except Exception as e:
        logger.error(f"Copilot error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
"""

if '/api/copilot' not in content:
    content += copilot_code

with open('lim_clone/backend_python/main.py', 'w') as f:
    f.write(content)
