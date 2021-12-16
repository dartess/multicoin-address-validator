import { ETHValidator, Validator } from '../ethereum_validator';

const cvcCurrency = {
    name: 'Civic',
    symbol: 'cvc',
} as const;

const cvcValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    cvcCurrency,
    cvcValidate,
};
