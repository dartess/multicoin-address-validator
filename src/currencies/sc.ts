import { SCValidator } from '../validators/siacoin_validator';

const scCurrency = {
    name: 'Siacoin',
    symbol: 'sc',
} as const;

const scValidate = SCValidator.isValidAddress;

export {
    scCurrency,
    scValidate,
};
