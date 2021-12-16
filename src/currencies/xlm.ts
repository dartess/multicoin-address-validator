import { XLMValidator } from '../validators/stellar_validator';

const xlmCurrency = {
    name: 'Stellar',
    symbol: 'xlm',
} as const;

const xlmValidate = XLMValidator.isValidAddress;

export {
    xlmCurrency,
    xlmValidate,
};
