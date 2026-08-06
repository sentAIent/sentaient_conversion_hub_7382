import sys
import json
import requests
from bs4 import BeautifulSoup
import re

def scrape_url(url):
    try:
        # Define a user-agent to avoid simple blocks
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        # Remove script, style, header, footer, and nav elements
        for element in soup(["script", "style", "nav", "header", "footer", "aside"]):
            element.extract()

        # Try to find the main content area (heuristics)
        main_content = soup.find('main') or soup.find(id=re.compile('main|content', re.I)) or soup.find(class_=re.compile('main|content', re.I))
        
        if main_content:
            text = main_content.get_text(separator='\n', strip=True)
        else:
            text = soup.get_text(separator='\n', strip=True)

        # Clean up excessive newlines
        text = re.sub(r'\n{3,}', '\n\n', text)
        
        # Get the title
        title = soup.title.string if soup.title else url

        return {
            "success": True,
            "title": title.strip(),
            "content": text
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": "No URL provided."}))
        sys.exit(1)
        
    target_url = sys.argv[1]
    result = scrape_url(target_url)
    print(json.dumps(result))
