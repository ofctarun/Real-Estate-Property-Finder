import puppeteer from 'puppeteer';

const APP_URL = process.env.APP_URL || 'http://localhost:3006';

describe('Property Filtering', () => {
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

    it('should filter properties by bedroom count', async () => {
        page = await browser.newPage();
        await page.goto(`${APP_URL}/properties`);
        await page.waitForSelector('[data-testid="map-loaded"]');

        const initialCount = await page.evaluate(() => document.querySelectorAll('[data-testid^="property-card-"]').length);

        // Filter by 3+ bedrooms
        await page.select('[data-testid="bedrooms-select"]', '3');
        await page.click('[data-testid="apply-filters-button"]');

        await new Promise(r => setTimeout(r, 500));

        const newCount = await page.evaluate(() => document.querySelectorAll('[data-testid^="property-card-"]').length);
        expect(newCount).toBeLessThan(initialCount);

        await page.close();
    });
});
