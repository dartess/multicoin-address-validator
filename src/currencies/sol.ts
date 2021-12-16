import { Base58Validator, Validator } from '../validators/base58_validator';

const solCurrency = {
    name: 'Solana',
    symbol: 'sol',
    maxLength: 44,
    minLength: 43,
} as const;

const solValidate = (address: Validator[0]) => Base58Validator.isValidAddress(address, solCurrency);

export {
    solCurrency,
    solValidate,
};
