import { BTCValidator, Validator } from '../bitcoin_validator';

const btgCurrency = {
    name: 'BitcoinGold',
    symbol: 'btg',
    addressTypes: {
        prod: [
            '26',
            '17',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const btgValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, btgCurrency, opts);

export {
    btgCurrency,
    btgValidate,
};
