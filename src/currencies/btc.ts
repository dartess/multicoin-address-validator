import { BTCValidator, Validator } from '../validators/bitcoin_validator';

const btcCurrency = {
    name: 'Bitcoin',
    symbol: 'btc',
    addressTypes: {
        prod: [
            '00',
            '05',
        ],
        testnet: [
            '6f',
            'c4',
            '3c',
            '26',
        ],
    },
    bech32Hrp: {
        prod: [
            'bc',
        ],
        testnet: [
            'tb',
        ],
    },
} as const;

const btcValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, btcCurrency, opts);

export {
    btcCurrency,
    btcValidate,
};
