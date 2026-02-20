import puppeteer from 'puppeteer';

const APP_URL = process.env.APP_URL || 'http://localhost:3006';

describe('Saved Searches', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    });

    afterAll(async () => {
        await browser.close();
    });

    it('should save and load search', async () => {
        page = await browser.newPage();
        await page.goto(`${APP_URL}/properties`);
        await page.waitForSelector('[data-testid="map-loaded"]');

        // 1. Apply some filter
        await page.select('[data-testid="bedrooms-select"]', '3');
        await page.click('[data-testid="apply-filters-button"]');

        // 2. Save Search
        // Assuming simple save (no prompt name)
        await page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await page.click('[data-testid="save-search-button"]');

        // 3. Navigate to Saved Searches
        // Should be a link in navbar? 
        // Navbar: <Link to="/saved-searches" data-testid="nav-saved-searches">
        await page.click('[data-testid="nav-saved-searches"]');

        // 4. Check if saved search exists
        await page.waitForSelector('[data-testid^="saved-search-"]');

        // 5. Load it
        await page.click('[data-testid^="load-search-"]');

        // 6. Verify navigation back to properties and filters might be applied
        await page.waitForSelector('[data-testid="properties-container"]');

        // Check if bedroom filter is '3'
        const bedroomValue = await page.$eval('[data-testid="bedrooms-select"]', el => el.value);
        // Note: My implementation resets state on mount unless handled via location/context.
        // I added logic in Properties.jsx to read location.state.loadSearch.
        // But I didn't verify if I correctly map criteria.filters to state.
        // I did: if (criteria.filters) setFilters(criteria.filters);
        // So bedrooms should be 3.
        expect(bedroomValue).toBe('3');

        await page.close();
    });
});
