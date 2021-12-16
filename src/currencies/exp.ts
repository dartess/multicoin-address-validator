import { ETHValidator } from '../validators/ethereum_validator';

const expCurrency = {
    name: 'Expanse',
    symbol: 'exp',
} as const;

const expValidate = ETHValidator.isValidAddress;

export {
    expCurrency,
    expValidate,
};
