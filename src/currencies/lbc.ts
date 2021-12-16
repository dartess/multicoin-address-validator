import { BTCValidator, Validator } from '../bitcoin_validator';

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
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, lbcCurrency, opts);

export {
    lbcCurrency,
    lbcValidate,
};
