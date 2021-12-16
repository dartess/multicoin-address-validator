import { BTCValidator, Validator } from '../bitcoin_validator';

const dcrCurrency = {
    name: 'Decred',
    symbol: 'dcr',
    addressTypes: {
        prod: [
            '073f',
            '071a',
        ],
        testnet: [
            '0f21',
            '0efc',
        ],
    },
    hashFunction: 'blake256',
    expectedLength: 26,
} as const;

const dcrValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, dcrCurrency, opts);

export {
    dcrCurrency,
    dcrValidate,
};
