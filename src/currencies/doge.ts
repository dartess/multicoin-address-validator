import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const dogeCurrency = {
    name: 'DogeCoin',
    symbol: 'doge',
    addressTypes: {
        prod: [
            '1e',
            '16',
        ],
        testnet: [
            '71',
            'c4',
        ],
    },
} as const;

const dogeValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, dogeCurrency, opts);

export {
    dogeCurrency,
    dogeValidate,
};
