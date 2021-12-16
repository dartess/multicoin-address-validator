import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const xpmCurrency = {
    name: 'PrimeCoin',
    symbol: 'xpm',
    addressTypes: {
        prod: [
            '17',
            '53',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const xpmValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, xpmCurrency, opts);

export {
    xpmCurrency,
    xpmValidate,
};
