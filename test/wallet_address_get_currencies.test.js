const WAValidator = require('../src/wallet_address_validator');

const isPuppeteer = Boolean(global.__PUPPETEER__);

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
    it('Should get all currencies', async function () {
        const currencies = await withPuppeteer(() => WAValidator.getCurrencies());
        expect(currencies).toBeTruthy();
        expect(currencies.length).toBeGreaterThan(0);
    });

    it('Should find a specific currency by symbol', async function() {
        const currency = await withPuppeteer(() => WAValidator.findCurrency('xrp'));
        expect(currency).toBeTruthy();
        expect(currency.name).toEqual('Ripple');
        expect(currency.symbol).toEqual('xrp');
    });

    it('Should find a specific currency by name', async function() {
        const currency = await withPuppeteer(() => WAValidator.findCurrency('Ripple'));
        expect(currency).toBeTruthy();
        expect(currency.name).toEqual('Ripple');
        expect(currency.symbol).toEqual('xrp');
    });

    it('Should return null if currency is not found', async function() {
        const currency = await withPuppeteer(() => WAValidator.findCurrency('random'));
        expect(currency).toBeNull();
    });
});
