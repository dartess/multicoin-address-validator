import { ETHValidator } from '../validators/ethereum_validator';

const tusdCurrency = {
    name: 'TrueUSD',
    symbol: 'tusd',
} as const;

const tusdValidate = ETHValidator.isValidAddress;

export {
    tusdCurrency,
    tusdValidate,
};
