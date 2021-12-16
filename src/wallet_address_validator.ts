import { getAll, getByNameOrSymbol } from './currencies';

const DEFAULT_CURRENCY_NAME = 'bitcoin';

function validate(
    address: string,
    currencyNameOrSymbol: string,
    networkTypeOrOpts?: string | Record<string, unknown>, // TODO
) {
    const currency = getByNameOrSymbol(currencyNameOrSymbol || DEFAULT_CURRENCY_NAME);

    if (currency) {
        const opts = typeof networkTypeOrOpts === 'string'
            ? { networkType: networkTypeOrOpts }
            : networkTypeOrOpts;
        return currency.validate(address, opts);
    }

    throw new Error(`Missing validator for currency: ${currencyNameOrSymbol}`);
}

function getCurrencies() {
    return getAll();
}

function findCurrency(symbol: string) {
    return getByNameOrSymbol(symbol) || null;
}

export {
    validate,
    getCurrencies,
    findCurrency,
};
