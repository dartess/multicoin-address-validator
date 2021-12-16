import { ETHValidator, Validator } from '../validators/ethereum_validator';

const gupCurrency = {
    name: 'Matchpool',
    symbol: 'gup',
} as const;

const gupValidate = (address: Validator[0]) => ETHValidator.isValidAddress(address);

export {
    gupCurrency,
    gupValidate,
};
