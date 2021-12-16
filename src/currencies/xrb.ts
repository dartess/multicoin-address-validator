import { NANOValidator } from '../validators/nano_validator';

const xrbCurrency = {
    name: 'RaiBlocks',
    symbol: 'xrb',
} as const;

const xrbValidate = NANOValidator.isValidAddress;

export {
    xrbCurrency,
    xrbValidate,
};
