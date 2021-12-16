import { SCValidator, Validator } from '../validators/siacoin_validator';

const scCurrency = {
    name: 'Siacoin',
    symbol: 'sc',
} as const;

const scValidate = (address: Validator[0]) => SCValidator.isValidAddress(address);

export {
    scCurrency,
    scValidate,
};
