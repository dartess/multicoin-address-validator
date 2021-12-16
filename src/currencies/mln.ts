import { ETHValidator } from '../validators/ethereum_validator';

const mlnCurrency = {
    name: 'Melon',
    symbol: 'mln',
} as const;

const mlnValidate = ETHValidator.isValidAddress;

export {
    mlnCurrency,
    mlnValidate,
};
