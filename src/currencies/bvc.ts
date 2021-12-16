import { BTCValidator, Validator } from '../validators/bitcoin_validator';

const bvcCurrency = {
    name: 'BeaverCoin',
    symbol: 'bvc',
    addressTypes: {
        prod: [
            '19',
            '05',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const bvcValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, bvcCurrency, opts);

export {
    bvcCurrency,
    bvcValidate,
};
