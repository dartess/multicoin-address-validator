import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

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
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, btczCurrency, opts);

export {
    btczCurrency,
    btczValidate,
};
