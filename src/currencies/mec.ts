import { BTCValidator, Validator } from '../validators/bitcoin_validator';

const mecCurrency = {
    name: 'MegaCoin',
    symbol: 'mec',
    addressTypes: {
        prod: [
            '32',
            '05',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const mecValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, mecCurrency, opts);

export {
    mecCurrency,
    mecValidate,
};
