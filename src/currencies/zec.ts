import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

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
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, zecCurrency, opts);

export {
    zecCurrency,
    zecValidate,
};
