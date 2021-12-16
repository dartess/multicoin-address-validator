import { BTCValidator, Validator } from '../bitcoin_validator';

const zecCurrency = {
    name: 'ZCash',
    symbol: 'zec',
    expectedLength: 26,
    addressTypes: {
        prod: [
            '1cb8',
            '1cbd',
        ],
        testnet: [
            '1d25',
            '1cba',
        ],
    },
} as const;

const zecValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, zecCurrency, opts);

export {
    zecCurrency,
    zecValidate,
};
