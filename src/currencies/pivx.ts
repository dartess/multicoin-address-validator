import { BTCValidator, Validator } from '../bitcoin_validator';

const pivxCurrency = {
    name: 'PIVX',
    symbol: 'pivx',
    addressTypes: {
        prod: [
            '1e',
            '0d',
        ],
        testnet: [],
    },
} as const;

const pivxValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, pivxCurrency, opts);

export {
    pivxCurrency,
    pivxValidate,
};
