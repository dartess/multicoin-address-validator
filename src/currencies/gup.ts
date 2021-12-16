import { ETHValidator } from '../validators/ethereum_validator';

const gupCurrency = {
    name: 'Matchpool',
    symbol: 'gup',
} as const;

const gupValidate = ETHValidator.isValidAddress;

export {
    gupCurrency,
    gupValidate,
};
