import { SCValidator } from '../validators/siacoin_validator';

const xscCurrency = {
    name: 'HyperSpace',
    symbol: 'xsc',
} as const;

const xscValidate = SCValidator.isValidAddress;

export {
    xscCurrency,
    xscValidate,
};
