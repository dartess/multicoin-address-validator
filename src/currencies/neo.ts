import { BTCValidator, Validator } from '../validators/bitcoin_validator';

const neoCurrency = {
    name: 'Neo',
    symbol: 'neo',
    addressTypes: {
        prod: [
            '17',
        ],
        testnet: [],
    },
} as const;

const neoValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, neoCurrency, opts);

export {
    neoCurrency,
    neoValidate,
};
