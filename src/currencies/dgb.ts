import { BTCValidator, Validator } from '../bitcoin_validator';

const dgbCurrency = {
    name: 'DigiByte',
    symbol: 'dgb',
    addressTypes: {
        prod: [
            '1e',
            '3f',
        ],
        testnet: [],
    },
    bech32Hrp: {
        prod: [
            'dgb',
            'S',
        ],
        testnet: [],
    },
} as const;

const dgbValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, dgbCurrency, opts);

export {
    dgbCurrency,
    dgbValidate,
};
