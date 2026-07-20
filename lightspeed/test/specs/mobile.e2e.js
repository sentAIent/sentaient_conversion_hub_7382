describe('Lightspeed Mobile Dashboard', () => {
    it('should load the dashboard and verify app directory loads performance data', async () => {
        // Android emulator can access the host machine via 10.0.2.2
        await browser.url('http://10.0.2.2:5173/directory');
        
        // Wait for the app directory to load
        const rootElement = await $('#root');
        await rootElement.waitForExist({ timeout: 10000 });

        // Ensure we are in the directory and wait for apps to load
        const directoryHeader = await $('h2*=App Directory');
        await directoryHeader.waitForExist({ timeout: 10000 });

        // Wait for the widgets to load
        const firstWidget = await $('.widget.glass');
        await firstWidget.waitForExist({ timeout: 10000 });
        
        const widgets = await $$('.widget.glass');
        const numWidgets = widgets.length;
        
        // We expect about 10 simulated apps
        expect(numWidgets).toBeGreaterThan(0);

        for (let i = 0; i < numWidgets; i++) {
            console.log(`Testing app ${i + 1} of ${numWidgets}...`);
            
            // Re-fetch to avoid stale elements after navigating back
            const currentWidgets = await $$('.widget.glass');
            const widget = currentWidgets[i];
            
            await widget.waitForExist({ timeout: 5000 });
            await widget.click();

            // Wait for the performance history section to appear
            const performanceHeader = await $('h3*=Performance History');
            await performanceHeader.waitForExist({ timeout: 10000 });

            // The Recharts LineChart SVG should render once data is fetched
            const chartSvg = await $('.recharts-wrapper svg');
            await chartSvg.waitForExist({ timeout: 15000 });

            // Verify the SVG has been rendered properly
            expect(await chartSvg.isDisplayed()).toBe(true);

            // Navigate back
            await browser.back();
            
            // Wait for the directory to load again
            const directoryHeader = await $('h2*=App Directory');
            await directoryHeader.waitForExist({ timeout: 10000 });
            await firstWidget.waitForExist({ timeout: 10000 });
        }
    });
});
