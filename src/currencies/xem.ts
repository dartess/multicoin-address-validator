import { NEMValidator, Validator } from '../nem_validator';

const xemCurrency = {
    name: 'Nem',
    symbol: 'xem',
} as const;

const xemValidate = (address: Validator[0]) => NEMValidator.isValidAddress(address);

export {
    xemCurrency,
    xemValidate,
};
