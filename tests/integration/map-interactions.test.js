import puppeteer from 'puppeteer';

const APP_URL = process.env.APP_URL || 'http://localhost:3006';

describe('Map Interactions', () => {
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

    it('should highlight card when marker is clicked', async () => {
        // Find a marker. Markers might be in shadow DOM or plain DOM. Mapbox markers are usually plain DOM.
        // Need to find one that is visible.
        // Wait for ANY marker
        await page.waitForSelector('.marker');

        // Click the first one
        await page.click('.marker');
        // .marker class was added in MapContainer.jsx

        // Check if corresponding card gets border
        // We don't know which ID it was easily unless we inspect element
        // But we can check if ANY card has the style

        // Wait a bit for scroll/highlight
        await new Promise(r => setTimeout(r, 500));

        const hasHighlight = await page.evaluate(() => {
            const cards = document.querySelectorAll('[data-testid^="property-card-"]');
            for (let card of cards) {
                if (card.style.border.includes('blue') || card.style.border.includes('2px solid')) {
                    return true;
                }
            }
            return false;
        });

        expect(hasHighlight).toBe(true);
    });
});
