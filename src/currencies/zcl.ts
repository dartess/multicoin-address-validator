import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const zclCurrency = {
    name: 'ZClassic',
    symbol: 'zcl',
    expectedLength: 26,
    addressTypes: {
        prod: [
            '1cb8',
            '1cbd',
        ],
        testnet: [
            '1d25',
            '1cba',
        ],
    },
} as const;

const zclValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, zclCurrency, opts);

export {
    zclCurrency,
    zclValidate,
};
