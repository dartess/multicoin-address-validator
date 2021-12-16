import { BTCValidator, Validator } from '../validators/bitcoin_validator';

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
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, zclCurrency, opts);

export {
    zclCurrency,
    zclValidate,
};
