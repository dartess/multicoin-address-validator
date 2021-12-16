import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

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
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, kmdCurrency, opts);

export {
    kmdCurrency,
    kmdValidate,
};
