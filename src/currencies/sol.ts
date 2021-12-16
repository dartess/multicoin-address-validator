import { Base58Validator, ValidatorParams } from '../validators/base58_validator';

const solCurrency = {
    name: 'Solana',
    symbol: 'sol',
    maxLength: 44,
    minLength: 43,
} as const;

const solValidate = (address: ValidatorParams[0]) => Base58Validator.isValidAddress(address, solCurrency);

export {
    solCurrency,
    solValidate,
};
