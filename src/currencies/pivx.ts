import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

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
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, pivxCurrency, opts);

export {
    pivxCurrency,
    pivxValidate,
};
