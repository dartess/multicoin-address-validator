import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

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
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, ptsCurrency, opts);

export {
    ptsCurrency,
    ptsValidate,
};
