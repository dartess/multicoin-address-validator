import { ETHValidator, Validator } from '../ethereum_validator';

const solveCurrency = {
    name: 'SOLVE',
    symbol: 'solve',
} as const;

const solveValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    solveCurrency,
    solveValidate,
};
