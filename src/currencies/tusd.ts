import { ETHValidator, Validator } from '../validators/ethereum_validator';

const tusdCurrency = {
    name: 'TrueUSD',
    symbol: 'tusd',
} as const;

const tusdValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    tusdCurrency,
    tusdValidate,
};
