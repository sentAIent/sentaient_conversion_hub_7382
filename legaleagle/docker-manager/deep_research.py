import sys
import json
import os
import requests
from bs4 import BeautifulSoup
from duckduckgo_search import DDGS
import google.generativeai as genai

# Setup Gemini API
GEMINI_API_KEY = os.environ.get("VITE_GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print(json.dumps({"error": "Gemini API key not found in environment variables."}))
    sys.exit(1)

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

def search_web(query, max_results=5):
    """Searches the web using DuckDuckGo and returns URLs."""
    urls = []
    try:
        results = DDGS().text(query, max_results=max_results)
        for r in results:
            urls.append(r['href'])
    except Exception as e:
        pass # Ignore search errors for individual queries
    return urls

def scrape_url(url):
    """Scrapes text content from a URL using BeautifulSoup."""
    try:
        response = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            # Extract text from paragraphs
            paragraphs = soup.find_all('p')
            text = '\n'.join([p.get_text() for p in paragraphs])
            return text[:5000] # Limit to 5000 chars per source to avoid context window explosion
    except Exception as e:
        return None
    return None

def main():
    try:
        input_data = json.loads(sys.stdin.read())
        query = input_data.get('query')
        prompt_template = input_data.get('prompt')
        
        if not query or not prompt_template:
            print(json.dumps({"error": "Missing query or prompt in input payload."}))
            sys.exit(1)
            
        # Step 1: Initial Search
        urls = search_web(query, max_results=5)
        
        # Step 2: Scrape Sources
        scraped_data = []
        for url in urls:
            content = scrape_url(url)
            if content:
                scraped_data.append({"url": url, "content": content})
                
        # Step 3: Synthesis
        if not scraped_data:
            print(json.dumps({"error": "Failed to retrieve any content for the given query."}))
            sys.exit(1)
            
        context = ""
        for data in scraped_data:
            context += f"\n\nSource: {data['url']}\nContent:\n{data['content']}\n"
            
        # Format the dynamic prompt template
        prompt = f"{prompt_template}\n\nRESEARCH TOPIC:\n{query}\n\nGATHERED CONTEXT:\n{context}\n\nOutput the result purely in Markdown format. Do not wrap it in a JSON object in your response text, just return the raw markdown text."
        
        try:
            response = model.generate_content(prompt)
            markdown_report = response.text
            
            # Return success with JSON
            print(json.dumps({
                "success": True,
                "report": markdown_report,
                "sources": urls
            }))
        except Exception as e:
            print(json.dumps({"error": f"LLM Synthesis failed: {str(e)}"}))
            sys.exit(1)
            
    except Exception as e:
        print(json.dumps({"error": f"Internal Error: {str(e)}"}))
        sys.exit(1)

if __name__ == "__main__":
    main()
