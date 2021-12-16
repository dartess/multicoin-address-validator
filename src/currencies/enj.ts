import { ETHValidator } from '../validators/ethereum_validator';

const enjCurrency = {
    name: 'Enjin Coin',
    symbol: 'enj',
} as const;

const enjValidate = ETHValidator.isValidAddress;

export {
    enjCurrency,
    enjValidate,
};
