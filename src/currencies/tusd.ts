import { ETHValidator, Validator } from '../ethereum_validator';

const tusdCurrency = {
    name: 'TrueUSD',
    symbol: 'tusd',
} as const;

const tusdValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    tusdCurrency,
    tusdValidate,
};
