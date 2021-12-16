import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const qtumCurrency = {
    name: 'Qtum',
    symbol: 'qtum',
    addressTypes: {
        prod: [
            '3a',
            '32',
        ],
        testnet: [
            '78',
            '6e',
        ],
    },
} as const;

const qtumValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, qtumCurrency, opts);

export {
    qtumCurrency,
    qtumValidate,
};
