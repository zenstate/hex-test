/* eslint no-console: "off" */

import puppeteer from 'puppeteer';
import puppeteerConfig from '../helpers/puppeteerConfigLoader';

describe('1000 - Happy Path test', () => {
    let browser;
    // eslint-disable-next-line no-unused-vars
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch(puppeteerConfig);
        const context = await browser.createIncognitoBrowserContext();
        page = await context.newPage();
    }, 30000);

    it('should allow me to view 20 photos from the flickr photostream', async () => {
        await page.goto('http://localhost', { waitUntil: 'networkidle2' });
        const photoElements = await page.$$("[data-testid='Photo']");
        expect(
            photoElements,
        ).toHaveLength(20);
    }, 30000);

    afterAll(() => {
        browser.close();
    });


});