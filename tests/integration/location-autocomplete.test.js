import puppeteer from 'puppeteer';

const APP_URL = process.env.APP_URL || 'http://localhost:3006';

describe('Location Autocomplete', () => {
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

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(`${APP_URL}/properties`);
        await page.waitForSelector('[data-testid="map-loaded"]');
    });

    afterEach(async () => {
        await page.close();
    });

    it('should suggest locations and center map on selection', async () => {
        // Type 'San'
        await page.type('[data-testid="location-autocomplete"]', 'San');

        // Wait for suggestions
        await page.waitForSelector('[data-testid="autocomplete-suggestion-0"]');

        // Click first suggestion (San Francisco)
        await page.click('[data-testid="autocomplete-suggestion-0"]');

        // Wait for map movement? We can check center
        // Allow some time for flight animation
        await new Promise(r => setTimeout(r, 2000));

        const center = await page.evaluate(() => {
            return window.mapboxMap.getCenter();
        });

        // SF Coords: [-122.4194, 37.7749]
        expect(center.lng).toBeCloseTo(-122.4194, 1);
        expect(center.lat).toBeCloseTo(37.7749, 1);
    });
});
