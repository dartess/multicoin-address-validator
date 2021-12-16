const isPuppeteer = Boolean(global.__PUPPETEER__);

const WAValidator = !isPuppeteer && require('../lib');

if (isPuppeteer) {
    const fs = require("fs");
    const path = require("path");
    const script = fs.readFileSync(path.join(process.cwd(), 'dist', 'wallet-address-validator.min.js'), 'utf8');
    beforeAll(async () => {
        await page.setContent(``);
        await page.evaluate(script);
    });
}

async function withPuppeteer(fn) {
    return isPuppeteer
        ? await page.evaluate(fn)
        : fn();
}

describe('WAValidator.getCurrencies()', function () {
    it('Should get all supported symbols', async function () {
        const currencies = await withPuppeteer(() => WAValidator.getSupportedSymbols());
        expect(currencies).toBeTruthy();
        expect(currencies.length).toBeGreaterThan(0);
    });
});
