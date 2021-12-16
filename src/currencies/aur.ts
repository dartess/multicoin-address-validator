import { BTCValidator, Validator } from '../validators/bitcoin_validator';

const aurCurrency = {
    name: 'AuroraCoin',
    symbol: 'aur',
    addressTypes: {
        prod: [
            '17',
            '05',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const aurValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, aurCurrency, opts);

export {
    aurCurrency,
    aurValidate,
};
