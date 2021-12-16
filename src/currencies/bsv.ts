import { BCHValidator, Validator } from '../bch_validator';

const bsvCurrency = {
    name: 'Bitcoin SV',
    symbol: 'bsv',
    regexp: '^[qQ]{1}[0-9a-zA-Z]{41}$',
    addressTypes: { prod: ['00', '05'], testnet: ['6f', 'c4'] },
} as const;

const bsvValidate = (
    address: Validator[0],
    opts?: Validator[2],
) => BCHValidator.isValidAddress(address, bsvCurrency, opts);

export {
    bsvCurrency,
    bsvValidate,
};
