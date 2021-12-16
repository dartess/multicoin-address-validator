const currencies = require('./currencies');

const DEFAULT_CURRENCY_NAME = 'bitcoin';

function validate(
    address: string,
    currencyNameOrSymbol: string,
    networkTypeOrOpts?: string | Record<string, unknown>, // TODO
) {
    const currency = currencies.getByNameOrSymbol(currencyNameOrSymbol || DEFAULT_CURRENCY_NAME);

    if (currency) {
        const opts = typeof networkTypeOrOpts === 'string'
            ? { networkType: networkTypeOrOpts }
            : networkTypeOrOpts;
        return currency.validate(address, opts);
    }

    throw new Error(`Missing validator for currency: ${currencyNameOrSymbol}`);
}

function getCurrencies() {
    return currencies.getAll();
}

function findCurrency(symbol: string) {
    return currencies.getByNameOrSymbol(symbol) || null;
}

export {
    validate,
    getCurrencies,
    findCurrency,
};
