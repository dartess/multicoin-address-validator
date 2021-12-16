import { NANOValidator } from '../validators/nano_validator';

const nanoCurrency = {
    name: 'Nano',
    symbol: 'nano',
} as const;

const nanoValidate = NANOValidator.isValidAddress;

export {
    nanoCurrency,
    nanoValidate,
};
