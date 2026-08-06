import sys
import json
import os
import google.generativeai as genai

def extract_graph(text):
    # Configure the Gemini API
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print(json.dumps({"error": "GEMINI_API_KEY is not set."}))
        sys.exit(1)
        
    genai.configure(api_key=api_key)
    
    # We want a structured output, so we define the JSON schema schema for the graph
    schema = {
        "type": "OBJECT",
        "properties": {
            "nodes": {
                "type": "ARRAY",
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "id": {"type": "STRING"},
                        "type": {"type": "STRING", "description": "Type of node (e.g., contract, clause, entity, evidence)"},
                        "name": {"type": "STRING"},
                        "summary": {"type": "STRING"}
                    },
                    "required": ["id", "type", "name", "summary"]
                }
            },
            "edges": {
                "type": "ARRAY",
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "source": {"type": "STRING", "description": "ID of the source node"},
                        "target": {"type": "STRING", "description": "ID of the target node"},
                        "type": {"type": "STRING", "description": "Relationship type (e.g., contains, references, binds, modifies)"}
                    },
                    "required": ["source", "target", "type"]
                }
            }
        },
        "required": ["nodes", "edges"]
    }

    model = genai.GenerativeModel('gemini-2.5-flash', generation_config={"response_mime_type": "application/json", "response_schema": schema})
    
    prompt = f"""
    Analyze the following legal text and extract a Knowledge Graph representing its key entities, clauses, documents, and their relationships.
    
    Text:
    {text}
    """
    
    try:
        response = model.generate_content(prompt)
        print(response.text)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input file provided."}))
        sys.exit(1)
        
    file_path = sys.argv[1]
    
    if not os.path.exists(file_path):
        print(json.dumps({"error": f"File not found: {file_path}"}))
        sys.exit(1)
        
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()
        
    extract_graph(text)
