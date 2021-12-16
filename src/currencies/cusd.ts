import { ETHValidator } from '../validators/ethereum_validator';

const cusdCurrency = {
    name: 'CUSD',
    symbol: 'cusd',
} as const;

const cusdValidate = ETHValidator.isValidAddress;

export {
    cusdCurrency,
    cusdValidate,
};
