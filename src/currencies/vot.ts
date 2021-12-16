import { BTCValidator, Validator } from '../bitcoin_validator';

const votCurrency = {
    name: 'VoteCoin',
    symbol: 'vot',
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

const votValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, votCurrency, opts);

export {
    votCurrency,
    votValidate,
};
