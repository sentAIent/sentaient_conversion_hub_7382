from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("console", lambda msg: print(f"Console {msg.type}: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PageError: {err}"))
        print("Navigating...")
        page.goto("http://localhost:5173/mindwave.html")
        page.wait_for_timeout(5000)
        
        try:
            rect = page.locator('body').evaluate('el => el.getBoundingClientRect()')
            print("Finished.")
        except Exception as e:
            print("Error:", e)
            
        browser.close()

if __name__ == "__main__":
    run()
