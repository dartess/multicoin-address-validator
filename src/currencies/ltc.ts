import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

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
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, ltcCurrency, opts);

export {
    ltcCurrency,
    ltcValidate,
};
