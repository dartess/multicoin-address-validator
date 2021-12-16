import { BTCValidator, Validator } from '../bitcoin_validator';

const bioCurrency = {
    name: 'BioCoin',
    symbol: 'bio',
    addressTypes: {
        prod: [
            '19',
            '14',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const bioValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, bioCurrency, opts);

export {
    bioCurrency,
    bioValidate,
};
