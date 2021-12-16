import { BTCValidator, Validator } from '../bitcoin_validator';

const ptsCurrency = {
    name: 'ProtoShares',
    symbol: 'pts',
    addressTypes: {
        prod: [
            '38',
            '05',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const ptsValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BTCValidator.isValidAddress(address, ptsCurrency, opts);

export {
    ptsCurrency,
    ptsValidate,
};
