import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const grlcCurrency = {
    name: 'GarliCoin',
    symbol: 'grlc',
    addressTypes: {
        prod: [
            '26',
            '05',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const grlcValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, grlcCurrency, opts);

export {
    grlcCurrency,
    grlcValidate,
};
