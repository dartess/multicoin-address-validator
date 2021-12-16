import { ETHValidator } from '../validators/ethereum_validator';

const cvcCurrency = {
    name: 'Civic',
    symbol: 'cvc',
} as const;

const cvcValidate = ETHValidator.isValidAddress;

export {
    cvcCurrency,
    cvcValidate,
};
