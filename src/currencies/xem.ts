import { NEMValidator } from '../validators/nem_validator';

const xemCurrency = {
    name: 'Nem',
    symbol: 'xem',
} as const;

const xemValidate = NEMValidator.isValidAddress;

export {
    xemCurrency,
    xemValidate,
};
