import { NANOValidator, Validator } from '../nano_validator';

const nanoCurrency = {
    name: 'Nano',
    symbol: 'nano',
} as const;

const nanoValidate = (address: Validator[0]) => NANOValidator.isValidAddress(address);

export {
    nanoCurrency,
    nanoValidate,
};
