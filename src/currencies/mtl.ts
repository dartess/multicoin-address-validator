import { ETHValidator } from '../validators/ethereum_validator';

const mtlCurrency = {
    name: 'Metal',
    symbol: 'mtl',
} as const;

const mtlValidate = ETHValidator.isValidAddress;

export {
    mtlCurrency,
    mtlValidate,
};
