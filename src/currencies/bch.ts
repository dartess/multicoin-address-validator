import { BCHValidator, ValidatorParams } from '../validators/bch_validator';

const bchCurrency = {
    name: 'BitcoinCash',
    symbol: 'bch',
    regexp: '^[qQpP]{1}[0-9a-zA-Z]{41}$',
    addressTypes: { prod: ['00', '05'], testnet: ['6f', 'c4'] },
} as const;

const bchValidate = (
    address: ValidatorParams[0],
    opts?: ValidatorParams[2],
) => BCHValidator.isValidAddress(address, bchCurrency, opts);

export {
    bchCurrency,
    bchValidate,
};
