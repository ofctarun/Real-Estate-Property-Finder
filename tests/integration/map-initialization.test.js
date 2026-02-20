import puppeteer from 'puppeteer';

const APP_URL = process.env.APP_URL || 'http://localhost:3006';

describe('Map Initialization', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    });

    afterAll(async () => {
        if (browser) await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('should load the map and display markers', async () => {
        await page.goto(`${APP_URL}/properties`);

        // Check map loaded
        await page.waitForSelector('[data-testid="map-loaded"]', { timeout: 10000 });

        // Check markers
        // Using page.evaluate to count because selector count might be async or markers are many
        // But waitForSelector works for at least one
        await page.waitForSelector('[data-testid^="map-marker-"]');

        const markersCount = await page.evaluate(() => {
            return document.querySelectorAll('[data-testid^="map-marker-"]').length;
        });

        expect(markersCount).toBeGreaterThanOrEqual(30);
    });
});
