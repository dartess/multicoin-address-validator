import { LSKValidator, Validator } from '../validators/lisk_validator';

const lskCurrency = {
    name: 'Lisk',
    symbol: 'lsk',
} as const;

const lskValidate = (address: Validator[0]) => LSKValidator.isValidAddress(address);

export {
    lskCurrency,
    lskValidate,
};
