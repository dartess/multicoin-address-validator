import {
    getAll,
    getCurrency,
    CurrencySymbol,
    CurrencyNameAnyRegister,
    ValidateOpts,
} from './currencies';

function validate(
    address: string,
    currencySymbolOrName: CurrencySymbol | CurrencyNameAnyRegister,
    networkTypeOrOpts?: string | ValidateOpts,
) {
    const currency = getCurrency(currencySymbolOrName);

    if (!currency) {
        throw new Error(`Missing validator for currency: ${currencySymbolOrName}`);
    }

    const opts = typeof networkTypeOrOpts === 'string'
        ? { networkType: networkTypeOrOpts }
        : networkTypeOrOpts;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (currency as any).validate(address, opts);
}

function getCurrencies() {
    return getAll();
}

function findCurrency(currencySymbolOrName: CurrencySymbol | CurrencyNameAnyRegister) {
    return getCurrency(currencySymbolOrName) || null;
}

export {
    validate,
    getCurrencies,
    findCurrency,
};
