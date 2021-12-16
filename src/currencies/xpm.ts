import { BTCValidator, Validator } from '../bitcoin_validator';

const xpmCurrency = {
    name: 'PrimeCoin',
    symbol: 'xpm',
    addressTypes: {
        prod: [
            '17',
            '53',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const xpmValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, xpmCurrency, opts);

export {
    xpmCurrency,
    xpmValidate,
};
