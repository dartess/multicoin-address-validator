import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const hushCurrency = {
    name: 'Hush',
    symbol: 'hush',
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

const hushValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, hushCurrency, opts);

export {
    hushCurrency,
    hushValidate,
};
