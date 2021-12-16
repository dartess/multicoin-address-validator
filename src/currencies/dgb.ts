import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

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
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, dgbCurrency, opts);

export {
    dgbCurrency,
    dgbValidate,
};
