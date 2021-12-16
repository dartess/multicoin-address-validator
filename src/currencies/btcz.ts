import { BTCValidator, Validator } from '../bitcoin_validator';

const btczCurrency = {
    name: 'BitcoinZ',
    symbol: 'btcz',
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

const btczValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, btczCurrency, opts);

export {
    btczCurrency,
    btczValidate,
};
