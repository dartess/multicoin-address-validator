import { ETHValidator } from '../validators/ethereum_validator';

const stormCurrency = {
    name: 'Storm',
    symbol: 'storm',
} as const;

const stormValidate = ETHValidator.isValidAddress;

export {
    stormCurrency,
    stormValidate,
};
