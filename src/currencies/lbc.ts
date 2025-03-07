import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const lbcCurrency = {
    name: 'LBRY Credits',
    symbol: 'lbc',
    addressTypes: {
        prod: [
            '55',
        ],
        testnet: [],
    },
} as const;

const lbcValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, lbcCurrency, opts);

export {
    lbcCurrency,
    lbcValidate,
};
