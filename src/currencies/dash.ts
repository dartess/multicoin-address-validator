import { BTCValidator, Validator } from '../bitcoin_validator';

const dashCurrency = {
    name: 'Dash',
    symbol: 'dash',
    addressTypes: {
        prod: [
            '4c',
            '10',
        ],
        testnet: [
            '8c',
            '13',
        ],
    },
} as const;

const dashValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, dashCurrency, opts);

export {
    dashCurrency,
    dashValidate,
};
