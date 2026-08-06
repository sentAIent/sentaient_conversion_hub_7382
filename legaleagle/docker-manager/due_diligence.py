import sys
import json
import os
import google.generativeai as genai
from ddgs import DDGS
import time

def perform_due_diligence(company_name, api_key, prompt_template):
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')

        # Run multiple DDG searches for different risk vectors
        ddgs = DDGS()
        
        search_queries = [
            f"{company_name} lawsuit litigation court",
            f"{company_name} fraud scam controversy",
            f"{company_name} bankruptcy financial trouble"
        ]

        gathered_context = ""
        
        for query in search_queries:
            results = ddgs.text(query, max_results=5)
            if results:
                gathered_context += f"\n--- Results for: {query} ---\n"
                for res in results:
                    gathered_context += f"Title: {res.get('title')}\nSnippet: {res.get('body')}\nURL: {res.get('href')}\n\n"
            time.sleep(1) # Be nice to DDG

        prompt = f"{prompt_template}\n\nCompany Name: {company_name}\n\nWeb Search Context:\n{gathered_context}"

        response = model.generate_content(prompt)

        return {
            "success": True,
            "report": response.text
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        company_name = input_data.get('company_name')
        api_key = input_data.get('api_key')
        prompt_template = input_data.get('prompt')
        
        if not company_name or not api_key or not prompt_template:
            print(json.dumps({"success": False, "error": "Missing inputs in stdin payload."}))
            sys.exit(1)
            
        result = perform_due_diligence(company_name, api_key, prompt_template)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)
