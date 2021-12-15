import { XRPValidator, Validator } from '../ripple_validator';

const xrpCurrency = {
    name: 'Ripple',
    symbol: 'xrp',
} as const;

const xrpValidate = (address: Validator[0]) => XRPValidator.isValidAddress(address);

export {
    xrpCurrency,
    xrpValidate,
};
