import { SCValidator, Validator } from '../validators/siacoin_validator';

const xscCurrency = {
    name: 'HyperSpace',
    symbol: 'xsc',
} as const;

const xscValidate = (address: Validator[0]) => SCValidator.isValidAddress(address);

export {
    xscCurrency,
    xscValidate,
};
