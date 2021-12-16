import { BTCValidator, Validator } from '../bitcoin_validator';

const kmdCurrency = {
    name: 'Komodo',
    symbol: 'kmd',
    addressTypes: {
        prod: [
            '3c',
            '55',
        ],
        testnet: [
            '0',
            '5',
        ],
    },
} as const;

const kmdValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, kmdCurrency, opts);

export {
    kmdCurrency,
    kmdValidate,
};
