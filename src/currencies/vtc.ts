import { BTCValidator, ValidatorParams } from '../validators/bitcoin_validator';

const vtcCurrency = {
    name: 'VertCoin',
    symbol: 'vtc',
    addressTypes: {
        prod: [
            '0x',
            '47',
            '71',
            '05',
        ],
        testnet: [
            '6f',
            'c4',
        ],
    },
} as const;

const vtcValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BTCValidator.isValidAddress(address, vtcCurrency, opts);

export {
    vtcCurrency,
    vtcValidate,
};
