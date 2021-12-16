import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

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
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, neoCurrency, opts);

export {
    neoCurrency,
    neoValidate,
};
