import { ETHValidator } from '../validators/ethereum_validator';

const gntCurrency = {
    name: 'Golem (GNT)',
    symbol: 'gnt',
} as const;

const gntValidate = ETHValidator.isValidAddress;

export {
    gntCurrency,
    gntValidate,
};
