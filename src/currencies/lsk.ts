import { LSKValidator } from '../validators/lisk_validator';

const lskCurrency = {
    name: 'Lisk',
    symbol: 'lsk',
} as const;

const lskValidate = LSKValidator.isValidAddress;

export {
    lskCurrency,
    lskValidate,
};
