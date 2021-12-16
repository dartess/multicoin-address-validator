import { XLMValidator, Validator } from '../validators/stellar_validator';

const xlmCurrency = {
    name: 'Stellar',
    symbol: 'xlm',
} as const;

const xlmValidate = (address: Validator[0]) => XLMValidator.isValidAddress(address);

export {
    xlmCurrency,
    xlmValidate,
};
