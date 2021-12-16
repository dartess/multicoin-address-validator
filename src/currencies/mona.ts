import { BTCValidator, Validator } from '../validators/bitcoin_validator';

const monaCurrency = {
    name: 'MonaCoin',
    symbol: 'mona',
    addressTypes: {
        prod: [
            '32',
            '37',
        ],
        testnet: [],
    },
} as const;

const monaValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, monaCurrency, opts);

export {
    monaCurrency,
    monaValidate,
};
