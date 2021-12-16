import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const zenCurrency = {
    name: 'ZenCash',
    symbol: 'zen',
    expectedLength: 26,
    addressTypes: {
        prod: [
            '2089',
            '2096',
        ],
        testnet: [
            '2092',
            '2098',
        ],
    },
} as const;

const zenValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, zenCurrency, opts);

export {
    zenCurrency,
    zenValidate,
};
