import { ETHValidator } from '../validators/ethereum_validator';

const solveCurrency = {
    name: 'SOLVE',
    symbol: 'solve',
} as const;

const solveValidate = ETHValidator.isValidAddress;

export {
    solveCurrency,
    solveValidate,
};
