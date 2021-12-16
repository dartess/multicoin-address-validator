import { BTCValidator, Validator } from '../bitcoin_validator';

const ppcCurrency = {
    name: 'PeerCoin',
    symbol: 'ppc',
    addressTypes: {
        prod: [
            '37',
            '75',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const ppcValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, ppcCurrency, opts);

export {
    ppcCurrency,
    ppcValidate,
};
