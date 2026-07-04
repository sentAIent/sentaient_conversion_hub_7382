import urllib.parse
import requests

query = "A beautiful sunset over a cyberpunk city"
clean_query = query.replace('\n', ' ').strip()[:200]
encoded_query = urllib.parse.quote(clean_query)
url = f"https://image.pollinations.ai/prompt/{encoded_query}?width=1080&height=1920&nologo=true"
response = requests.get(url)
print(f"Status: {response.status_code}")
if response.status_code == 200:
    print(response.content[:50])
