import { BTCValidator, Validator } from '../validators/bitcoin_validator';

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
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, dogeCurrency, opts);

export {
    dogeCurrency,
    dogeValidate,
};
