import { ETHValidator, Validator } from '../validators/ethereum_validator';

const cusdCurrency = {
    name: 'CUSD',
    symbol: 'cusd',
} as const;

const cusdValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    cusdCurrency,
    cusdValidate,
};
