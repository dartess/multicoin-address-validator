import { BTCValidator, Validator } from '../bitcoin_validator';

const sngCurrency = {
    name: 'SnowGem',
    symbol: 'sng',
    expectedLength: 26,
    addressTypes: {
        prod: [
            '1c28',
            '1c2d',
        ],
        testnet: [
            '1d25',
            '1cba',
        ],
    },
} as const;

const sngValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, sngCurrency, opts);

export {
    sngCurrency,
    sngValidate,
};
