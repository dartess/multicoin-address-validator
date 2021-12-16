import { NANOValidator, Validator } from '../validators/nano_validator';

const xrbCurrency = {
    name: 'RaiBlocks',
    symbol: 'xrb',
} as const;

const xrbValidate = (address: Validator[0]) => NANOValidator.isValidAddress(address);

export {
    xrbCurrency,
    xrbValidate,
};
