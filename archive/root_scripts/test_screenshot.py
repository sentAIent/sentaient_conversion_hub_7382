import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        # Go to page
        await page.goto("http://localhost:3000/mindwave.html")
        await page.wait_for_timeout(2000)
        
        # Click Start
        await page.evaluate("document.getElementById('startExperienceBtn').click()")
        await page.wait_for_timeout(1000)

        # Click Tsunami
        await page.evaluate("document.getElementById('tsunamiBtn').click()")
        await page.wait_for_timeout(2000)

        await page.screenshot(path="screenshot_tsunami.png")
        await browser.close()

asyncio.run(main())
