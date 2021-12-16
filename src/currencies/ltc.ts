import { BTCValidator, Validator } from '../bitcoin_validator';

const ltcCurrency = {
    name: 'LiteCoin',
    symbol: 'ltc',
    addressTypes: {
        prod: [
            '30',
            '05',
            '32',
        ],
        testnet: [
            '6f',
            'c4',
            '3a',
        ],
    },
    bech32Hrp: {
        prod: [
            'ltc',
        ],
        testnet: [
            'tltc',
        ],
    },
} as const;

const ltcValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, ltcCurrency, opts);

export {
    ltcCurrency,
    ltcValidate,
};
