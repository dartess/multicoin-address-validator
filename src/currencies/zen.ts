import { BTCValidator, Validator } from '../bitcoin_validator';

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
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, zenCurrency, opts);

export {
    zenCurrency,
    zenValidate,
};
