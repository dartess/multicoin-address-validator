import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const bioCurrency = {
    name: 'BioCoin',
    symbol: 'bio',
    addressTypes: {
        prod: [
            '19',
            '14',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const bioValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, bioCurrency, opts);

export {
    bioCurrency,
    bioValidate,
};
