import { BTCValidator, Validator } from '../validators/bitcoin_validator';

const slrCurrency = {
    name: 'SolarCoin',
    symbol: 'slr',
    addressTypes: {
        prod: [
            '12',
            '05',
        ],
        testnet: [],
    },
} as const;

const slrValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, slrCurrency, opts);

export {
    slrCurrency,
    slrValidate,
};
