import { XRPValidator } from '../validators/ripple_validator';

const xrpCurrency = {
    name: 'Ripple',
    symbol: 'xrp',
} as const;

const xrpValidate = XRPValidator.isValidAddress;

export {
    xrpCurrency,
    xrpValidate,
};
