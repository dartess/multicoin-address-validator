import { NANOValidator, Validator } from '../nano_validator';

const xrbCurrency = {
    name: 'RaiBlocks',
    symbol: 'xrb',
} as const;

const xrbValidate = (address: Validator[0]) => NANOValidator.isValidAddress(address);

export {
    xrbCurrency,
    xrbValidate,
};
