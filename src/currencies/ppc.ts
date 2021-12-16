import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

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
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, ppcCurrency, opts);

export {
    ppcCurrency,
    ppcValidate,
};
