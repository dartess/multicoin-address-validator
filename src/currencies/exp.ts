import { ETHValidator, Validator } from '../ethereum_validator';

const expCurrency = {
    name: 'Expanse',
    symbol: 'exp',
} as const;

const expValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    expCurrency,
    expValidate,
};
