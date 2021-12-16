import { ETHValidator } from '../validators/ethereum_validator';

const repCurrency = {
    name: 'Augur',
    symbol: 'rep',
} as const;

const repValidate = ETHValidator.isValidAddress;

export {
    repCurrency,
    repValidate,
};
