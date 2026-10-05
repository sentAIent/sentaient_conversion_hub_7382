import requests

url = "http://localhost:3001/api/stats?playerName=Christian%20McCaffrey"
try:
    r = requests.get(url)
    print(r.status_code)
    print(r.text)
except Exception as e:
    print(e)
