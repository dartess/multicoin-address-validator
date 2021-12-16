import { BTCValidator, Validator } from '../validators/bitcoin_validator';

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
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, qtumCurrency, opts);

export {
    qtumCurrency,
    qtumValidate,
};
