import {
    getSupportedSymbols,
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
    if (typeof address !== 'string') {
        return false; // protection against untyped input
    }

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

export {
    validate,
    getSupportedSymbols,
};
