import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

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
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, dashCurrency, opts);

export {
    dashCurrency,
    dashValidate,
};
