import { BTCValidator, Validator } from '../bitcoin_validator';

const nmcCurrency = {
    name: 'NameCoin',
    symbol: 'nmc',
    addressTypes: {
        prod: [
            '34',
        ],
        testnet: [],
    },
} as const;

const nmcValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, nmcCurrency, opts);

export {
    nmcCurrency,
    nmcValidate,
};
